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
  const steps: Step[] = [{ array: [...arr], active: [], sorted: [], note: "Initial state" }];

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length - i - 1; j += 1) {
      steps.push({
        array: [...arr],
        active: [j, j + 1],
        sorted: Array.from({ length: i }, (_, idx) => arr.length - 1 - idx),
        note: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          active: [j, j + 1],
          sorted: Array.from({ length: i }, (_, idx) => arr.length - 1 - idx),
          note: "Swap executed",
        });
      }
    }
  }

  steps.push({
    array: [...arr],
    active: [],
    sorted: Array.from({ length: arr.length }, (_, idx) => idx),
    note: "Array sorted",
  });

  return steps;
}

function buildSelectionSteps(source: number[]): Step[] {
  const arr = [...source];
  const steps: Step[] = [{ array: [...arr], active: [], sorted: [], note: "Initial state" }];

  for (let i = 0; i < arr.length; i += 1) {
    let min = i;

    for (let j = i + 1; j < arr.length; j += 1) {
      steps.push({
        array: [...arr],
        active: [min, j],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        note: `Searching minimum from index ${i}`,
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
        note: "Placed new minimum",
      });
    }
  }

  steps.push({
    array: [...arr],
    active: [],
    sorted: Array.from({ length: arr.length }, (_, idx) => idx),
    note: "Array sorted",
  });

  return steps;
}

function buildInsertionSteps(source: number[]): Step[] {
  const arr = [...source];
  const steps: Step[] = [{ array: [...arr], active: [], sorted: [0], note: "Initial state" }];

  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      active: [i],
      sorted: Array.from({ length: i }, (_, idx) => idx),
      note: `Insert value ${key}`,
    });

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      steps.push({
        array: [...arr],
        active: [j, j + 1],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        note: "Shift right",
      });
      j -= 1;
    }

    arr[j + 1] = key;
    steps.push({
      array: [...arr],
      active: [j + 1],
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      note: "Key inserted",
    });
  }

  steps.push({
    array: [...arr],
    active: [],
    sorted: Array.from({ length: arr.length }, (_, idx) => idx),
    note: "Array sorted",
  });

  return steps;
}

function buildSteps(algorithm: AlgorithmId, source: number[]): Step[] {
  if (algorithm === "selection") return buildSelectionSteps(source);
  if (algorithm === "insertion") return buildInsertionSteps(source);
  return buildBubbleSteps(source);
}

const ALGORITHM_INFO: Record<AlgorithmId, { name: string; complexity: string }> = {
  bubble: { name: "Bubble Sort", complexity: "O(n^2)" },
  selection: { name: "Selection Sort", complexity: "O(n^2)" },
  insertion: { name: "Insertion Sort", complexity: "O(n^2)" },
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
        note: "Ready",
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
          Algorithm
          <select
            value={algorithm}
            onChange={(event) => setAlgorithm(event.target.value as AlgorithmId)}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
          </select>
        </label>

        <label>
          Speed
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
          <button type="button" onClick={pause}>Pause</button>
          <button type="button" onClick={reset}>Reset</button>
          <button type="button" onClick={randomize}>Randomize</button>
        </div>
      </div>

      <div className="visualizer-meta">
        <h3>{ALGORITHM_INFO[algorithm].name}</h3>
        <p>Time Complexity: {ALGORITHM_INFO[algorithm].complexity}</p>
        <p>{current.note}</p>
      </div>

      <div className="bars-wrap" role="img" aria-label="Sorting bars visualization">
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
    </section>
  );
}
