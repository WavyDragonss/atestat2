import { PageHero } from "@/components/PageHero";

const concepts = [
  {
    name: "Big-O Complexity",
    details:
      "Compares growth rates of algorithms. Helps choose scalable solutions before coding.",
    tip: "Always estimate complexity from loops and recursion depth before implementation.",
  },
  {
    name: "Recursion vs Iteration",
    details:
      "Recursion is expressive but can use more stack memory; iteration is often more memory efficient.",
    tip: "When recursion depth can become large, convert to iterative approach.",
  },
  {
    name: "Greedy Strategy",
    details:
      "Builds a solution by repeatedly taking local optimal choices.",
    tip: "Use it only when you can justify correctness with an invariant or proof idea.",
  },
  {
    name: "Dynamic Programming",
    details:
      "Stores intermediate answers to avoid recomputation.",
    tip: "Define state, transitions, and base cases before writing code.",
  },
  {
    name: "Debugging Competitive Tasks",
    details:
      "Most wrong answers come from boundary conditions, not from algorithm choice.",
    tip: "Test n=1, equal values, sorted data, and max constraints every time.",
  },
];

export default function ConceptsPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Insights"
        title="Interesting Algorithm Concepts"
        description="Go beyond code syntax and build strong problem-solving intuition with practical algorithm design principles."
      />

      <section className="card-grid">
        {concepts.map((concept) => (
          <article className="info-card" key={concept.name}>
            <h2>{concept.name}</h2>
            <p>{concept.details}</p>
            <p>
              <strong>Exam Tip:</strong> {concept.tip}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
