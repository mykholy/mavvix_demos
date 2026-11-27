/**
 * Saffron Table / سفرة زعفران — Authentic Heritage Gastronomy & Dining
 * Authoritative Licensed Media Manifest & Type Definitions
 */

export interface SaffronTablePhoto {
  id: 'tagine' | 'mezze' | 'saffron' | 'bread' | 'baklava' | 'courtyard';
  filename: string;
  url: string;
  category: 'heritage_mains' | 'starters_mezze' | 'spices_sourcing' | 'hearth_breads' | 'artisan_desserts' | 'dining_ambiance';
  titleEn: string;
  titleAr: string;
  width: number;
  height: number;
  bytes: number;
  sha256: string;
  author: string;
  license: string;
  source: string;
}

export const saffronTablePhotos: SaffronTablePhoto[] = [
  {
    id: 'tagine',
    filename: 'tagine.webp',
    url: '/assets/portfolio/restaurant/tagine.webp',
    category: 'heritage_mains',
    titleEn: 'Clay Tagine Simmered with Saffron, Braised Meat & Roasted Almonds',
    titleAr: 'طاجن فخاري مغربي مطهو بالزعفران البلدي والمكسرات المحمصة',
    width: 1800,
    height: 1350,
    bytes: 391078,
    sha256: '438c616a6380a825e8380e9c7527752862cc9c90be834c19f759e1423740e887',
    author: 'Rida Benalla',
    license: 'CC BY-SA 4.0 International',
    source: 'https://commons.wikimedia.org/wiki/File:Moroccan_tagine.jpg'
  },
  {
    id: 'mezze',
    filename: 'mezze.webp',
    url: '/assets/portfolio/restaurant/mezze.webp',
    category: 'starters_mezze',
    titleEn: 'Eastern Mezze Table with Hummus, Virgin Olive Oil & Fresh Herbs',
    titleAr: 'سفرة مقبلات ومزة شرقية مع الحمص وزيت الزيتون البكر والأعشاب',
    width: 1800,
    height: 1350,
    bytes: 283210,
    sha256: '8a2da912271f978d9108748bd5009546e7aa34a7e9bb9135c6288270afdf471c',
    author: 'cyclonebill',
    license: 'CC BY 2.0 Generic',
    source: 'https://commons.wikimedia.org/wiki/File:Lebanese_M%C3%A9z%C3%A9_(4039076597).jpg'
  },
  {
    id: 'saffron',
    filename: 'saffron.webp',
    url: '/assets/portfolio/restaurant/saffron.webp',
    category: 'spices_sourcing',
    titleEn: 'Pure Crimson Mountain Saffron Threads in Traditional Porcelain',
    titleAr: 'خيوط الزعفران الجبلي القرمزية النقية في صحن الخزف التراثي',
    width: 1613,
    height: 1545,
    bytes: 205182,
    sha256: '1f481aae4911508b927def7b4e9860e7ad09ade229dd39b0ef568cdfb04fa4bc',
    author: 'Rainer Zenz',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Iran_saffron_threads.jpg'
  },
  {
    id: 'bread',
    filename: 'bread.webp',
    url: '/assets/portfolio/restaurant/bread.webp',
    category: 'hearth_breads',
    titleEn: 'Clay Hearth Wood-Fired Oven Baking Golden Artisan Flatbread',
    titleAr: 'خبز التنور الفخاري الساخن المخبوز على نار الحطب المباشرة',
    width: 1800,
    height: 1012,
    bytes: 278782,
    sha256: '212120ba408e570bc8726b29b3736abd3105545e1d4b5591a2db1f35a84e8155',
    author: 'Siddhartha Ghosh',
    license: 'CC BY-SA 3.0 Unported',
    source: 'https://commons.wikimedia.org/wiki/File:Tandoor_bread_1.jpg'
  },
  {
    id: 'baklava',
    filename: 'baklava.webp',
    url: '/assets/portfolio/restaurant/baklava.webp',
    category: 'artisan_desserts',
    titleEn: 'Layered Pistachio Baklava Pastry with Orange Blossom Honey',
    titleAr: 'بقلاوة بالفستق الحلبي المقرمش وعسل زهر البرتقال الطبيعي',
    width: 1600,
    height: 1200,
    bytes: 132304,
    sha256: '5a4b9b2523b96f9f2de9b474dbe500b47b9417e95050e82349189d135f7cb487',
    author: 'Marco Verch',
    license: 'CC BY-SA 2.0 Generic',
    source: 'https://commons.wikimedia.org/wiki/File:Pistachio_Baklava_(23102093965).jpg'
  },
  {
    id: 'courtyard',
    filename: 'courtyard.webp',
    url: '/assets/portfolio/restaurant/courtyard.webp',
    category: 'dining_ambiance',
    titleEn: 'Heritage Courtyard Dining Pavilion with Traditional Lanterns',
    titleAr: 'فناء المطعم التراثي المشجر مع فوانيس الإضاءة الدافئة الهادئة',
    width: 1800,
    height: 1199,
    bytes: 372844,
    sha256: 'fd595b0d63cd0a662ebf3a23435fc768b519495b5bc3186481d2280ae18f1db4',
    author: 'Christian Benseler',
    license: 'CC BY 2.0 Generic',
    source: 'https://commons.wikimedia.org/wiki/File:Lovely_courtyard_restaurant_in_the_Bastakia_Quarter_(5374150000).jpg'
  }
];

export const getSaffronTablePhoto = (id: SaffronTablePhoto['id']): SaffronTablePhoto => {
  return saffronTablePhotos.find((p) => p.id === id) || saffronTablePhotos[0];
};
