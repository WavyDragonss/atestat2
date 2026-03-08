import { PageHero } from "@/components/PageHero";
import { SearchVisualizer } from "@/components/SearchVisualizer";
import { SortingVisualizer } from "@/components/SortingVisualizer";

export default function VisualizerPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Practica"
        title="Vizualizator de algoritmi"
        description="Ruleaza algoritmi de sortare pas cu pas, controleaza viteza si observa cum fiecare comparatie si interschimbare transforma tabloul."
      />

      <SortingVisualizer />

      <section className="stacked-visualizer">
        <SearchVisualizer />
      </section>
    </main>
  );
}
