import ProjectHero from "@/components/ProjectHero";
import SelectionCard from "@/components/SelectionCard";

export default function ParametricStorageSystemPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16">
      <ProjectHero
        title="Parametric Storage System"
        description="Configure a storage solution that fits your project."
      />

      <section aria-labelledby="build-choice-heading">
        <h2
          id="build-choice-heading"
          className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900"
        >
          What would you like to build?
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <SelectionCard
            symbol="📦"
            title="Storage Box"
            description="A simple configurable storage box without trays."
          />

          <SelectionCard
            symbol="🗃️"
            title="Storage System"
            description="A configurable storage system with trays and optional dividers."
          />
        </div>
      </section>
    </main>
  );
}
