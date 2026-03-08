import Link from "next/link";
import { ParticleCanvas } from "@/components/ParticleCanvas";

export default function Home() {
  return (
    <main className="home-shell">
      <section className="home-hero">
        <ParticleCanvas />
        <div className="home-content">
          <p className="home-eyebrow">Informatica interactiva</p>
          <h1>Invata algoritmi vazandu-i cum gandesc</h1>
          <p>
            Transforma teoria statica in miscare. Studiaza concepte, ruleaza simulari si intelege fiecare pas cu feedback vizual.
          </p>

          <div className="cta-row">
            <Link href="/visualizer" className="primary-btn">
              Incepe explorarea
            </Link>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <article className="info-card">
          <h2>Vizualizare pas cu pas</h2>
          <p>Vezi comparatiile, interschimbarile si elementele sortate evidentiate in timp real.</p>
        </article>
        <article className="info-card">
          <h2>C++ + BAC Practice</h2>
          <p>Studiaza implementari C++ si modele de probleme BAC rezolvate in sectiuni dedicate.</p>
        </article>
        <article className="info-card">
          <h2>Dincolo de baza</h2>
          <p>Exploreaza vizualizari pentru cautare, intuitii despre complexitate si strategii de algoritmi pentru examen.</p>
        </article>
      </section>
    </main>
  );
}
