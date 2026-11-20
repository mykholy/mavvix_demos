import { SECTOR_IMAGES } from '@/lib/media/sector-images';

export function SectorPhoto({
  sector, secondary = false, className = '', alt, preload = false,
}: {
  sector: keyof typeof SECTOR_IMAGES; secondary?: boolean;
  className?: string; alt: string; preload?: boolean;
}) {
  const src = SECTOR_IMAGES[sector][secondary ? 1 : 0];
  return (
    <div className={'relative isolate overflow-hidden bg-stone-100 ' + className}>
      <img src={src} alt={alt} loading={preload ? 'eager' : 'lazy'} decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.035]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
    </div>
  );
}
