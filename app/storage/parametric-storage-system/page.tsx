import ProjectHero from "@/components/ProjectHero";
import StorageDesignAssistant from "@/components/StorageDesignAssistant";

export default function ParametricStorageSystemPage() {
  return (
    <main className="mx-auto min-h-screen w-full min-w-0 max-w-5xl bg-white px-4 py-8 text-neutral-900 sm:px-6 sm:py-10">
      <ProjectHero
        title="Parametric Storage System"
        description="Design your storage system."
      />

      <StorageDesignAssistant />
    </main>
  );
}
