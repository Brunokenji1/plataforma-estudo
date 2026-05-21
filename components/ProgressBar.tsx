import { cn } from '@/lib/utils';

type Props = {
  value: number; // 0..100
  className?: string;
  showLabel?: boolean;
};

export function ProgressBar({ value, className, showLabel = false }: Props) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800"
        role="progressbar"
        aria-valuenow={safe}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-cyan-500 transition-[width] duration-500 ease-out"
          style={{ width: `${safe}%` }}
        />
      </div>
      {showLabel ? (
        <span className="text-xs tabular-nums text-zinc-400">{safe}%</span>
      ) : null}
    </div>
  );
}
