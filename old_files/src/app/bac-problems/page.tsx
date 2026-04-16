import { PageHero } from "@/components/PageHero";

const bacProblems = [
  {
    title: "Model BAC: Numarare numere prime",
    statement: "Date n numere, determina cate sunt prime.",
    strategy:
      "Pentru fiecare valoare, testeaza divizibilitatea pana la sqrt(x). Complexitatea este buna pentru restrictii medii.",
    keyIdeas: ["optimizare cu radical", "aritmetica modulo", "decompozitie in functii"],
  },
  {
    title: "Model BAC: Cea mai lunga secventa crescatoare",
    statement: "Determina cea mai lunga subsecventa contigua strict crescatoare.",
    strategy:
      "Foloseste o singura parcurgere si retine lungimea curenta + lungimea maxima. O(n), fara memorie suplimentara.",
    keyIdeas: ["scanare liniara", "actualizare stare", "tratarea cazurilor limita"],
  },
  {
    title: "Model BAC: Frecventa vocalelor in sir",
    statement: "Citeste un text si afiseaza frecventa fiecarei vocale.",
    strategy:
      "Normalizeaza caracterele la litere mici si actualizeaza un tabel fix de frecvente.",
    keyIdeas: ["procesare de caractere", "tablouri", "parsarea intrarii"],
  },
  {
    title: "Model BAC: Suma de pe conturul matricei",
    statement: "Calculeaza suma valorilor aflate pe marginea matricei.",
    strategy:
      "Aduna integral prima si ultima linie, apoi doar prima si ultima coloana pentru liniile din mijloc.",
    keyIdeas: ["tablouri 2D", "limite de index", "evitarea dublei numarari"],
  },
];

export default function BacProblemsPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="BAC"
        title="Probleme de tip BAC rezolvate"
        description="Exerseaza gandirea algoritmica de tip BAC cu modele concise rezolvate si strategii explicate pe pasi."
      />

      <section className="card-grid">
        {bacProblems.map((problem) => (
          <article className="info-card" key={problem.title}>
            <h2>{problem.title}</h2>
            <p>
              <strong>Problema:</strong> {problem.statement}
            </p>
            <p>
              <strong>Strategie de rezolvare:</strong> {problem.strategy}
            </p>
            <p>
              <strong>Idei cheie:</strong> {problem.keyIdeas.join(", ")}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
