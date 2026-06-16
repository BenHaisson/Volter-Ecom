import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/products';

export function FAQAccordion() {
  return (
    <section id="faq" className="shell py-20 md:py-28">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="eyebrow">FAQ</p>
        <h2 className="display-title mt-3 text-4xl md:text-6xl">Before the first charge</h2>
      </div>
      <div className="mx-auto grid max-w-3xl gap-3">
        {faqs.map(([question, answer], index) => (
          <details key={question} className="group rounded-lg border border-white/10 bg-white/[0.04] p-5" open={index === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-black uppercase">
              {question}
              <ChevronDown aria-hidden className="h-5 w-5 shrink-0 text-lime transition group-open:rotate-180" />
            </summary>
            <p className="mt-4 leading-7 text-zinc-400">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
