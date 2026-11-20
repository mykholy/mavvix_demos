'use client';

import React, { useState, useMemo } from 'react';
import { Locale } from '@/lib/i18n/config';
import { Search, ChevronDown, ChevronUp, AlertCircle, HelpCircle } from 'lucide-react';

interface FaqItem {
  id: string;
  category: string;
  q: string;
  a: string;
}

interface Props {
  locale: Locale;
}

export default function DentalFaqClient({ locale }: Props) {
  const isAr = locale === 'ar';

  const faqs: FaqItem[] = isAr
    ? [
        {
          id: 'faq-1',
          category: 'policies',
          q: 'هل أحتاج إلى تحويل طبي أو إشاعة سابقة قبل حضور الاستشارة؟',
          a: 'لا يتطلب حضورك أي إحالة مسبقة. في حال كانت لديك صور أشعة حديثة التقطت خلال الأشهر الستة الماضية يمكنك جلبها رقمياً لتجنب إعادة التصوير.'
        },
        {
          id: 'faq-2',
          category: 'comfort',
          q: 'أعاني من توتر شديد عند زيارة طبيب الأسنان، كيف تساعدني لومِن؟',
          a: 'صممنا بيئتنا خصيصاً للمراجعين الذين يعانون من القلق. نوفر غرفاً معزولة صوتياً، وإضاءة دافئة مريحة، ونمنحك تحكماً كاملاً بإيقاف الإجراء في أي لحظة بإشارة بسيطة.'
        },
        {
          id: 'faq-3',
          category: 'pediatric',
          q: 'في أي سن يُفضل البدء بزيارة طبيب أسنان الأطفال؟',
          a: 'توصي الأكاديميات الدولية ببدء الزيارة الاستكشافية الأولى عند ظهور السن اللبني الأول أو مع بلوغ الطفل عامه الأول، بهدف بناء علاقة ودية وإيجابية دون أي خوف.'
        },
        {
          id: 'faq-4',
          category: 'policies',
          q: 'كيف يتم التعامل مع سياسة إلغاء أو تعديل الموعد؟',
          a: 'نقدر التزامات مراجعينا ونطلب إشعارنا قبل الموعد بـ 24 ساعة على الأقل حتى نتمكن من إتاحة النافذة الزمنية لمراجع آخر.'
        },
        {
          id: 'faq-5',
          category: 'hygiene',
          q: 'ما هي معايير التعقيم المتبعة داخل استوديوهاتكم؟',
          a: 'نستخدم أجهزة تعقيم مستشفيات من فئة Class B بأحدث المعايير الرقمية، ونفتح أطقم الأدوات المعقمة ذات الاستخدام الواحد أمامك مباشرة داخل الغرفة.'
        },
        {
          id: 'faq-6',
          category: 'treatments',
          q: 'هل يتم البدء بالعلاج الفعلي في نفس جلسة الاستشارة الأولى؟',
          a: 'جلسة الاستشارة مخصصة للتقييم والشرح ومناقشة الخطة دون أي استعجال. في الحالات الطارئة فقط يمكن تقديم رعاية مسكنة فورية بموافقة المراجع.'
        },
        {
          id: 'faq-7',
          category: 'pricing',
          q: 'هل الرسوم المعلنة شاملة لجميع خطوات العلاج؟',
          a: 'نلتزم بالشفافية المطلقة؛ بعد الفحص المبدئي ستحصل على وثيقة تفصيلية توضح تكلفة كل إجراء بدقة قبل البدء بأي خطوة.'
        },
        {
          id: 'faq-8',
          category: 'treatments',
          q: 'هل يتوفر لديكم تصوير إشعاعي ثلاثي الأبعاد CBCT؟',
          a: 'نعم، يتوفر التصوير الإشعاعي ثلاثي الأبعاد منخفض الجرعة في فروعنا المركزية لدعم التشخيص الدقيق لجذور الأسنان والتقويم.'
        }
      ]
    : [
        {
          id: 'faq-1',
          category: 'policies',
          q: 'Do I need a referral or prior dental records to book a visit?',
          a: 'No prior referral is required. If you possess recent digital panoramic or bitewing radiographs taken within the past six months, you may bring them to avoid duplicate exposure.'
        },
        {
          id: 'faq-2',
          category: 'comfort',
          q: 'I experience high dental anxiety. How does Lumen accommodate this?',
          a: 'Our studios are purposely engineered for sensory ease: acoustic soundproofing, circadian lighting, and an agreed hand-signal protocol allowing you to pause treatment whenever you need.'
        },
        {
          id: 'faq-3',
          category: 'pediatric',
          q: 'At what age should children have their first dental visit?',
          a: 'We encourage an initial exploratory checkup upon the eruption of the first tooth or by their first birthday to foster positive, fearless familiarity with oral wellness.'
        },
        {
          id: 'faq-4',
          category: 'policies',
          q: 'What is your rescheduling and cancellation policy?',
          a: 'We kindly request at least 24 hours advance notice for rescheduling so we can reallocate your unhurried consultation window to other patients.'
        },
        {
          id: 'faq-5',
          category: 'hygiene',
          q: 'What sterilization protocols govern your instrument handling?',
          a: 'We adhere to medical hospital-grade Class B autoclaving with verified temperature log monitors. Sterile instrument packs are unsealed exclusively in your presence.'
        },
        {
          id: 'faq-6',
          category: 'treatments',
          q: 'Do you start clinical procedures on the very first visit?',
          a: 'Initial consultations are reserved for attentive listening, imaging, and care plan design. Urgent discomfort alleviation is provided immediately only upon joint consent.'
        },
        {
          id: 'faq-7',
          category: 'pricing',
          q: 'Are treatment estimates guaranteed without hidden extras?',
          a: 'Absolute financial transparency is our core policy. You receive a comprehensive, itemized written proposal prior to authorizing any clinical service.'
        },
        {
          id: 'faq-8',
          category: 'treatments',
          q: 'Is low-dose 3D Cone Beam (CBCT) imaging available on-site?',
          a: 'Yes, our central studios house low-radiation CBCT scanning for precise endodontic and orthodontic diagnostic evaluation.'
        }
      ];

  const categories = [
    { id: 'all', label: isAr ? 'جميع الأسئلة' : 'All Topics' },
    { id: 'comfort', label: isAr ? 'الراحة وتقليل القلق' : 'Calm & Anxiety' },
    { id: 'policies', label: isAr ? 'السياسات والمواعيد' : 'Policies & Visits' },
    { id: 'hygiene', label: isAr ? 'التعقيم والسلامة' : 'Sterilization & Safety' },
    { id: 'treatments', label: isAr ? 'العلاجات والإجراءات' : 'Treatments' },
    { id: 'pediatric', label: isAr ? 'أسنان الأطفال' : 'Pediatric Care' },
    { id: 'pricing', label: isAr ? 'الرسوم والشفافية' : 'Pricing & Fees' }
  ];

  const [activeCat, setActiveCat] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleFaq = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filtered = useMemo(() => {
    return faqs.filter(f => {
      const matchCat = activeCat === 'all' || f.category === activeCat;
      const q = search.trim().toLowerCase();
      const matchSearch = q === '' || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [faqs, activeCat, search]);

  return (
    <div className="space-y-8">
      {/* Category Filter & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E0EBE7] shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(c => {
            const isActive = activeCat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#193A39] text-[#EDF5F2]'
                    : 'bg-[#EDF5F2]/70 text-[#2C5251] hover:bg-[#EDF5F2]'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-[#557874] absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={isAr ? 'بحث في الأسئلة...' : 'Search questions...'}
            className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 text-xs rounded-xl bg-[#F8FBFA] border border-[#D5E3DE] text-[#193A39] focus:outline-none focus:ring-2 focus:ring-[#193A39]/20 focus:border-[#193A39]"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filtered.map(f => {
          const isOpen = openIds.includes(f.id);
          return (
            <div
              key={f.id}
              className="bg-white rounded-2xl border border-[#E0EBE7] overflow-hidden transition-all shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggleFaq(f.id)}
                className="w-full p-5 text-left rtl:text-right flex items-center justify-between gap-4 hover:bg-[#F8FBFA] transition-colors"
              >
                <span className="font-serif text-sm sm:text-base font-bold text-[#193A39] flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-[#2C5251] flex-shrink-0" />
                  <span>{f.q}</span>
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#2C5251] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#557874] flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-[#F0F5F3] text-xs sm:text-sm text-[#466662] leading-relaxed">
                  <p className="pl-7 rtl:pl-0 rtl:pr-7">{f.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

