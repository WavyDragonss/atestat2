"use client";

import { useMemo, useState } from "react";

import { BacktrackingVisualizer } from "@/components/BacktrackingVisualizer";
import { GraphVisualizer } from "@/components/GraphVisualizer";
import { SearchVisualizer } from "@/components/SearchVisualizer";
import { SortingVisualizer } from "@/components/SortingVisualizer";

type VisualizerCategoryId =
  | "sorting"
  | "binary-search"
  | "backtracking"
  | "graphs"
  | "dynamic-programming";

type VisualizerCategory = {
  id: VisualizerCategoryId;
  label: string;
  summary: string;
};

const CATEGORIES: VisualizerCategory[] = [
  {
    id: "sorting",
    label: "Vizualizator sortare",
    summary: "Compari pasi, viteza si comportamentul pe date aleatoare.",
  },
  {
    id: "binary-search",
    label: "Cautare binara",
    summary: "Urmaresti intervalul [low, high] si punctul de mijloc.",
  },
  {
    id: "backtracking",
    label: "Backtracking",
    summary: "Concept BAC: solutia se construieste pas cu pas, iar cand o alegere nu e valida, revenim si incercam alta varianta.",
  },
  {
    id: "graphs",
    label: "Grafuri",
    summary: "Construiesti propriul graf si rulezi BFS/DFS interactiv, pas cu pas.",
  },
  {
    id: "dynamic-programming",
    label: "Programare dinamica",
    summary: "Subprobleme, memoizare si tabele (in pregatire).",
  },
];

function UpcomingCard({ title, description }: { title: string; description: string }) {
  return (
    <section className="visualizer-shell">
      <div className="visualizer-meta">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <article className="info-card">
        <p>
          Categoria este pregatita in meniu. Putem adauga rapid un vizualizator nou in aceasta sectiune
          fara schimbari mari de layout.
        </p>
      </article>
    </section>
  );
}

export function VisualizerHub() {
  const [activeCategory, setActiveCategory] = useState<VisualizerCategoryId>("sorting");

  const activeData = useMemo(
    () => CATEGORIES.find((category) => category.id === activeCategory) ?? CATEGORIES[0],
    [activeCategory],
  );

  return (
    <section className="visualizer-hub">
      <div className="visualizer-category-row" role="tablist" aria-label="Categorii vizualizator">
        {CATEGORIES.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`category-chip ${isActive ? "active" : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <article className="info-card category-summary">
        <h3>{activeData.label}</h3>
        <p>{activeData.summary}</p>
      </article>

      {activeCategory === "sorting" && <SortingVisualizer />}
      {activeCategory === "binary-search" && <SearchVisualizer />}
      {activeCategory === "backtracking" && <BacktrackingVisualizer />}
      {activeCategory === "graphs" && <GraphVisualizer />}
      {activeCategory === "dynamic-programming" && (
        <UpcomingCard
          title="Vizualizator programare dinamica"
          description="Putem continua cu Fibonacci memoizat, 0/1 Knapsack si Longest Common Subsequence."
        />
      )}
    </section>
  );
}
