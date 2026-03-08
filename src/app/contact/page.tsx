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
        title="Send Feedback"
        description="Share ideas, report issues, or suggest algorithms you want to see next in the visualizer."
      />

      <section className="contact-wrap">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Message
            <textarea
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell us what you think..."
            />
          </label>

          <button type="submit">Send Message</button>
        </form>

        <aside className="info-card">
          <h2>What Feedback Helps Most?</h2>
          <p>Which explanations felt clear or confusing.</p>
          <p>Which algorithms you want visualized next.</p>
          <p>Any UI improvements that would make learning easier.</p>
          {submitted ? <p className="success-text">Thanks for your feedback!</p> : null}
        </aside>
      </section>
    </main>
  );
}
