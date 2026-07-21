import SelectionCard from "@/components/SelectionCard";

type DecisionOption = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type DecisionStepProps = {
  question: string;
  options: DecisionOption[];
  selectedOption: string | null;
  columns?: 2 | 3;
  onSelect: (optionId: string) => void;
};

export default function DecisionStep({
  question,
  options,
  selectedOption,
  columns = 2,
  onSelect,
}: DecisionStepProps) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold tracking-tight text-neutral-900">
        {question}
      </h2>

      <div
        className={`grid gap-3 ${
          columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        {options.map((option) => (
          <SelectionCard
            key={option.id}
            icon={option.icon}
            title={option.title}
            description={option.description}
            selected={selectedOption === option.id}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>
    </section>
  );
}
