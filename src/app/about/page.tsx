import { PageHero } from "@/components/PageHero";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="About"
        title="Why This Platform Exists"
        description="This project transforms abstract algorithm lessons into interactive experiences that are easier to follow and remember."
      />

      <section className="about-wrap">
        <article className="info-card">
          <h2>Mission</h2>
          <p>
            Many students struggle with algorithm concepts when they only see static code or formulas.
            AlgoVerse combines explanations, interaction, C++ examples, BAC-style exercises, and animation
            to make each algorithm feel concrete.
          </p>
        </article>

        <article className="info-card">
          <h2>Technologies</h2>
          <p>Next.js and React are used for component architecture and page routing.</p>
          <p>TypeScript ensures safer and more maintainable logic.</p>
          <p>Modern CSS powers layout, transitions, and visual effects.</p>
        </article>

        <article className="info-card">
          <h2>Educational Value</h2>
          <p>
            Beyond learning algorithms, this project builds practical front-end skills: component design,
            state management, animation patterns, and deployment workflows.
          </p>
        </article>
      </section>
    </main>
  );
}
