import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type {
  Exercicio,
  Licao,
  LicaoFrontmatter,
  LicaoMeta,
  Trilha,
  TrilhaMetaFile,
} from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

function existsSafe(p: string): boolean {
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
}

export function listTrilhaSlugs(): string[] {
  if (!existsSafe(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getTrilha(slug: string): Trilha | null {
  const trilhaDir = path.join(CONTENT_DIR, slug);
  const metaPath = path.join(trilhaDir, '_meta.json');
  if (!existsSafe(metaPath)) return null;

  const meta = readJson<TrilhaMetaFile>(metaPath);
  const licoes: LicaoMeta[] = meta.ordem
    .map((licaoSlug) => readLicaoMeta(slug, licaoSlug))
    .filter((l): l is LicaoMeta => l !== null);

  return {
    slug,
    titulo: meta.titulo,
    descricao: meta.descricao,
    cor: meta.cor,
    licoes,
  };
}

export function listTrilhas(): Trilha[] {
  return listTrilhaSlugs()
    .map((s) => getTrilha(s))
    .filter((t): t is Trilha => t !== null);
}

function readLicaoFile(trilha: string, licaoSlug: string): {
  data: LicaoFrontmatter;
  content: string;
} | null {
  const mdxPath = path.join(CONTENT_DIR, trilha, `${licaoSlug}.mdx`);
  if (!existsSafe(mdxPath)) return null;
  const raw = fs.readFileSync(mdxPath, 'utf-8');
  const parsed = matter(raw);
  return {
    data: parsed.data as LicaoFrontmatter,
    content: parsed.content,
  };
}

export function readLicaoMeta(trilha: string, licaoSlug: string): LicaoMeta | null {
  const file = readLicaoFile(trilha, licaoSlug);
  if (!file) return null;
  return {
    slug: licaoSlug,
    titulo: file.data.titulo,
    duracaoMin: file.data.duracaoMin,
    dificuldade: file.data.dificuldade,
    prerequisitos: file.data.prerequisitos,
  };
}

export function getLicao(trilha: string, licaoSlug: string): Licao | null {
  const file = readLicaoFile(trilha, licaoSlug);
  if (!file) return null;
  return {
    slug: licaoSlug,
    trilha,
    titulo: file.data.titulo,
    duracaoMin: file.data.duracaoMin,
    dificuldade: file.data.dificuldade,
    prerequisitos: file.data.prerequisitos,
    referencias: file.data.referencias,
    content: file.content,
  };
}

export function getExercicios(trilha: string, licaoSlug: string): Exercicio[] {
  const file = path.join(CONTENT_DIR, trilha, `${licaoSlug}.exercises.json`);
  if (!existsSafe(file)) return [];
  return readJson<Exercicio[]>(file);
}

export function getAdjacentLicoes(
  trilha: string,
  licaoSlug: string,
): { prev: LicaoMeta | null; next: LicaoMeta | null } {
  const t = getTrilha(trilha);
  if (!t) return { prev: null, next: null };
  const idx = t.licoes.findIndex((l) => l.slug === licaoSlug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? t.licoes[idx - 1] : null,
    next: idx < t.licoes.length - 1 ? t.licoes[idx + 1] : null,
  };
}

export function extractHeadings(mdx: string): { id: string; text: string; level: number }[] {
  const lines = mdx.split('\n');
  const headings: { id: string; text: string; level: number }[] = [];
  let inCodeFence = false;
  for (const line of lines) {
    if (/^```/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const m = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const level = m[1].length;
    const text = m[2].replace(/[*_`]/g, '').trim();
    const id = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    headings.push({ id, text, level });
  }
  return headings;
}
