"use client";

import { useMemo, useState } from "react";

type BacktrackingResult = {
  n: number;
  solutionCount: number;
  exploredNodes: number;
  backtracks: number;
  firstSolution: number[];
};

function solveNQueens(n: number): BacktrackingResult {
  const colUsed = Array.from({ length: n }, () => false);
  const diagMainUsed = Array.from({ length: 2 * n - 1 }, () => false);
  const diagSecondaryUsed = Array.from({ length: 2 * n - 1 }, () => false);
  const board = Array.from({ length: n }, () => -1);

  let solutionCount = 0;
  let exploredNodes = 0;
  let backtracks = 0;
  let firstSolution: number[] = [];

  function place(row: number): void {
    if (row === n) {
      solutionCount += 1;
      if (firstSolution.length === 0) {
        firstSolution = [...board];
      }
      return;
    }

    for (let col = 0; col < n; col += 1) {
      exploredNodes += 1;
      const mainDiag = row - col + (n - 1);
      const secondaryDiag = row + col;

      if (colUsed[col] || diagMainUsed[mainDiag] || diagSecondaryUsed[secondaryDiag]) {
        continue;
      }

      board[row] = col;
      colUsed[col] = true;
      diagMainUsed[mainDiag] = true;
      diagSecondaryUsed[secondaryDiag] = true;

      place(row + 1);

      board[row] = -1;
      colUsed[col] = false;
      diagMainUsed[mainDiag] = false;
      diagSecondaryUsed[secondaryDiag] = false;
      backtracks += 1;
    }
  }

  place(0);

  return {
    n,
    solutionCount,
    exploredNodes,
    backtracks,
    firstSolution,
  };
}

function clampN(value: number): number {
  if (Number.isNaN(value)) return 8;
  return Math.min(11, Math.max(4, Math.floor(value)));
}

export function BacktrackingVisualizer() {
  const [n, setN] = useState(8);
  const [requestedN, setRequestedN] = useState(8);

  const result = useMemo(() => solveNQueens(requestedN), [requestedN]);

  return (
    <section className="visualizer-shell">
      <div className="visualizer-meta">
        <h3>Backtracking: problema N-Queens</h3>
        <p>
          Backtracking incearca plasari partiale, abandoneaza ramurile invalide si revine la ultima
          decizie valida.
        </p>
      </div>

      <div className="visualizer-controls">
        <label>
          Dimensiune tabla (N)
          <input
            type="number"
            min={4}
            max={11}
            value={n}
            onChange={(event) => setN(clampN(Number(event.target.value)))}
          />
        </label>

        <div className="button-row">
          <button
            type="button"
            onClick={() => {
              setRequestedN(clampN(n));
            }}
          >
            Calculeaza
          </button>
          <button
            type="button"
            onClick={() => {
              setN(8);
              setRequestedN(8);
            }}
          >
            Reset 8x8
          </button>
        </div>
      </div>

      <div className="bt-metrics">
        <p>
          <strong>Solutii gasite:</strong> {result.solutionCount}
        </p>
        <p>
          <strong>Noduri explorate:</strong> {result.exploredNodes}
        </p>
        <p>
          <strong>Reveniri (backtrack):</strong> {result.backtracks}
        </p>
      </div>

      <div className="bt-board" style={{ gridTemplateColumns: `repeat(${result.n}, minmax(0, 1fr))` }}>
        {Array.from({ length: result.n * result.n }, (_, index) => {
          const row = Math.floor(index / result.n);
          const col = index % result.n;
          const hasQueen = result.firstSolution[row] === col;
          const dark = (row + col) % 2 === 1;

          return (
            <div
              key={`${row}-${col}`}
              className={`bt-cell ${dark ? "dark" : "light"} ${hasQueen ? "queen" : ""}`}
            >
              {hasQueen ? "Q" : ""}
            </div>
          );
        })}
      </div>

      <article className="info-card" style={{ marginTop: "1rem" }}>
        <h3>Cum functioneaza</h3>
        <p>1. Se plaseaza cate o regina pe fiecare rand.</p>
        <p>2. Daca o plasare intra in conflict, ramura este oprita imediat.</p>
        <p>3. Algoritmul revine la randul anterior si incearca alta coloana.</p>
        <p>4. Cand toate randurile sunt completate, avem o solutie valida.</p>
      </article>
    </section>
  );
}
