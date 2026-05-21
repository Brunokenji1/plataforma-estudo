import * as React from 'react';
import { AlertTriangle } from 'lucide-react';

export function Aviso({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 flex gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
      <div className="text-sm leading-relaxed text-amber-50 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
