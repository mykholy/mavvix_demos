'use client';
import { useMemo,useRef,useState } from 'react';
import { OAKLINE,oakText } from '@/lib/verticals/furniture/data';
import type { Locale } from '@/lib/i18n/config';
import { Armchair,CheckCircle2,ArrowUpRight,Plus,Trash2,AlertTriangle,ClipboardList,Ruler,Layers } from 'lucide-react';

type Product=typeof OAKLINE.services[number];
type Item={serviceSlug:string;room:'living'|'bedroom'|'dining'|'workspace';material:'oak'|'walnut'|'engineered'|'linen'|'velvet'|'boucle';finish:'natural'|'sand'|'smoked'|'walnut'|'charcoal';widthMm:number;depthMm:number;heightMm:number;quantity:number;};
function midpoint(b:number[]){return Math.round((b[0]+b[1])/2/10)*10;}
function proposed(p:Product):Item{return {serviceSlug:p.slug,room:p.room as Item['room'],
 material:p.materials[0] as Item['material'],finish:p.finishes[0] as Item['finish'],
 widthMm:midpoint(p.minMax.width),depthMm:midpoint(p.minMax.depth),heightMm:midpoint(p.minMax.height),quantity:1};}
export function OaklineQuoteBuilder({locale,initialProduct=''}:{locale:Locale;initialProduct?:string}){
 const ar=locale==='ar';
 const initial=OAKLINE.services.find(p=>p.slug===initialProduct)||OAKLINE.services[0];
 const [productSlug,setProductSlug]=useState(initial.slug);
 const product=useMemo(()=>OAKLINE.services.find(p=>p.slug===productSlug)||OAKLINE.services[0],[productSlug]);
 const [draft,setDraft]=useState<Item>(proposed(initial));
 const [items,setItems]=useState<Item[]>([]);
 const [deliveryZone,setDeliveryZone]=useState('Cairo'),[designStage,setDesignStage]=useState('exploring');
 const [name,setName]=useState(''),[phone,setPhone]=useState(''),[consent,setConsent]=useState(false);
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[ref,setRef]=useState('');
 const id=useRef<string|null>(null);
 const fmt=(n:number)=>new Intl.NumberFormat(ar?'ar-EG':'en-US').format(n);
 const field='block font-bold text-xs text-[#4D3C2B]';
 const input='w-full mt-2 min-h-12 border border-[#BFB19D] bg-[#FFFEFA] text-[#34281E] px-4 py-3 text-sm rounded-md focus-visible:outline-[#806443]';
 function selectProduct(slug:string){
  const next=OAKLINE.services.find(p=>p.slug===slug);if(!next)return;
  setProductSlug(next.slug);setDraft(proposed(next));setError('');
 }
 function addItem(){
  if(items.some(x=>x.serviceSlug===draft.serviceSlug)){setError(ar?'القطعة موجودة بالفعل؛ احذفها لو عايز تغير المقاسات.':'This piece is already listed; remove it before changing its dimensions.');return;}
  if(items.length>=6){setError(ar?'الحد الأقصى 6 قطع لكل طلب.':'A quote brief supports up to six distinct pieces.');return;}
  const ranges=product.minMax;
  for(const axis of ['width','depth','height'] as const){
   const n=draft[axis+'Mm' as keyof Item] as number;
   if(!Number.isInteger(n)||n<ranges[axis][0]||n>ranges[axis][1]){setError(ar?'المقاس خارج نطاق التوضيح للقطعة.':'Dimensions are outside the suggested specification range.');return;}
  }
  setItems(x=>[...x,draft]);setError('');
 }
 function updateDimension(key:'widthMm'|'depthMm'|'heightMm',value:string){setDraft(x=>({...x,[key]:Number(value)}));}
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(busy||ref)return;
  if(!items.length){setError(ar?'أضف قطعة واحدة على الأقل إلى طلب التسعير.':'Add at least one furniture piece before submitting.');return;}
  setBusy(true);setError('');
  try {
   if(!id.current)id.current=crypto.randomUUID();
   const query=new URLSearchParams(window.location.search);
   const response=await fetch('/api/portfolio/furniture',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    flowType:'furniture_custom_quote_request',clientRequestId:id.current,items,deliveryZone,designStage,
    guestName:name,guestPhone:phone,consent,honeypot:'',
    utm:{source:query.get('utm_source')||'',medium:query.get('utm_medium')||'',campaign:query.get('utm_campaign')||''}
   })});
   const body=await response.json();
   if(!response.ok||!body.success)throw Error(body.code||'REQUEST_NOT_SAVED');
   setRef(String(body.refNumber));
  } catch {setError(ar?'مش قادرين نحفظ الطلب. راجع المقاسات والاختيارات وحاول من جديد.':'Your brief could not be saved. Review dimensions and selections and retry.');}
  finally{setBusy(false);}
 }
 if(ref)return <section role="status" aria-live="polite" className="bg-[#FFFDF7] border-2 border-[#977A5B] p-8 sm:p-12 shadow-xl text-center">
  <CheckCircle2 size={52} className="mx-auto text-[#567249]"/><h2 className="oakline-display text-3xl sm:text-4xl mt-6">{ar?'اتسجل طلب التصميم التوضيحي':'Your furniture brief is saved'}</h2>
  <p className="text-sm leading-9 mt-6 text-[#675342]">{ar?'تم حفظ المقاسات والخامات المقترحة في تجربة مافكس. لا يوجد تصنيع أو سعر أو موعد توريد مؤكد.':'Your selections were saved in this Mavvix portfolio experience. No product inventory, fabrication, price or delivery is confirmed.'}</p>
  <p className="mt-8 bg-[#EDE1D1] px-5 py-5 font-mono font-black text-lg">{ref}</p>
  <a href={ar?'https://mavvix.com/ar/contact':'https://mavvix.com/en/contact'} target="_blank" rel="noopener noreferrer" className="bg-[#392C24] text-white rounded-full px-7 py-4 mt-8 inline-flex gap-3 items-center text-sm font-bold">{ar?'نفذ موقع مشابه لمعرضك':'Build your own furniture website'}<ArrowUpRight size={17}/></a>
 </section>;
 return <form onSubmit={submit} className="bg-[#FFFDF7] border border-[#CABBAD] shadow-[0_28px_90px_rgba(57,44,36,.08)]">
  <div className="bg-[#392C24] text-[#F8F0E2] p-7 sm:p-9"><p className="text-xs text-[#E2BE93] tracking-[.2em] font-bold">OAKLINE / MATERIAL & DIMENSION BRIEF</p>
   <h2 className="oakline-display text-3xl sm:text-4xl mt-5">{ar?'اختار القطعة واضبط فكرتك':'Build a considered furniture specification'}</h2>
   <p className="mt-4 text-sm text-[#E7D9C7] leading-8">{ar?'تجربة لاختيار مقاسات وخامات مبدئية وتجميع عدة قطع في طلب واحد، وليست متجرًا مباشرًا أو عرض سعر نهائيًا.':'Choose example materials, finish and dimensions, then combine distinct pieces in one nonbinding quotation enquiry.'}</p>
  </div>
  <div className="p-6 sm:p-9 space-y-8">
   <fieldset><legend className={field}>{ar?'01 / نوع القطعة':'01 / Furniture piece'}</legend>
    <div className="grid sm:grid-cols-2 gap-3 mt-4 max-h-[330px] overflow-y-auto">{OAKLINE.services.map(p=><button key={p.slug} type="button" aria-pressed={productSlug===p.slug} onClick={()=>selectProduct(p.slug)} className={'text-start min-h-[75px] p-4 border '+(productSlug===p.slug?'bg-[#392C24] text-white border-[#392C24]':'bg-[#F9F3E9] text-[#392C24] border-[#D8C6B4]')}>
     <span className="block text-sm font-black">{oakText(p.title,locale)}</span><span className={'text-[11px] mt-2 block '+(productSlug===p.slug?'text-[#E4CCB3]':'text-[#6A513A]')}>{p.room.toUpperCase()} · {p.category}</span>
    </button>)}</div>
   </fieldset>
   <div className="grid sm:grid-cols-2 gap-5">
    <label className={field}>{ar?'02 / الخامة':'02 / Material'}<select className={input} value={draft.material} onChange={e=>setDraft(x=>({...x,material:e.target.value as Item['material']}))}>{product.materials.map(m=><option key={m} value={m}>{m}</option>)}</select></label>
    <label className={field}>{ar?'03 / التشطيب':'03 / Finish'}<select className={input} value={draft.finish} onChange={e=>setDraft(x=>({...x,finish:e.target.value as Item['finish']}))}>{product.finishes.map(v=><option key={v} value={v}>{v}</option>)}</select></label>
    {(['width','depth','height'] as const).map(axis=><label key={axis} className={field}>{(axis==='width'?(ar?'العرض':'Width'):axis==='depth'?(ar?'العمق':'Depth'):(ar?'الارتفاع':'Height'))+' · mm'}
      <span className="font-normal text-[#7E6852] ms-2">{product.minMax[axis][0]}–{product.minMax[axis][1]}</span>
      <input type="number" required min={product.minMax[axis][0]} max={product.minMax[axis][1]} step="1" className={input} value={draft[(axis+'Mm') as keyof Item] as number} onChange={e=>updateDimension((axis+'Mm') as 'widthMm'|'depthMm'|'heightMm',e.target.value)}/></label>)}
    <label className={field}>{ar?'الكمية':'Quantity'}<select className={input} value={draft.quantity} onChange={e=>setDraft(x=>({...x,quantity:Number(e.target.value)}))}>{Array.from({length:8},(_,i)=>i+1).map(q=><option key={q}>{q}</option>)}</select></label>
   </div>
   <div className="p-5 bg-[#F2E8D9] text-xs text-[#675342] leading-7 flex gap-3 items-start"><Ruler className="shrink-0" size={20}/>{ar?'الأبعاد بالملليمتر للاسترشاد فقط. التصنيع الفعلي يحتاج قياس موقع وتأكيد الصانع ومسار التوصيل.':'Dimensions are illustrative millimetre values; real production requires verified measurements, maker approval and delivery-access checks.'}</div>
   <button type="button" onClick={addItem} className="w-full flex justify-center gap-3 items-center border-2 border-[#392C24] text-[#392C24] px-6 py-4 font-black text-sm"><Plus size={19}/>{ar?'أضف القطعة لطلب التسعير':'ADD TO THE QUOTE BASKET'}</button>
   <section className="border-t border-[#D8C6B4] pt-8"><div className="flex justify-between items-center gap-3"><h3 className="oakline-display text-2xl sm:text-3xl">{ar?'القطع المختارة':'Your quote basket'}</h3><span className="text-xs font-mono font-black">{items.length} / 6</span></div>
    {!items.length?<p className="mt-5 text-sm text-[#77604A] p-6 bg-[#F7EFE4]">{ar?'لسه مفيش قطع. اختار قطعة واضغط إضافة.':'No pieces yet. Configure a piece and add it above.'}</p>:
      <div className="mt-5 space-y-3">{items.map((item,i)=>{const p=OAKLINE.services.find(p=>p.slug===item.serviceSlug);return <div key={item.serviceSlug} className="grid grid-cols-[1fr_auto] gap-4 p-5 bg-[#F5EBDD] border border-[#CFC0AC]">
       <div><p className="text-sm font-black">{p?.title[locale]}</p><p className="text-xs text-[#715843] leading-7 mt-2">{fmt(item.widthMm)} × {fmt(item.depthMm)} × {fmt(item.heightMm)} mm · {item.material} / {item.finish} · {item.quantity} {ar?'قطعة':'unit(s)'}</p></div>
       <button type="button" onClick={()=>setItems(current=>current.filter(p=>p.serviceSlug!==item.serviceSlug))} aria-label={ar?'احذف القطعة':'Remove piece'} className="min-w-10 h-10 grid place-items-center border border-[#8A6D4A]"><Trash2 size={17}/></button>
      </div>})}</div>}
   </section>
   <div className="grid sm:grid-cols-2 gap-5 pt-6 border-t border-[#D8C6B4]">
    <label className={field}>{ar?'المنطقة العامة':'General region'}<select className={input} value={deliveryZone} onChange={e=>setDeliveryZone(e.target.value)}>{OAKLINE.deliveryZones.map(x=><option key={x}>{x}</option>)}</select></label>
    <label className={field}>{ar?'مرحلة المشروع':'Project stage'}<select className={input} value={designStage} onChange={e=>setDesignStage(e.target.value)}>{[['exploring',ar?'بستكشف الأفكار':'Exploring ideas'],['measurements_ready',ar?'معايا المقاسات':'Measurements ready'],['consultation_requested',ar?'عايز استشارة':'Need consultation']].map(([v,label])=><option key={v} value={v}>{label}</option>)}</select></label>
    <label className={field}>{ar?'الاسم':'Contact name'}<input required minLength={2} maxLength={120} autoComplete="name" className={input} value={name} onChange={e=>setName(e.target.value)}/></label>
    <label className={field}>{ar?'رقم الهاتف':'Contact phone'}<input required type="tel" autoComplete="tel" pattern="[+0-9 ()-]{8,24}" className={input} value={phone} onChange={e=>setPhone(e.target.value)}/></label>
   </div>
   <label className="flex items-start gap-3 leading-8 text-sm text-[#5C4836]"><input type="checkbox" required className="accent-[#392C24] mt-2" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>{ar?'أوافق على حفظ معلومات الطلب وبيانات التواصل ضمن تجربة تصميم الموقع. لن أرسل عنوان منزل تفصيلي أو مستندات.':'I consent to storing these illustrative specifications and contact data. I will not share precise home access details or private documents.'}</span></label>
   <p className="bg-[#F7EDD7] border-s-4 border-[#A77D3D] text-[#654E31] p-5 text-xs leading-8 flex gap-3"><AlertTriangle className="shrink-0 mt-1" size={19}/>{ar?'الطلب لا يمثل أمر شراء أو سعرًا أو منتجًا متاحًا. أي سعر خامات أو ضمان يحتاج مراجعة صاحب النشاط الحقيقي.':'No purchase, live stock or binding price is created. Only a real furniture business can review materials and confirm a commercial offer.'}</p>
   {error&&<p role="alert" className="p-4 bg-red-50 text-red-800 text-sm">{error}</p>}
   <button type="submit" disabled={busy||!consent||!items.length} className="w-full bg-[#392C24] text-white px-8 py-5 text-sm font-black disabled:opacity-40">{busy?(ar?'جاري حفظ طلب التسعير':'SAVING...'):(ar?'احفظ طلب التسعير':'SAVE CUSTOM QUOTE REQUEST')}</button>
  </div>
 </form>;
}
