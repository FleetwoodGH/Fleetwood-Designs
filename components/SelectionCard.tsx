type SelectionCardProps = {
  title: string;
  description: string;
  symbol: string;
};

export default function SelectionCard({
  title,
  description,
  symbol,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      className="w-full rounded-2xl border border-neutral-200 bg-white p-6 text-left transition hover:border-neutral-400 hover:bg-neutral-50"
    >
      <span className="mb-5 block text-3xl" aria-hidden="true">
        {symbol}
      </span>

      <h3 className="mb-2 text-xl font-semibold text-neutral-900">{title}</h3>

      <p className="leading-7 text-neutral-600">{description}</p>
    </button>
  );
}
