'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  id: string;
  category: string;
  question: { ar: string; en: string };
  answer: { ar: string; en: string };
}

interface Props {
  locale: 'ar' | 'en';
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'Curriculum & Pedagogy',
    question: {
      ar: 'ما الذي يميز مناهج أكاديمية نوفا عن منصات الفيديو التعليمية الشائعة؟',
      en: 'How does Nova Learning differ from common passive video platforms?'
    },
    answer: {
      ar: 'تركز أكاديمية نوفا على التعلم التطبيقي المعياري؛ حيث يطلب من المتعلم حل تمارين واختبارات معمارية وتصحيح أخطاء تشغيلية حقيقية بدلاً من مجرد المشاهدة السلبية. الهدف هو صقل العقلية الهندسية المستقلة القادرة على التعامل مع بيئات الإنتاج الحقيقية.',
      en: 'Nova Learning emphasizes applied architectural labs. Rather than passive video watching, learners debug real runtime errors, navigate boundary invariants, and build capstones evaluated against production standards.'
    }
  },
  {
    id: 'faq-02',
    category: 'Assessment & Quizzes',
    question: {
      ar: 'كيف يتم تقييم الاختبارات، وهل يتم حفظ درجاتي وتقدمي؟',
      en: 'How are quizzes scored, and is my progress saved?'
    },
    answer: {
      ar: 'التقييم في كافة اختباراتنا فوري ومحدد رياضيًا بناءً على معايير دقيقة. عند إنهاء الاختبار أو إتمام الدرس، يُحفظ تقدمك محليًا في قاعدة بيانات SQLite عبر جلسة المتصفح الخاصة بك دون الحاجة لإنشاء حساب معقد.',
      en: 'All quiz assessments feature deterministic instant scoring. Progress is saved directly into local SQLite database records via your browser session without mandatory signup friction.'
    }
  },
  {
    id: 'faq-03',
    category: 'Accreditation & Certificates',
    question: {
      ar: 'هل شهادات أكاديمية نوفا معتمدة من جهات حكومية أو جامعية رسمية؟',
      en: 'Are Nova Learning certificates accredited by universities or state bodies?'
    },
    answer: {
      ar: 'كلا، نحن نؤمن بالشفافية المطلقة: أكاديمية نوفا هي نموذج تجريبي متكامل طوّرته Mavvix لعرض نظم التعليم الحديثة. الشهادات الممنوحة هي شهادات إتمام تجريبية غير معتمدة رسميًا، وقيمتها الحقيقية تكمن في محفظة المشاريع والرموز البرمجية التي تبنيها بنفسك.',
      en: 'No. In full transparency, Nova Learning is an applied concept website engineered by Mavvix. All certificates are simulated completions and non-accredited. Real industry value resides in the verifiable code repositories you build.'
    }
  },
  {
    id: 'faq-04',
    category: 'Prerequisites & Preparation',
    question: {
      ar: 'ما هي المتطلبات السابقة للبدء في مسار علم البيانات وهندسة الأنظمة؟',
      en: 'What are the prerequisites for Data Science and Cloud Systems?'
    },
    answer: {
      ar: 'نوصي بوجود معرفة مبدئية بأساسيات البرمجة والتفكير المنطقي أو الرياضي. كل منهج مصنف بوضوح حسب المستوى (مبتدئ أو متوسط) ومزود بدرس تجريبي مجاني لتتمكن من تقييم مدى ملاءمته لك قبل التسجيل.',
      en: 'We recommend baseline familiarization with algorithmic logic and elementary programming. Each curriculum is labeled (Beginner or Intermediate) and includes a free preview lesson so you can gauge readiness.'
    }
  },
  {
    id: 'faq-05',
    category: 'Enrollment & Fees',
    question: {
      ar: 'هل يتم تحصيل أي مبالغ مالية حقيقية عند تسجيل الاهتمام؟',
      en: 'Are real payments collected when submitting enrollment interest?'
    },
    answer: {
      ar: 'لا يتم تحصيل أي أموال حقيقية على الإطلاق. نموذج تسجيل الاهتمام هو محاكاة برمجية متكاملة تصدر إيصالاً برقم مرجعي ويُخزن في قاعدة بيانات الموقع لغرض التجربة واستكشاف النظام.',
      en: 'Zero real payments are processed. The enrollment interest form is an authentic simulation storing records with reference numbers to showcase full-stack user journeys.'
    }
  },
  {
    id: 'faq-06',
    category: 'Instructors & Mentorship',
    question: {
      ar: 'من هم أعضاء هيئة التدريس، وكيف يتم التفاعل معهم؟',
      en: 'Who are the instructors, and how does mentorship work?'
    },
    answer: {
      ar: 'هيئة التدريس تتألف من شخصيات استشارية وخبرات مهنية تحاكي قادة الفرق الهندسية ومصممي النظم في كبرى الشركات التقنية. يقدم كل محاضر فلسفة واضحة تركز على التطبيق الميداني والتدريب الصارم.',
      en: 'Faculty personas simulate principal architects and growth leads from enterprise backgrounds, offering actionable pedagogical frameworks anchored in production realities.'
    }
  },
  {
    id: 'faq-07',
    category: 'Curriculum & Pedagogy',
    question: {
      ar: 'كم من الوقت يستغرق إكمال المنهج الدراسي النموذجي؟',
      en: 'How much time is required to complete a typical curriculum?'
    },
    answer: {
      ar: 'تتراوح المناهج بين ٤ إلى ٨ ساعات من المحتوى المكثف، وتتطلب في المتوسط ما بين أسبوعين إلى أربعة أسابيع من التطبيق العملي وبناء مشاريع التخرج بالوتيرة المرنة.',
      en: 'Curricula span 4 to 8 hours of concentrated guidance, typically translating to 2 to 4 weeks of hands-on project building under a flexible part-time pace.'
    }
  },
  {
    id: 'faq-08',
    category: 'Assessment & Quizzes',
    question: {
      ar: 'ماذا يحدث إذا لم أحقق درجة النجاح (٧٥٪) في الاختبار المقيم؟',
      en: 'What happens if I score below the 75% threshold on a quiz?'
    },
    answer: {
      ar: 'يعرض النظام فورًا تفسيرًا علميًا وهندسيًا لكل سؤال مع توضيح سبب صحة أو خطأ كل خيار، كما يتاح لك إعادة الاختبار فورًا لتثبيت الفهم وسد الثغرات المعرفية.',
      en: 'The engine immediately displays technical rationales for each option, allowing you to review misconceptions and retake the assessment immediately to reinforce mastery.'
    }
  }
];

export function AcademyFaqClient({ locale }: Props) {
  const isAr = locale === 'ar';
  const [activeId, setActiveId] = useState<string | null>('faq-01');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Curriculum & Pedagogy', 'Assessment & Quizzes', 'Accreditation & Certificates', 'Enrollment & Fees'];

  const filteredFaqs = FAQ_DATA.filter(faq => {
    if (selectedCategory !== 'all' && faq.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const questionText = (isAr ? faq.question.ar : faq.question.en).toLowerCase();
      const answerText = (isAr ? faq.answer.ar : faq.answer.en).toLowerCase();
      if (!questionText.includes(q) && !answerText.includes(q)) {
        return false;
      }
    }
    return true;
  });

  const toggleAccordion = (id: string) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 border border-[#192A48]/10 shadow-sm space-y-4">
        <div>
          <label htmlFor="faq-search" className="block text-xs font-semibold text-[#192A48]/70 mb-2">
            {isAr ? 'البحث في الأسئلة والمعايير:' : 'Search FAQs & Policies:'}
          </label>
          <input
            id="faq-search"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'مثال: الاعتماد، حفظ التقدم، مدة المنهج...' : 'e.g., accreditation, progress saving, duration...'}
            className="w-full px-4 py-3 rounded-xl border border-[#192A48]/20 focus:outline-none focus:ring-2 focus:ring-[#5F67B5] text-sm text-[#192A48]"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#192A48]/10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#192A48] text-white shadow-sm'
                  : 'bg-[#F5F7FF] text-[#192A48] hover:bg-[#192A48]/10'
              }`}
            >
              {cat === 'all' ? (isAr ? 'كافة المواضيع' : 'All Categories') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map(faq => {
          const isOpen = activeId === faq.id;
          const question = isAr ? faq.question.ar : faq.question.en;
          const answer = isAr ? faq.answer.ar : faq.answer.en;

          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-[#192A48]/10 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full p-6 text-start flex items-center justify-between gap-4 hover:bg-[#F5F7FF]/50 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-[#EF6A55] uppercase tracking-wider block">
                    {faq.category}
                  </span>
                  <span className="font-serif text-base sm:text-lg font-bold text-[#192A48]">
                    {question}
                  </span>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#F5F7FF] text-[#192A48] flex items-center justify-center text-sm font-bold shrink-0">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#192A48]/80 leading-relaxed border-t border-[#192A48]/5">
                  <p>{answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Action Footer */}
      <div className="p-8 rounded-3xl bg-[#F5F7FF] border border-[#192A48]/10 text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#192A48]">
          {isAr ? 'هل لديك استفسار إضافي لم تجده هنا؟' : 'Have a Question Not Listed Here?'}
        </h3>
        <p className="text-xs sm:text-sm text-[#192A48]/70 max-w-md mx-auto">
          {isAr
            ? 'سجل اهتمامك بالالتحاق أو تواصل مع فريق التوجيه الأكاديمي للاستفسار عن المسارات والمناهج.'
            : 'Submit an enrollment inquiry or connect with our academic counseling simulation for guidance.'}
        </p>
        <Link
          href={`/${locale}/preview/academy/enrollment-interest`}
          className="inline-block px-6 py-3 rounded-xl bg-[#192A48] text-white hover:bg-[#5F67B5] text-xs font-semibold transition-colors shadow-sm"
        >
          {isAr ? 'تسجيل استفسار أكاديمي' : 'Submit Academic Inquiry'}
        </Link>
      </div>
    </div>
  );
}

