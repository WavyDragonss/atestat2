export function BacktrackingVisualizer() {
  return (
    <section className="visualizer-shell">
      <div className="visualizer-meta">
        <h3>Backtracking pentru BAC</h3>
        <p>
          Backtracking construieste solutia pas cu pas. Daca o alegere nu mai respecta conditiile,
          revenim la pasul anterior si incercam alta varianta.
        </p>
      </div>

      <div className="card-grid" style={{ marginTop: "1rem" }}>
        <article className="info-card">
          <h3>1. Ideea principala</h3>
          <p>
            Backtracking construieste solutia element cu element. Cand o alegere nu mai respecta
            conditiile, ne intoarcem si incercam alta varianta.
          </p>
          <p>
            Pe scurt: alegem o valoare, verificam daca e valida, continuam daca e buna, altfel
            incercam urmatoarea valoare.
          </p>
        </article>

        <article className="info-card">
          <h3>2. Structura generala</h3>
          <pre>
            <code>{`back(k)
  pentru fiecare valoare posibila
    x[k] = valoare
    daca este valida
      daca am completat solutia
        afiseaza
      altfel
        back(k + 1)`}</code>
          </pre>
          <p>
            <code>k</code> este pozitia curenta, iar <code>x[k]</code> este valoarea aleasa pe
            pozitia respectiva.
          </p>
        </article>

        <article className="info-card">
          <h3>3. Exemplu simplu</h3>
          <p>Generam toate numerele de 3 cifre diferite din multimea {`{1,2,3}`}. </p>
          <p>Etape: prima cifra, a doua cifra diferita, a treia cifra diferita de primele doua.</p>
          <p>
            Rezultat final: <code>123 132 213 231 312 321</code>
          </p>
        </article>

        <article className="info-card">
          <h3>4. Cate solutii sunt</h3>
          <p>
            Permutari (toate elementele diferite): <code>n!</code>
          </p>
          <p>
            Aranjari: <code>A(n,k) = n! / (n-k)!</code>
          </p>
          <p>
            Combinatii: <code>C(n,k) = n! / (k! (n-k)!)</code>
          </p>
        </article>

        <article className="info-card">
          <h3>5. Cum recunosti la BAC</h3>
          <p>
            Apar cerinte de tipul: "toate posibilitatile", "afisati toate", "generarea tuturor
            sirurilor", "toate permutarile" sau "toate combinarile".
          </p>
        </article>

        <article className="info-card">
          <h3>6. Exemplu tip BAC</h3>
          <p>Afisati toate numerele de 3 cifre formate din 1, 2, 3 fara repetare.</p>
          <p>
            Conditii: <code>x1 != x2</code>, <code>x1 != x3</code>, <code>x2 != x3</code>
          </p>
        </article>
      </div>

      <article className="info-card" style={{ marginTop: "1rem" }}>
        <h3>7. TLDR</h3>
        <p>Backtracking construieste solutia pas cu pas.</p>
        <p>Daca o alegere nu mai respecta conditiile, revenim si incercam alta optiune.</p>
        <p>Se foloseste la generarea tuturor solutiilor: permutari, aranjari, combinatii.</p>
      </article>
    </section>
  );
}
