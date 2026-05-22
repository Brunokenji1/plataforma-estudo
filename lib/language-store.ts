'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CodeLang = 'java' | 'cpp' | 'python' | 'typescript';

type LanguageState = {
  lang: CodeLang;
  setLang: (lang: CodeLang) => void;
  _hydrated: boolean;
  _setHydrated: () => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: 'java',
      setLang: (lang) => set({ lang }),
      _hydrated: false,
      _setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: 'techstudy-language',
      onRehydrateStorage: () => (state) => {
        state?._setHydrated();
      },
    },
  ),
);
