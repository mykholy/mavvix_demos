import Link from 'next/link';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { ContactDock } from '@/components/shared/ContactDock';
import { MobileSectorNav } from '@/components/shared/MobileSectorNav';
import { bloomPath } from '@/lib/verticals/nursery/data';
import { Flower2,ArrowUpRight } from 'lucide-react';
export async function generateMetadata(props:{params: Promise<{locale:Locale}>}):Promise<Metadata> {
 const params = await props.params;

 const {
  locale
 } = params;

 const ar=locale==='ar';
 const title=ar?'تصميم موقع حضانة ورياض أطفال | BloomSteps من مافكس':'Nursery & Early Years Website Design | BloomSteps by Mavvix';
 const description=ar?'تجربة عربية وإنجليزية لبرامج الطفولة المبكرة والروتين اليومي والأمان وطلب زيارة محفوظ دون تسجيل فعلي.':'A bilingual early-years website with age groups, play-based learning, safeguarding guidance and a privacy-conscious visit enquiry.';
 return {title,description,openGraph:{title,description,type:'website'},robots:{index:false,follow:false}};
}
export default async function BloomLayout(props:{children:React.ReactNode;params: Promise<{locale:Locale}>}) {
 const params = await props.params;

 const {
  locale
 } = params;

 const {
  children
 } = props;

 const ar=locale==='ar';const nav=[
  {href:bloomPath(locale,'age-groups'),label:ar?'الفئات العمرية':'Age groups'},
  {href:bloomPath(locale,'curriculum'),label:ar?'التعلم باللعب':'Learning'},
  {href:bloomPath(locale,'daily-routine'),label:ar?'يومنا':'Daily rhythm'},
  {href:bloomPath(locale,'safety'),label:ar?'الأمان':'Safeguarding'},
  {href:bloomPath(locale,'gallery'),label:ar?'البيئة':'Gallery'},
  {href:bloomPath(locale,'admissions'),label:ar?'القبول والزيارة':'Admissions'}];
 return <div lang={locale} dir={ar?'rtl':'ltr'} className="bloom-shell min-h-screen bg-[#FFF9EE] text-[#145960] selection:bg-[#F5C04E] selection:text-[#145960]">
 <div className="bg-[#145960] text-white text-center text-xs px-4 py-2 leading-6">{ar?'تجربة تصميم موقع حضانة من مافكس · لا يوجد قبول أو موعد زيارة مؤكد':'A Mavvix nursery website concept · no confirmed enrollment or visit'}</div>
 <header className="sticky top-0 z-40 bg-[#FFF9EE]/95 border-b border-[#E2E5D5] backdrop-blur-lg">
 <div className="max-w-7xl mx-auto px-4 sm:px-8 min-h-[80px] flex justify-between items-center gap-3">
 <Link href={bloomPath(locale)} aria-label={ar?'الرئيسية':'Home'} className="flex items-center gap-2 min-w-0"><span className="rounded-[38%_62%_50%_50%] bg-[#F5C04E] grid place-items-center shrink-0 h-10 w-10"><Flower2 size={23}/></span><span className="min-w-0"><strong className="bloom-display text-xl sm:text-3xl block leading-none">BloomSteps<span className="text-[#A54F35]">.</span></strong><small className="text-[10px] tracking-wide block mt-1 font-bold">{ar?'كل خطوة اكتشاف':'little moments, big beginnings'}</small></span></Link>
 <nav className="hidden xl:flex items-center gap-5 font-bold text-xs" aria-label={ar?'القائمة الرئيسية':'Main navigation'}>{nav.slice(0,5).map(n=><Link key={n.href} href={n.href} className="hover:underline underline-offset-4">{n.label}</Link>)}</nav>
 <div className="flex items-center gap-2 shrink-0"><Link href={bloomPath(locale,'admissions')} aria-label={ar?'طلب زيارة':'Request a visit'} className="min-w-11 min-h-11 grid sm:flex items-center justify-center gap-2 bg-[#145960] text-white rounded-full px-3 sm:px-6 py-3 font-bold text-xs"><span className="hidden sm:inline">{ar?'خطط لزيارة':'Plan a visit'}</span><ArrowUpRight size={17}/></Link><MobileSectorNav links={nav}/></div>
 </div></header>
 <div>{children}</div>
 <footer className="bg-[#145960] text-[#FFF9EE] pt-16 pb-32 sm:pb-16"><div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-[1.2fr_1fr_1fr] gap-10">
 <div><Flower2 className="text-[#F5C04E]" size={35}/><p className="bloom-display mt-5 text-4xl">BloomSteps.</p><p className="mt-5 leading-8 text-sm max-w-md">{ar?'هوية توضيحية صممتها مافكس لموقع حضانة ورياض أطفال. الصور لخامات تعليمية من مصادر مستقلة، ولا تمثل حضانة أو أطفالًا تابعين لنا.':'An illustrative Mavvix early-years identity. Images show independent educational materials, not an operating nursery or its children.'}</p></div>
 <div><h2 className="text-[#F5C04E] font-bold text-sm mb-5">{ar?'استكشف':'Explore'}</h2><div className="grid gap-3 text-sm">{nav.map(n=><Link key={n.href} href={n.href} className="hover:underline">{n.label}</Link>)}</div></div>
 <div><h2 className="text-[#F5C04E] font-bold text-sm mb-5">{ar?'موقع لحضانتك':'Your own nursery website'}</h2><p className="text-sm leading-8">{ar?'تواصل مع مافكس لتطوير موقع ببيانات حضانتك المعتمدة وسياسات القبول الفعلية.':'Ask Mavvix about a real website with your approved nursery information and admissions policies.'}</p><a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} className="inline-flex gap-2 items-center font-bold mt-5 underline underline-offset-4">{ar?'تواصل مع مافكس':'Contact Mavvix'}<ArrowUpRight size={16}/></a><Link className="block mt-6 text-xs underline" href={'/'+locale+'/showcase'}>{ar?'معرض المواقع':'Industry showcase'}</Link></div></div></footer>
 <ContactDock sector="nursery" locale={locale}/>
 </div>;
}
