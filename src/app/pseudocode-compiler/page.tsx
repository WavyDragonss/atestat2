"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/PageHero";
import {
  compilePseudocode,
  describeStructureGuide,
  executePseudocode,
  extractReadVariables,
  formatAndTranslatePseudocode,
  translateCppToPseudocode,
  transpilePseudocodeToCpp,
} from "@/lib/pseudocodeCompiler";

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

type EditorStage = "editing" | "closing" | "actions";
type FlowStage = "idle" | "compiled" | "running" | "done";

type CppExecutionState = {
  status: "idle" | "loading" | "done" | "error";
  compileStdout: string;
  compileStderr: string;
  runStdout: string;
  runStderr: string;
  message: string;
};

export default function PseudocodeCompilerPage() {
  const [source, setSource] = useState(starterCode);
  const [wildcardMode, setWildcardMode] = useState(true);

  const [editorStage, setEditorStage] = useState<EditorStage>("editing");
  const [flowStage, setFlowStage] = useState<FlowStage>("idle");

  const [formattedLines, setFormattedLines] = useState<string[]>([]);
  const [reviewCppText, setReviewCppText] = useState("");
  const [reviewReady, setReviewReady] = useState(false);
  const [reviewApproved, setReviewApproved] = useState(false);

  const [inputMap, setInputMap] = useState<Record<string, string>>({});
  const [runtimeLines, setRuntimeLines] = useState<string[]>([]);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [showOutputPanel, setShowOutputPanel] = useState(false);
  const [showCppVersion, setShowCppVersion] = useState(false);
  const [showJsDebug, setShowJsDebug] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [cppExec, setCppExec] = useState<CppExecutionState>({
    status: "idle",
    compileStdout: "",
    compileStderr: "",
    runStdout: "",
    runStderr: "",
    message: "",
  });

  const reviewedText = useMemo(() => formattedLines.join("\n"), [formattedLines]);
  const compileSource = reviewApproved || reviewReady ? reviewedText : source;

  const compileResult = useMemo(
    () => compilePseudocode(compileSource, { wildcardMode }),
    [compileSource, wildcardMode],
  );

  const cppResult = useMemo(
    () => transpilePseudocodeToCpp(compileSource, { wildcardMode }),
    [compileSource, wildcardMode],
  );

  const readVariables = useMemo(() => extractReadVariables(compileSource), [compileSource]);
  const structureGuide = useMemo(() => describeStructureGuide(compileSource), [compileSource]);
  const runtimeText = useMemo(() => runtimeLines.join(""), [runtimeLines]);

  useEffect(() => {
    setInputMap((current) => {
      const next: Record<string, string> = {};
      for (const variable of readVariables) {
        next[variable] = current[variable] ?? "";
      }
      return next;
    });
  }, [readVariables]);

  function closeEditorAndShowActions() {
    setEditorStage("closing");
    window.setTimeout(() => {
      setEditorStage("actions");
    }, 420);
  }

  function resetExecutionPanels() {
    setFlowStage("idle");
    setShowOutputPanel(false);
    setShowCppVersion(false);
    setShowJsDebug(false);
    setCppExec({
      status: "idle",
      compileStdout: "",
      compileStderr: "",
      runStdout: "",
      runStderr: "",
      message: "",
    });
    setRuntimeError(null);
    setRuntimeLines([]);
  }

  function onFormat() {
    const candidate = formatAndTranslatePseudocode(source);
    const pseudoLines = candidate.split("\n");
    const cppCandidate = transpilePseudocodeToCpp(candidate, { wildcardMode }).cpp;
    setFormattedLines(pseudoLines);
    setReviewCppText(cppCandidate);
    setReviewReady(true);
    setReviewApproved(false);
    resetExecutionPanels();
  }

  function syncCppFromPseudo(nextLines: string[]) {
    const pseudoText = nextLines.join("\n");
    const nextCpp = transpilePseudocodeToCpp(pseudoText, { wildcardMode }).cpp;
    setReviewCppText(nextCpp);
  }

  function onLineChange(index: number, nextValue: string) {
    setFormattedLines((current) => {
      const next = current.map((line, i) => (i === index ? nextValue : line));
      syncCppFromPseudo(next);
      return next;
    });
  }

  function onLineInsertAfter(index: number) {
    setFormattedLines((current) => {
      const next = [...current];
      next.splice(index + 1, 0, "");
      syncCppFromPseudo(next);
      return next;
    });
  }

  function onLineDelete(index: number) {
    setFormattedLines((current) => {
      if (current.length <= 1) {
        const single = [""];
        syncCppFromPseudo(single);
        return single;
      }
      const next = current.filter((_, i) => i !== index);
      syncCppFromPseudo(next);
      return next;
    });
  }

  function onLineMove(index: number, direction: -1 | 1) {
    setFormattedLines((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) {
        return current;
      }
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      syncCppFromPseudo(next);
      return next;
    });
  }

  function onCppReviewChange(nextCpp: string) {
    setReviewCppText(nextCpp);
    const pseudoText = translateCppToPseudocode(nextCpp);
    const nextLines = pseudoText.split("\n");
    setFormattedLines(nextLines.length > 0 ? nextLines : [""]);
  }

  function onApproveAndCompile() {
    setReviewApproved(true);
    setFlowStage("compiled");
    setShowOutputPanel(false);
    setShowCppVersion(false);
    setShowJsDebug(false);
    setRuntimeError(null);
    setRuntimeLines([]);
  }

  function onEdit() {
    resetExecutionPanels();
    if (formattedLines.length === 0) {
      const candidate = formatAndTranslatePseudocode(source);
      setFormattedLines(candidate.split("\n"));
    }
    setReviewReady(true);
    setReviewApproved(false);
    setEditorStage("actions");
  }

  function onRun() {
    const values = readVariables.map((variable) => inputMap[variable] ?? "").join(" ");

    setFlowStage("running");
    setShowOutputPanel(false);
    setRuntimeError(null);

    window.setTimeout(() => {
      const result = executePseudocode(compileSource, values, { wildcardMode });
      setRuntimeLines(result.outputs);
      setRuntimeError(result.runtimeError);
      setFlowStage("done");
      setShowOutputPanel(true);
    }, 340);
  }

  function onChangeVariableValues() {
    setFlowStage("compiled");
    setShowOutputPanel(false);
    setRuntimeError(null);
  }

  async function onCompileCpp() {
    const stdin = readVariables.map((variable) => inputMap[variable] ?? "").join(" ");
    setCppExec((current) => ({ ...current, status: "loading", message: "Compilez C++..." }));

    try {
      const response = await fetch("/api/compile-cpp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: cppResult.cpp,
          stdin,
        }),
      });

      const payload = (await response.json()) as {
        error?: string;
        message?: string | null;
        compile?: { stdout?: string; stderr?: string } | null;
        run?: { stdout?: string; stderr?: string } | null;
      };

      if (!response.ok || payload.error) {
        setCppExec({
          status: "error",
          compileStdout: "",
          compileStderr: payload.error ?? "Eroare la compilarea externa.",
          runStdout: "",
          runStderr: "",
          message: "",
        });
        return;
      }

      setCppExec({
        status: "done",
        compileStdout: payload.compile?.stdout ?? "",
        compileStderr: payload.compile?.stderr ?? "",
        runStdout: payload.run?.stdout ?? "",
        runStderr: payload.run?.stderr ?? "",
        message: payload.message ?? "",
      });
      setShowCppVersion(true);
    } catch {
      setCppExec({
        status: "error",
        compileStdout: "",
        compileStderr: "Nu am putut contacta compilatorul extern.",
        runStdout: "",
        runStderr: "",
        message: "",
      });
    }
  }

  function onRequestNewCode() {
    setShowResetConfirm(true);
  }

  function onCancelReset() {
    setShowResetConfirm(false);
  }

  function onConfirmReset() {
    setSource("");
    setFormattedLines([]);
    setReviewCppText("");
    setReviewReady(false);
    setReviewApproved(false);
    setEditorStage("editing");
    resetExecutionPanels();
    setShowResetConfirm(false);
  }

  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Laborator"
        title="Compilator de pseudocod"
        description="Flux obligatoriu: introdu codul, formatare/traducere, confirmare daca textul este corect, apoi compilare si rulare cu valori pentru citeste."
      />

      <section className="pseudo-workbench">
        <article
          className={`info-card pseudo-intro-card ${
            editorStage === "closing" ? "is-closing" : editorStage === "actions" ? "is-closed" : ""
          }`}
        >
          {editorStage !== "actions" ? (
            <>
              <div className="pseudo-panel-head">
                <h2>INTRODU CODUL:</h2>
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

              <div className="pseudo-action-row">
                <button type="button" className="primary-btn" onClick={closeEditorAndShowActions}>
                  Continua
                </button>
              </div>
            </>
          ) : (
            <div className="pseudo-main-actions">
              <button type="button" className="primary-btn" onClick={onFormat}>
                Formateaza textul
              </button>
              <button type="button" className="ghost-btn" onClick={onEdit}>
                Editeaza
              </button>
              <button type="button" className="ghost-btn" onClick={onRequestNewCode}>
                Introdu alt cod
              </button>
            </div>
          )}
        </article>

        {editorStage === "actions" && reviewReady && !reviewApproved ? (
          <article className="info-card pseudo-review-card">
            <div className="pseudo-panel-head">
              <h2>Text formatat/tradus</h2>
              <p className="pseudo-read-hint">Verifica si corecteaza daca este necesar</p>
            </div>

            <div className="pseudo-dual-review">
              <div>
                <p className="pseudo-read-hint">Pseudocod (editare pe linii)</p>
                <div className="pseudo-line-editor" aria-label="Editor interactiv text formatat">
                  {formattedLines.map((line, index) => (
                    <div key={`line-${index}`} className="pseudo-line-row">
                      <span className="pseudo-line-number">{index + 1}</span>
                      <input
                        value={line}
                        onChange={(event) => onLineChange(index, event.target.value)}
                        spellCheck={false}
                        aria-label={`Linia ${index + 1}`}
                      />
                      <div className="pseudo-line-actions">
                        <button type="button" className="ghost-btn" onClick={() => onLineMove(index, -1)}>
                          ↑
                        </button>
                        <button type="button" className="ghost-btn" onClick={() => onLineMove(index, 1)}>
                          ↓
                        </button>
                        <button type="button" className="ghost-btn" onClick={() => onLineInsertAfter(index)}>
                          +
                        </button>
                        <button type="button" className="ghost-btn" onClick={() => onLineDelete(index)}>
                          -
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="pseudo-read-hint">C++ (editeaza si sincronizeaza in pseudocod)</p>
                <textarea
                  className="pseudo-editor"
                  value={reviewCppText}
                  onChange={(event) => onCppReviewChange(event.target.value)}
                  spellCheck={false}
                  aria-label="Editor C++ pentru sincronizare"
                />
              </div>
            </div>

            <div className="pseudo-action-row">
              <button type="button" className="primary-btn" onClick={onApproveAndCompile}>
                Da, este corect. Compileaza
              </button>
              <button type="button" className="ghost-btn" onClick={onFormat}>
                Reformateaza
              </button>
              <button type="button" className="ghost-btn" onClick={onRequestNewCode}>
                Introdu alt cod
              </button>
            </div>

            <h3>Harta structuri (| si -=)</h3>
            <pre className="pseudo-output">
              <code>{structureGuide || "Nu s-au detectat structuri."}</code>
            </pre>
          </article>
        ) : null}

        {(flowStage === "compiled" || flowStage === "running" || flowStage === "done") && reviewApproved ? (
          <article
            className={`info-card pseudo-input-card ${
              flowStage === "running" ? "is-minimized" : flowStage === "done" ? "is-hidden" : ""
            }`}
          >
            <div className="pseudo-panel-head">
              <h2>Valori pentru citeste</h2>
              <p className="pseudo-read-hint">{readVariables.length} variabile detectate</p>
            </div>

            {readVariables.length === 0 ? (
              <p className="pseudo-empty">Nu exista instructiuni de input in textul aprobat.</p>
            ) : (
              <div className="pseudo-input-grid">
                {readVariables.map((variable) => (
                  <label key={variable} className="pseudo-var-field">
                    {variable}
                    <input
                      value={inputMap[variable] ?? ""}
                      onChange={(event) => {
                        const value = event.target.value;
                        setInputMap((current) => ({ ...current, [variable]: value }));
                      }}
                    />
                  </label>
                ))}
              </div>
            )}

            <div className="pseudo-action-row">
              <button type="button" className="primary-btn" onClick={onRun}>
                Run
              </button>
            </div>
          </article>
        ) : null}

        <article className={`info-card pseudo-output-card ${showOutputPanel ? "is-open" : ""}`}>
          <div className="pseudo-panel-head">
            <h2>Rezultate</h2>
            <div className="pseudo-toggle-row">
              {reviewApproved ? (
                <button type="button" className="ghost-btn" onClick={onChangeVariableValues}>
                  Schimba valorile
                </button>
              ) : null}
              <button
                type="button"
                className="ghost-btn pseudo-debug-secret-btn"
                onClick={() => setShowJsDebug((current) => !current)}
                title="Debug"
                aria-label="Debug"
              >
                debug
              </button>
              <button type="button" className="ghost-btn" onClick={onRequestNewCode}>
                Introdu alt cod
              </button>
              <button
                type="button"
                className="ghost-btn"
                onClick={() => setShowCppVersion((current) => !current)}
              >
                {showCppVersion ? "Ascunde versiunea C++" : "Afiseaza versiunea C++"}
              </button>
              <button type="button" className="ghost-btn" onClick={onCompileCpp}>
                {cppExec.status === "loading" ? "Compilez C++..." : "Compileaza C++"}
              </button>
              <Link href="/pseudocode-guide" className="ghost-btn">
                Ghid structuri
              </Link>
            </div>
          </div>

          {!reviewApproved ? (
            <p className="pseudo-empty">Formateaza textul, confirma corectitudinea si compileaza pentru a continua.</p>
          ) : null}

          {runtimeError ? <p className="pseudo-error">Eroare: {runtimeError}</p> : null}

          {showOutputPanel ? (
            <pre className="pseudo-runtime-box">
              <code>{runtimeText.length > 0 ? runtimeText : "Programul nu a produs iesire."}</code>
            </pre>
          ) : (
            <p className="pseudo-empty">Ruleaza codul pentru a deschide zona de output.</p>
          )}

          {showJsDebug ? (
            <>
              <h3>JavaScript generat</h3>
              <pre className="pseudo-output">
                <code>{compileResult.js}</code>
              </pre>
            </>
          ) : null}

          <h3>Text compilat (normalizat)</h3>
          <pre className="pseudo-output">
            <code>{compileResult.normalizedPseudocode}</code>
          </pre>

          <h3>Harta structuri (| si -=)</h3>
          <pre className="pseudo-output">
            <code>{structureGuide || "Nu s-au detectat structuri."}</code>
          </pre>

          {showCppVersion ? (
            <>
              <h3>Versiune C++</h3>
              <pre className="pseudo-output">
                <code>{cppResult.cpp}</code>
              </pre>

              <h3>Rezultat compilator extern C++</h3>
              {cppExec.status === "idle" ? (
                <p className="pseudo-empty">Apasa pe Compileaza C++ pentru verificare reala.</p>
              ) : null}
              {cppExec.status === "loading" ? <p className="pseudo-empty">Compilez...</p> : null}
              {cppExec.message ? <p className="pseudo-empty">{cppExec.message}</p> : null}

              {cppExec.compileStderr ? (
                <pre className="pseudo-output">
                  <code>{cppExec.compileStderr}</code>
                </pre>
              ) : null}

              {cppExec.compileStdout ? (
                <pre className="pseudo-output">
                  <code>{cppExec.compileStdout}</code>
                </pre>
              ) : null}

              {cppExec.runStderr ? (
                <pre className="pseudo-output">
                  <code>{cppExec.runStderr}</code>
                </pre>
              ) : null}

              {cppExec.runStdout ? (
                <pre className="pseudo-runtime-box">
                  <code>{cppExec.runStdout}</code>
                </pre>
              ) : null}
            </>
          ) : null}

          <div className="pseudo-issues">
            <h3>Diagnostic</h3>
            {compileResult.issues.length === 0 ? (
              <p className="success-text">Fara probleme detectate.</p>
            ) : (
              <ul>
                {compileResult.issues.map((issue) => (
                  <li key={`${issue.line}-${issue.message}`}>
                    Linia {issue.line}: {issue.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>

        {showResetConfirm ? (
          <div className="pseudo-modal-backdrop" role="presentation">
            <div className="info-card pseudo-modal" role="dialog" aria-modal="true" aria-label="Confirmare resetare progres">
              <h3>Esti sigur?</h3>
              <p>Progresul se va sterge.</p>
              <div className="pseudo-action-row">
                <button type="button" className="primary-btn" onClick={onConfirmReset}>
                  Da, introdu alt cod
                </button>
                <button type="button" className="ghost-btn" onClick={onCancelReset}>
                  Anuleaza
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
