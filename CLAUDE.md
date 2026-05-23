# TechStudy — Contexto para Claude Code

## Visão geral
Plataforma de estudos técnicos para estudantes de ADS/CC. Lições aprofundadas em MDX + exercícios rápidos por tópico. SSG, sem backend nesta fase.

## Stack
- Next.js 15 (App Router) + TypeScript strict
- Tailwind CSS 4 + shadcn/ui
- MDX via `@next/mdx` com rehype-pretty-code (Shiki) + remark-gfm
- Zustand com persist (localStorage) para progresso
- pnpm

## Comandos
- `pnpm dev` — dev server
- `pnpm build` — build de produção
- `pnpm lint` — ESLint
- `pnpm typecheck` — `tsc --noEmit`

Sempre rodar `pnpm typecheck` antes de finalizar uma task.

## Convenções de código
- TypeScript strict, sem `any` (usar `unknown` + narrowing)
- Componentes em PascalCase, hooks em camelCase começando com `use`
- Server Components por padrão; só usar `"use client"` quando precisa de estado/efeito
- Imports absolutos via `@/` (configurar no tsconfig)
- Tailwind: classes inline, sem CSS modules. Para variantes, usar `cva` (class-variance-authority)
- Componentes shadcn ficam em `components/ui/` — não editar diretamente, criar wrappers se precisar customizar

## Estrutura
```
app/                    # rotas (App Router)
content/                # MDX das lições + JSON de exercícios
  <trilha>/
    _meta.json
    NN-slug.mdx
    NN-slug.exercises.json
components/             # componentes React
  ui/                   # shadcn (não editar)
lib/                    # utils, types, stores
```

## Adicionando nova lição
1. Criar arquivo em `content/<trilha>/NN-slug.mdx` com frontmatter
2. Criar `content/<trilha>/NN-slug.exercises.json`
3. Adicionar entrada em `content/<trilha>/_meta.json` (ordem importa)
4. Frontmatter obrigatório:
```yaml
   titulo: string
   trilha: string (slug)
   duracaoMin: number
   dificuldade: "iniciante" | "intermediario" | "avancado"
   referencias: string[]
```

## Adicionando nova trilha
1. Criar pasta `content/<slug>/` com `_meta.json`
2. Criar pelo menos uma lição
3. Trilha aparece automaticamente na home (não hardcodar)

## Componentes MDX disponíveis
Importados globalmente via `mdx-components.tsx`:
- `<Quiz pergunta opcoes resposta explicacao />`
- `<Insight>` — callout azul
- `<Aviso>` — callout amarelo
- `<ComplexidadeBox melhor media pior />`
- `<CodeSwap>` + `<Code lang="...">` — toggle de linguagem em blocos de código (`java` / `cpp` / `python` / `typescript`)

## Tema visual
- Dark mode default (toggle disponível)
- Paleta: `#0a0a0a` fundo, `#06b6d4` accent ciano, cinzas claros pra texto
- Fontes: Inter (UI) + JetBrains Mono (código)
- Estética: técnica e limpa, referência docs.vercel.com / tailwindcss.com

## Padrão de commits (Conventional Commits)
- `feat:` nova funcionalidade
- `fix:` correção
- `chore:` config/build/deps
- `content:` adição/edição de lição ou exercício
- `refactor:` reorganização sem mudar comportamento
- `style:` formatação, css
- `docs:` README, CLAUDE.md

Exemplos:
- `content(algoritmos): adiciona lição de Big O`
- `feat: componente Quiz com feedback imediato`

## O que NÃO fazer
- Não criar API routes nesta fase
- Não adicionar autenticação
- Não popular conteúdo real das lições — só placeholders (conteúdo vem em outro fluxo, do chat)
- Não editar componentes em `components/ui/` (shadcn) diretamente
- Não usar `any` em TypeScript

## Uso correto de `<CodeSwap>`

Para blocos com variantes Java/C++ (ou outras linguagens), sintaxe estrita:

```mdx
<CodeSwap>
<Code lang="java">

\`\`\`java
// código
\`\`\`

</Code>
<Code lang="cpp">

\`\`\`cpp
// código
\`\`\`

</Code>
</CodeSwap>
```

Regras (MDX 3 é estrito):
- Sem indentação nas tags filhas dentro do componente
- Linha em branco entre `<Code lang="...">` e o ` ``` ` que vem depois
- Linha em branco entre o fechamento do ` ``` ` e o `</Code>`

Quando NÃO usar:
- Código fonte real da JVM (OpenJDK) — explique que é Java específico, use bloco markdown normal
- Trechos com referência a tipo/método exclusivo de uma linguagem (ex.: `std::vector` num exemplo sobre a STL, `synchronized` num exemplo sobre o memory model do Java) — não há equivalente direto, então tabs viram ruído

## Sobre o autor
Bruno Kenji — estudante de ADS, foco em Java/Spring Boot. Prefere respostas diretas e tecnicamente precisas. GitHub: Brunokenji1.