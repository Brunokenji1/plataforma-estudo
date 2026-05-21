import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { TrilhaProgressHeader } from '@/components/TrilhaProgressHeader';
import { LicaoRow } from '@/components/LicaoRow';
import { getTrilha, listTrilhaSlugs } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return listTrilhaSlugs().map((trilha) => ({ trilha }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trilha: string }>;
}) {
  const { trilha } = await params;
  const t = getTrilha(trilha);
  if (!t) return {};
  return { title: t.titulo, description: t.descricao };
}

export default async function TrilhaPage({
  params,
}: {
  params: Promise<{ trilha: string }>;
}) {
  const { trilha: trilhaSlug } = await params;
  const trilha = getTrilha(trilhaSlug);
  if (!trilha) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-cyan-300"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Todas as trilhas
      </Link>

      <header className="mb-10">
        <div
          className="mb-4 inline-block h-1 w-12 rounded-full"
          style={{ backgroundColor: trilha.cor }}
        />
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-zinc-50">{trilha.titulo}</h1>
        <p className="max-w-2xl text-lg text-zinc-400">{trilha.descricao}</p>
        <TrilhaProgressHeader
          trilha={trilha.slug}
          licaoSlugs={trilha.licoes.map((l) => l.slug)}
        />
      </header>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Lições
        </h2>
        {trilha.licoes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-800 p-8 text-center text-zinc-500">
            Esta trilha ainda não tem lições.
          </div>
        ) : (
          <ol className="space-y-2">
            {trilha.licoes.map((licao, i) => (
              <li key={licao.slug}>
                <LicaoRow trilha={trilha.slug} licao={licao} index={i + 1} />
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
