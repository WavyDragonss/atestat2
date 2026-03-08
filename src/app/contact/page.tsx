"use client";

import { ValidationError, useForm } from "@formspree/react";
import { PageHero } from "@/components/PageHero";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("mwvrpzdv");

  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Contact"
        title="Trimite feedback"
        description="Trimite idei, raporteaza probleme sau sugereaza algoritmi pe care vrei sa ii vezi in vizualizator."
      />

      <section className="contact-wrap">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Nume
            <input
              type="text"
              name="name"
              placeholder="Numele tau"
              required
            />
          </label>

          <ValidationError prefix="Nume" field="name" errors={state.errors} />

          <label>
            Email
            <input
              id="email"
              type="email"
              name="email"
              placeholder="tu@exemplu.com"
              required
            />
          </label>

          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <label>
            Mesaj
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Spune-ne ce parere ai..."
              required
            />
          </label>

          <ValidationError prefix="Mesaj" field="message" errors={state.errors} />

          <button type="submit" disabled={state.submitting}>
            {state.submitting ? "Se trimite..." : "Trimite mesajul"}
          </button>
        </form>

        <aside className="info-card">
          <h2>Ce feedback ajuta cel mai mult?</h2>
          <p>Care explicatii au fost clare sau confuze.</p>
          <p>Ce algoritmi vrei sa fie vizualizati in continuare.</p>
          <p>Ce imbunatatiri de interfata ar face invatarea mai usoara.</p>
          {state.succeeded ? <p className="success-text">Multumim pentru feedback!</p> : null}
        </aside>
      </section>
    </main>
  );
}
