"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ValidationError, useForm } from "@formspree/react";
import { PageHero } from "@/components/PageHero";

const CONTACT_COOLDOWN_MS = 30 * 60 * 1000;
const CONTACT_COOLDOWN_KEY = "contact.cooldown.until";

function formatRemaining(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function ContactPage() {
  const [state, handleSubmit] = useForm("mwvrpzdv");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const storedValue = window.localStorage.getItem(CONTACT_COOLDOWN_KEY);
    if (!storedValue) return;

    const parsed = Number(storedValue);
    if (!Number.isNaN(parsed) && parsed > Date.now()) {
      setCooldownUntil(parsed);
    } else {
      window.localStorage.removeItem(CONTACT_COOLDOWN_KEY);
    }
  }, []);

  useEffect(() => {
    if (cooldownUntil === 0) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [cooldownUntil]);

  useEffect(() => {
    if (cooldownUntil === 0) return;
    if (cooldownUntil > now) return;

    setCooldownUntil(0);
    window.localStorage.removeItem(CONTACT_COOLDOWN_KEY);
  }, [cooldownUntil, now]);

  useEffect(() => {
    if (!state.succeeded) return;

    setName("");
    setEmail("");
    setMessage("");

    const newCooldownUntil = Date.now() + CONTACT_COOLDOWN_MS;
    setCooldownUntil(newCooldownUntil);
    window.localStorage.setItem(CONTACT_COOLDOWN_KEY, String(newCooldownUntil));
  }, [state.succeeded]);

  const isCooldownActive = cooldownUntil > now;
  const remainingCooldown = useMemo(
    () => Math.max(0, cooldownUntil - now),
    [cooldownUntil, now],
  );

  const submitDisabled = state.submitting || isCooldownActive;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isCooldownActive) return;
    await handleSubmit(event);
  };

  return (
    <main className="page-shell">
      <PageHero
        eyebrow="Contact"
        title="Trimite feedback"
        description="Trimite idei, raporteaza probleme sau sugereaza algoritmi pe care vrei sa ii vezi in vizualizator."
      />

      <section className="contact-wrap">
        <form className="contact-form" onSubmit={onSubmit}>
          <label>
            Nume
            <input
              type="text"
              name="name"
              placeholder="Numele tau"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={submitDisabled}
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={submitDisabled}
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
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={submitDisabled}
              required
            />
          </label>

          <ValidationError prefix="Mesaj" field="message" errors={state.errors} />

          <button type="submit" disabled={submitDisabled}>
            {state.submitting
              ? "Se trimite..."
              : isCooldownActive
                ? `Cooldown activ (${formatRemaining(remainingCooldown)})`
                : "Trimite mesajul"}
          </button>

          {state.succeeded ? (
            <p className="success-text">
              Multumim pentru mesaj. Datele trimise au fost curatate, iar urmatorul mesaj poate fi
              trimis dupa 30 de minute.
            </p>
          ) : null}

          {isCooldownActive ? (
            <p>
              Cooldown hard activ: mai ai de asteptat <strong>{formatRemaining(remainingCooldown)}</strong>.
            </p>
          ) : null}
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
