import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { ARENA,arenaPath } from '@/lib/verticals/sports-venues/data';
import { ArenaRequestForm } from './ArenaRequestForm';
import { ShieldCheck,CalendarClock,Users,Trophy } from 'lucide-react';

export default function ArenaBookingPage({params:{locale},searchParams}:{params:{locale:Locale};searchParams:{court?:string}}){
 const ar=locale==='ar';
 const selected=ARENA.services.some(s=>s.slug===searchParams.court)?searchParams.court:'';
 return <div className="bg-[#E8F0E6]"><div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-24 grid lg:grid-cols-[.7fr_1.1fr] gap-12 items-start">
  <div className="lg:sticky lg:top-32"><p className="font-mono text-xs font-black tracking-widest text-[#315B43]">ARENA / COURT REQUEST</p><h1 className="arena-display text-4xl sm:text-6xl mt-6 leading-tight font-black">{ar?'جهز طلب الملعب قبل أول صفارة':'PREPARE YOUR GAME. KEEP THE REQUEST HONEST.'}</h1>
   <p className="mt-7 text-[#385C48] leading-9">{ar?'اطلب صيغة كرة أو بادل مناسبة للفريق، ثم يومًا وساعة تفضلهم. الأوقات ليست خانات متاحة، ولا تمثل ملعبًا موجودًا أو حجزًا مؤكدًا.':'Use this structured sports-venue form to select a play format, duration and preferred time. There is no real court availability, payment or booking confirmation.'}</p>
   <div className="mt-9 space-y-5 border-t border-[#B5CCB9] pt-8">{[[Users,ar?'العدد حسب صيغة اللعب':'Team size matched to sport format'],[CalendarClock,ar?'الوقت تفضيل وليس تأكيدًا':'Time preference, not inventory'],[ShieldCheck,ar?'لا بطاقات دفع أو معلومات حساسة':'No payment cards or sensitive data']].map(([Icon,title],i)=><div key={i} className="flex items-start gap-3 text-sm font-bold text-[#31563F]">{typeof Icon!=='string'&&<Icon size={20} className="shrink-0"/>}{title as string}</div>)}</div>
   <Link href={arenaPath(locale,'courts')} className="inline-flex mt-9 text-sm font-black underline underline-offset-8">{ar?'راجع أنواع اللعب أولًا':'Explore formats before choosing'}</Link>
  </div>
  <ArenaRequestForm locale={locale} initialCourt={selected}/>
 </div></div>;
}
