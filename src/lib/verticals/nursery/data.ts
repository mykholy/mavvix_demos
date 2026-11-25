import content from '../../../../data/verticals/nursery.json';
import type { Locale } from '@/lib/i18n/config';
export const BLOOM=content;
export const bloomPath=(locale:Locale,suffix='')=>'/'+locale+'/preview/nursery'+(suffix?'/'+suffix:'');
export const bloomProgram=(slug:string)=>content.services.find(p=>p.slug===slug)||null;
export const bloomArticle=(slug:string)=>content.articles.find(p=>p.slug===slug)||null;
export const BLOOM_PHOTOS=[
 {src:'https://upload.wikimedia.org/wikipedia/commons/7/71/Montessorishelves.jpg',source:'https://commons.wikimedia.org/wiki/File:Montessorishelves.jpg',author:'Clematitedusud',license:'CC BY-SA 4.0',ar:'أرفف لخامات تعليمية خشبية في فصل مونتيسوري مستقل',en:'Shelves of wooden learning materials in an unrelated Montessori classroom'},
 {src:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Traditional_Montessori_educational_materials.jpg/1280px-Traditional_Montessori_educational_materials.jpg',source:'https://commons.wikimedia.org/wiki/File:Traditional_Montessori_educational_materials.jpg',author:'Nixdorf',license:'CC BY-SA 4.0',ar:'خامات تعليمية تقليدية ملونة في معرض مستقل في ميلانو',en:'Traditional colorful educational materials exhibited in Milan'}
] as const;
