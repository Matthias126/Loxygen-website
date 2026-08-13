export default function TestimonialSection({
  quote = "Loxygen Academy turned a scattered onboarding process into a structured programme our whole team actually finishes.",
  name = "Operations Director",
  role = "network member company",
  variant = "navy",
}) {
  const isLight = variant === "light";

  return (
    <section className={isLight ? "bg-white" : "bg-grain bg-brand-navy"}>
      <div className="mx-auto max-w-4xl px-6 py-28 text-center lg:px-8" data-reveal>
        <blockquote>
          <p
            className={`font-display text-heading leading-tight ${
              isLight ? "text-brand-navy" : "text-white"
            }`}
          >
            &ldquo;{quote}&rdquo;
          </p>
          <footer
            className={`mt-8 text-sm font-medium uppercase tracking-wide ${
              isLight ? "text-slate-600" : "text-white/50"
            }`}
          >
            {role ? `${name}, ${role}` : name}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
