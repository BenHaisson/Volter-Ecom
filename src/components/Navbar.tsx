import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { brand } from '../data/products';

type NavbarProps = {
  cartCount: number;
  onCartOpen: () => void;
  onReserveOpen: () => void;
};

const links = [
  ['Bikes', '#bikes'],
  ['Performance', '#performance'],
  ['Technology', '#technology'],
  ['Gallery', '#gallery'],
  ['FAQ', '#faq'],
];

export function Navbar({ cartCount, onCartOpen, onReserveOpen }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-carbon/72 backdrop-blur-xl">
      <nav className="shell flex min-h-[72px] items-center gap-4" aria-label="Primary navigation">
        <a href="#top" className="flex items-center gap-3" aria-label="VOLTERRA home">
          <span className="grid h-11 w-11 place-items-center rounded-lg border border-lime/40 bg-lime p-1.5 shadow-glow">
            <img src={brand.logoMark} alt="" className="h-full w-full object-contain" aria-hidden />
          </span>
          <span className="font-display text-2xl font-black tracking-[0.08em]">VOLTERRA</span>
        </a>

        <div className="ml-auto hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} className="text-sm font-bold text-zinc-300 transition hover:text-lime" href={href}>
              {label}
            </a>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <button className="button-secondary px-3" type="button" onClick={onCartOpen} aria-label="Open cart">
            <ShoppingBag aria-hidden className="h-5 w-5" />
            <span className="grid min-w-6 place-items-center rounded bg-lime px-1.5 py-0.5 text-xs font-black text-carbon">
              {cartCount}
            </span>
          </button>
          <button className="button-primary" type="button" onClick={onReserveOpen}>
            Reserve Now
          </button>
        </div>

        <button
          type="button"
          className="ml-auto grid h-11 w-11 place-items-center rounded-lg border border-white/15 bg-white/5 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="shell pb-4 lg:hidden">
          <div className="glass grid gap-2 rounded-lg p-3">
            {links.map(([label, href]) => (
              <a
                key={href}
                className="rounded-lg px-3 py-3 font-bold text-zinc-200 hover:bg-white/5"
                href={href}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button className="button-secondary" type="button" onClick={onCartOpen}>
                Cart {cartCount}
              </button>
              <button className="button-primary" type="button" onClick={onReserveOpen}>
                Reserve
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
