import type { MetadataRoute } from 'next';
/** The repository's sample brands are not operating businesses and must never
 * be indexed as real providers. Only the owner-approved Mavvix showcase can
 * become crawlable after an HTTPS deployment origin is configured. */
export default function robots():MetadataRoute.Robots {
 const raw=process.env.NEXT_PUBLIC_MAVVIX_SHOWCASE_ORIGIN||'';
 let origin='';
 try {const u=new URL(raw);if(u.protocol==='https:')origin=u.origin;}catch{}
 const index=Boolean(origin)&&process.env.MAVVIX_INDEX_SHOWCASE==='true';
 return index?
  {rules:[{userAgent:'*',allow:['/ar/showcase','/en/showcase'],disallow:['/ar/preview/','/en/preview/','/admin/','/api/']}],
   sitemap:origin+'/sitemap.xml'}:
  {rules:[{userAgent:'*',disallow:'/'}]};
}
