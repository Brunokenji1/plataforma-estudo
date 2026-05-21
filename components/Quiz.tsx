'use client';

import * as React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  pergunta: string;
  opcoes: string[];
  resposta: number;
  explicacao?: string;
};

export function Quiz({ pergunta, opcoes, resposta, explicacao }: Props) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const [confirmed, setConfirmed] = React.useState(false);

  const acertou = confirmed && selected === resposta;
  const errou = confirmed && selected !== resposta;

  return (
    <div className="my-6 rounded-lg border border-zinc-800 bg-zinc-950/60 p-5">
      <p className="mb-4 font-medium text-zinc-100">{pergunta}</p>
      <div className="space-y-2">
        {opcoes.map((opcao, i) => {
          const isPicked = selected === i;
          const isAnswer = i === resposta;
          const showState = confirmed && (isPicked || isAnswer);
          return (
            <button
              key={i}
              type="button"
              disabled={confirmed}
              onClick={() => setSelected(i)}
              className={cn(
                'flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left text-sm transition',
                !confirmed && 'hover:border-cyan-500/50 hover:bg-zinc-900',
                isPicked && !confirmed && 'border-cyan-500/60 bg-cyan-500/5',
                !isPicked && !confirmed && 'border-zinc-800',
                showState && isAnswer && 'border-emerald-500/60 bg-emerald-500/10 text-emerald-100',
                showState && isPicked && !isAnswer && 'border-red-500/60 bg-red-500/10 text-red-100',
                confirmed && !showState && 'border-zinc-800 text-zinc-500',
              )}
            >
              <span
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-mono',
                  isPicked && !confirmed && 'border-cyan-400 text-cyan-300',
                  !isPicked && !confirmed && 'border-zinc-700 text-zinc-500',
                  showState && isAnswer && 'border-emerald-400 text-emerald-300',
                  showState && isPicked && !isAnswer && 'border-red-400 text-red-300',
                )}
              >
                {showState && isAnswer ? (
                  <Check className="h-3 w-3" />
                ) : showState && isPicked ? (
                  <X className="h-3 w-3" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span>{opcao}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        {!confirmed ? (
          <button
            type="button"
            disabled={selected === null}
            onClick={() => setConfirmed(true)}
            className="rounded-md bg-cyan-500 px-3 py-1.5 text-sm font-medium text-zinc-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Verificar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSelected(null);
              setConfirmed(false);
            }}
            className="rounded-md border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 transition hover:bg-zinc-900"
          >
            Tentar novamente
          </button>
        )}
        {confirmed ? (
          <span
            className={cn(
              'text-sm font-medium',
              acertou ? 'text-emerald-300' : 'text-red-300',
            )}
          >
            {acertou ? 'Correto' : 'Incorreto'}
          </span>
        ) : null}
      </div>

      {confirmed && explicacao ? (
        <div
          className={cn(
            'mt-4 rounded-md border-l-2 px-4 py-3 text-sm',
            acertou
              ? 'border-emerald-500/60 bg-emerald-500/5 text-emerald-100'
              : 'border-red-500/60 bg-red-500/5 text-red-100',
          )}
        >
          {explicacao}
        </div>
      ) : null}
    </div>
  );
}
