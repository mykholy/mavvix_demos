import Link from 'next/link';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { lexoraPath } from '@/lib/verticals/law-firm/data';
import { Scale, ArrowUpRight, ShieldCheck, Landmark } from 'lucide-react';

export function generateMetadata({params:{locale}}:{params:{locale:Locale}}):Metadata{
 const ar=locale==='ar';
 const title=ar?'Lexora Counsel | تجربة موقع مكتب محاماة احترافي — مافكس':'Lexora Counsel — Bilingual Law Firm Website Experience by Mavvix';
 const description=ar?'تصور واجهة مكتب محاماة بمحتوى متخصص للخدمات القانونية ونموذج استفسار يحترم السرية، من تصميم مافكس. ليس مكتبًا مرخصًا ولا استشارة قانونية.':'An editorial bilingual law firm website concept by Mavvix: practice-area dossiers, privacy-first contact intake and original business-oriented legal education. No legal engagement.';
 return {title,description,robots:{index:false,follow:false},openGraph:{title,description,type:'website'}};
}
export default function LexoraLayout({children,params:{locale}}:{children:React.ReactNode;params:{locale:Locale}}){
 const ar=locale==='ar';
 const nav=[
  {href:lexoraPath(locale,'practices'),label:ar?'مجالات الممارسة':'Practice Areas'},
  {href:lexoraPath(locale,'industries'),label:ar?'قطاعات الأعمال':'Industries'},
  {href:lexoraPath(locale,'approach'),label:ar?'منهج العمل':'Our Approach'},
  {href:lexoraPath(locale,'insights'),label:ar?'المعرفة القانونية':'Insights'},
  {href:lexoraPath(locale,'confidentiality'),label:ar?'الخصوصية':'Confidentiality'},
  {href:lexoraPath(locale,'about'),label:ar?'عن التصور':'About'},
 ];
 return <div lang={locale} dir={ar?'rtl':'ltr'} className="lexora-shell min-h-screen bg-[#FAF7F1] text-[#251D34] selection:bg-[#B79B6A] selection:text-[#251D34]">
  <div className="bg-[#251D34] text-[#F8E6BE] text-[11px] text-center leading-6 py-2 px-4">
    {ar?'تصور تقني من مافكس لموقع محاماة — لا تمثيل قانوني أو مكتب مرخص أو موعد استشارة مؤكد':'Mavvix law-firm website concept — no licensed legal practice, attorney-client relationship or confirmed consultation'}
  </div>
  <header className="sticky top-0 z-40 bg-[#FAF7F1]/95 backdrop-blur-xl border-b border-[#E1D9CE]">
   <div className="max-w-7xl mx-auto px-4 sm:px-8 min-h-[82px] flex items-center justify-between gap-2">
    <Link href={lexoraPath(locale)} aria-label={ar?'الرئيسية':'Home'} className="flex items-center gap-2 sm:gap-4 min-w-0 shrink-0">
     <span className="w-9 h-9 sm:w-12 sm:h-12 border border-[#B79B6A] grid place-items-center text-[#735B2D]"><Scale size={23} strokeWidth={1.3}/></span>
     <span className="block"><b className="lexora-display text-xl sm:text-3xl block font-bold tracking-[.035em] leading-none">LEXORA<span className="text-[#84632A]">.</span></b>
       <small className="uppercase tracking-[.17em] text-[8px] sm:text-[10px] text-[#625467] mt-1 block">{ar?'تصور قانوني رقمي':'COUNSEL · CONSIDERED'}</small>
     </span>
    </Link>
    <nav className="hidden xl:flex items-center gap-5 text-xs font-bold text-[#4E405A]" aria-label={ar?'التنقل الرئيسي':'Main navigation'}>{nav.map(n=><Link className="hover:text-[#835F26]" key={n.href} href={n.href}>{n.label}</Link>)}</nav>
    <div className="flex items-center gap-2">
      <Link href={lexoraPath(locale,'consultation')} aria-label={ar?'طلب استفسار قانوني عام':'Request introductory legal enquiry'} className="flex gap-2 items-center rounded-sm bg-[#251D34] text-white h-11 px-3 sm:px-6 text-xs font-bold">
       <span className="hidden sm:inline">{ar?'طلب استفسار أولي':'Send an enquiry'}</span><ArrowUpRight size={17}/>
      </Link>
      <MobileSectorNav links={[...nav,{href:lexoraPath(locale,'consultation'),label:ar?'استفسار أولي':'Enquiry'}]}/>
    </div>
   </div>
  </header>
  <main>{children}</main>
  <footer className="bg-[#211A2E] text-[#F7F0E6] pt-20 pb-32 sm:pb-20">
   <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.1fr_.8fr_.9fr] gap-12 border-b border-[#66576E] pb-14">
    <div><Scale size={34} className="text-[#D1B781]" strokeWidth={1.3}/><h2 className="lexora-display text-4xl mt-5">Lexora Counsel.</h2>
      <p className="mt-6 text-sm leading-8 text-[#E1D5DC] max-w-sm">{ar?'Lexora Counsel هوية افتراضية لعرض ما يمكن أن تبنيه مافكس لمكتب محاماة حقيقي. لا يقدم الموقع رأيًا قانونيًا أو يقبل موكّلين ولا يعرض محامين أو قضايا فعلية.':'An editorial identity for what Mavvix could build for a real licensed law firm. This site offers no legal advice, attorney engagement, professional roster or case results.'}</p>
    </div>
    <div><h3 className="text-sm font-bold text-[#E8C991]">{ar?'استكشف':'Explore'}</h3><div className="flex flex-col gap-3 mt-6 text-sm text-[#E3D6DD]">{nav.slice(0,5).map(n=><Link key={n.href} href={n.href} className="hover:text-white">{n.label}</Link>)}</div></div>
    <div><h3 className="text-sm font-bold text-[#E8C991]">{ar?'موقع احترافي لمكتبك':'Build a website for your law firm'}</h3><p className="mt-6 text-sm leading-8 text-[#E1D5DC]">{ar?'مافكس تنفذ مواقع قانونية بهوية المكتب وخدماته الفعلية مع نظام استقبال آمن وموافقة على المحتوى.':'Mavvix can build a real firm site using verified practice claims, approved lawyer profiles and compliant intake processes.'}</p>
      <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 border-b border-[#E8C991] pb-1 font-bold text-sm">{ar?'تواصل مع مافكس':'Discuss a website'}<ArrowUpRight size={17}/></a>
    </div>
   </div>
   <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 text-xs text-[#BAABB9] flex flex-wrap items-center justify-between gap-4"><span>© Mavvix Software — Lexora Counsel concept</span><Link href={'/'+locale+'/showcase'}>{ar?'كل المواقع':'All sectors'}</Link></div>
  </footer>
  <ContactDock sector="law-firm" locale={locale}/>
 </div>;
}
