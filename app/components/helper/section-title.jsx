import Reveal from "./reveal";

export default function SectionTitle({ label, title, highlight }) {
  return (
    <Reveal className="mb-12 lg:mb-16 text-center">
      <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--cyan)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)]" />
        {label}
      </span>
      <h2 className="font-display mt-4 text-3xl font-bold md:text-5xl">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
    </Reveal>
  );
}
