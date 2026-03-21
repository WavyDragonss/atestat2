import Link from "next/link";
import { PageHero } from "@/components/PageHero";

const sections = [
  {
    title: "1. Operatii de baza",
    description:
      "Instructiunile fundamentale pentru intrare, iesire si atribuiri. Pentru atribuire foloseste preferabil sageata spre stanga.",
    example: `citește x
scrie x
s ← x + 10`,
  },
  {
    title: "2. Operatori",
    description:
      "Aritmetici: +, -, *, /, div, mod. Relationali: =, ≠, <, >, ≤, ≥. Logici: nu, si, sau.",
    example: `dacă (a mod 2 = 0) și nu (a < 10) atunci
  scrie a
sfârșit_dacă`,
  },
  {
    title: "3. Structura alternativa (daca/altfel)",
    description:
      "Executa un bloc cand conditia este adevarata; optional ruleaza un bloc alternativ.",
    example: `dacă medie ≥ 5 atunci
  scrie "Promovat"
altfel
  scrie "Respins"
sfârșit_dacă`,
  },
  {
    title: "4A. Cat timp (while)",
    description:
      "Conditia este testata la inceputul fiecarei iteratii. Daca este falsa de la start, blocul nu se executa.",
    example: `i ← 1
cât timp i ≤ 5 execută
  scrie i
  i ← i + 1
sfârșit_cât_timp`,
  },
  {
    title: "4B. Pentru (for)",
    description:
      "Folosit cand numarul de pasi este cunoscut. Poti adauga optional pas explicit.",
    example: `pentru i ← 10, 0 pas -2 execută
  scrie i
sfârșit_pentru`,
  },
  {
    title: "4C. Repeta...pana cand",
    description:
      "Blocul se executa cel putin o data, iar oprirea apare cand conditia devine adevarata.",
    example: `repeta
  citește x
până când x > 0`,
  },
  {
    title: "5. Wildcard mode",
    description:
      "Compilatorul include un mod permisiv care tolereaza diacritice lipsa, variante apropiate de comenzi si linii necunoscute pastrate ca comentarii.",
    example: `# Exemplu cu variatii tolerate
citeste n
afiseaza n`,
  },
  {
    title: "6. Conversie in C++ (orientativ)",
    description:
      "div devine / pentru intregi, mod devine %, iar repeta...pana cand devine do { ... } while (!(conditie));",
    example: `// pseudocod
repetă
  x ← x div 2
până când x = 1`,
  },
];

export default function PseudocodeGuidePage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Ghid"
        title="Sintaxa pseudocodului"
        description="Fiecare structura are explicatie scurta si exemplu practic, astfel incat sa poti scrie programe corecte in compilatorul din platforma."
      />

      <section className="card-grid">
        {sections.map((section) => (
          <article className="info-card code-card" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <pre>
              <code>{section.example}</code>
            </pre>
          </article>
        ))}
      </section>

      <section className="cta-row">
        <Link href="/pseudocode-compiler" className="primary-btn">
          Deschide compilatorul
        </Link>
      </section>
    </main>
  );
}
