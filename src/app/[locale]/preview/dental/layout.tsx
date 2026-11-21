import { SectorUtilityBar } from '@/components/shared/SectorUtilityBar';
import { ContactDock } from '@/components/shared/ContactDock';
import React from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { Stethoscope, Calendar, MapPin, Phone, Shield, Clock, HelpCircle, HeartHandshake, Sparkles, ChevronRight, AlertTriangle } from 'lucide-react';

export default function DentalLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const isAr = locale === 'ar';

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF9] text-[#193A39] font-sans antialiased selection:bg-[#193A39] selection:text-white">
      <SectorUtilityBar sector="dental" locale={locale} />
      {/* Main Clinic Header */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E0EBE7] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href={`/${locale}/preview/dental`} className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#193A39] text-[#EDF5F2] flex items-center justify-center font-serif text-2xl font-bold tracking-tight shadow-sm group-hover:bg-[#2C5251] transition-colors">
              L
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#193A39] flex items-center gap-2">
                <span>{isAr ? 'لومِن' : 'LUMEN'}</span>
                <span className="text-xs font-sans font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#EDF5F2] text-[#2C5251] border border-[#CDE0D9]">
                  {isAr ? 'طب الأسنان' : 'DENTAL'}
                </span>
              </div>
              <p className="text-[11px] text-[#557874] tracking-normal font-sans">
                {isAr ? 'رعاية سنية متقدمة بأسلوب هادئ ومطمئن' : 'Calm, patient-first specialized care'}
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#2C5251]">
            <Link href={`/${locale}/preview/dental/services`} className="hover:text-[#193A39] transition-colors">
              {isAr ? 'الخدمات والعلاجات' : 'Treatments'}
            </Link>
            <Link href={`/${locale}/preview/dental/team`} className="hover:text-[#193A39] transition-colors">
              {isAr ? 'الأطباء المتخصصون' : 'Specialists'}
            </Link>
            <Link href={`/${locale}/preview/dental/patient-guide`} className="hover:text-[#193A39] transition-colors">
              {isAr ? 'دليل الزيارة' : 'Patient Guide'}
            </Link>
            <Link href={`/${locale}/preview/dental/locations`} className="hover:text-[#193A39] transition-colors">
              {isAr ? 'الفروع والمراكز' : 'Branches'}
            </Link>
            <Link href={`/${locale}/preview/dental/faq`} className="hover:text-[#193A39] transition-colors">
              {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
            </Link>
            <Link href={`/${locale}/preview/dental/contact`} className="hover:text-[#193A39] transition-colors">
              {isAr ? 'تواصل معنا' : 'Contact'}
            </Link>
          </nav>

          {/* CTA Action */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/preview/dental/request-appointment`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#193A39] hover:bg-[#234B49] text-white text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow"
            >
              <Calendar className="w-4 h-4 text-[#7AC7A5]" />
              <span>{isAr ? 'طلب استشارة' : 'Request Consultation'}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#122A29] text-[#EDF5F2] pt-16 pb-12 border-t border-[#1C3E3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#2C5251] text-[#EDF5F2] flex items-center justify-center font-serif text-xl font-bold">
                  L
                </div>
                <span className="font-serif text-xl font-bold text-white">
                  {isAr ? 'لومِن لطب الأسنان' : 'LUMEN DENTAL'}
                </span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {isAr
                  ? 'عيادة تخصصية تقدم رعاية سنية وقائية وترميمية قائمة على أحدث الممارسات الطبية والأجواء المهدئة للمراجعين.'
                  : 'Specialist dental center providing preventative, restorative, and family dental care in a reassuring, gentle environment.'}
              </p>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[11px] text-[#A6D4C3] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-[#E29D52] flex-shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'هذا موقع عرض تفاعلي صممته شركة مافيكس. جميع الأسماء والأطباء تمثيلية استعراضية.'
                    : 'Interactive commercial concept demo engineered by Mavvix. All clinician profiles and facilities are simulated.'}
                </span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A6D4C3] mb-4">
                {isAr ? 'استكشف العيادة' : 'Explore Clinic'}
              </h3>
              <ul className="space-y-2 text-xs text-white/80">
                <li><Link href={`/${locale}/preview/dental/services`} className="hover:text-white transition-colors">{isAr ? 'جميع الخدمات والعلاجات' : 'All Treatments'}</Link></li>
                <li><Link href={`/${locale}/preview/dental/team`} className="hover:text-white transition-colors">{isAr ? 'فريق الأطباء المتخصص' : 'Specialist Directory'}</Link></li>
                <li><Link href={`/${locale}/preview/dental/patient-guide`} className="hover:text-white transition-colors">{isAr ? 'دليل الاستعداد للزيارة الأولى' : 'First-Visit Guide'}</Link></li>
                <li><Link href={`/${locale}/preview/dental/locations`} className="hover:text-white transition-colors">{isAr ? 'فروعنا وساعات العمل' : 'Clinic Locations'}</Link></li>
                <li><Link href={`/${locale}/preview/dental/faq`} className="hover:text-white transition-colors">{isAr ? 'الأسئلة المتكررة' : 'Patient FAQ'}</Link></li>
              </ul>
            </div>

            {/* Col 3: Care Pathways */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A6D4C3] mb-4">
                {isAr ? 'مسارات الرعاية' : 'Care Pathways'}
              </h3>
              <ul className="space-y-2 text-xs text-white/80">
                <li><Link href={`/${locale}/preview/dental/services/service-01`} className="hover:text-white transition-colors">{isAr ? 'استشارة الفحص الشامل' : 'Comprehensive Dental Exam'}</Link></li>
                <li><Link href={`/${locale}/preview/dental/services/service-02`} className="hover:text-white transition-colors">{isAr ? 'تنظيف الأسنان الوقائي' : 'Preventative Hygiene'}</Link></li>
                <li><Link href={`/${locale}/preview/dental/services/kids-preventive`} className="hover:text-white transition-colors">{isAr ? 'طب أسنان الأطفال الودود' : 'Gentle Pediatric Care'}</Link></li>
                <li><Link href={`/${locale}/preview/dental/services/service-04`} className="hover:text-white transition-colors">{isAr ? 'ترميم الحشوات التجميلية' : 'Restorative Composite Care'}</Link></li>
                <li><Link href={`/${locale}/preview/dental/services/service-03`} className="hover:text-white transition-colors">{isAr ? 'تقويم وتناسق الابتسامة' : 'Orthodontic Evaluation'}</Link></li>
              </ul>
            </div>

            {/* Col 4: Commercial CTA */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A6D4C3] mb-4">
                {isAr ? 'هل تمتلك مركزاً طبياً؟' : 'Healthcare Provider?'}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                {isAr
                  ? 'تقدم مافيكس منظومات مواقع رقمية فاخرة متوافقة مع خصوصية المريض وتزيد ثقة المراجعين وحجوزات الاستشارة.'
                  : 'Mavvix builds bespoke, privacy-compliant digital clinic platforms that earn patient trust and drive real consultations.'}
              </p>
              <a
                href={process.env.NEXT_PUBLIC_MAVVIX_SALES_URL || 'https://mavvix.com/contact'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2C5251] hover:bg-[#3D6967] text-white text-xs font-medium transition-colors"
              >
                <span>{isAr ? 'اطلب موقعاً لعيادتك من مافيكس' : 'Commission a Dental Platform'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <p>
              © {new Date().getFullYear()} Lumen Dental Studio. Fictional Showcase Website. Built with Next.js & SQLite.
            </p>
            <div className="flex items-center gap-6">
              <Link href={`/${locale}/preview/dental/patient-guide`} className="hover:text-white transition-colors">
                {isAr ? 'سياسة الخصوصية التوضيحية' : 'Sample Privacy Policy'}
              </Link>
              <Link href={`/${locale}/showcase`} className="text-[#7AC7A5] hover:underline">
                {isAr ? 'معرض مافيكس للنماذج' : 'Mavvix Showcase'}
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <div className="h-20 md:hidden" aria-hidden="true" />
      <ContactDock locale={locale} sector="dental" />
    </div>
  );
}

