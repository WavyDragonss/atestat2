import { PageHero } from "@/components/PageHero";
import { VisualizerHub } from "@/components/VisualizerHub";

export default function VisualizerPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Practica"
        title="Vizualizator de algoritmi"
        description="Exploreaza categorii de algoritmi: sortare, cautare binara, backtracking cu calculator interactiv si sectiuni noi pregatite pentru extindere."
      />

      <VisualizerHub />
    </main>
  );
}
