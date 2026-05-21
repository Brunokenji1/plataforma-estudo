'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import { useProgressStore } from '@/lib/progress-store';
import { cn } from '@/lib/utils';
import type { Exercicio } from '@/lib/types';

type Props = {
  trilha: string;
  licao: string;
  exercicios: Exercicio[];
};

type Answer = { idx: number; correct: boolean; given: string | number };

export function ExerciseRunner({ trilha, licao, exercicios }: Props) {
  const [idx, setIdx] = React.useState(0);
  const [given, setGiven] = React.useState<string | number | null>(null);
  const [confirmed, setConfirmed] = React.useState(false);
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const registrarScore = useProgressStore((s) => s.registrarScore);

  const total = exercicios.length;
  const ex = exercicios[idx];
  const done = answers.length === total;
  const correct = answers.filter((a) => a.correct).length;

  React.useEffect(() => {
    if (done) registrarScore(trilha, licao, correct, total);
  }, [done, correct, total, registrarScore, trilha, licao]);

  if (total === 0) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-8 text-center text-zinc-400">
        Nenhum exercício disponível para esta lição.
      </div>
    );
  }

  const isCorrect = (e: Exercicio, val: string | number): boolean => {
    if (typeof e.resposta === 'number') return Number(val) === e.resposta;
    return String(val).trim().toLowerCase() === String(e.resposta).trim().toLowerCase();
  };

  function confirmar() {
    if (given === null) return;
    const ok = isCorrect(ex, given);
    setAnswers((prev) => [...prev, { idx, correct: ok, given }]);
    setConfirmed(true);
  }

  function proximo() {
    setIdx((i) => Math.min(i + 1, total - 1));
    setGiven(null);
    setConfirmed(false);
  }

  function resetar() {
    setIdx(0);
    setGiven(null);
    setConfirmed(false);
    setAnswers([]);
  }

  if (done) {
    const pct = Math.round((correct / total) * 100);
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">Resultado</p>
        <h2 className="mt-2 text-3xl font-bold text-zinc-50">
          {correct} de {total} corretas
        </h2>
        <p className="mt-1 text-zinc-400">Score final: {pct}%</p>
        <div className="mt-4 max-w-sm">
          <ProgressBar value={pct} showLabel />
        </div>
        <div className="mt-6 flex gap-2">
          <Button onClick={resetar} variant="outline">
            <RotateCcw className="h-4 w-4" />
            Refazer
          </Button>
          <Button asChild>
            <Link href={`/licao/${trilha}/${licao}`}>
              <ArrowLeft className="h-4 w-4" />
              Voltar à lição
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const progress = Math.round((idx / total) * 100);

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center justify-between text-xs text-zinc-500">
          <span>
            Questão {idx + 1} de {total}
          </span>
          <span className="tabular-nums">{progress}%</span>
        </div>
        <ProgressBar value={progress} />
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-6">
        <p className="mb-5 text-lg text-zinc-100">{ex.enunciado}</p>

        {ex.tipo === 'multipla-escolha' && ex.opcoes ? (
          <div className="space-y-2">
            {ex.opcoes.map((opcao, i) => {
              const picked = given === i;
              const isAns = ex.resposta === i;
              const show = confirmed && (picked || isAns);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={confirmed}
                  onClick={() => setGiven(i)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left text-sm transition',
                    !confirmed && 'hover:border-cyan-500/50 hover:bg-zinc-900',
                    picked && !confirmed && 'border-cyan-500/60 bg-cyan-500/5',
                    !picked && !confirmed && 'border-zinc-800',
                    show && isAns && 'border-emerald-500/60 bg-emerald-500/10 text-emerald-100',
                    show && picked && !isAns && 'border-red-500/60 bg-red-500/10 text-red-100',
                  )}
                >
                  <span className="font-mono text-xs text-zinc-500">
                    {show && isAns ? (
                      <Check className="h-3.5 w-3.5 text-emerald-300" />
                    ) : show && picked ? (
                      <X className="h-3.5 w-3.5 text-red-300" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </span>
                  <span>{opcao}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {ex.tipo === 'verdadeiro-falso' ? (
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Verdadeiro', val: 'verdadeiro' },
              { label: 'Falso', val: 'falso' },
            ].map((opt) => {
              const picked = given === opt.val;
              const isAns = String(ex.resposta).toLowerCase() === opt.val;
              const show = confirmed && (picked || isAns);
              return (
                <button
                  key={opt.val}
                  type="button"
                  disabled={confirmed}
                  onClick={() => setGiven(opt.val)}
                  className={cn(
                    'rounded-md border px-3 py-3 text-sm font-medium transition',
                    !confirmed && 'hover:border-cyan-500/50 hover:bg-zinc-900',
                    picked && !confirmed && 'border-cyan-500/60 bg-cyan-500/5',
                    !picked && !confirmed && 'border-zinc-800 text-zinc-300',
                    show && isAns && 'border-emerald-500/60 bg-emerald-500/10 text-emerald-100',
                    show && picked && !isAns && 'border-red-500/60 bg-red-500/10 text-red-100',
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        ) : null}

        {ex.tipo === 'codigo' ? (
          <textarea
            value={typeof given === 'string' ? given : ''}
            onChange={(e) => setGiven(e.target.value)}
            disabled={confirmed}
            placeholder="Digite sua resposta..."
            className="min-h-[120px] w-full rounded-md border border-zinc-800 bg-zinc-950 p-3 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500/60 focus:outline-none disabled:opacity-70"
          />
        ) : null}

        {confirmed ? (
          <div
            className={cn(
              'mt-5 rounded-md border-l-2 px-4 py-3 text-sm',
              answers[answers.length - 1]?.correct
                ? 'border-emerald-500/60 bg-emerald-500/5 text-emerald-100'
                : 'border-red-500/60 bg-red-500/5 text-red-100',
            )}
          >
            <p className="mb-1 font-medium">
              {answers[answers.length - 1]?.correct ? 'Correto' : 'Incorreto'}
            </p>
            <p className="text-zinc-200">{ex.explicacao}</p>
          </div>
        ) : null}

        <div className="mt-5 flex justify-end">
          {!confirmed ? (
            <Button onClick={confirmar} disabled={given === null || given === ''}>
              Verificar
            </Button>
          ) : (
            <Button onClick={proximo}>
              {idx === total - 1 ? 'Ver resultado' : 'Próxima'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
