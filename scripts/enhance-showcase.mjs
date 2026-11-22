import fs from 'node:fs';

const file = 'src/app/[locale]/showcase/page.tsx';
let s = fs.readFileSync(file, 'utf8');

// 1. Add ContactDock import
if (!s.includes("import { ContactDock }")) {
  s = s.replace(
    "import { MavvixFooter } from '@/components/shared/MavvixFooter';",
    "import { MavvixFooter } from '@/components/shared/MavvixFooter';\nimport { ContactDock } from '@/components/shared/ContactDock';"
  );
}

// 2. Add announcement bar above header
const oldHeader = '<MavvixHeader locale={locale} />';
const newHeader = `{/* Commercial Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            {isAr ? 'عرض خاص' : 'Special Offer'}
          </span>
          <span>
            {isAr
              ? 'احصل على موقع رقمي متكامل لشركتك خلال 48 ساعة بواسطة Mavvix — جاهز للمبيعات والحملات الإعلانية'
              : 'Get a production-grade commercial platform for your business in 48 hours by Mavvix — ad campaign ready'}
          </span>
          <a
            href="https://wa.me/201017799042?text=%D8%A3%D9%87%D9%84%D9%8B%D8%A7%20%D9%85%D8%A7%D9%81%D9%83%D8%B3%D8%8C%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B7%D9%84%D8%A8%20%D9%85%D9%88%D9%82%D8%B9%20%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%20%D9%84%D8%B4%D8%B1%D9%83%D8%AA%D9%8A%20%D8%AE%D9%84%D8%A7%D9%84%2048%20%D8%B3%D8%A7%D8%B9%D8%A9"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-cyan-200 font-bold ml-1"
          >
            {isAr ? 'تواصل معنا الآن ←' : 'Contact Us Now →'}
          </a>
        </div>
      </div>
      <MavvixHeader locale={locale} />`;

if (s.includes(oldHeader)) {
  s = s.replace(oldHeader, newHeader);
}

// 3. Add CTA buttons below hero text
const oldHeroMeta = '<div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm">';
const newHeroMeta = `<div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6">
            <a
              href="https://wa.me/201017799042?text=%D8%A3%D9%87%D9%84%D9%8B%D8%A7%20%D9%85%D8%A7%D9%81%D9%83%D8%B3%D8%8C%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B7%D9%84%D8%A8%20%D9%85%D9%88%D9%82%D8%B9%20%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A%20%D9%84%D8%B4%D8%B1%D9%83%D8%AA%D9%8A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/20 active:scale-95"
            >
              <span>{isAr ? 'اطلب موقعك الآن على واتساب' : 'Order via WhatsApp'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-3 rounded-xl text-sm border border-slate-700 transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{isAr ? 'لوحة التحكم التجريبية' : 'Admin Demo Studio'}</span>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm">`;

if (s.includes(oldHeroMeta)) {
  s = s.replace(oldHeroMeta, newHeroMeta);
}

// 4. Add ContactDock above footer
const oldFooter = '<MavvixFooter locale={locale} />';
const newFooter = `<ContactDock locale={locale} sector="construction" />
      <MavvixFooter locale={locale} />`;

if (s.includes(oldFooter)) {
  s = s.replace(oldFooter, newFooter);
}

fs.writeFileSync(file, s, 'utf8');
console.log('Successfully enhanced showcase/page.tsx');

