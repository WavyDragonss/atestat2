import { PageHero } from "@/components/PageHero";

const topics = [
  {
    name: "Bubble Sort",
    description: "A comparison-based sort that repeatedly swaps adjacent elements when they are in the wrong order.",
    howItWorks:
      "The largest unsorted value moves toward the end during each pass. Repeating passes eventually sorts the entire array.",
    complexity: "Worst Case: O(n^2), Best Case (optimized): O(n)",
    example: "Useful in teaching because each swap is easy to visualize, even though it is inefficient for large datasets.",
  },
  {
    name: "Binary Search",
    description: "Efficient search algorithm for sorted arrays.",
    howItWorks:
      "The array is split in half each step. The algorithm keeps only the half that can contain the target value.",
    complexity: "O(log n)",
    example: "Finding a word in a dictionary or searching a sorted list of IDs.",
  },
  {
    name: "Recursion",
    description: "A technique where a function solves a problem by calling itself on smaller subproblems.",
    howItWorks:
      "Each recursive call moves toward a base case. Once the base case is reached, results return back through previous calls.",
    complexity: "Depends on the problem and number of recursive calls.",
    example: "Computing factorial values, tree traversals, and divide-and-conquer algorithms.",
  },
  {
    name: "Euclidean Algorithm",
    description: "Calculates the greatest common divisor (GCD) of two numbers.",
    howItWorks:
      "Repeatedly replace (a, b) with (b, a mod b) until b becomes 0. The final a is the GCD.",
    complexity: "O(log(min(a, b)))",
    example: "Simplifying fractions and number theory problems.",
  },
  {
    name: "Depth-First Search (DFS)",
    description: "A graph traversal strategy that explores deeply before backtracking.",
    howItWorks:
      "Start from one node, visit a neighbor, continue deeper until blocked, then return and explore new branches.",
    complexity: "O(V + E)",
    example: "Path finding, topological sorting, and cycle detection in graphs.",
  },
  {
    name: "Prefix Sums",
    description: "Preprocessing technique for fast range sum queries.",
    howItWorks:
      "Build an auxiliary array where each position stores the cumulative sum up to that index.",
    complexity: "Build: O(n), Query: O(1)",
    example: "Frequent BAC exercises with interval sums or counting values in ranges.",
  },
  {
    name: "Two Pointers",
    description: "Pattern using two indices that move through an array based on conditions.",
    howItWorks:
      "Start with pointers at strategic positions and adjust them until a condition is satisfied.",
    complexity: "Usually O(n)",
    example: "Pair-sum tasks, sliding windows, and sorted-array optimizations.",
  },
];

export default function AlgorithmsPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Theory"
        title="Algorithm Explanations"
        description="Understand core computer science ideas with short, structured theory blocks before moving to the visualizer."
      />

      <section className="card-grid">
        {topics.map((topic) => (
          <article key={topic.name} className="info-card">
            <h2>{topic.name}</h2>
            <p>
              <strong>Description:</strong> {topic.description}
            </p>
            <p>
              <strong>How It Works:</strong> {topic.howItWorks}
            </p>
            <p>
              <strong>Time Complexity:</strong> {topic.complexity}
            </p>
            <p>
              <strong>Example:</strong> {topic.example}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
