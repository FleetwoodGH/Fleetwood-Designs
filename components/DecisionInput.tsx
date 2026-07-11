import type { ReactNode } from "react";

type DecisionInputProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function DecisionInput({
  title,
  description,
  children,
}: DecisionInputProps) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-2xl leading-7 text-neutral-600">
          {description}
        </p>
      )}

      <div className="mt-6">{children}</div>
    </section>
  );
}
