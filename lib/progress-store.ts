'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type LicaoKey = string; // `${trilha}/${licao}`

type ExerciseScore = {
  correct: number;
  total: number;
  ts: number;
};

type ProgressState = {
  licoesConcluidas: Record<LicaoKey, number>; // ts of completion
  scores: Record<LicaoKey, ExerciseScore>;
  marcarConcluida: (trilha: string, licao: string) => void;
  desmarcarConcluida: (trilha: string, licao: string) => void;
  isConcluida: (trilha: string, licao: string) => boolean;
  registrarScore: (trilha: string, licao: string, correct: number, total: number) => void;
  getScore: (trilha: string, licao: string) => ExerciseScore | null;
  percentualTrilha: (trilha: string, licaoSlugs: string[]) => number;
  resetTrilha: (trilha: string) => void;
};

const key = (trilha: string, licao: string): LicaoKey => `${trilha}/${licao}`;

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      licoesConcluidas: {},
      scores: {},

      marcarConcluida: (trilha, licao) =>
        set((s) => ({
          licoesConcluidas: { ...s.licoesConcluidas, [key(trilha, licao)]: Date.now() },
        })),

      desmarcarConcluida: (trilha, licao) =>
        set((s) => {
          const next = { ...s.licoesConcluidas };
          delete next[key(trilha, licao)];
          return { licoesConcluidas: next };
        }),

      isConcluida: (trilha, licao) => Boolean(get().licoesConcluidas[key(trilha, licao)]),

      registrarScore: (trilha, licao, correct, total) =>
        set((s) => ({
          scores: {
            ...s.scores,
            [key(trilha, licao)]: { correct, total, ts: Date.now() },
          },
        })),

      getScore: (trilha, licao) => get().scores[key(trilha, licao)] ?? null,

      percentualTrilha: (trilha, licaoSlugs) => {
        if (licaoSlugs.length === 0) return 0;
        const concluidas = get().licoesConcluidas;
        const done = licaoSlugs.filter((slug) => Boolean(concluidas[key(trilha, slug)])).length;
        return Math.round((done / licaoSlugs.length) * 100);
      },

      resetTrilha: (trilha) =>
        set((s) => {
          const filterPrefix = (rec: Record<string, unknown>) =>
            Object.fromEntries(Object.entries(rec).filter(([k]) => !k.startsWith(`${trilha}/`)));
          return {
            licoesConcluidas: filterPrefix(s.licoesConcluidas) as Record<LicaoKey, number>,
            scores: filterPrefix(s.scores) as Record<LicaoKey, ExerciseScore>,
          };
        }),
    }),
    {
      name: 'techstudy-progress',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
