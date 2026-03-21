"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { compilePseudocode } from "@/lib/pseudocodeCompiler";

const starterCode = `citește n
s ← 0
pentru i ← 1, n execută
  citește x
  dacă x mod 2 = 0 atunci
    s ← s + x
  altfel
    scrie x
  sfârșit_dacă
sfârșit_pentru
scrie "Suma pare:", s`;

export default function PseudocodeCompilerPage() {
  const [source, setSource] = useState(starterCode);
  const [wildcardMode, setWildcardMode] = useState(true);

  const result = useMemo(
    () => compilePseudocode(source, { wildcardMode }),
    [source, wildcardMode],
  );

  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Laborator"
        title="Compilator de pseudocod"
        description="Scrie pseudocod in romana si genereaza automat JavaScript. Modul wildcard este permisiv si incearca sa recunoasca variatii de scriere, diacritice si forme apropiate ale instructiunilor."
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
