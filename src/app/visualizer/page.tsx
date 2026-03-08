import { PageHero } from "@/components/PageHero";
import { SearchVisualizer } from "@/components/SearchVisualizer";
import { SortingVisualizer } from "@/components/SortingVisualizer";

export default function VisualizerPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Practice"
        title="Algorithm Visualizer"
        description="Run sorting algorithms step by step, control speed, and observe how each comparison and swap transforms the array."
      />

      <SortingVisualizer />

      <section className="stacked-visualizer">
        <SearchVisualizer />
      </section>
    </main>
  );
}
