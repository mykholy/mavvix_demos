'use client';
import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function MobileSectorNav({ links, tone = 'dark', breakpoint = 'lg' }: {
  links: Array<{ href: string; label: string }>;
  tone?: 'dark' | 'light'; breakpoint?: 'xl' | 'lg' | 'md';
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 0, width: 240 });
  const anchor = useRef<HTMLDivElement>(null);
  const light = tone === 'light';
  const ar = links[0]?.href.startsWith('/ar/') ?? false;
  const menuId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !anchor.current?.contains(event.target)) close(); };
    window.addEventListener('resize', close);
    document.addEventListener('pointerdown', outside);
    return () => { window.removeEventListener('resize', close); document.removeEventListener('pointerdown', outside); };
  }, [open]);
  function toggle() {
    if (open) { setOpen(false); return; }
    const rect = anchor.current?.getBoundingClientRect();
    if (!rect) return;
    const viewport = document.documentElement.clientWidth;
    const width = Math.min(320, Math.max(0, viewport - 24));
    const preferred = ar ? rect.left : rect.right - width;
    const clamped = Math.max(12, Math.min(preferred, viewport - width - 12));
    setPosition({ left: clamped - rect.left, width });
    setOpen(true);
  }
  return (
    <div ref={anchor} data-mobile-sector-nav className={(breakpoint === 'md' ? 'md:hidden' : breakpoint === 'xl' ? 'xl:hidden' : 'lg:hidden') + ' relative shrink-0'} onKeyDown={e => { if (e.key === 'Escape' && open) { setOpen(false); trigger.current?.focus(); } }}>
      <button type="button" ref={trigger} aria-label={ar ? (open ? 'إغلاق القائمة' : 'فتح القائمة') : (open ? 'Close navigation' : 'Open navigation')} aria-expanded={open} aria-controls={open ? menuId : undefined}
        onClick={toggle}
        className={'inline-flex items-center justify-center h-11 w-11 rounded-xl border transition-colors ' +
          (light ? 'bg-white text-stone-900 border-stone-400 hover:bg-stone-100' : 'bg-slate-900 text-white border-slate-500 hover:bg-slate-800')}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && <nav id={menuId} aria-label={ar ? 'قائمة التنقل' : 'Mobile navigation'}
        style={{ left: position.left, width: position.width }}
        className={'absolute top-full mt-3 z-50 max-h-[min(65dvh,480px)] overflow-y-auto rounded-2xl border p-2 shadow-2xl backdrop-blur-xl ' +
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
