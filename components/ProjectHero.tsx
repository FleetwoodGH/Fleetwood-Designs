type ProjectHeroProps = {
  title: string;
  description: string;
};

export default function ProjectHero({ title, description }: ProjectHeroProps) {
  return (
    <header className="mb-16">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-neutral-500">
        Fleetwood Designs
      </p>

      <h1 className="mb-6 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
        {title}
      </h1>

      <p className="max-w-2xl text-lg leading-8 text-neutral-600">
        {description}
      </p>
    </header>
  );
}
