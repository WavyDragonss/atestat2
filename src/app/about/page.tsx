import { PageHero } from "@/components/PageHero";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Despre"
        title="De ce exista aceasta platforma"
        description="Acest proiect transforma lectiile abstracte de algoritmi in experiente interactive, mai usor de urmarit si retinut."
      />

      <section className="about-wrap">
        <article className="info-card">
          <h2>Misiune</h2>
          <p>
            Multi elevi se lovesc de dificultati la conceptele de algoritmi cand vad doar cod static sau formule.
            Wavy's Corner combina explicatii, interactiune, exemple C++, exercitii de tip BAC si animatie
            pentru a face fiecare algoritm mai concret.
          </p>
        </article>

        <article className="info-card">
          <h2>Tehnologii</h2>
          <p>Next.js si React sunt folosite pentru arhitectura pe componente si rutarea paginilor.</p>
          <p>TypeScript ofera logica mai sigura si mai usor de mentinut.</p>
          <p>CSS modern sustine layout-ul, tranzitiile si efectele vizuale.</p>
        </article>

        <article className="info-card">
          <h2>Valoare educationala</h2>
          <p>
            Dincolo de invatarea algoritmilor, acest proiect construieste abilitati practice de front-end:
            design de componente, gestionarea starii, pattern-uri de animatie si fluxuri de deploy.
          </p>
        </article>
      </section>
    </main>
  );
}
