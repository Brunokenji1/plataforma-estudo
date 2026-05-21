# TechStudy

Plataforma web de estudos técnicos para estudantes de ADS / Ciência da Computação.
Lições aprofundadas em MDX, exercícios rápidos por tópico, progresso persistido no navegador.

## Stack

- **Next.js 15** (App Router) + TypeScript strict
- **Tailwind CSS 4** + componentes estilo shadcn/ui
- **MDX** via `@next/mdx`, com `rehype-pretty-code` (Shiki) e `remark-gfm`
- **Zustand** com `persist` (localStorage) para progresso
- **Framer Motion** para microanimações
- **pnpm** como package manager

## Começando

```bash
pnpm install
pnpm dev
```

Build de produção (SSG):

```bash
pnpm build
pnpm start
```

Type check:

```bash
pnpm typecheck
```

## Arquitetura

```
app/
  page.tsx                          # home (lista de trilhas)
  trilhas/[trilha]/page.tsx         # índice de lições de uma trilha
  licao/[trilha]/[licao]/page.tsx   # render MDX da lição + TOC + nav
  exercicios/[trilha]/[licao]/page.tsx
content/
  <trilha>/
    _meta.json                      # título, descrição, cor, ordem das lições
    NN-slug.mdx                     # conteúdo da lição (frontmatter + MDX)
    NN-slug.exercises.json          # exercícios da lição
components/
  ui/                               # primitives (Button, Card, Badge)
  Quiz, Insight, Aviso, ComplexidadeBox  # blocos embutíveis em MDX
  CodeBlock, ProgressBar, TrilhaCard, LicaoNav, ExerciseRunner
  MDXComponents.tsx                 # mapeamento global de elementos MDX
lib/
  content.ts                        # leitura de /content via fs (server-only)
  progress-store.ts                 # zustand persist
  types.ts                          # Trilha, Licao, Exercicio, ...
mdx-components.tsx                  # hook do @next/mdx
```

## Adicionando uma nova trilha

1. Crie uma pasta em `content/<slug-da-trilha>/`.
2. Crie `content/<slug>/_meta.json`:

```json
{
  "titulo": "Banco de Dados",
  "descricao": "Modelagem relacional, SQL e normalização.",
  "cor": "#a78bfa",
  "ordem": ["01-modelo-relacional", "02-sql-basico"]
}
```

3. Adicione lições conforme a próxima seção. Apenas lições listadas em `ordem` aparecem na trilha.

A trilha vai aparecer automaticamente na home na próxima execução de `pnpm dev` ou `pnpm build`.

## Adicionando uma nova lição

1. Crie `content/<trilha>/<slug>.mdx`:

```mdx
---
titulo: "Modelo Relacional"
trilha: "banco-de-dados"
duracaoMin: 30
dificuldade: "iniciante"     # iniciante | intermediario | avancado
prerequisitos: []            # opcional, lista de slugs de lições da mesma trilha
referencias:
  - "Date, C. J. — An Introduction to Database Systems"
---

## Conceitos fundamentais

Texto da lição em Markdown/MDX...

<Insight>Callout azul para destaques importantes.</Insight>

<Aviso>Callout amarelo para pegadinhas.</Aviso>

<ComplexidadeBox melhor="O(1)" media="O(n)" pior="O(n²)" />

<Quiz
  pergunta="O que é uma chave primária?"
  opcoes={["Um índice", "Um identificador único", "Uma view", "Um trigger"]}
  resposta={1}
  explicacao="A chave primária identifica unicamente cada linha da tabela."
/>
```

2. Adicione o slug ao array `ordem` do `_meta.json` da trilha.

3. (Opcional) Crie `content/<trilha>/<slug>.exercises.json` com 3 a 10 exercícios:

```json
[
  {
    "id": "modelo-1",
    "enunciado": "Qual a finalidade de uma chave estrangeira?",
    "tipo": "multipla-escolha",
    "opcoes": [
      "Indexar uma coluna",
      "Garantir integridade referencial entre tabelas",
      "Criar uma view materializada",
      "Cifrar uma coluna"
    ],
    "resposta": 1,
    "explicacao": "Chaves estrangeiras vinculam linhas entre tabelas e impedem referências inválidas."
  }
]
```

Tipos suportados:

| `tipo`                | `resposta`                                              |
| --------------------- | ------------------------------------------------------- |
| `multipla-escolha`    | índice (number) da opção correta em `opcoes`            |
| `verdadeiro-falso`    | string `"verdadeiro"` ou `"falso"`                      |
| `codigo`              | string esperada (comparação case-insensitive trim-ada)  |

## Componentes MDX disponíveis

Estes componentes ficam globais dentro de qualquer `.mdx` em `content/` — não precisa importar:

- `<Quiz pergunta opcoes resposta explicacao />` — quiz inline com feedback imediato
- `<Insight>...</Insight>` — callout ciano para insights
- `<Aviso>...</Aviso>` — callout âmbar para alertas
- `<ComplexidadeBox melhor media pior espaco? />` — caixa de complexidade

Para registrar mais, edite [components/MDXComponents.tsx](components/MDXComponents.tsx).

## Sistema de progresso

Estado global em [lib/progress-store.ts](lib/progress-store.ts), persistido em
`localStorage` sob a chave `techstudy-progress`. API principal:

```ts
const { marcarConcluida, isConcluida, registrarScore, percentualTrilha } = useProgressStore();
```

Apagar progresso: `localStorage.removeItem('techstudy-progress')` no devtools.

## Convenções de design

- Tema dark por padrão (alternável via toggle no header)
- Paleta: fundo `#0a0a0a`, accent `#06b6d4`, textos em tons de zinc
- Tipografia: Inter (UI) + JetBrains Mono (código)
- Animações sutis com `framer-motion` em cards e linhas de lição

## Roadmap (fora de escopo nesta fase)

- Backend / API routes
- Autenticação e progresso por usuário
- Editor de código real e execução de snippets
- Conteúdo real das matérias — populado em outro fluxo
