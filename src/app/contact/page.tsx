"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/PageHero";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

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
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Numele tau"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@exemplu.com"
            />
          </label>

          <label>
            Mesaj
            <textarea
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Spune-ne ce parere ai..."
            />
          </label>

          <button type="submit">Trimite mesajul</button>
        </form>

        <aside className="info-card">
          <h2>Ce feedback ajuta cel mai mult?</h2>
          <p>Care explicatii au fost clare sau confuze.</p>
          <p>Ce algoritmi vrei sa fie vizualizati in continuare.</p>
          <p>Ce imbunatatiri de interfata ar face invatarea mai usoara.</p>
          {submitted ? <p className="success-text">Multumim pentru feedback!</p> : null}
        </aside>
      </section>
    </main>
  );
}
