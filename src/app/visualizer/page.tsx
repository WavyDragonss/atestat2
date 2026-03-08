import { PageHero } from "@/components/PageHero";
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
    </main>
  );
}
