type SelectionCardProps = {
  title: string;
  description: string;
  icon: string;
  selected?: boolean;
  onSelect?: () => void;
};

export default function SelectionCard({
  title,
  description,
  icon,
  selected = false,
  onSelect,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        "w-full rounded-2xl border p-6 text-left transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
        selected
          ? "border-neutral-900 bg-neutral-100"
          : "border-neutral-200 bg-white hover:border-neutral-400 hover:bg-neutral-50",
      ].join(" ")}
    >
      <span className="mb-5 block text-3xl" aria-hidden="true">
        {icon}
      </span>

      <h3 className="mb-2 text-xl font-semibold tracking-tight text-neutral-900">
        {title}
      </h3>

      <p className="leading-7 text-neutral-600">{description}</p>
    </button>
  );
}
