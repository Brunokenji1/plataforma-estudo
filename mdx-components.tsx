import type { MDXComponents } from 'mdx/types';
import { mdxComponents } from '@/components/MDXComponents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...mdxComponents,
  };
}
