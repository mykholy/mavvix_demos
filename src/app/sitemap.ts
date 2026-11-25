import type { MetadataRoute } from 'next';
/** Do not submit sample fictitious providers or unapproved deployment paths to search engines. */
export default function sitemap():MetadataRoute.Sitemap{
 const raw=process.env.NEXT_PUBLIC_MAVVIX_SHOWCASE_ORIGIN||'';
 let origin='';
 try{const u=new URL(raw);if(u.protocol==='https:')origin=u.origin;}catch{}
 if(!origin||process.env.MAVVIX_INDEX_SHOWCASE!=='true')return [];
 return ['ar','en'].map(locale=>({
  url:`${origin}/${locale}/showcase`,
  lastModified:new Date(),
  changeFrequency:'weekly' as const,
  priority:1,
  alternates:{languages:{ar:`${origin}/ar/showcase`,en:`${origin}/en/showcase`}}
 }));
}
