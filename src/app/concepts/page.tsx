import { PageHero } from "@/components/PageHero";

const concepts = [
  {
    name: "Complexitate Big-O",
    details:
      "Compara ratele de crestere ale algoritmilor. Ajuta la alegerea solutiilor scalabile inainte de implementare.",
    tip: "Estimeaza mereu complexitatea din bucle si adancimea recursiei inainte sa scrii cod.",
  },
  {
    name: "Recursie vs iteratie",
    details:
      "Recursia este expresiva, dar poate folosi mai multa memorie de stiva; iteratia este adesea mai eficienta.",
    tip: "Cand adancimea recursiei poate deveni mare, converteste la o abordare iterativa.",
  },
  {
    name: "Strategie Greedy",
    details:
      "Construieste solutia alegand repetat optiunea locala optima.",
    tip: "Foloseste-o doar cand poti justifica corectitudinea printr-un invariant sau o idee de demonstratie.",
  },
  {
    name: "Programare dinamica",
    details:
      "Stocheaza rezultate intermediare pentru a evita recalcularile.",
    tip: "Defineste starea, tranzitiile si cazurile de baza inainte de scrierea codului.",
  },
  {
    name: "Debugging la probleme de concurs",
    details:
      "Cele mai multe raspunsuri gresite vin din conditii de margine, nu din alegerea algoritmului.",
    tip: "Testeaza de fiecare data n=1, valori egale, date sortate si restrictii maxime.",
  },
];

export default function ConceptsPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Idei"
        title="Concepte interesante de algoritmica"
        description="Mergi dincolo de sintaxa si construieste intuitie solida de rezolvare folosind principii practice de proiectare a algoritmilor."
      />

      <section className="card-grid">
        {concepts.map((concept) => (
          <article className="info-card" key={concept.name}>
            <h2>{concept.name}</h2>
            <p>{concept.details}</p>
            <p>
              <strong>Sfat pentru examen:</strong> {concept.tip}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
