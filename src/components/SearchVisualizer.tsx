"use client";

import { useEffect, useMemo, useState } from "react";

type SearchStep = {
  low: number;
  high: number;
  mid: number;
  found: boolean;
  note: string;
};

const SOURCE = [2, 4, 7, 11, 15, 19, 23, 27, 31, 36, 41, 45, 52, 60, 74];

function buildBinarySearchSteps(arr: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [];
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    steps.push({
      low,
      high,
      mid,
      found: arr[mid] === target,
      note: `Check middle value ${arr[mid]} at index ${mid}`,
    });

    if (arr[mid] === target) {
      break;
    }

    if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  if (!steps.some((step) => step.found)) {
    steps.push({
      low: -1,
      high: -1,
      mid: -1,
      found: false,
      note: `Target ${target} not found in array`,
    });
  }

  return steps;
}

export function SearchVisualizer() {
  const [target, setTarget] = useState(23);
  const [steps, setSteps] = useState<SearchStep[]>(() => buildBinarySearchSteps(SOURCE, 23));
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setSteps(buildBinarySearchSteps(SOURCE, target));
    setIndex(0);
    setIsPlaying(false);
  }, [target]);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => window.clearInterval(timer);
  }, [isPlaying, steps.length]);

  const current = useMemo(() => {
    return steps[index] ?? steps[0];
  }, [index, steps]);

  return (
    <section className="visualizer-shell">
      <div className="visualizer-controls">
        <label>
          Target Value
          <input
            type="number"
            value={target}
            onChange={(event) => setTarget(Number(event.target.value))}
          />
        </label>

        <div className="button-row">
          <button type="button" onClick={() => setIsPlaying(true)}>
            Start
          </button>
          <button type="button" onClick={() => setIsPlaying(false)}>
            Pause
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setIndex(0);
            }}
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setIndex((prev) => Math.min(prev + 1, steps.length - 1));
            }}
          >
            Next Step
          </button>
        </div>
      </div>

      <div className="visualizer-meta">
        <h3>Binary Search Visualizer</h3>
        <p>Time Complexity: O(log n)</p>
        <p>{current?.note}</p>
      </div>

      <div className="search-array">
        {SOURCE.map((value, idx) => {
          const inRange = current && idx >= current.low && idx <= current.high;
          const isMid = current && idx === current.mid;
          const isFound = isMid && current.found;

          return (
            <div
              key={value}
              className={`search-cell ${inRange ? "range" : ""} ${isMid ? "mid" : ""} ${isFound ? "found" : ""}`}
            >
              <span>{value}</span>
              <small>{idx}</small>
            </div>
          );
        })}
      </div>
    </section>
  );
}
