# 08 — NOVA LEARNING / نوفا للتعلّم — Route Acceptance Table

**Vertical:** Academy & Professional Applied Learning Platform  
**Mandatory for complete eight-demo release:** YES  
**Route prefix:** `/[locale]/preview/academy`  
**Brand Identity:** NOVA LEARNING / نوفا للتعلّم  
**Palette:** `#192A48` (intellectual navy), `#F5F7FF` (soft periwinkle canvas), `#EF6A55` (applied coral accent), `#5F67B5` (indigo-slate)

---

## Complete Route Audit

| Screen | Route Path | Title (AR / EN) | Status | Key Interactive Features Verified |
| :--- | :--- | :--- | :--- | :--- |
| **01** | `/` | الرئيسية / Home | **DONE** | Applied tech hero, 4 career tracks overview, 4 featured curricula cards, test-drive interactive demo banner leading to Lesson 01, faculty preview cards, recent engineering articles, transparent non-accredited concept demo badge. |
| **02** | `/courses` | الدورات والمناهج / Courses | **DONE** | Interactive course catalog with multi-filter bar: Track filter (data, development, design, marketing), Level filter (beginner, intermediate), Duration filter (<8h, 8h+), live keyword search, matching counter, syllabus links, free preview links. |
| **03** | `/courses/[slug]` | تفاصيل المنهج / Course Syllabus | **DONE** | Course dossier with syllabus accordion tree showing modules, lessons, duration, free preview badge vs locked badge, learning outcomes checklist, prerequisites, simulated completion certificate note, instructor dossier card, tuition in EGP. |
| **04** | `/learn/[courseSlug]/[lessonSlug]` | مشغل الدرس التفاعلي / Lesson Player | **DONE** | Curriculum navigation chapter outline rail, simulated HD video player with audio-visual lecture substitute controls, 400+ words substantive technical transcript in AR & EN, real-world failure modes, applied lab directive checklist, "Mark Lesson Completed" button with instant local SQLite progress persistence (`demo_guest_progress`). |
| **05** | `/quiz/[lessonSlug]` | اختبار الدرس المقيم / Scored Quiz | **DONE** | 4-question technical competency quiz, radio selection, validation preventing submission when questions are unanswered, deterministic evaluation (3/4 = 75% score fixture), technical explanation per answer, retry button, score persistence in SQLite `demo_guest_progress`. |
| **06** | `/learning-paths` | المسارات المهنية / Learning Paths | **DONE** | 4 comprehensive career roadmaps with icons, descriptions, prerequisites, total hours, sequenced course progression stages, and direct track enrollment CTAs. |
| **07** | `/instructors` | هيئة التدريس / Instructors Directory | **DONE** | Directory of 8 seasoned practitioners and consultants across data, cloud, UX, and growth; years of experience, teaching philosophies, fictional profile transparency notice. |
| **08** | `/instructors/[slug]` | الملف التدريسي / Instructor Dossier | **DONE** | Full instructor profile, career background, pedagogy statement, list of curricula supervised with direct links to syllabi and preview lessons. |
| **09** | `/resources` | المصادر والمقالات / Resources | **DONE** | 6 technical articles with category filter tabs (Career Pathways, Design Systems, Software Engineering, Growth & Marketing, Product & Design, Pedagogy & Learning), live search bar, reading time indicators. |
| **10** | `/resources/[slug]` | تفاصيل المقال / Article Detail | **DONE** | Substantive 300+ words engineering essays across 3 structured sections with table of contents, takeaways, and related courses CTA. |
| **11** | `/enrollment-interest` | تسجيل الاهتمام بالالتحاق / Enrollment Interest | **DONE** | Intake form with course selection prefill, guest name, contact info, career goal, learning pace, notes; server validation rejecting invalid-choice (422) and empty fields, SQLite persistence as `flow_type = 'academy_interest'`, simulated confirmation receipt with reference code. |
| **12** | `/faq` | الأسئلة الشائعة / FAQ | **DONE** | 8 interactive accordion FAQs covering applied pedagogy vs passive tutorials, deterministic quiz scoring, non-accreditation disclaimer, prerequisites, refund/tuition transparency. |

---

## Database Integrity & Seeded Entities

- **demo_sites**: `site-academy` (published, theme: `#192A48`, `#F5F7FF`, `#EF6A55`, `#5F67B5`).
- **academy_courses**: 12 seeded courses across 4 tracks (`data`, `development`, `design`, `marketing`) with prices in EGP and durations in minutes.
- **academy_lessons**: 72 seeded lessons (6 per course) with module indices, durations, preview-enabled flags, and rich transcripts.
- **academy_quiz_questions**: 4 curated quiz questions for `lesson-01-01` with multiple choices, correct indices, and technical explanations supporting the deterministic 75% test fixture.
- **demo_guest_progress**: Relational SQLite table tracking `guest_token_hash`, `lesson_id`, `completed`, and `quiz_score`.
- **editorial_posts**: 6 rich technical articles with complete Arabic and English localized bodies (200+ words each).
- **demo_submissions**: Relational SQLite persistence supporting `academy_interest` flow with simulated receipts.

