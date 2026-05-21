"use client";

import { FormEvent, useState } from "react";

type Message = {
  tone: "success" | "error";
  text: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userTypes = [
  "Solo founder",
  "Company lead",
  "Student",
  "Developer",
  "Designer",
  "Security team",
  "Other",
];

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState(userTypes[0]);
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState<Message | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!emailPattern.test(normalizedEmail)) {
      setMessage({ tone: "error", text: "Enter a valid email to join the list." });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail, userType, website }),
      });

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(payload?.error ?? "Could not join the waitlist.");
      }

      setEmail("");
      setUserType(userTypes[0]);
      setWebsite("");
      setMessage({
        tone: "success",
        text: "You are on the list. We will send an invite when BreachBot opens.",
      });
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit}>
      <label className="hp-field" htmlFor="website">
        Website
      </label>
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hp-field"
        id="website"
        name="website"
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        type="text"
        value={website}
      />

      <div className="form-row">
        <label className="field-label" htmlFor="email">
          Email address
        </label>
        <input
          className="email-input"
          id="email"
          inputMode="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
        <button className="submit-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Joining..." : "Join"}
        </button>
      </div>

      <fieldset className="user-type-field">
        <legend>What are you?</legend>
        <div className="user-type-grid">
          {userTypes.map((type) => (
            <label className="user-type-option" key={type}>
              <input
                checked={userType === type}
                name="userType"
                onChange={() => setUserType(type)}
                type="radio"
                value={type}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {message ? (
        <p aria-live="polite" className="form-message" data-tone={message.tone}>
          {message.text}
        </p>
      ) : null}
    </form>
  );
}
