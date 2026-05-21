import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SiteHeader } from '@/components/SiteHeader';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TechStudy — Plataforma de Estudo',
    template: '%s · TechStudy',
  },
  description:
    'Lições aprofundadas e exercícios rápidos de tecnologia para estudantes de ADS e Ciência da Computação.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-200 antialiased">
        <ThemeProvider>
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />
            <SiteHeader />
            <main className="relative">{children}</main>
            <footer className="border-t border-zinc-900 py-8 text-center text-xs text-zinc-600">
              techstudy · feito para estudar de verdade
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
