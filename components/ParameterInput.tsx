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
    <section className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5">
      <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
        {title}
      </h2>

      {description && (
        <p className="mt-1 max-w-2xl text-xs leading-4 text-neutral-500">
          {description}
        </p>
      )}

      <div className="mt-4">{children}</div>
    </section>
  );
}
