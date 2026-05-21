'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ProgressBar';
import { useProgressStore } from '@/lib/progress-store';
import type { Trilha } from '@/lib/types';

type Props = {
  trilha: Trilha;
};

export function TrilhaCard({ trilha }: Props) {
  const licaoSlugs = trilha.licoes.map((l) => l.slug);
  const pct = useProgressStore((s) => s.percentualTrilha(trilha.slug, licaoSlugs));

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <Link href={`/trilhas/${trilha.slug}`} className="block group">
        <Card className="relative overflow-hidden transition-colors hover:border-cyan-500/40">
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${trilha.cor}, transparent)` }}
            aria-hidden
          />
          <CardHeader>
            <div className="flex items-center justify-between">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-md"
                style={{ backgroundColor: `${trilha.cor}20`, color: trilha.cor }}
              >
                <BookOpen className="h-4 w-4" />
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-cyan-400" />
            </div>
            <CardTitle className="mt-3">{trilha.titulo}</CardTitle>
            <CardDescription>{trilha.descricao}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>{trilha.licoes.length} lições</span>
              <span className="tabular-nums">{pct}%</span>
            </div>
            <ProgressBar value={pct} />
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
