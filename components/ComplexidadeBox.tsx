type Props = {
  melhor: string;
  media: string;
  pior: string;
  espaco?: string;
};

export function ComplexidadeBox({ melhor, media, pior, espaco }: Props) {
  const items = [
    { label: 'Melhor caso', value: melhor, tone: 'text-emerald-300' },
    { label: 'Caso médio', value: media, tone: 'text-cyan-300' },
    { label: 'Pior caso', value: pior, tone: 'text-red-300' },
  ];
  if (espaco) items.push({ label: 'Espaço', value: espaco, tone: 'text-violet-300' });

  return (
    <div className="my-5 grid gap-3 rounded-lg border border-zinc-800 bg-zinc-950/60 p-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
            {item.label}
          </p>
          <p className={`mt-1 font-mono text-lg font-semibold ${item.tone}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
