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
        "w-full touch-manipulation select-none rounded-xl border p-4 text-left transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
        selected
          ? "border-neutral-900 bg-neutral-100"
          : "border-neutral-200 bg-white hover:border-neutral-400 hover:bg-neutral-50",
      ].join(" ")}
    >
      <span
        className="pointer-events-none mb-2 block text-xl leading-none"
        aria-hidden="true"
      >
        {icon}
      </span>

      <h3 className="pointer-events-none mb-1 text-base font-semibold tracking-tight text-neutral-900">
        {title}
      </h3>

      <p className="pointer-events-none text-xs leading-4 text-neutral-500">
        {description}
      </p>
    </button>
  );
}
