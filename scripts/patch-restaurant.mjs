import fs from 'node:fs';

const file = 'src/app/[locale]/preview/restaurant/menu/RestaurantMenuClient.tsx';
let s = fs.readFileSync(file, 'utf8');

if (!s.includes('getDishPhoto')) {
  s = s.replace(
    "import { useOrder } from '@/lib/restaurant/order-context';",
    "import { useOrder } from '@/lib/restaurant/order-context';\nimport { getDishPhoto } from '@/lib/media/sector-images';"
  );

  const oldCard = `              <div\n                key={dish.id}\n                data-dish-slug={dish.slug}\n                data-has-nuts={hasNuts ? 'true' : 'false'}\n                className="bg-white rounded-2xl border border-[#321F18]/10 p-6 flex flex-col justify-between hover:border-[#BA5C34] hover:shadow-md transition-all group"\n              >\n                <div className="space-y-3">`;
  const oldCardCRLF = `              <div\r\n                key={dish.id}\r\n                data-dish-slug={dish.slug}\r\n                data-has-nuts={hasNuts ? 'true' : 'false'}\r\n                className="bg-white rounded-2xl border border-[#321F18]/10 p-6 flex flex-col justify-between hover:border-[#BA5C34] hover:shadow-md transition-all group"\r\n              >\r\n                <div className="space-y-3">`;

  const newCard = `              <div\n                key={dish.id}\n                data-dish-slug={dish.slug}\n                data-has-nuts={hasNuts ? 'true' : 'false'}\n                className="bg-white rounded-2xl border border-[#321F18]/10 overflow-hidden flex flex-col justify-between hover:border-[#BA5C34] hover:shadow-xl transition-all duration-300 group"\n              >\n                <Link href={\`/\${locale}/preview/restaurant/menu/\${dish.slug}\`} className="relative h-48 w-full block overflow-hidden bg-stone-100">\n                  <img\n                    src={getDishPhoto(dish.id, dish.category)}\n                    alt={dish.title}\n                    loading="lazy"\n                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"\n                  />\n                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />\n                  <span className="absolute bottom-3 start-3 text-xs font-bold text-white px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20">\n                    {dish.price_cents ? (dish.price_cents / 100).toFixed(0) : 180} {isAr ? 'ج.م' : 'EGP'}\n                  </span>\n                </Link>\n                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">\n                <div className="space-y-3">`;

  if (s.includes(oldCard)) {
    s = s.replace(oldCard, newCard);
    s = s.replace(`                  </div>\n                </div>\n              </div>\n            );`, `                  </div>\n                </div>\n                </div>\n              </div>\n            );`);
  } else if (s.includes(oldCardCRLF)) {
    s = s.replace(oldCardCRLF, newCard);
    s = s.replace(`                  </div>\r\n                </div>\r\n              </div>\r\n            );`, `                  </div>\r\n                </div>\r\n                </div>\r\n              </div>\r\n            );`);
  }
  fs.writeFileSync(file, s, 'utf8');
  console.log('Patched RestaurantMenuClient.tsx with dish photos');
}

