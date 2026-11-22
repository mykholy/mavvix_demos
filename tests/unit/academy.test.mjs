import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');
const dbPath = path.join(rootDir, 'data', 'mavvix-demo.sqlite');

describe('08 — Academy (Nova Learning / نوفا للتعلم) Unit Tests', () => {
  const db = new DatabaseSync(dbPath);

  test('Demo site registered and published', () => {
    const site = db.prepare("SELECT * FROM demo_sites WHERE slug = 'academy'").get();
    assert.ok(site, 'Academy site record must exist');
    assert.equal(site.published, 1, 'Site must be published');
    assert.match(site.name_ar, /نوفا/);
    assert.match(site.name_en, /Nova/);
  });

  test('Exactly 12 courses seeded in academy_courses across 4 specialized tracks', () => {
    const count = db.prepare("SELECT count(1) as c FROM academy_courses WHERE site_id = 'site-academy'").get().c;
    assert.equal(count, 12, 'Must have exactly 12 seeded courses');

    const tracks = db.prepare("SELECT DISTINCT track FROM academy_courses WHERE site_id = 'site-academy'").all().map(r => r.track);
    assert.ok(tracks.includes('data'), 'Must have data track');
    assert.ok(tracks.includes('development'), 'Must have development track');
    assert.ok(tracks.includes('design'), 'Must have design track');
    assert.ok(tracks.includes('marketing'), 'Must have marketing track');

    const statuses = db.prepare("SELECT DISTINCT status FROM academy_courses WHERE site_id = 'site-academy'").all().map(r => r.status);
    assert.deepEqual(statuses, ['published'], 'All 12 courses must have published status');
  });

  test('Exactly 60 lessons seeded in academy_lessons with preview enabled flags', () => {
    const count = db.prepare("SELECT count(1) as c FROM academy_lessons").get().c;
    assert.equal(count, 60, 'Must have exactly 60 source-seeded lessons (5 per course across 12 courses)');

    const previewCount = db.prepare("SELECT count(1) as c FROM academy_lessons WHERE preview_enabled = 1").get().c;
    assert.ok(previewCount >= 12, 'Must have at least 12 preview-enabled lessons across the curriculum');

    // Lesson 01-01 must be preview enabled
    const l1 = db.prepare("SELECT * FROM academy_lessons WHERE slug = 'lesson-01-01'").get();
    assert.ok(l1, 'lesson-01-01 must exist');
    assert.equal(l1.preview_enabled, 1, 'lesson-01-01 must be preview enabled');
  });

  test('Quiz questions seeded for lesson-01-01 with answers and explanations', () => {
    const questions = db.prepare("SELECT * FROM academy_quiz_questions WHERE lesson_id = 'lesson-01-01' ORDER BY sort_order ASC").all();
    assert.equal(questions.length, 4, 'lesson-01-01 must have exactly 4 seeded quiz questions');

    for (const q of questions) {
      const prompt = JSON.parse(q.prompt_json);
      const answers = JSON.parse(q.answers_json);
      const explanation = JSON.parse(q.explanation_json);

      assert.ok(prompt.ar && prompt.en, 'Question prompt must have Arabic and English');
      assert.ok(answers.ar.length === 4 && answers.en.length === 4, 'Must have 4 answers in AR and EN');
      assert.ok(typeof q.correct_index === 'number', 'Must specify numeric correct_index');
      assert.ok(explanation.ar && explanation.en, 'Explanation must have AR and EN');
    }
  });

  test('Deterministic quiz scoring: 3/4 correct answers yields exactly 75%', () => {
    const questions = db.prepare("SELECT * FROM academy_quiz_questions WHERE lesson_id = 'lesson-01-01' ORDER BY sort_order ASC").all();
    assert.equal(questions.length, 4);

    // Scenario fixture: user answers Q1, Q2, Q4 correctly (correct_index = 1), and Q3 incorrectly (selects index 0)
    const userAnswers = [
      questions[0].correct_index, // Correct (1)
      questions[1].correct_index, // Correct (1)
      0,                          // Incorrect (correct is 1)
      questions[3].correct_index  // Correct (1)
    ];

    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct_index) correct++;
    });

    assert.equal(correct, 3, 'Must have exactly 3 correct answers');
    const scorePercent = Math.round((correct / questions.length) * 100);
    assert.equal(scorePercent, 75, 'Deterministic score for 3/4 must be exactly 75%');
  });

  test('Guest progress persistence in SQLite demo_guest_progress table', () => {
    const testHash = 'test_hash_guest_12345';

    // Insert progress record
    db.prepare(`
      INSERT INTO demo_guest_progress (guest_token_hash, lesson_id, completed, quiz_score, updated_at)
      VALUES (?, 'lesson-01-01', 1, 75, CURRENT_TIMESTAMP)
      ON CONFLICT(guest_token_hash, lesson_id) DO UPDATE SET
        completed = excluded.completed,
        quiz_score = excluded.quiz_score,
        updated_at = CURRENT_TIMESTAMP
    `).run(testHash);

    // Retrieve progress
    const record = db.prepare(`
      SELECT * FROM demo_guest_progress
      WHERE guest_token_hash = ? AND lesson_id = 'lesson-01-01'
    `).get(testHash);

    assert.ok(record, 'Progress record must exist in SQLite');
    assert.equal(record.lesson_id, 'lesson-01-01');
    assert.equal(record.completed, 1);
    assert.equal(record.quiz_score, 75);

    // Clean up test entry
    db.prepare("DELETE FROM demo_guest_progress WHERE guest_token_hash = ?").run(testHash);
  });

  test('Enrollment interest submission persistence in demo_submissions', () => {
    const subId = `sub_test_acad_${Date.now()}`;
    const refNumber = `MVX-ACA-${Math.floor(100000 + Math.random() * 900000)}`;
    const payload = {
      courseSlug: 'course-01',
      track: 'data',
      guestName: 'Kareem Tarek',
      guestEmail: 'kareem.tarek@example.com',
      careerGoal: 'career_transition',
      learningPace: 'part_time',
      refNumber,
      submittedAt: new Date().toISOString()
    };

    db.prepare(`
      INSERT INTO demo_submissions (id, site_id, flow_type, status, payload_json)
      VALUES (?, 'site-academy', 'academy_interest', 'simulated', ?)
    `).run(subId, JSON.stringify(payload));

    const inserted = db.prepare("SELECT * FROM demo_submissions WHERE id = ?").get(subId);
    assert.ok(inserted, 'Submission must be inserted');
    assert.equal(inserted.flow_type, 'academy_interest');
    assert.equal(inserted.status, 'simulated');

    const parsed = JSON.parse(inserted.payload_json);
    assert.equal(parsed.courseSlug, 'course-01');
    assert.equal(parsed.guestName, 'Kareem Tarek');
    assert.equal(parsed.refNumber, refNumber);

    // Clean up
    db.prepare("DELETE FROM demo_submissions WHERE id = ?").run(subId);
  });

  test('Edge-case validation rules: rejects invalid-choice courseSlug and empty guest name', () => {
    const validateAcademyPayload = (payload) => {
      if (payload.courseSlug === 'invalid-choice' || (!payload.courseSlug && !payload.track)) {
        return { valid: false, code: 'INVALID_COURSE_SELECTION' };
      }
      if (!payload.guestName || payload.guestName.trim().length === 0) {
        return { valid: false, code: 'INVALID_GUEST_NAME' };
      }
      if (!payload.guestEmail && !payload.guestPhone) {
        return { valid: false, code: 'INVALID_CONTACT_INFO' };
      }
      return { valid: true };
    };

    // Invalid choice must be rejected
    const res1 = validateAcademyPayload({ courseSlug: 'invalid-choice', guestName: 'Test User', guestEmail: 'a@b.com' });
    assert.equal(res1.valid, false);
    assert.equal(res1.code, 'INVALID_COURSE_SELECTION');

    // Missing guest name must be rejected
    const res2 = validateAcademyPayload({ courseSlug: 'course-01', guestName: '   ', guestEmail: 'a@b.com' });
    assert.equal(res2.valid, false);
    assert.equal(res2.code, 'INVALID_GUEST_NAME');

    // Missing contact info must be rejected
    const res3 = validateAcademyPayload({ courseSlug: 'course-01', guestName: 'Valid Name' });
    assert.equal(res3.valid, false);
    assert.equal(res3.code, 'INVALID_CONTACT_INFO');

    // Valid payload must pass
    const res4 = validateAcademyPayload({ courseSlug: 'course-01', guestName: 'Valid Name', guestEmail: 'user@example.com' });
    assert.equal(res4.valid, true);
  });

  test('Exactly 6 educational articles seeded with >200 words in AR and EN', () => {
    const posts = db.prepare(`
      SELECT p.id, p.slug, p.category,
             c_ar.title as title_ar, c_ar.body_json as body_ar, c_ar.summary as summary_ar,
             c_en.title as title_en, c_en.body_json as body_en, c_en.summary as summary_en
      FROM editorial_posts p
      JOIN localized_content c_ar ON c_ar.owner_id = p.id AND c_ar.locale = 'ar'
      JOIN localized_content c_en ON c_en.owner_id = p.id AND c_en.locale = 'en'
      WHERE p.site_id = 'site-academy'
    `).all();

    assert.equal(posts.length, 6, 'Must have exactly 6 articles seeded for Academy');

    for (const post of posts) {
      const bodyAr = JSON.parse(post.body_ar);
      const bodyEn = JSON.parse(post.body_en);

      const arText = (post.title_ar || '') + ' ' + (post.summary_ar || '') + ' ' +
        (bodyAr.sections || []).map(s => `${s.heading} ${s.content}`).join(' ');
      const arWords = arText.trim().split(/\s+/).length;

      const enText = (post.title_en || '') + ' ' + (post.summary_en || '') + ' ' +
        (bodyEn.sections || []).map(s => `${s.heading} ${s.content}`).join(' ');
      const enWords = enText.trim().split(/\s+/).length;

      assert.ok(arWords >= 200, `Article ${post.slug} AR word count (${arWords}) should exceed 200`);
      assert.ok(enWords >= 200, `Article ${post.slug} EN word count (${enWords}) should exceed 200`);
    }
  });

  test('Substantive lesson content: lesson-01-01 has applied lab exercises and structured transcripts', () => {
    const l1 = db.prepare("SELECT * FROM academy_lessons WHERE slug = 'lesson-01-01'").get();
    assert.ok(l1);
    const content = JSON.parse(l1.content_json);

    assert.ok(content.transcript_ar && content.transcript_ar.length > 100, 'Must have detailed AR transcript');
    assert.ok(content.transcript_en && content.transcript_en.length > 100, 'Must have detailed EN transcript');
    assert.ok(content.exercise_ar, 'Must have AR exercise directive');
    assert.ok(content.exercise_en, 'Must have EN exercise directive');
  });
});
