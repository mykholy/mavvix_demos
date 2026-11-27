export type FormaPhoto={id:string;category:'kitchens'|'materials';url:string;source:string;author:string;license:string;licenseUrl:string;ar:string;en:string};
const commons='https://commons.wikimedia.org/wiki/File:';
const by='https://creativecommons.org/licenses/by/2.0/';
const zero='https://creativecommons.org/publicdomain/zero/1.0/';
export const formaPhotos:FormaPhoto[]=[
 {id:'exclusive',category:'kitchens',url:'/assets/portfolio/interiors-kitchens/exclusive.webp',source:commons+'Exclusive_Kitchen_Design.jpg',author:'Architect Rahat Chowdhury',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',ar:'دراسة تصميم مطبخ معاصر',en:'Contemporary kitchen design study'},
 {id:'room',category:'kitchens',url:'/assets/portfolio/interiors-kitchens/room.webp',source:commons+'Kitchen_Design.jpg',author:'Dinamarciano',license:'CC0',licenseUrl:zero,ar:'توزيع الخزائن داخل المساحة',en:'Cabinetry and room composition'},
 {id:'island',category:'kitchens',url:'/assets/portfolio/interiors-kitchens/island.webp',source:commons+'Kitchen_with_island.jpg',author:'Bill Wilson',license:'CC BY 2.0',licenseUrl:by,ar:'مطبخ بجزيرة مستقلة',en:'Kitchen with a freestanding island'},
 {id:'cabinetry',category:'kitchens',url:'/assets/portfolio/interiors-kitchens/cabinetry.webp',source:commons+'Newly_renovated_kitchen_with_cabinets_refrigerator_stove_and_hardwood_floor.jpg',author:'Tomwsulcer',license:'CC0',licenseUrl:zero,ar:'تفاصيل الخزائن وأسطح العمل',en:'Cabinetry and worktop details'},
 {id:'walnut',category:'materials',url:'/assets/portfolio/interiors-kitchens/walnut.webp',source:commons+'Walnut_textures.jpg',author:'Ben Hosking',license:'CC BY 2.0',licenseUrl:by,ar:'ملمس خشب الجوز',en:'Walnut texture'},
 {id:'marble',category:'materials',url:'/assets/portfolio/interiors-kitchens/marble.webp',source:commons+'Marble_Texture.png',author:'ORIGAMEDIGITAL',license:'CC0',licenseUrl:zero,ar:'مرجع بصري لملمس الرخام',en:'Marble texture reference'}
];
export const formaPhoto=(id:string)=>formaPhotos.find(p=>p.id===id)??formaPhotos[0];
