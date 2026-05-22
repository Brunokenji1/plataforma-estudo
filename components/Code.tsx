import type { ReactNode } from 'react';
import type { CodeLang } from '@/lib/language-store';

type CodeProps = {
  lang: CodeLang;
  children: ReactNode;
};

export function Code({ children }: CodeProps) {
  return <>{children}</>;
}
