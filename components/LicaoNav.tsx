'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/lib/progress-store';
import type { LicaoMeta } from '@/lib/types';

type Heading = { id: string; text: string; level: number };

type Props = {
  trilha: string;
  licaoSlug: string;
  prev: LicaoMeta | null;
  next: LicaoMeta | null;
  headings: Heading[];
};

export function LicaoNav({ trilha, licaoSlug, prev, next, headings }: Props) {
  const isConcluida = useProgressStore((s) => s.isConcluida(trilha, licaoSlug));
  const marcar = useProgressStore((s) => s.marcarConcluida);
  const desmarcar = useProgressStore((s) => s.desmarcarConcluida);

  return (
    <aside className="space-y-6 text-sm">
      <div className="space-y-2">
        <Button
          variant={isConcluida ? 'secondary' : 'default'}
          className="w-full"
          onClick={() =>
            isConcluida ? desmarcar(trilha, licaoSlug) : marcar(trilha, licaoSlug)
          }
        >
          <Check className="h-4 w-4" />
          {isConcluida ? 'Concluída' : 'Marcar concluída'}
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/exercicios/${trilha}/${licaoSlug}`}>Resolver exercícios</Link>
        </Button>
      </div>

      {headings.length > 0 ? (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Sumário
          </p>
          <ul className="space-y-1 border-l border-zinc-800">
            {headings
              .filter((h) => h.level <= 3)
              .map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="-ml-px block border-l border-transparent py-1 pl-3 text-zinc-400 transition hover:border-cyan-400 hover:text-cyan-300"
                    style={{ paddingLeft: `${(h.level - 1) * 12 + 12}px` }}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ) : null}

      <div className="flex justify-between gap-2 pt-4">
        {prev ? (
          <Button asChild variant="ghost" size="sm">
            <Link href={`/licao/${trilha}/${prev.slug}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="truncate">{prev.titulo}</span>
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button asChild variant="ghost" size="sm">
            <Link href={`/licao/${trilha}/${next.slug}`}>
              <span className="truncate">{next.titulo}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : null}
      </div>
    </aside>
  );
}
