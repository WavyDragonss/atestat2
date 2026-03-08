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
          <h2>Learning Through Control</h2>
          <p>Start, pause, reset, and adjust speed to match your understanding pace.</p>
        </article>
        <article className="info-card">
          <h2>Built for Students</h2>
          <p>Designed to make algorithm behavior intuitive, memorable, and engaging.</p>
        </article>
      </section>
    </main>
  );
}
