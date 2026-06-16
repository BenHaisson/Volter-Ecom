import { CheckCircle2 } from 'lucide-react';
import { comparisonRows } from '../data/products';

export function ComparisonTable() {
  return (
    <section className="shell py-20 md:py-28">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow">Comparison</p>
        <h2 className="display-title mt-3 text-4xl md:text-6xl">VOLTERRA X1 vs gas dirt bike</h2>
      </div>
      <div className="overflow-auto rounded-lg border border-white/10 bg-white/[0.035]">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase text-zinc-400">
              <th className="px-5 py-4">Category</th>
              <th className="bg-lime/10 px-5 py-4 text-lime">VOLTERRA X1</th>
              <th className="px-5 py-4">Gas Dirt Bike</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map(([category, electric, gas]) => (
              <tr key={category} className="border-b border-white/10 last:border-b-0">
                <th className="px-5 py-4 text-left font-display text-lg uppercase text-white">{category}</th>
                <td className="bg-lime/10 px-5 py-4 font-bold text-zinc-100">
                  <span className="flex items-start gap-2">
                    <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-lime" />
                    {electric}
                  </span>
                </td>
                <td className="px-5 py-4 text-zinc-400">{gas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
