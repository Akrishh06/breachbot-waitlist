import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function WaitlistPage() {
  return (
    <main className="waitlist-page">
      <Link className="back-link" href="/">
        Back
      </Link>

      <section className="waitlist-card" aria-labelledby="waitlist-title">
        <div className="waitlist-intro">
          <p className="panel-kicker">Waitlist</p>
          <h1 id="waitlist-title">Get early access.</h1>
          <p>
            Tell us where you fit. We will use it to shape the first BreachBot
            beta invites.
          </p>
        </div>

        <WaitlistForm />
      </section>
    </main>
  );
}
