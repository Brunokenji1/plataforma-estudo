import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LicaoNav } from '@/components/LicaoNav';
import {
  extractHeadings,
  getAdjacentLicoes,
  getLicao,
  getTrilha,
  listTrilhaSlugs,
} from '@/lib/content';
import type { Dificuldade } from '@/lib/types';

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
  return { title: l.titulo };
}

const difLabel: Record<Dificuldade, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
};

const difVariant: Record<Dificuldade, 'default' | 'warn' | 'danger'> = {
  iniciante: 'default',
  intermediario: 'warn',
  avancado: 'danger',
};

export default async function LicaoPage({
  params,
}: {
  params: Promise<{ trilha: string; licao: string }>;
}) {
  const { trilha, licao: licaoSlug } = await params;
  const licao = getLicao(trilha, licaoSlug);
  const trilhaInfo = getTrilha(trilha);
  if (!licao || !trilhaInfo) notFound();

  const { prev, next } = getAdjacentLicoes(trilha, licaoSlug);
  const headings = extractHeadings(licao.content);

  const MdxModule = await import(`@/content/${trilha}/${licaoSlug}.mdx`);
  const Content = MdxModule.default;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link
        href={`/trilhas/${trilha}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-cyan-300"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {trilhaInfo.titulo}
      </Link>

      <header className="mb-10 border-b border-zinc-900 pb-6">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-zinc-50">{licao.titulo}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
          <Badge variant={difVariant[licao.dificuldade]}>{difLabel[licao.dificuldade]}</Badge>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {licao.duracaoMin} min de leitura
          </span>
          {licao.referencias && licao.referencias.length > 0 ? (
            <span className="text-zinc-600">· {licao.referencias.length} referências</span>
          ) : null}
        </div>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr,260px]">
        <article className="min-w-0">
          <div className="prose-licao">
            <Content />
          </div>

          {licao.referencias && licao.referencias.length > 0 ? (
            <section className="mt-12 border-t border-zinc-900 pt-6">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Referências
              </h2>
              <ul className="space-y-1 text-sm text-zinc-400">
                {licao.referencias.map((ref) => (
                  <li key={ref} className="flex gap-2">
                    <span className="text-zinc-600">—</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <LicaoNav
            trilha={trilha}
            licaoSlug={licaoSlug}
            prev={prev}
            next={next}
            headings={headings}
          />
        </div>
      </div>
    </div>
  );
}
