import type { Locale } from '@/lib/i18n/config';
import { formaPhoto, type FormaPhoto } from './media';
export function PhotoCredit({photo,locale}:{photo:FormaPhoto;locale:Locale}){
 return <span className="text-xs leading-6 text-[#544D44]"><a href={photo.source} className="underline underline-offset-2">{photo.author}</a> · <a href={photo.licenseUrl} className="underline underline-offset-2">{photo.license}</a> · {locale==='ar'?'مرجع مستقل، اقتصاص للعرض':'Independent reference, display crop'}</span>;
}
export function MaterialSamples({locale}:{locale:Locale}){
 const ar=locale==='ar';
 return <div className="grid grid-cols-2 gap-4">{['walnut','marble'].map(id=>{const p=formaPhoto(id);return <figure key={id}><img src={p.url} alt={p[locale]} loading="lazy" className="w-full aspect-[4/3] object-cover bg-[#D8C9B6]"/><figcaption className="mt-3"><p className="forma-display text-lg font-semibold">{p[locale]}</p><PhotoCredit photo={p} locale={locale}/></figcaption></figure>})}<p className="col-span-2 text-xs leading-6 text-[#544D44]">{ar?'عينات بصرية للاستلهام فقط، وليست مواصفات توريد معتمدة.':'Visual inspiration only; not approved supplier specifications.'}</p></div>;
}
const plans:Record<string,string>={'l-shaped':'M40 40H260V76H76V184H40Z','u-shaped':'M40 40H280V184H244V76H76V184H40Z',galley:'M40 40H76V184H40ZM244 40H280V184H244Z',island:'M40 40H260V76H76V184H40ZM120 110H220V160H120Z',wardrobes:'M40 45H280V88H40ZM40 120H280V155H40Z',vanity:'M55 50H265V112H55Z',pantry:'M40 40H280V73H73V184H40ZM247 100H280V184H247Z',countertops:'M40 40H280V80H80V184H40Z',lighting:'M40 40H280V76H76V184H40Z'};
export function DesignSchematic({slug,locale}:{slug:string;locale:Locale}){
 const ar=locale==='ar';
 return <figure className="bg-[#E6D9C8] p-5 sm:p-8"><svg viewBox="0 0 320 220" className="w-full max-h-[320px]" role="img" aria-label={ar?'رسم تخطيطي استرشادي للتصميم':'Illustrative design schematic'}><rect x="24" y="24" width="272" height="175" fill="#F5F0E8" stroke="#292722" strokeWidth="2"/><path d={plans[slug]??plans['l-shaped']} fill="#9A4B32" stroke="#773623" strokeWidth="1.5"/>{slug==='vanity'&&<ellipse cx="160" cy="80" rx="24" ry="15" fill="#F5F0E8"/>}{slug==='lighting'&&[100,160,220].map(x=><circle key={x} cx={x} cy={120} r="7" fill="#F5F0E8" stroke="#843F2B" strokeWidth="2"/>)}<path d="M24 209H296M24 204V214M296 204V214" stroke="#292722"/></svg><figcaption className="text-xs leading-6 mt-3 text-[#544D44]">{ar?'دراسة تخطيطية توضيحية · ليست مخطط تنفيذ أو قياسات معتمدة':'Illustrative design study · not a certified drawing or measurement'}</figcaption></figure>;
}
