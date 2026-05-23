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

const LABELS: Record<CodeLang, string> = {
  java: 'Java',
  cpp: 'C++',
  python: 'Python',
  typescript: 'TypeScript',
};

type CodeBlock = {
  lang: CodeLang;
  content: ReactNode;
};

function findCodeBlocks(children: ReactNode): CodeBlock[] {
  const result: CodeBlock[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;

    const props =
      (child as ReactElement<Record<string, unknown>>).props ?? {};
    const dataLang = props['data-code-lang'];

    if (typeof dataLang === 'string') {
      result.push({
        lang: dataLang as CodeLang,
        content: props.children as ReactNode,
      });
      return;
    }

    if (props.children) {
      result.push(...findCodeBlocks(props.children as ReactNode));
    }
  });

  return result;
}

export function CodeSwap({ children }: { children: ReactNode }) {
  const lang = useLanguageStore((s) => s.lang);
  const setLang = useLanguageStore((s) => s.setLang);
  const hydrated = useLanguageStore((s) => s._hydrated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const blocks = findCodeBlocks(children);

  if (process.env.NODE_ENV === 'development' && blocks.length === 0) {
    // eslint-disable-next-line no-console
    console.warn(
      '[CodeSwap] Nenhum bloco <Code lang=...> encontrado. Children:',
      children,
    );
  }

  if (blocks.length === 0) {
    return (
      <div className="my-4 rounded-lg border border-yellow-700 bg-yellow-900/20 p-4 text-sm text-yellow-200">
        ⚠️ CodeSwap sem blocos. Verifique a sintaxe: cada filho deve usar{' '}
        <code>{'<Code lang="java">'}</code>.
      </div>
    );
  }

  const effectiveLang: CodeLang =
    mounted && hydrated ? lang : blocks[0].lang;
  const active = blocks.find((b) => b.lang === effectiveLang) ?? blocks[0];
  const available = blocks.map((b) => b.lang);

  if (available.length === 1) {
    return <div className="my-4">{active.content}</div>;
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
              {LABELS[l] ?? l}
            </button>
          );
        })}
      </div>
      <div className="bg-zinc-950 [&_pre]:!my-0 [&_pre]:!rounded-none [&_pre]:!border-0">
        {active.content}
      </div>
    </div>
  );
}
