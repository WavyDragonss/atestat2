import { PageHero } from "@/components/PageHero";
import { SearchVisualizer } from "@/components/SearchVisualizer";
import { SortingVisualizer } from "@/components/SortingVisualizer";

export default function VisualizerPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Practica"
        title="Vizualizator de algoritmi"
        description="Ruleaza algoritmi de sortare pas cu pas, controleaza viteza si vezi instant codul C++ asociat fiecarui algoritm selectat."
      />

      <SortingVisualizer />

      <section className="stacked-visualizer">
        <SearchVisualizer />
      </section>
    </main>
  );
}
