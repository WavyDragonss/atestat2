"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { executePseudocode } from "@/lib/pseudocodeCompiler";

const starterCode = `citește x,y
(numere naturale nenule)
┌dacă x>y atunci xy
└■
nr1
┌pentru iy,x,-1 execută
│ scrie 1
│┌dacă nr≥x atunci
││ scrie 2
│└■
│ nrnr*3
│ scrie 1
└■`;

export default function PseudocodeCompilerPage() {
  const [source, setSource] = useState(starterCode);
  const [inputValues, setInputValues] = useState("4, 9");
  const [wildcardMode, setWildcardMode] = useState(true);

  const execution = useMemo(
    () => executePseudocode(source, inputValues, { wildcardMode }),
    [source, inputValues, wildcardMode],
  );

  const result = execution.compile;

  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Laborator"
        title="Compilator de pseudocod"
        description="Scrie pseudocod in romana si genereaza automat JavaScript. Modul wildcard recunoaste inclusiv forme scanate cu simboluri speciale, apoi poti executa codul cu valori introduse pentru citeste."
      />

      <section className="pseudo-grid">
        <article className="info-card pseudo-panel">
          <div className="pseudo-panel-head">
            <h2>Editor pseudocod</h2>
            <label className="pseudo-toggle" htmlFor="wildcard-mode">
              <input
                id="wildcard-mode"
                type="checkbox"
                checked={wildcardMode}
                onChange={(event) => setWildcardMode(event.target.checked)}
              />
              Mod wildcard
            </label>
          </div>

          <textarea
            value={source}
            onChange={(event) => setSource(event.target.value)}
            className="pseudo-editor"
            spellCheck={false}
            aria-label="Editor pseudocod"
          />

          <label className="pseudo-input-label" htmlFor="pseudo-input-values">
            Valori pentru citeste (separate prin virgula, spatiu sau rand nou)
          </label>
          <textarea
            id="pseudo-input-values"
            value={inputValues}
            onChange={(event) => setInputValues(event.target.value)}
            className="pseudo-input-values"
            spellCheck={false}
          />

          <div className="pseudo-run-block">
            <h3>Rezultat executie</h3>
            {execution.runtimeError ? (
              <p className="pseudo-error">Eroare: {execution.runtimeError}</p>
            ) : execution.outputs.length === 0 ? (
              <p className="pseudo-empty">Programul nu a produs iesire.</p>
            ) : (
              <pre className="pseudo-output pseudo-runtime-output">
                <code>{execution.outputs.join("\n")}</code>
              </pre>
            )}
          </div>

          <p className="pseudo-hint">
            Suport principal: <strong>citește</strong>, <strong>scrie</strong>, <strong>atribuire</strong> cu
            <strong> ← </strong>, <strong>dacă/altfel</strong>, <strong>cât timp</strong>, <strong>pentru</strong>,
            <strong> repetă...până când</strong>, operatori <strong>div</strong>, <strong>mod</strong>,
            <strong> și/sau/nu</strong>.
          </p>
        </article>

        <article className="info-card pseudo-panel">
          <div className="pseudo-panel-head">
            <h2>JavaScript generat</h2>
            <Link href="/pseudocode-guide" className="ghost-btn">
              Vezi ghidul complet
            </Link>
          </div>

          <pre className="pseudo-output">
            <code>{result.js}</code>
          </pre>

          <h3>Pseudocod normalizat</h3>
          <pre className="pseudo-output">
            <code>{result.normalizedPseudocode}</code>
          </pre>

          <div className="pseudo-issues">
            <h3>Diagnostic</h3>
            {result.issues.length === 0 ? (
              <p className="success-text">Fara probleme detectate.</p>
            ) : (
              <ul>
                {result.issues.map((issue) => (
                  <li key={`${issue.line}-${issue.message}`}>
                    Linia {issue.line}: {issue.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
