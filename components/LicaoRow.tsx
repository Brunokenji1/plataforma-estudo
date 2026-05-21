'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Clock, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useProgressStore } from '@/lib/progress-store';
import { cn } from '@/lib/utils';
import type { LicaoMeta } from '@/lib/types';

type Props = {
  trilha: string;
  licao: LicaoMeta;
  index: number;
};

const difLabel: Record<LicaoMeta['dificuldade'], string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
};

const difVariant: Record<LicaoMeta['dificuldade'], 'default' | 'warn' | 'danger'> = {
  iniciante: 'default',
  intermediario: 'warn',
  avancado: 'danger',
};

export function LicaoRow({ trilha, licao, index }: Props) {
  const isConcluida = useProgressStore((s) => s.isConcluida(trilha, licao.slug));
  const isConcluidaAll = useProgressStore((s) => s.isConcluida);

  const prereqsFaltando = (licao.prerequisitos ?? []).filter(
    (slug) => !isConcluidaAll(trilha, slug),
  );
  const bloqueada = prereqsFaltando.length > 0;

  return (
    <motion.div
      whileHover={bloqueada ? undefined : { x: 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <Link
        href={`/licao/${trilha}/${licao.slug}`}
        className={cn(
          'group flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950/40 p-4 transition',
          !bloqueada && 'hover:border-cyan-500/40',
          bloqueada && 'opacity-60',
        )}
      >
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-md border font-mono text-xs',
            isConcluida
              ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300'
              : bloqueada
                ? 'border-zinc-800 bg-zinc-900 text-zinc-600'
                : 'border-zinc-800 bg-zinc-900 text-zinc-400 group-hover:border-cyan-500/50 group-hover:text-cyan-300',
          )}
        >
          {isConcluida ? (
            <Check className="h-4 w-4" />
          ) : bloqueada ? (
            <Lock className="h-3.5 w-3.5" />
          ) : (
            String(index).padStart(2, '0')
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-zinc-100">{licao.titulo}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <Badge variant={difVariant[licao.dificuldade]}>
              {difLabel[licao.dificuldade]}
            </Badge>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {licao.duracaoMin} min
            </span>
            {bloqueada ? (
              <span className="text-amber-400">
                Requer: {prereqsFaltando.join(', ')}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
