import Link from 'next/link';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { pawPath } from '@/lib/verticals/veterinary/data';
import { PawPrint, ArrowUpRight, Heart, ShieldCheck } from 'lucide-react';

export async function generateMetadata(props:{params: Promise<{locale:Locale}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';const title=ar?'PawWell — تجربة موقع عيادة بيطرية | Mavvix':'PawWell — Veterinary Clinic Website Experience | Mavvix';
 const description=ar?'تجربة موقع بيطري متخصصة للكلاب والقطط ورعاية الحيوانات الأليفة، مع ملفات خدمات وطلب زيارة محفوظ غير مؤكد. تصميم مافكس.':'Premium veterinary website concept by Mavvix: pet-first service guides, preventive care and a saved, nonconfirmed visit enquiry.';
 return {title,description,robots:{index:false,follow:false},openGraph:{title,description,type:'website'}};
}
export default async function PawLayout(props:{children:React.ReactNode;params: Promise<{locale:Locale}>}) {
 const params = await props.params;

 const {
  locale
 } = params;

 const {
  children
 } = props;

 const ar=locale==='ar';const nav=[
   {href:pawPath(locale,'pets'),label:ar?'دليل الحيوانات':'Pet families'},
   {href:pawPath(locale,'services'),label:ar?'الرعاية والخدمات':'Services'},
   {href:pawPath(locale,'prevention'),label:ar?'الوقاية':'Prevention'},
   {href:pawPath(locale,'team'),label:ar?'التخصصات':'Specialities'},
   {href:pawPath(locale,'guides'),label:ar?'مكتبة المالك':'Pet-care journal'},
   {href:pawPath(locale,'process'),label:ar?'رحلة الزيارة':'Visit process'},
  ];
 return <div lang={locale} dir={ar?'rtl':'ltr'} className="pawwell-shell min-h-screen bg-[#FBF9F3] text-[#24463D] selection:bg-[#F3B98E]">
  <div className="bg-[#24463D] text-[#FFF6EA] text-[11px] leading-6 px-5 py-2 text-center">
   {ar?'PawWell تصور موقع بيطري من مافكس، وليس عيادة شغالة أو خط طوارئ أو حجز مؤكد':'PawWell is a Mavvix veterinary website concept, not a real hospital, emergency line or confirmed booking'}
  </div>
  <header className="sticky z-40 top-0 bg-[#FFFEFA]/95 border-b border-[#DCE5D8] backdrop-blur-lg">
   <div className="max-w-7xl mx-auto px-4 sm:px-8 min-h-[77px] flex items-center justify-between gap-3">
    <Link href={pawPath(locale)} className="min-w-0 flex items-center gap-2 sm:gap-3 shrink-0" aria-label={ar?'PawWell الرئيسية':'PawWell home'}>
     <span className="h-10 w-10 sm:w-12 sm:h-12 rounded-[1.2rem] bg-[#F3B98E] grid place-items-center text-[#24463D] shrink-0"><PawPrint size={24}/></span>
     <span className="block"><b className="paw-display text-[22px] sm:text-3xl font-black tracking-tight leading-none block">pawwell<span className="text-[#B56A43]">.</span></b>
      <span className="text-[9px] tracking-[.14em] uppercase mt-1 block text-[#557269]">CARE BEGINS WITH KNOWING</span></span>
    </Link>
    <nav aria-label={ar?'روابط PawWell':'PawWell navigation'} className="hidden xl:flex items-center gap-5 text-xs font-bold text-[#416056]">{nav.map(n=><Link key={n.href} href={n.href} className="hover:text-[#96502E]">{n.label}</Link>)}</nav>
    <div className="flex gap-2 items-center shrink-0">
     <Link href={pawPath(locale,'request')} className="rounded-full min-w-11 min-h-11 px-3 sm:px-6 py-3 inline-flex items-center justify-center bg-[#24463D] text-white text-xs font-extrabold hover:bg-[#31594B]" aria-label={ar?'طلب زيارة بيطرية غير مؤكدة':'Request a nonconfirmed veterinary visit'}>
      <PawPrint size={17} className="sm:hidden"/><span className="hidden sm:inline">{ar?'طلب زيارة':'Request visit'}</span>
     </Link>
     <MobileSectorNav links={[...nav,{href:pawPath(locale,'request'),label:ar?'طلب زيارة':'Visit enquiry'}]}/>
    </div>
   </div>
  </header>
  <main>{children}</main>
  <footer className="bg-[#24463D] text-[#FDF6EC] py-16 pb-32 sm:pb-16">
   <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.2fr_.8fr_.8fr] gap-11">
    <div><PawPrint size={35} className="text-[#F3B98E]"/><h2 className="paw-display text-4xl mt-5 font-black">pawwell.</h2><p className="max-w-sm mt-5 text-sm leading-8 text-[#DEE8DD]">{ar?'هوية تجريبية لرعاية الحيوانات الأليفة من تصميم مافكس. لا توجد عيادات أو أطباء أو مواعيد أو نتائج علاجية حقيقية باسم PawWell.':'A pet-care editorial concept from Mavvix, not a real clinic, team, medical service or treatment history.'}</p></div>
    <div><h3 className="font-extrabold text-[#F3B98E] text-sm">{ar?'استكشف':'Explore'}</h3><div className="mt-5 flex flex-col gap-3 text-sm text-[#ECF1E9]">{nav.slice(0,5).map(n=><Link href={n.href} key={n.href} className="hover:underline">{n.label}</Link>)}</div></div>
    <div><h3 className="font-extrabold text-[#F3B98E] text-sm">{ar?'موقع لعيادتك الحقيقية':'For your real veterinary business'}</h3>
     <p className="text-sm mt-5 leading-8 text-[#DEE8DD]">{ar?'مافكس تنفذ موقعًا باسم عيادتك وخدماتك وفريقك المعتمد وربطًا تشغيليًا عندما يتوفر.':'Mavvix can build a custom bilingual site around your approved practitioners, services, photography and actual scheduling integrations.'}</p>
     <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} rel="noopener noreferrer" target="_blank" className="inline-flex gap-2 items-center underline underline-offset-4 text-sm mt-6 font-bold">{ar?'اطلب موقع من مافكس':'Contact Mavvix'}<ArrowUpRight size={17}/></a>
    </div>
   </div>
   <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12 border-t border-[#71877A] pt-5 flex flex-wrap justify-between text-xs text-[#CEE0D1] gap-3"><span>© Mavvix Software — PawWell editorial concept</span><Link href={'/'+locale+'/showcase'}>{ar?'معرض مواقع مافكس':'Mavvix website showcase'}</Link></div>
  </footer>
  <ContactDock sector="veterinary" locale={locale}/>
 </div>;
}
