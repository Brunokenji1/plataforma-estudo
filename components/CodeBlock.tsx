'use client';

import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = React.HTMLAttributes<HTMLPreElement> & {
  'data-language'?: string;
  raw?: string;
};

export function CodeBlock({ className, children, raw, ...props }: Props) {
  const [copied, setCopied] = React.useState(false);
  const preRef = React.useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const text = raw ?? preRef.current?.innerText ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const lang = props['data-language'];

  return (
    <div className="group relative my-4 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/70">
      {lang ? (
        <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/40 px-4 py-1.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{lang}</span>
        </div>
      ) : null}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copiar código"
        className="absolute right-2 top-2 z-10 rounded-md border border-zinc-800 bg-zinc-900/80 p-1.5 text-zinc-400 opacity-0 transition hover:text-cyan-300 group-hover:opacity-100"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <pre
        ref={preRef}
        className={cn(
          'overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-200',
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
