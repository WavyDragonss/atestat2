import { PageHero } from "@/components/PageHero";

const topics = [
  {
    name: "Bubble Sort",
    description: "Un algoritm de sortare bazat pe comparatii care interschimba repetat elementele adiacente cand sunt in ordinea gresita.",
    howItWorks:
      "Cea mai mare valoare nesortata se muta spre final la fiecare parcurgere. Repetarea parcurgerilor sorteaza in final intregul tablou.",
    complexity: "Caz defavorabil: O(n^2), Caz favorabil (optimizat): O(n)",
    example: "Util la invatare deoarece fiecare interschimbare se poate vizualiza usor, desi este ineficient pentru seturi mari de date.",
  },
  {
    name: "Binary Search",
    description: "Algoritm eficient de cautare pentru tablouri sortate.",
    howItWorks:
      "Tabloul se imparte in jumatate la fiecare pas. Algoritmul pastreaza doar jumatatea care poate contine valoarea cautata.",
    complexity: "O(log n)",
    example: "Gasirea unui cuvant in dictionar sau cautarea intr-o lista sortata de ID-uri.",
  },
  {
    name: "Recursion",
    description: "O tehnica prin care o functie rezolva o problema apelandu-se pe subprobleme mai mici.",
    howItWorks:
      "Fiecare apel recursiv avanseaza spre un caz de baza. Dupa atingerea cazului de baza, rezultatele se intorc prin apelurile anterioare.",
    complexity: "Depinde de problema si de numarul apelurilor recursive.",
    example: "Calcul factorial, parcurgeri de arbori si algoritmi divide et impera.",
  },
  {
    name: "Euclidean Algorithm",
    description: "Calculeaza cel mai mare divizor comun (CMMDC) al doua numere.",
    howItWorks:
      "Inlocuieste repetat (a, b) cu (b, a mod b) pana cand b devine 0. Valoarea finala a este CMMDC-ul.",
    complexity: "O(log(min(a, b)))",
    example: "Simplificarea fractiilor si probleme de teorie a numerelor.",
  },
  {
    name: "Depth-First Search (DFS)",
    description: "Strategie de parcurgere a grafurilor care exploreaza in adancime inainte de revenire.",
    howItWorks:
      "Porneste dintr-un nod, viziteaza un vecin, continua in adancime pana la blocaj, apoi revine si exploreaza ramuri noi.",
    complexity: "O(V + E)",
    example: "Gasirea drumurilor, sortare topologica si detectarea ciclurilor in grafuri.",
  },
  {
    name: "Prefix Sums",
    description: "Tehnica de preprocesare pentru interogari rapide de suma pe interval.",
    howItWorks:
      "Construieste un tablou auxiliar in care fiecare pozitie stocheaza suma cumulata pana la acel index.",
    complexity: "Construire: O(n), Interogare: O(1)",
    example: "Exercitii BAC frecvente cu sume pe intervale sau numarare de valori in intervale.",
  },
  {
    name: "Two Pointers",
    description: "Pattern care foloseste doi indici ce se deplaseaza printr-un tablou in functie de conditii.",
    howItWorks:
      "Porneste cu pointerii in pozitii strategice si ajusteaza-i pana cand conditia este satisfacuta.",
    complexity: "De obicei O(n)",
    example: "Probleme de tip suma perechi, ferestre glisante si optimizari pe tablouri sortate.",
  },
];

export default function AlgorithmsPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Teorie"
        title="Explicatii de algoritmi"
        description="Intelege ideile de baza din informatica prin blocuri scurte si clare de teorie, inainte sa treci la vizualizator."
      />

      <section className="card-grid">
        {topics.map((topic) => (
          <article key={topic.name} className="info-card">
            <h2>{topic.name}</h2>
            <p>
              <strong>Descriere:</strong> {topic.description}
            </p>
            <p>
              <strong>Cum functioneaza:</strong> {topic.howItWorks}
            </p>
            <p>
              <strong>Complexitate:</strong> {topic.complexity}
            </p>
            <p>
              <strong>Exemplu:</strong> {topic.example}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
