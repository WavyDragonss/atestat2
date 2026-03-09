"use client";

import { useMemo, useState } from "react";

type QueryMode = "all" | "last" | "penultimate" | "index";

type GeneratorResult = {
  solutions: number[][];
  totalValid: number;
  nodesVisited: number;
  accepted: number;
  rejected: number;
  stoppedEarly: boolean;
  queryResult: number[] | null;
};

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

function containsBoth(values: number[], a: number, b: number): boolean {
  return values.includes(a) && values.includes(b);
}

function generateUniversalCombinations(params: {
  n: number;
  k: number;
  forbiddenEnabled: boolean;
  forbiddenA: number;
  forbiddenB: number;
  mode: QueryMode;
  targetIndex: number;
}): GeneratorResult {
  const { n, k, forbiddenEnabled, forbiddenA, forbiddenB, mode, targetIndex } = params;

  const x: number[] = Array.from({ length: k }, () => 0);
  const solutions: number[][] = [];

  let totalValid = 0;
  let nodesVisited = 0;
  let accepted = 0;
  let rejected = 0;
  let stoppedEarly = false;
  let queryResult: number[] | null = null;

  function validateFull(candidate: number[]): boolean {
    if (!forbiddenEnabled) return true;
    return !containsBoth(candidate, forbiddenA, forbiddenB);
  }

  function shouldStopNow(): boolean {
    return mode === "index" && totalValid >= targetIndex;
  }

  function back(i: number, previous: number): void {
    if (stoppedEarly) return;

    const minValue = previous + 1;
    const maxValue = n - (k - i) + 1;

    for (let value = minValue; value <= maxValue; value += 1) {
      nodesVisited += 1;
      x[i] = value;

      if (i === k - 1) {
        const candidate = [...x];
        if (validateFull(candidate)) {
          totalValid += 1;
          accepted += 1;
          if (mode === "all" || mode === "last" || mode === "penultimate") {
            solutions.push(candidate);
          }
          if (mode === "index" && totalValid === targetIndex) {
            queryResult = candidate;
            stoppedEarly = true;
            return;
          }
        } else {
          rejected += 1;
        }
      } else {
        back(i + 1, value);
      }

      if (shouldStopNow()) {
        stoppedEarly = true;
        return;
      }
    }
  }

  back(0, 0);

  if (mode === "last") {
    queryResult = solutions.length > 0 ? solutions[solutions.length - 1] : null;
  }

  if (mode === "penultimate") {
    queryResult = solutions.length > 1 ? solutions[solutions.length - 2] : null;
  }

  return {
    solutions,
    totalValid,
    nodesVisited,
    accepted,
    rejected,
    stoppedEarly,
    queryResult,
  };
}

function formatCombination(values: number[]): string {
  return `(${values.join(",")})`;
}

export function BacktrackingVisualizer() {
  const [n, setN] = useState(5);
  const [k, setK] = useState(3);
  const [forbiddenEnabled, setForbiddenEnabled] = useState(true);
  const [forbiddenA, setForbiddenA] = useState(2);
  const [forbiddenB, setForbiddenB] = useState(5);
  const [mode, setMode] = useState<QueryMode>("all");
  const [targetIndex, setTargetIndex] = useState(1);

  const normalizedN = clamp(n, 1, 12);
  const normalizedK = clamp(k, 1, normalizedN);
  const normalizedA = clamp(forbiddenA, 1, normalizedN);
  const normalizedB = clamp(forbiddenB, 1, normalizedN);
  const normalizedTarget = clamp(targetIndex, 1, 1_000_000);

  const result = useMemo(
    () =>
      generateUniversalCombinations({
        n: normalizedN,
        k: normalizedK,
        forbiddenEnabled,
        forbiddenA: normalizedA,
        forbiddenB: normalizedB,
        mode,
        targetIndex: normalizedTarget,
      }),
    [forbiddenEnabled, mode, normalizedA, normalizedB, normalizedK, normalizedN, normalizedTarget],
  );

  const visibleSolutions =
    mode === "all"
      ? result.solutions
      : result.queryResult
        ? [result.queryResult]
        : [];

  return (
    <section className="visualizer-shell">
      <div className="visualizer-meta">
        <h3>Generator Universal de Backtracking</h3>
        <p>
          Generatorul produce toate combinatiile valide pentru orice <code>n</code> si <code>k</code>,
          folosind ordinea strict crescatoare <code>x1 &lt; x2 &lt; ... &lt; xk</code>.
        </p>
      </div>

      <div className="visualizer-controls">
        <label>
          Numar total elemente (n)
          <input
            type="number"
            min={1}
            max={12}
            value={n}
            onChange={(event) => setN(Number(event.target.value))}
          />
        </label>

        <label>
          Dimensiune combinatie (k)
          <input
            type="number"
            min={1}
            max={normalizedN}
            value={k}
            onChange={(event) => setK(Number(event.target.value))}
          />
        </label>

        <label>
          Tip interogare
          <select value={mode} onChange={(event) => setMode(event.target.value as QueryMode)}>
            <option value="all">Toate combinatiile</option>
            <option value="last">Ultima combinatie</option>
            <option value="penultimate">Penultima combinatie</option>
            <option value="index">Combinatia cu index t</option>
          </select>
        </label>

        {mode === "index" ? (
          <label>
            Index cautat (t)
            <input
              type="number"
              min={1}
              value={targetIndex}
              onChange={(event) => setTargetIndex(Number(event.target.value))}
            />
          </label>
        ) : null}
      </div>

      <article className="info-card" style={{ marginTop: "1rem" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <input
            type="checkbox"
            checked={forbiddenEnabled}
            onChange={(event) => setForbiddenEnabled(event.target.checked)}
          />
          Activeaza regula optionala (pereche interzisa)
        </label>

        {forbiddenEnabled ? (
          <div className="visualizer-controls" style={{ marginTop: "0.8rem" }}>
            <label>
              Valoare A
              <input
                type="number"
                min={1}
                max={normalizedN}
                value={forbiddenA}
                onChange={(event) => setForbiddenA(Number(event.target.value))}
              />
            </label>
            <label>
              Valoare B
              <input
                type="number"
                min={1}
                max={normalizedN}
                value={forbiddenB}
                onChange={(event) => setForbiddenB(Number(event.target.value))}
              />
            </label>
          </div>
        ) : null}

        <p style={{ marginTop: "0.8rem" }}>
          Constrangere curenta: combinatia este respinsa daca include simultan
          <strong> {normalizedA}</strong> si <strong>{normalizedB}</strong>.
        </p>
      </article>

      <div className="bt-metrics">
        <p>
          <strong>Total valide:</strong> {result.totalValid}
        </p>
        <p>
          <strong>Noduri explorate:</strong> {result.nodesVisited}
        </p>
        <p>
          <strong>Acceptate / Respinse:</strong> {result.accepted} / {result.rejected}
        </p>
      </div>

      <article className="info-card" style={{ marginTop: "1rem" }}>
        <h3>Rezultat interogare</h3>
        {mode === "index" && result.queryResult === null ? (
          <p>
            Indexul <code>t = {normalizedTarget}</code> nu exista pentru configuratia curenta.
          </p>
        ) : null}
        {mode === "index" && result.stoppedEarly ? (
          <p>
            Cautarea s-a oprit devreme la combinatia <code>t</code>, fara a genera inutil restul.
          </p>
        ) : null}
        {visibleSolutions.length > 0 ? (
          <div className="bt-results-grid">
            {visibleSolutions.map((solution, index) => (
              <code key={`${index}-${solution.join("-")}`}>{formatCombination(solution)}</code>
            ))}
          </div>
        ) : (
          <p>Nu exista combinatii de afisat pentru aceasta interogare.</p>
        )}
      </article>

      {mode === "all" ? (
        <article className="info-card" style={{ marginTop: "1rem" }}>
          <h3>Toate combinatiile valide</h3>
          {result.solutions.length > 0 ? (
            <div className="bt-results-grid">
              {result.solutions.map((solution, index) => (
                <code key={`${index}-${solution.join("-")}`}>{formatCombination(solution)}</code>
              ))}
            </div>
          ) : (
            <p>Nicio combinatie valida pentru datele introduse.</p>
          )}
        </article>
      ) : null}

      <article className="info-card" style={{ marginTop: "1rem" }}>
        <h3>Flux universal</h3>
        <p>
          1. Citim <code>n</code>, <code>k</code>, constrangeri si optional indexul tinta.
        </p>
        <p>
          2. Generam combinatii in ordine crescatoare stricta pentru a evita duplicate.
        </p>
        <p>3. Validam fiecare candidat prin functia de constrangeri.</p>
        <p>4. Salvam doar solutiile valide.</p>
        <p>5. Oprim devreme cand interogarea cere combinatia a t-a.</p>
      </article>
    </section>
  );
}
