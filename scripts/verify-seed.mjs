import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('data/mavvix-demo.sqlite');
console.log('Courses count:', db.prepare("SELECT count(1) as c FROM academy_courses WHERE site_id='site-academy'").get().c);
console.log('Lessons count:', db.prepare("SELECT count(1) as c FROM academy_lessons").get().c);
console.log('Quiz questions count:', db.prepare("SELECT count(1) as c FROM academy_quiz_questions").get().c);
console.log('Quiz questions for lesson-01-01:', db.prepare("SELECT count(1) as c FROM academy_quiz_questions WHERE lesson_id='lesson-01-01'").get().c);
console.log('Articles count:', db.prepare("SELECT count(1) as c FROM editorial_posts WHERE site_id='site-academy'").get().c);
