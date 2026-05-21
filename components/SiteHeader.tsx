import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm">
          <Terminal className="h-4 w-4 text-cyan-400" />
          <span className="font-semibold tracking-tight text-zinc-50">techstudy</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">plataforma</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100"
          >
            Trilhas
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
