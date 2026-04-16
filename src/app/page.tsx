import Link from "next/link";
import { ParticleCanvas } from "@/components/ParticleCanvas";

export default function Home() {
  return (
    <main className="home-shell">
      <section className="home-hero">
        <ParticleCanvas />
        <div className="home-content">
          <p className="home-eyebrow">Wavy's Corner</p>
          <h1>[Salut, sunt Wavy — elev, asta e coltul meu de internet.]</h1>

          <div className="cta-row">
            <Link href="/atestate" className="primary-btn">
              Atestate
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
