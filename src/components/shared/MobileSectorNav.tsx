'use client';
import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function MobileSectorNav({ links, tone = 'dark', breakpoint = 'lg' }: {
  links: Array<{ href: string; label: string }>;
  tone?: 'dark' | 'light'; breakpoint?: 'xl' | 'lg' | 'md';
}) {
  const [open, setOpen] = useState(false);
  const light = tone === 'light';
  const ar = links[0]?.href.startsWith('/ar/') ?? false;
  const menuId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <div data-mobile-sector-nav className={(breakpoint === 'md' ? 'md:hidden' : breakpoint === 'xl' ? 'xl:hidden' : 'lg:hidden') + ' relative shrink-0'} onKeyDown={e => { if (e.key === 'Escape' && open) { setOpen(false); trigger.current?.focus(); } }}>
      <button type="button" ref={trigger} aria-label={ar ? (open ? 'إغلاق القائمة' : 'فتح القائمة') : (open ? 'Close navigation' : 'Open navigation')} aria-expanded={open} aria-controls={open ? menuId : undefined}
        onClick={() => setOpen(v => !v)}
        className={'inline-flex items-center justify-center h-11 w-11 rounded-xl border transition-colors ' +
          (light ? 'bg-white text-stone-900 border-stone-400 hover:bg-stone-100' : 'bg-slate-900 text-white border-slate-500 hover:bg-slate-800')}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && <nav id={menuId} aria-label={ar ? 'قائمة التنقل' : 'Mobile navigation'}
        className={'absolute top-full mt-3 end-0 z-50 w-[min(75vw,320px)] max-w-[calc(100vw-2rem)] rounded-2xl border p-2 shadow-2xl backdrop-blur-xl ' +
          (light ? 'bg-white/95 border-stone-200 text-stone-900' : 'bg-slate-950/95 border-white/15 text-slate-100')}>
        {links.map(link => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
            className={'block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ' +
              (light ? 'hover:bg-stone-100' : 'hover:bg-white/10')}>
            {link.label}
          </Link>
        ))}
      </nav>}
    </div>
  );
}
