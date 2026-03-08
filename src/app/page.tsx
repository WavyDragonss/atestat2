import Link from "next/link";
import { ParticleCanvas } from "@/components/ParticleCanvas";

export default function Home() {
  return (
    <main className="home-shell">
      <section className="home-hero">
        <ParticleCanvas />
        <div className="home-content">
          <p className="home-eyebrow">Interactive Computer Science</p>
          <h1>Learn Algorithms by Watching Them Think</h1>
          <p>
            Turn static theory into motion. Study concepts, run simulations, and understand each step with visual feedback.
          </p>

          <div className="cta-row">
            <Link href="/visualizer" className="primary-btn">
              Start Exploring
            </Link>
            <Link href="/algorithms" className="ghost-btn">
              Read Theory
            </Link>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <article className="info-card">
          <h2>Step-by-Step Visuals</h2>
          <p>See comparisons, swaps, and sorted elements highlighted in real time.</p>
        </article>
        <article className="info-card">
          <h2>C++ + BAC Practice</h2>
          <p>Study C++ implementations and BAC-inspired solved problem patterns in dedicated sections.</p>
        </article>
        <article className="info-card">
          <h2>Beyond Basics</h2>
          <p>Explore search visualizers, complexity insights, and exam-ready algorithm strategies.</p>
        </article>
      </section>
    </main>
  );
}
