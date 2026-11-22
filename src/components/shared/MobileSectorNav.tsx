'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function MobileSectorNav({ links, tone = 'dark', breakpoint = 'lg' }: {
  links: Array<{ href: string; label: string }>;
  tone?: 'dark' | 'light'; breakpoint?: 'lg' | 'md';
}) {
  const [open, setOpen] = useState(false);
  const light = tone === 'light';
  return (
    <div className={(breakpoint === 'md' ? 'md:hidden' : 'lg:hidden') + ' relative shrink-0'}>
      <button type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className={'inline-flex items-center justify-center h-11 w-11 rounded-xl border transition-colors ' +
          (light ? 'text-stone-900 border-stone-300 hover:bg-stone-100' : 'text-white border-white/25 hover:bg-white/10')}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && <nav aria-label="Mobile navigation"
        className={'absolute top-full mt-3 end-0 z-50 min-w-[240px] w-[min(85vw,320px)] rounded-2xl border p-2 shadow-2xl backdrop-blur-xl ' +
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
