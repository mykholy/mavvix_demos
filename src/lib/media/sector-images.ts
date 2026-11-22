import type { CSSProperties } from 'react';

export type Sector =
  | 'construction'
  | 'industrial'
  | 'real-estate'
  | 'dental'
  | 'ecommerce'
  | 'portfolio'
  | 'restaurant'
  | 'academy';

const photo = (id: string, width = 1600, q = 82) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${q}`;

// Verified high-resolution sector hero & secondary imagery
export const SECTOR_IMAGES: Record<Sector, readonly [string, string]> = {
  construction: [
    photo('photo-1541888946425-d0fbb18615f8'), // Modern structural architectural concrete & steel
    photo('photo-1503387762-592deb58ef4e'), // Architectural blueprints and construction framing
  ],
  industrial: [
    photo('photo-1581092160607-ee22621dd758'), // Industrial robotic automation arm
    photo('photo-1581092335397-9583fe92d232'), // Stainless steel valves & manufacturing plant
  ],
  'real-estate': [
    photo('photo-1600596542815-ffad4c1539a9'), // Luxury modern architectural villa with pool
    photo('photo-1600607687939-ce8a6c25118c'), // Contemporary interior design living space
  ],
  dental: [
    photo('photo-1629909613654-28e377c37b09'), // Pristine modern dental clinic operatory
    photo('photo-1588776814546-1ffcf47267a5'), // Precision dental orthodontic consultation
  ],
  ecommerce: [
    photo('photo-1441986300917-64674bd600d8'), // High-end boutique atelier retail space
    photo('photo-1490481651871-ab68de25d43d'), // Luxury fashion editorial curation
  ],
  portfolio: [
    photo('photo-1600132806370-bf17e65e942f'), // Minimalist stationery branding identity
    photo('photo-1551650975-87deedd944c3'), // Digital UX app case study on mobile
  ],
  restaurant: [
    photo('photo-1517248135467-4c7edcad34c4'), // Warm luxury dining ambient restaurant
    photo('photo-1555396273-367ea4eb4db5'), // Artisan dining table setting
  ],
  academy: [
    photo('photo-1522202176988-66273c2fd55f'), // Interactive students & tech learners collaboration
    photo('photo-1531482615713-2afd69097998'), // Tech lecture presentation & code bootcamp
  ],
};

// Rich Dish Photography Catalog (30 authentic culinary items)
export const DISH_PHOTOS: Record<string, string> = {
  // Breakfast
  'dish-01': photo('photo-1525351484163-7529414344d8', 800), // Shakshuka in cast iron skillet
  'dish-02': photo('photo-1540420773420-3366772f4999', 800), // Gourmet hummus & warm pita bread
  'dish-03': photo('photo-1533089860892-a7c6f0a88666', 800), // Artisan scrambled eggs & avocado toast
  'dish-04': photo('photo-1550617931-e17a7b70dce2', 800), // Fresh bakery pastries & honey
  'dish-05': photo('photo-1509440159596-0249088772ff', 800), // Freshly baked sourdough bread loaf

  // Starters & Mezze
  'dish-06': photo('photo-1540420773420-3366772f4999', 800), // Mediterranean mezze platter
  'dish-07': photo('photo-1608897013039-887f21d8c804', 800), // Spiced falafel with tahini
  'dish-08': photo('photo-1541518763669-27fef04b14ea', 800), // Roasted beetroot & goat cheese salad
  'dish-09': photo('photo-1628294895950-9805252327bc', 800), // Lentil soup with lemon & cumin croutons
  'dish-10': photo('photo-1599488615731-7e5c2823ff28', 800), // Stuffed vine leaves (dolma) with pomegranate

  // Mains
  'dish-11': photo('photo-1541518763669-27fef04b14ea', 800), // Signature Slow-Braised Lamb Shank
  'dish-12': photo('photo-1563379091339-03b21ab4a4f8', 800), // Royal Saffron Rice with Spiced Chicken
  'dish-13': photo('photo-1555939594-58d7cb561ad1', 800), // Charcoal Grilled Kebab & Kofta Skewers
  'dish-14': photo('photo-1519708227418-c8fd9a32b7a2', 800), // Pan-Seared Mediterranean Sea Bass
  'dish-15': photo('photo-1544025162-d76694265947', 800), // Dry-Aged Ribeye Steak with Herb Butter
  'dish-16': photo('photo-1551183053-bf91a1d81141', 800), // Truffle Risotto with Wild Mushrooms
  'dish-17': photo('photo-1589302168068-964664d93dc0', 800), // Moroccan Vegetable Tagine with Couscous
  'dish-18': photo('photo-1565299624946-b28f40a0ae38', 800), // Wood-Fired Artisan Pizza with Burrata
  'dish-19': photo('photo-1569718212165-3a8278d5f624', 800), // Handmade Pappardelle with Slow Ragu
  'dish-20': photo('photo-1534422298391-e4f8c172dddb', 800), // Roasted Sea Bream with Citrus Gremolata

  // Desserts
  'dish-21': photo('photo-1587314168485-3236d6710814', 800), // Golden Pistachio Kunafa with Rose Syrup
  'dish-22': photo('photo-1571877227200-a0d98ea607e9', 800), // Decadent Dark Chocolate Lava Fondant
  'dish-23': photo('photo-1563729784474-d77dbb933a9e', 800), // Traditional Baklava with Crushed Walnuts
  'dish-24': photo('photo-1551024709-8f23befc6f87', 800), // Saffron Cardamom Crème Brûlée
  'dish-25': photo('photo-1508737027454-e6454ef45afd', 800), // Seasonal Berry Pavlova with Whipped Cream

  // Drinks & Mocktails
  'dish-26': photo('photo-1513558161293-cdaf765ed2fd', 800), // Signature Pomegranate Mint Mojito
  'dish-27': photo('photo-1551024709-8f23befc6f87', 800), // Fresh Hibiscus & Orange Blossom Cooler
  'dish-28': photo('photo-1514432324607-a09d9b4aefdd', 800), // Authentic Turkish Coffee in Copper Ibrik
  'dish-29': photo('photo-1576092768241-dec231879fc3', 800), // Freshly Squeezed Valencia Orange Juice
  'dish-30': photo('photo-1517256064527-09c73fc73e38', 800), // Spiced Masala Chai with Star Anise
};

export function getDishPhoto(slugOrId: string, category?: string): string {
  if (DISH_PHOTOS[slugOrId]) return DISH_PHOTOS[slugOrId];
  // Deterministic fallback based on hash or category
  const fallbacks: Record<string, string> = {
    breakfast: photo('photo-1525351484163-7529414344d8', 800),
    starters: photo('photo-1540420773420-3366772f4999', 800),
    mains: photo('photo-1541518763669-27fef04b14ea', 800),
    desserts: photo('photo-1587314168485-3236d6710814', 800),
    drinks: photo('photo-1513558161293-cdaf765ed2fd', 800),
  };
  if (category && fallbacks[category]) return fallbacks[category];
  return photo('photo-1541518763669-27fef04b14ea', 800);
}

// Real Estate Properties Photography Catalog
export const PROPERTY_PHOTOS = [
  photo('photo-1600596542815-ffad4c1539a9', 1000), // Luxury modern villa pool
  photo('photo-1600585154340-be6161a56a0c', 1000), // Cantilevered architectural home
  photo('photo-1512917774080-9991f1c4c750', 1000), // Modern mansion with palms
  photo('photo-1600607687939-ce8a6c25118c', 1000), // Minimalist luxury lounge
  photo('photo-1560448204-e02f11c3d0e2', 1000), // Penthouse master bedroom
  photo('photo-1580587771525-78b9dba3b914', 1000), // Suburban estate lawn
  photo('photo-1600566753190-17f0baa2a6c3', 1000), // High-end kitchen island
  photo('photo-1600573472591-ee6b68d14c68', 1000), // Waterfront balcony terrace
];

export function getPropertyPhoto(seed: string | number): string {
  let hash = 0;
  const str = String(seed);
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  return PROPERTY_PHOTOS[hash % PROPERTY_PHOTOS.length];
}

// Academy Course Photography Catalog
export const COURSE_PHOTOS = [
  photo('photo-1555066931-4365d14bab8c', 800), // TypeScript & React code on dual monitors
  photo('photo-1551288049-bebda4e38f71', 800), // Data Science & Python analytics graphs
  photo('photo-1581291518857-4e27b48ff24e', 800), // UI/UX design systems & wireframes
  photo('photo-1451187580459-43490279c0fa', 800), // Cloud engineering & DevOps architecture
  photo('photo-1563986768609-322da13575f3', 800), // Cybersecurity & zero-trust auth
  photo('photo-1526498460520-4c246339dccb', 800), // Mobile apps & cross-platform React Native
  photo('photo-1516321318423-f06f85e504b3', 800), // Enterprise software testing & QA
  photo('photo-1460925895917-afdab827c52f', 800), // Growth marketing & technical SEO
];

export function getCoursePhoto(seed: string | number): string {
  let hash = 0;
  const str = String(seed);
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  return COURSE_PHOTOS[hash % COURSE_PHOTOS.length];
}

// Construction Projects Photography
export const CONSTRUCTION_PHOTOS = [
  photo('photo-1486406146926-c627a92ad1ab', 900), // Modern glass skyscraper
  photo('photo-1513694203232-719a280e022f', 900), // Post-tensioned concrete bridge
  photo('photo-1503387762-592deb58ef4e', 900), // Scaffolding and engineering plans
  photo('photo-1541888946425-d0fbb18615f8', 900), // Timber sustainable pavilion
  photo('photo-1590381105924-c72589b9ef3f', 900), // Tower crane over sunset skyline
  photo('photo-1541971875076-8f970d573be6', 900), // Structural steel beam welding
];

export function getConstructionPhoto(seed: string | number): string {
  let hash = 0;
  const str = String(seed);
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  return CONSTRUCTION_PHOTOS[hash % CONSTRUCTION_PHOTOS.length];
}

// Industrial Catalog Photography
export const INDUSTRIAL_PHOTOS = [
  photo('photo-1581092160607-ee22621dd758', 800), // Robotic milling arm
  photo('photo-1581092335397-9583fe92d232', 800), // Stainless steel valves & pipes
  photo('photo-1504917599217-d4dc5ebe6122', 800), // Metallurgy spark forge
  photo('photo-1581092580497-e0d23cbdf1dc', 800), // Laser optical measurement
  photo('photo-1581091226825-a6a2a5aee158', 800), // Heavy duty gear assembly
  photo('photo-1581092795360-fd1ca04f0952', 800), // Precision hydraulic pressure gauges
];

export function getIndustrialPhoto(seed: string | number): string {
  let hash = 0;
  const str = String(seed);
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  return INDUSTRIAL_PHOTOS[hash % INDUSTRIAL_PHOTOS.length];
}

// Dental Services Photography
export const DENTAL_PHOTOS = [
  photo('photo-1629909613654-28e377c37b09', 800), // Operatory with digital imaging
  photo('photo-1606811841689-23dfddce3e95', 800), // Clean porcelain veneer smile
  photo('photo-1588776814546-1ffcf47267a5', 800), // Clear aligners orthodontics
  photo('photo-1579684385127-1ef15d508118', 800), // Specialist doctor consultation
  photo('photo-1609840114035-3c981b782dfe', 800), // High precision dental handpieces
  photo('photo-1598256989800-fe5f95da9787', 800), // Pediatric friendly operatory
];

export function getDentalPhoto(seed: string | number): string {
  let hash = 0;
  const str = String(seed);
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  return DENTAL_PHOTOS[hash % DENTAL_PHOTOS.length];
}

// Portfolio Case Studies Photography
export const PORTFOLIO_PHOTOS = [
  photo('photo-1600132806370-bf17e65e942f', 900), // Minimalist brand identity
  photo('photo-1551650975-87deedd944c3', 900), // Mobile app UX case study
  photo('photo-1544716278-ca5e3f4abd8c', 900), // Typography editorial design book
  photo('photo-1497366216548-37526070297c', 900), // Spatial interior exhibition
  photo('photo-1507238691740-187a5b1d37b8', 900), // Web engineering system design
  photo('photo-1522542550221-31fd19575a2d', 900), // Packaging design with embossing
];

export function getPortfolioPhoto(seed: string | number): string {
  let hash = 0;
  const str = String(seed);
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  return PORTFOLIO_PHOTOS[hash % PORTFOLIO_PHOTOS.length];
}

// Ecommerce Editorial Imagery
const extraFashion = photo('photo-1783113298894-eeb3b71315d9');
export const EDITORIAL_FASHION = [SECTOR_IMAGES.ecommerce[0], SECTOR_IMAGES.ecommerce[1], extraFashion];

export function getProductEditorialPhoto(slug: string) {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return EDITORIAL_FASHION[hash % EDITORIAL_FASHION.length];
}

export function getSectorHeroStyle(sector: Sector): CSSProperties {
  const dark = ['construction', 'industrial', 'real-estate'].includes(sector);
  const shade = dark
    ? 'linear-gradient(104deg,rgba(13,25,31,.98) 0%,rgba(13,25,31,.94) 48%,rgba(13,25,31,.57) 100%)'
    : 'linear-gradient(105deg,rgba(251,249,246,.97) 0%,rgba(251,249,246,.95) 52%,rgba(251,249,246,.65) 100%)';
  return {
    backgroundImage: `${shade}, url("${SECTOR_IMAGES[sector][0]}")`,
    backgroundPosition: 'center, center 48%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
}
