import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ExerciseRunner } from '@/components/ExerciseRunner';
import {
  getExercicios,
  getLicao,
  getTrilha,
  listTrilhaSlugs,
} from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { trilha: string; licao: string }[] = [];
  for (const trilha of listTrilhaSlugs()) {
    const t = getTrilha(trilha);
    if (!t) continue;
    for (const licao of t.licoes) {
      params.push({ trilha, licao: licao.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trilha: string; licao: string }>;
}) {
  const { trilha, licao } = await params;
  const l = getLicao(trilha, licao);
  if (!l) return {};
  return { title: `Exercícios — ${l.titulo}` };
}

export default async function ExerciciosPage({
  params,
}: {
  params: Promise<{ trilha: string; licao: string }>;
}) {
  const { trilha, licao: licaoSlug } = await params;
  const licao = getLicao(trilha, licaoSlug);
  if (!licao) notFound();

  const exercicios = getExercicios(trilha, licaoSlug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href={`/licao/${trilha}/${licaoSlug}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-cyan-300"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar à lição
      </Link>

      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">Exercícios</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-50">{licao.titulo}</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {exercicios.length} {exercicios.length === 1 ? 'questão' : 'questões'} · feedback imediato
        </p>
      </header>

      <ExerciseRunner trilha={trilha} licao={licaoSlug} exercicios={exercicios} />
    </div>
  );
}
