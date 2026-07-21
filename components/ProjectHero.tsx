type ProjectHeroProps = {
  title: string;
  description: string;
};

export default function ProjectHero({ title, description }: ProjectHeroProps) {
  return (
    <header className="mb-8">
      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500">
        Fleetwood Designs
      </p>

      <h1 className="mb-2 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
        {title}
      </h1>

      <p className="max-w-2xl text-base leading-6 text-neutral-600">
        {description}
      </p>
    </header>
  );
}
