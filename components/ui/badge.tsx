import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-cyan-500/15 text-cyan-300',
        outline: 'border-zinc-800 text-zinc-300',
        warn: 'border-transparent bg-amber-500/15 text-amber-300',
        danger: 'border-transparent bg-red-500/15 text-red-300',
        success: 'border-transparent bg-emerald-500/15 text-emerald-300',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
