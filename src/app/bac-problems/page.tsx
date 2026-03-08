import { PageHero } from "@/components/PageHero";

const bacProblems = [
  {
    title: "BAC Model: Count Prime Numbers",
    statement: "Given n numbers, count how many are prime.",
    strategy:
      "For each value, test divisibility up to sqrt(x). Complexity is acceptable for medium constraints.",
    keyIdeas: ["square root optimization", "modulo arithmetic", "function decomposition"],
  },
  {
    title: "BAC Model: Longest Increasing Sequence",
    statement: "Determine the longest strictly increasing contiguous subsequence.",
    strategy:
      "Use a single pass and keep current length + best length. O(n), no extra memory.",
    keyIdeas: ["linear scan", "state update", "edge case handling"],
  },
  {
    title: "BAC Model: Vowel Frequency in String",
    statement: "Read a text and display each vowel frequency.",
    strategy:
      "Normalize characters to lowercase and update a fixed frequency table.",
    keyIdeas: ["character processing", "arrays", "input parsing"],
  },
  {
    title: "BAC Model: Matrix Border Sum",
    statement: "Compute the sum of values located on the matrix border.",
    strategy:
      "Add first and last rows fully, then only first and last columns for middle rows.",
    keyIdeas: ["2D arrays", "index boundaries", "avoiding double-count"],
  },
];

export default function BacProblemsPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="BAC"
        title="Solved BAC-Style Problems"
        description="Practice Romanian BAC-style algorithmic thinking with concise solved patterns and strategy breakdowns."
      />

      <section className="card-grid">
        {bacProblems.map((problem) => (
          <article className="info-card" key={problem.title}>
            <h2>{problem.title}</h2>
            <p>
              <strong>Problem:</strong> {problem.statement}
            </p>
            <p>
              <strong>Solution Strategy:</strong> {problem.strategy}
            </p>
            <p>
              <strong>Key Ideas:</strong> {problem.keyIdeas.join(", ")}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
