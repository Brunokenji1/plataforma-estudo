import type { MDXComponents } from 'mdx/types';
import { Aviso } from './Aviso';
import { Code } from './Code';
import { CodeBlock } from './CodeBlock';
import { CodeSwap } from './CodeSwap';
import { ComplexidadeBox } from './ComplexidadeBox';
import { Insight } from './Insight';
import { Quiz } from './Quiz';

export const mdxComponents: MDXComponents = {
  Quiz,
  Insight,
  Aviso,
  ComplexidadeBox,
  CodeSwap,
  Code,
  h1: (props) => (
    <h1
      {...props}
      className="mb-4 mt-8 scroll-mt-20 text-3xl font-bold tracking-tight text-zinc-50 first:mt-0"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="mb-3 mt-10 scroll-mt-20 border-b border-zinc-800 pb-2 text-2xl font-semibold tracking-tight text-zinc-50"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mb-2 mt-8 scroll-mt-20 text-xl font-semibold tracking-tight text-zinc-100"
    />
  ),
  h4: (props) => (
    <h4 {...props} className="mb-2 mt-6 scroll-mt-20 text-base font-semibold text-zinc-100" />
  ),
  p: (props) => <p {...props} className="my-4 leading-7 text-zinc-300" />,
  a: (props) => (
    <a
      {...props}
      className="text-cyan-300 underline-offset-4 hover:underline"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
  ),
  ul: (props) => <ul {...props} className="my-4 list-disc space-y-1.5 pl-6 text-zinc-300" />,
  ol: (props) => <ol {...props} className="my-4 list-decimal space-y-1.5 pl-6 text-zinc-300" />,
  li: (props) => <li {...props} className="leading-7" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="my-5 border-l-2 border-zinc-700 pl-4 italic text-zinc-400"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-[0.9em] text-cyan-200"
    />
  ),
  pre: (props) => <CodeBlock {...props} />,
  hr: (props) => <hr {...props} className="my-8 border-zinc-800" />,
  table: (props) => (
    <div className="my-5 overflow-x-auto rounded-lg border border-zinc-800">
      <table {...props} className="w-full text-sm text-zinc-300" />
    </div>
  ),
  th: (props) => (
    <th {...props} className="border-b border-zinc-800 bg-zinc-900/50 px-3 py-2 text-left font-semibold text-zinc-200" />
  ),
  td: (props) => <td {...props} className="border-b border-zinc-900 px-3 py-2" />,
};
