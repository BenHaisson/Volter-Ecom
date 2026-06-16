import type { LucideIcon } from 'lucide-react';

type SpecCardProps = {
  title: string;
  copy: string;
  icon: LucideIcon;
};

export function SpecCard({ title, copy, icon: Icon }: SpecCardProps) {
  return (
    <article className="technical-border glass rounded-lg p-5 transition hover:-translate-y-1 hover:border-lime/40">
      <Icon aria-hidden className="h-7 w-7 text-lime" />
      <h3 className="mt-5 font-display text-2xl font-black uppercase text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{copy}</p>
    </article>
  );
}
