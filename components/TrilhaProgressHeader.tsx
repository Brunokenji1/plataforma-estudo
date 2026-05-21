'use client';

import { ProgressBar } from '@/components/ProgressBar';
import { useProgressStore } from '@/lib/progress-store';

type Props = {
  trilha: string;
  licaoSlugs: string[];
};

export function TrilhaProgressHeader({ trilha, licaoSlugs }: Props) {
  const pct = useProgressStore((s) => s.percentualTrilha(trilha, licaoSlugs));
  const concluidas = useProgressStore((s) =>
    licaoSlugs.filter((slug) => s.isConcluida(trilha, slug)).length,
  );

  return (
    <div className="mt-6 max-w-md">
      <div className="mb-2 flex items-center justify-between text-xs text-zinc-500">
        <span>
          {concluidas} de {licaoSlugs.length} lições
        </span>
        <span className="tabular-nums">{pct}%</span>
      </div>
      <ProgressBar value={pct} />
    </div>
  );
}
