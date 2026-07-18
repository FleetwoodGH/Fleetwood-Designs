import type {
  MakerWorldParameter,
  MakerWorldParameters,
} from "@/lib/engineering/makerworld";

type MakerWorldParameterPreviewProps = {
  parameters: MakerWorldParameters;
};

function ParameterRow({ parameter }: { parameter: MakerWorldParameter }) {
  return (
    <div className="grid gap-2 border-b border-emerald-100 py-3 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <dt className="font-mono text-sm text-emerald-950">
        {parameter.name}
      </dt>

      <dd className="text-sm font-semibold tabular-nums text-emerald-950 sm:text-right">
        {parameter.displayValue}
        {parameter.unit ? ` ${parameter.unit}` : ""}
      </dd>
    </div>
  );
}

export default function MakerWorldParameterPreview({
  parameters,
}: MakerWorldParameterPreviewProps) {
  return (
    <section className="space-y-6 border-t border-neutral-200 pt-12">
      <header>
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
          MakerWorld
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
          MakerWorld Parameter Preview
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-neutral-600">
          Enter these values into the Parametric Storage System model in
          MakerWorld exactly as shown. Every value comes from the validated
          Engineering Calculation Engine.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {parameters.groups.map((group) => (
          <section
            key={group.id}
            className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
              {group.title}
            </h3>

            <dl className="mt-3">
              {group.parameters.map((parameter) => (
                <ParameterRow key={parameter.name} parameter={parameter} />
              ))}
            </dl>
          </section>
        ))}
      </div>

      {parameters.warnings.length > 0 && (
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-semibold text-amber-950">Engineering notes</h3>

          <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-900">
            {parameters.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
