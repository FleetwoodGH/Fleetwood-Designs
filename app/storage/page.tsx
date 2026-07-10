"use client";

import { useState } from "react";
import ProjectHero from "@/components/ProjectHero";
import SelectionCard from "@/components/SelectionCard";

type BuildType = "box" | "system" | null;

export default function ParametricStorageSystemPage() {
  const [buildType, setBuildType] = useState<BuildType>(null);

  return (
    <main className="mx-auto min-h-screen max-w-5xl bg-white px-6 py-16 text-neutral-900">
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
            icon="📦"
            title="Storage Box"
            description="A simple configurable storage box without trays."
            selected={buildType === "box"}
            onSelect={() => setBuildType("box")}
          />

          <SelectionCard
            icon="🗃️"
            title="Storage System"
            description="A configurable storage system with trays and optional dividers."
            selected={buildType === "system"}
            onSelect={() => setBuildType("system")}
          />
        </div>

        {buildType && (
          <p className="mt-8 text-sm text-neutral-600">
            Selected:{" "}
            <span className="font-medium text-neutral-900">
              {buildType === "box" ? "Storage Box" : "Storage System"}
            </span>
          </p>
        )}
      </section>
    </main>
  );
}
