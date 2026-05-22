'use client';

import { useEffect, useState } from 'react';
import { useLanguageStore, type CodeLang } from '@/lib/language-store';
import { cn } from '@/lib/utils';

const OPTIONS: { value: CodeLang; label: string }[] = [
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

export function LanguageToggle() {
  const lang = useLanguageStore((s) => s.lang);
  const setLang = useLanguageStore((s) => s.setLang);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted ? lang : 'java';

  return (
    <div
      className="inline-flex rounded-md border border-zinc-800 bg-zinc-900 p-0.5 font-mono text-xs"
      role="radiogroup"
      aria-label="Linguagem dos exemplos de código"
    >
      {OPTIONS.map((opt) => {
        const isActive = current === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setLang(opt.value)}
            className={cn(
              'rounded px-2.5 py-1 transition-colors',
              isActive
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-zinc-500 hover:text-zinc-300',
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
