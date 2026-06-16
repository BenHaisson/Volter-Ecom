import { Instagram, Mail, Music2, Play } from 'lucide-react';
import { brand } from '../data/products';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="shell grid gap-10 md:grid-cols-[1.2fr_0.7fr_0.7fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-lime p-1.5">
              <img src={brand.logoMark} alt="" className="h-full w-full object-contain" aria-hidden />
            </span>
            <span className="font-display text-2xl font-black tracking-[0.08em]">VOLTERRA</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">Electric. Unleashed.</p>
        </div>

        <div>
          <h3 className="font-display text-xl font-black uppercase">Links</h3>
          <div className="mt-4 grid gap-2 text-sm font-bold text-zinc-400">
            <a className="hover:text-lime" href="#bikes">Bikes</a>
            <a className="hover:text-lime" href="#technology">Technology</a>
            <a className="hover:text-lime" href="#faq">Warranty</a>
            <a className="hover:text-lime" href="#faq">Dealers</a>
            <a className="hover:text-lime" href="#top">Contact</a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl font-black uppercase">Social</h3>
          <div className="mt-4 flex gap-2">
            <a className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 hover:text-lime" href="#top" aria-label="Instagram">
              <Instagram aria-hidden className="h-5 w-5" />
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 hover:text-lime" href="#top" aria-label="YouTube">
              <Play aria-hidden className="h-5 w-5" />
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 hover:text-lime" href="#top" aria-label="TikTok">
              <Music2 aria-hidden className="h-5 w-5" />
            </a>
          </div>
        </div>

        <form className="grid content-start gap-3" onSubmit={(event) => event.preventDefault()}>
          <h3 className="font-display text-xl font-black uppercase">Newsletter</h3>
          <label className="sr-only" htmlFor="newsletter-email">Email</label>
          <div className="flex gap-2">
            <input
              id="newsletter-email"
              type="email"
              placeholder="Email address"
              className="min-w-0 flex-1 rounded-lg border border-white/12 bg-white/[0.055] px-4 py-3 outline-none focus:border-lime"
            />
            <button className="button-primary px-4" type="submit" aria-label="Join newsletter">
              <Mail aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
      <div className="shell mt-10 border-t border-white/10 pt-6 text-xs font-bold text-zinc-500">
        Copyright 2026 VOLTERRA. All rights reserved.
      </div>
    </footer>
  );
}
