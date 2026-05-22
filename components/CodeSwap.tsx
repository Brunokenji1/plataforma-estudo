'use client';

import {
  Children,
  isValidElement,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { useLanguageStore, type CodeLang } from '@/lib/language-store';
import { cn } from '@/lib/utils';

type CodeChild = ReactElement<{ lang: CodeLang; children: ReactNode }>;

const LABELS: Record<CodeLang, string> = {
  java: 'Java',
  cpp: 'C++',
  python: 'Python',
  typescript: 'TypeScript',
};

function hasLangProp(node: unknown): node is CodeChild {
  if (!isValidElement(node)) return false;
  const props = node.props as { lang?: unknown };
  return typeof props.lang === 'string';
}

export function CodeSwap({ children }: { children: ReactNode }) {
  const lang = useLanguageStore((s) => s.lang);
  const setLang = useLanguageStore((s) => s.setLang);
  const hydrated = useLanguageStore((s) => s._hydrated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const blocks = Children.toArray(children).filter(hasLangProp);

  if (blocks.length === 0) return null;

  const effectiveLang: CodeLang = mounted && hydrated ? lang : 'java';
  const active = blocks.find((b) => b.props.lang === effectiveLang) ?? blocks[0];
  const available = blocks.map((b) => b.props.lang);

  if (available.length === 1) {
    return <div className="my-4">{active.props.children}</div>;
  }

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-zinc-800">
      <div
        className="flex border-b border-zinc-800 bg-zinc-900"
        role="tablist"
        aria-label="Selecionar linguagem"
      >
        {available.map((l) => {
          const isActive = l === effectiveLang;
          return (
            <button
              key={l}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setLang(l)}
              className={cn(
                '-mb-px border-b-2 px-4 py-2 font-mono text-sm transition-colors',
                isActive
                  ? 'border-cyan-400 bg-zinc-950 text-cyan-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200',
              )}
            >
              {LABELS[l]}
            </button>
          );
        })}
      </div>
      <div className="bg-zinc-950 [&_pre]:!my-0 [&_pre]:!rounded-none [&_pre]:!border-0">
        {active.props.children}
      </div>
    </div>
  );
}
