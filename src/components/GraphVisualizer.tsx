"use client";

import { useEffect, useMemo, useState } from "react";

type Algorithm = "bfs" | "dfs";

type TraversalStep = {
  current: number | null;
  visited: number[];
  frontier: number[];
  note: string;
};

type ParsedEdge = {
  a: number;
  b: number;
};

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

function parseEdges(input: string, n: number): ParsedEdge[] {
  if (!input.trim()) return [];

  const edges: ParsedEdge[] = [];
  const seen = new Set<string>();

  for (const rawPart of input.split(/[,;\n]+/)) {
    const part = rawPart.trim();
    if (!part) continue;

    const match = part.match(/^(\d+)\s*[- ]\s*(\d+)$/);
    if (!match) continue;

    const a = Number(match[1]);
    const b = Number(match[2]);
    if (Number.isNaN(a) || Number.isNaN(b)) continue;
    if (a < 1 || a > n || b < 1 || b > n || a === b) continue;

    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (seen.has(key)) continue;
    seen.add(key);
    edges.push({ a, b });
  }

  return edges;
}

function buildAdjacency(n: number, edges: ParsedEdge[], directed: boolean): number[][] {
  const adj = Array.from({ length: n + 1 }, () => [] as number[]);

  for (const edge of edges) {
    adj[edge.a].push(edge.b);
    if (!directed) {
      adj[edge.b].push(edge.a);
    }
  }

  for (let node = 1; node <= n; node += 1) {
    adj[node].sort((x, y) => x - y);
  }

  return adj;
}

function buildSteps(
  n: number,
  adj: number[][],
  startNode: number,
  algorithm: Algorithm,
): TraversalStep[] {
  const steps: TraversalStep[] = [
    {
      current: null,
      visited: [],
      frontier: [startNode],
      note: `Pornim din nodul ${startNode}.`,
    },
  ];

  const visitedSet = new Set<number>();

  if (algorithm === "bfs") {
    const queue: number[] = [startNode];

    while (queue.length > 0) {
      const node = queue.shift() as number;
      if (visitedSet.has(node)) continue;

      visitedSet.add(node);
      steps.push({
        current: node,
        visited: [...visitedSet],
        frontier: [...queue],
        note: `Vizitam ${node}. Vecinii nevizitati merg in coada (BFS).`,
      });

      for (const next of adj[node]) {
        if (!visitedSet.has(next) && !queue.includes(next)) {
          queue.push(next);
        }
      }

      steps.push({
        current: node,
        visited: [...visitedSet],
        frontier: [...queue],
        note: `Coada curenta: ${queue.length > 0 ? queue.join(", ") : "goala"}.`,
      });
    }
  } else {
    const stack: number[] = [startNode];

    while (stack.length > 0) {
      const node = stack.pop() as number;
      if (visitedSet.has(node)) continue;

      visitedSet.add(node);
      steps.push({
        current: node,
        visited: [...visitedSet],
        frontier: [...stack],
        note: `Vizitam ${node}. Continuam pe ramura curenta (DFS).`,
      });

      const neighbors = [...adj[node]].reverse();
      for (const next of neighbors) {
        if (!visitedSet.has(next) && !stack.includes(next)) {
          stack.push(next);
        }
      }

      steps.push({
        current: node,
        visited: [...visitedSet],
        frontier: [...stack],
        note: `Stiva curenta: ${stack.length > 0 ? stack.join(", ") : "goala"}.`,
      });
    }
  }

  if (visitedSet.size < n) {
    steps.push({
      current: null,
      visited: [...visitedSet],
      frontier: [],
      note: "Atentie: graful nu este complet conectat. Exista noduri neatinse din nodul de start.",
    });
  } else {
    steps.push({
      current: null,
      visited: [...visitedSet],
      frontier: [],
      note: "Parcurgere finalizata pentru toate nodurile accesibile.",
    });
  }

  return steps;
}

function circlePosition(index: number, total: number): { x: number; y: number } {
  const angle = ((index - 1) / total) * Math.PI * 2 - Math.PI / 2;
  const radius = 115;
  const centerX = 150;
  const centerY = 150;

  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
}

export function GraphVisualizer() {
  const [nodeCount, setNodeCount] = useState(6);
  const [edgesInput, setEdgesInput] = useState("1-2, 1-3, 2-4, 3-5, 5-6");
  const [startNode, setStartNode] = useState(1);
  const [algorithm, setAlgorithm] = useState<Algorithm>("bfs");
  const [directed, setDirected] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(55);

  const n = clamp(nodeCount, 2, 12);
  const start = clamp(startNode, 1, n);

  const edges = useMemo(() => parseEdges(edgesInput, n), [edgesInput, n]);
  const adjacency = useMemo(() => buildAdjacency(n, edges, directed), [n, edges, directed]);
  const steps = useMemo(() => buildSteps(n, adjacency, start, algorithm), [n, adjacency, start, algorithm]);
  const current = steps[stepIndex] ?? steps[0];

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, [n, edgesInput, start, algorithm, directed]);

  useEffect(() => {
    if (!isPlaying) return;

    const delay = Math.max(120, 700 - speed * 5);
    const timer = window.setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, delay);

    return () => window.clearInterval(timer);
  }, [isPlaying, speed, steps.length]);

  return (
    <section className="visualizer-shell">
      <div className="visualizer-meta">
        <h3>Vizualizator Grafuri Interactiv</h3>
        <p>Introdu noduri si muchii, apoi ruleaza BFS sau DFS pas cu pas, exact pe graful tau.</p>
      </div>

      <div className="visualizer-controls">
        <label>
          Numar noduri
          <input
            type="number"
            min={2}
            max={12}
            value={nodeCount}
            onChange={(event) => setNodeCount(Number(event.target.value))}
          />
        </label>

        <label>
          Nod de start
          <input
            type="number"
            min={1}
            max={n}
            value={startNode}
            onChange={(event) => setStartNode(Number(event.target.value))}
          />
        </label>

        <label>
          Algoritm
          <select value={algorithm} onChange={(event) => setAlgorithm(event.target.value as Algorithm)}>
            <option value="bfs">BFS (coada)</option>
            <option value="dfs">DFS (stiva)</option>
          </select>
        </label>

        <label>
          Viteza
          <input
            type="range"
            min={1}
            max={100}
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
          />
        </label>
      </div>

      <label style={{ display: "block", marginTop: "0.9rem" }}>
        Muchii (format: 1-2, 2-3, 3-4)
        <textarea
          rows={3}
          value={edgesInput}
          onChange={(event) => setEdgesInput(event.target.value)}
          placeholder="Exemplu: 1-2, 1-3, 2-4"
        />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginTop: "0.7rem" }}>
        <input
          type="checkbox"
          checked={directed}
          onChange={(event) => setDirected(event.target.checked)}
        />
        Graf orientat
      </label>

      <div className="button-row" style={{ marginTop: "0.8rem" }}>
        <button type="button" onClick={() => setIsPlaying(true)}>Start</button>
        <button type="button" onClick={() => setIsPlaying(false)}>Pauza</button>
        <button
          type="button"
          onClick={() => {
            setIsPlaying(false);
            setStepIndex(0);
          }}
        >
          Resetare
        </button>
        <button
          type="button"
          onClick={() => {
            setIsPlaying(false);
            setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
          }}
        >
          Pasul urmator
        </button>
      </div>

      <div className="bt-metrics">
        <p>
          <strong>Pas:</strong> {stepIndex + 1} / {steps.length}
        </p>
        <p>
          <strong>Nod curent:</strong> {current.current ?? "-"}
        </p>
        <p>
          <strong>Frontiera:</strong> {current.frontier.length > 0 ? current.frontier.join(", ") : "goala"}
        </p>
      </div>

      <article className="info-card" style={{ marginTop: "1rem" }}>
        <h3>Stare curenta</h3>
        <p>{current.note}</p>
        <p>
          Vizitate: {current.visited.length > 0 ? current.visited.join(", ") : "niciun nod"}
        </p>
      </article>

      <div className="graph-canvas-wrap" role="img" aria-label="Reprezentare graf si noduri vizitate">
        <svg viewBox="0 0 300 300" className="graph-canvas">
          {edges.map((edge, idx) => {
            const p1 = circlePosition(edge.a, n);
            const p2 = circlePosition(edge.b, n);
            return <line key={`${edge.a}-${edge.b}-${idx}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className="graph-edge" />;
          })}

          {Array.from({ length: n }, (_, index) => index + 1).map((node) => {
            const p = circlePosition(node, n);
            const isVisited = current.visited.includes(node);
            const isCurrent = current.current === node;
            return (
              <g key={node} transform={`translate(${p.x}, ${p.y})`}>
                <circle className={`graph-node ${isVisited ? "visited" : ""} ${isCurrent ? "current" : ""}`} r={19} />
                <text textAnchor="middle" dominantBaseline="middle" className="graph-node-label">
                  {node}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <article className="info-card" style={{ marginTop: "1rem" }}>
        <h3>Lista de adiacenta</h3>
        <div className="bt-log">
          {Array.from({ length: n }, (_, index) => index + 1).map((node) => (
            <p key={node}>
              <code>{node}</code>: {adjacency[node].length > 0 ? adjacency[node].join(", ") : "-"}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
}
