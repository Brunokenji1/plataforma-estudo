import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TrilhaCard } from '@/components/TrilhaCard';
import { Button } from '@/components/ui/button';
import { listTrilhas } from '@/lib/content';

export default function HomePage() {
  const trilhas = listTrilhas();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <section className="mb-16 max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 text-xs font-medium text-cyan-300">
          <Sparkles className="h-3 w-3" />
          <span>plataforma de estudo técnico</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
          Aprenda <span className="text-cyan-400">tecnologia</span> com profundidade.
        </h1>
        <p className="mb-6 text-lg leading-relaxed text-zinc-400">
          Lições densas, exercícios rápidos e progresso persistido. Pensado pra quem está em ADS,
          Ciência da Computação ou simplesmente quer dominar os fundamentos.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="#trilhas">
              Começar a estudar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sobre o projeto
            </a>
          </Button>
        </div>
      </section>

      <section id="trilhas">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-50">Trilhas</h2>
            <p className="text-sm text-zinc-500">
              Cada trilha é uma sequência de lições com exercícios.
            </p>
          </div>
          <p className="text-xs text-zinc-600">
            {trilhas.length} {trilhas.length === 1 ? 'trilha' : 'trilhas'}
          </p>
        </div>

        {trilhas.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-800 p-12 text-center text-zinc-500">
            Nenhuma trilha encontrada. Adicione uma pasta em{' '}
            <code className="font-mono text-cyan-300">content/</code>.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trilhas.map((t) => (
              <TrilhaCard key={t.slug} trilha={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
