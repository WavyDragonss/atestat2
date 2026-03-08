"use client";

import { useEffect, useMemo, useState } from "react";

type AlgorithmId = "bubble" | "selection" | "insertion";

type Step = {
  array: number[];
  active: number[];
  sorted: number[];
  note: string;
};

const BAR_COUNT = 24;

function randomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 80) + 20);
}

function buildBubbleSteps(source: number[]): Step[] {
  const arr = [...source];
  const steps: Step[] = [{ array: [...arr], active: [], sorted: [], note: "Stare initiala" }];

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length - i - 1; j += 1) {
      steps.push({
        array: [...arr],
        active: [j, j + 1],
        sorted: Array.from({ length: i }, (_, idx) => arr.length - 1 - idx),
        note: `Comparam ${arr[j]} si ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          active: [j, j + 1],
          sorted: Array.from({ length: i }, (_, idx) => arr.length - 1 - idx),
          note: "Interschimbare executata",
        });
      }
    }
  }

  steps.push({
    array: [...arr],
    active: [],
    sorted: Array.from({ length: arr.length }, (_, idx) => idx),
    note: "Tablou sortat",
  });

  return steps;
}

function buildSelectionSteps(source: number[]): Step[] {
  const arr = [...source];
  const steps: Step[] = [{ array: [...arr], active: [], sorted: [], note: "Stare initiala" }];

  for (let i = 0; i < arr.length; i += 1) {
    let min = i;

    for (let j = i + 1; j < arr.length; j += 1) {
      steps.push({
        array: [...arr],
        active: [min, j],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        note: `Cautam minimul de la indexul ${i}`,
      });

      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
      steps.push({
        array: [...arr],
        active: [i, min],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        note: "Minimul nou a fost plasat",
      });
    }
  }

  steps.push({
    array: [...arr],
    active: [],
    sorted: Array.from({ length: arr.length }, (_, idx) => idx),
    note: "Tablou sortat",
  });

  return steps;
}

function buildInsertionSteps(source: number[]): Step[] {
  const arr = [...source];
  const steps: Step[] = [{ array: [...arr], active: [], sorted: [0], note: "Stare initiala" }];

  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      active: [i],
      sorted: Array.from({ length: i }, (_, idx) => idx),
      note: `Inseram valoarea ${key}`,
    });

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      steps.push({
        array: [...arr],
        active: [j, j + 1],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        note: "Deplasare la dreapta",
      });
      j -= 1;
    }

    arr[j + 1] = key;
    steps.push({
      array: [...arr],
      active: [j + 1],
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      note: "Valoare inserata",
    });
  }

  steps.push({
    array: [...arr],
    active: [],
    sorted: Array.from({ length: arr.length }, (_, idx) => idx),
    note: "Tablou sortat",
  });

  return steps;
}

function buildSteps(algorithm: AlgorithmId, source: number[]): Step[] {
  if (algorithm === "selection") return buildSelectionSteps(source);
  if (algorithm === "insertion") return buildInsertionSteps(source);
  return buildBubbleSteps(source);
}

const ALGORITHM_INFO: Record<AlgorithmId, { name: string; complexity: string }> = {
  bubble: { name: "Sortare prin bule", complexity: "O(n^2)" },
  selection: { name: "Sortare prin selectie", complexity: "O(n^2)" },
  insertion: { name: "Sortare prin insertie", complexity: "O(n^2)" },
};

const ALGORITHM_CPP_CODE: Record<AlgorithmId, string> = {
  bubble: `#include <iostream>
using namespace std;

void bubbleSort(int a[], int n) {
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        int temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
      }
    }
  }
}

int main() {
  int a[] = {5, 1, 4, 2, 8};
  int n = sizeof(a) / sizeof(a[0]);

  bubbleSort(a, n);

  for (int i = 0; i < n; i++) {
    cout << a[i] << " ";
  }
  return 0;
}`,
  selection: `#include <iostream>
using namespace std;

void selectionSort(int a[], int n) {
  for (int i = 0; i < n - 1; i++) {
    int minIndex = i;

    for (int j = i + 1; j < n; j++) {
      if (a[j] < a[minIndex]) {
        minIndex = j;
      }
    }

    int temp = a[i];
    a[i] = a[minIndex];
    a[minIndex] = temp;
  }
}

int main() {
  int a[] = {64, 25, 12, 22, 11};
  int n = sizeof(a) / sizeof(a[0]);

  selectionSort(a, n);

  for (int i = 0; i < n; i++) {
    cout << a[i] << " ";
  }
  return 0;
}`,
  insertion: `#include <iostream>
using namespace std;

void insertionSort(int a[], int n) {
  for (int i = 1; i < n; i++) {
    int key = a[i];
    int j = i - 1;

    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }
}

int main() {
  int a[] = {9, 5, 1, 4, 3};
  int n = sizeof(a) / sizeof(a[0]);

  insertionSort(a, n);

  for (int i = 0; i < n; i++) {
    cout << a[i] << " ";
  }
  return 0;
}`,
};

export function SortingVisualizer() {
  const [algorithm, setAlgorithm] = useState<AlgorithmId>("bubble");
  const [seed, setSeed] = useState<number[]>(() => randomArray(BAR_COUNT));
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(45);

  useEffect(() => {
    setSteps(buildSteps(algorithm, seed));
    setStepIndex(0);
    setIsPlaying(false);
  }, [algorithm, seed]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const delay = Math.max(45, 525 - speed * 5);

    const timer = window.setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, delay);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPlaying, speed, steps.length]);

  const current = useMemo<Step>(() => {
    return (
      steps[stepIndex] ?? {
        array: seed,
        active: [],
        sorted: [],
        note: "Pregatit",
      }
    );
  }, [seed, stepIndex, steps]);

  const start = () => {
    if (steps.length === 0) return;
    if (stepIndex >= steps.length - 1) {
      setStepIndex(0);
    }
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const reset = () => {
    setIsPlaying(false);
    setStepIndex(0);
    setSteps(buildSteps(algorithm, seed));
  };

  const randomize = () => {
    setSeed(randomArray(BAR_COUNT));
  };

  return (
    <section className="visualizer-shell">
      <div className="visualizer-controls">
        <label>
          Algoritm
          <select
            value={algorithm}
            onChange={(event) => setAlgorithm(event.target.value as AlgorithmId)}
          >
            <option value="bubble">Sortare prin bule</option>
            <option value="selection">Sortare prin selectie</option>
            <option value="insertion">Sortare prin insertie</option>
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

        <div className="button-row">
          <button type="button" onClick={start}>Start</button>
          <button type="button" onClick={pause}>Pauza</button>
          <button type="button" onClick={reset}>Resetare</button>
          <button type="button" onClick={randomize}>Aleator</button>
        </div>
      </div>

      <div className="visualizer-meta">
        <h3>{ALGORITHM_INFO[algorithm].name}</h3>
        <p>Complexitate: {ALGORITHM_INFO[algorithm].complexity}</p>
        <p>{current.note}</p>
      </div>

      <div className="bars-wrap" role="img" aria-label="Vizualizare bare pentru sortare">
        {current.array.map((value, index) => {
          const active = current.active.includes(index);
          const sorted = current.sorted.includes(index);

          return (
            <div key={`${index}-${value}`} className="bar-slot">
              <div
                className={`bar ${active ? "active" : ""} ${sorted ? "sorted" : ""}`}
                style={{ height: `${value * 2.3}px` }}
              />
              <span>{value}</span>
            </div>
          );
        })}
      </div>

      <article className="info-card code-card" style={{ marginTop: "1rem" }}>
        <h3>Exemplu C++ pentru algoritmul selectat</h3>
        <p>Cod simplu, structural, folosind doar biblioteca <code>&lt;iostream&gt;</code>.</p>
        <pre>
          <code>{ALGORITHM_CPP_CODE[algorithm]}</code>
        </pre>
      </article>
    </section>
  );
}
