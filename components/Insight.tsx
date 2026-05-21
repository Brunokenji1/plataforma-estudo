import * as React from 'react';
import { Lightbulb } from 'lucide-react';

export function Insight({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 flex gap-3 rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
      <div className="prose-insight text-sm leading-relaxed text-cyan-50 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
