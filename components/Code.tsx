import type { ReactNode } from 'react';

export type CodeLang = 'java' | 'cpp' | 'python' | 'typescript';

type CodeProps = {
  lang: CodeLang;
  children: ReactNode;
};

export function Code({ lang, children }: CodeProps) {
  return <div data-code-lang={lang}>{children}</div>;
}
