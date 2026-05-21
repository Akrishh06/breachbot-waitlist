import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import PillNav from "@/components/react-bits/PillNav";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import TextType from "@/components/react-bits/TextType";

const checks = [
  {
    title: "Broken flows",
    body: "Catch dead ends, failed signups, auth loops, and state bugs before launch.",
  },
  {
    title: "Weak security",
    body: "Surface exposed secrets, risky inputs, and fragile configs early.",
  },
  {
    title: "UX friction",
    body: "Find confusing moments, blocked paths, and product rough edges.",
  },
];

const navItems = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Waitlist", href: "/waitlist" },
];

const customerTypes = [
  {
    title: "Solo founders",
    body: "You ship fast and need agents to catch what users would find first.",
  },
  {
    title: "AI app builders",
    body: "For Cursor-built products, rapid prototypes, and messy v1s heading to launch.",
  },
  {
    title: "Startup teams",
    body: "Give small teams a lightweight red-team and QA pass before every release.",
  },
  {
    title: "Agencies",
    body: "Pressure-test client apps before handoff so broken flows do not become support tickets.",
  },
  {
    title: "Product leads",
    body: "Find confusing journeys, blocked users, and weak spots before launch review.",
  },
  {
    title: "Students and hackers",
    body: "Test demos, hackathon builds, and side projects without building a QA process.",
  },
];

const plans = [
  {
    name: "Free trial",
    price: "7 days",
    description: "No credit card. Try BreachBot before picking a plan.",
    features: ["10 agent runs", "1 app", "Core findings only"],
  },
  {
    name: "Starter",
    price: "$149/mo",
    description: "Best for indie founders and very early teams.",
    features: [
      "1 app",
      "2 environments",
      "100 agent runs/month",
      "Bug, security, and UX findings",
      "Email + Slack alerts",
      "14-day history",
    ],
  },
  {
    name: "Growth",
    price: "$499/mo",
    description: "The main plan for teams shipping and releasing regularly.",
    featured: true,
    features: [
      "3 apps",
      "5 environments",
      "5,000 agent runs/month",
      "Scheduled runs",
      "PR/release gating",
      "Jira/Linear export",
      "Replay traces",
      "Team collaboration",
      "30-day history",
    ],
  },
  {
    name: "Scale",
    price: "$1,499/mo",
    description: "For serious startups and small-mid engineering orgs.",
    features: [
      "10 apps",
      "20,000 agent runs/month",
      "Custom test depth",
      "Staging + prod coverage",
      "SSO and role controls",
      "API access",
      "Private runners",
      "90-day history",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description:
      "Usually starts around $25k-$60k ARR for larger companies, regulated environments, procurement, security review, or private deployment.",
    features: [
      "Private deployment options",
      "Security and procurement support",
      "Custom contracts",
      "Dedicated rollout support",
    ],
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <header className="site-nav">
        <a className="logo-lockup" href="#" aria-label="BreachBot home">
          <span className="logo-text">
            <span className="logo-word">BreachBot</span>
          </span>
        </a>
        <PillNav
          activeHref="#"
          baseColor="rgba(4, 7, 18, 0.88)"
          hoveredPillTextColor="#07111f"
          items={navItems}
          logo="/breachbot-logo.svg"
          logoAlt="BreachBot logo"
          pillColor="rgba(139, 248, 255, 0.92)"
          pillTextColor="#07111f"
        />
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="gradient-text">BreachBot</span>
            <span className="type-line">
              <TextType
                as="span"
                className="typed-target"
                cursorCharacter=""
                loop={false}
                showCursor={false}
                text="Autonomous app testing."
                textColors={["#8bf8ff"]}
                typingSpeed={28}
              />
            </span>
          </h1>
          <p className="hero-lede">
            Agents run through your app before launch and flag the stuff that
            breaks, leaks, or feels wrong.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/waitlist">
              Join waitlist
            </a>
          </div>
        </div>
      </section>

      <section className="section-block" id="features" aria-label="What BreachBot finds">
        <div className="section-heading">
          <h2>What it finds</h2>
          <p>Focused checks for bugs, leaks, and confusing product moments.</p>
        </div>
        <div className="spotlight-grid feature-clean-grid">
          {checks.map((check) => (
            <SpotlightCard
              className="info-spotlight-card feature-clean-card"
              key={check.title}
              spotlightColor="rgba(139, 248, 255, 0.2)"
            >
              <h2>{check.title}</h2>
              <p>{check.body}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="positioning-card" aria-label="BreachBot positioning">
        <div>
          <p className="panel-kicker">Why</p>
          <h2>Ship fast. Break less.</h2>
        </div>
        <span className="divider" aria-hidden="true" />
        <div>
          <p>Autonomous agents test your app before users or attackers do.</p>
        </div>
      </section>

      <section className="section-block" id="about" aria-label="About BreachBot customers">
        <div className="section-heading">
          <p className="panel-kicker">About</p>
          <h2>Who it is for</h2>
          <p>
            BreachBot is for builders who ship before they have a full QA or
            security team. It sits between fast product development and the
            messy reality of real users, edge cases, and attackers.
          </p>
        </div>
        <BeforeAfterSlider
          afterAlt="After dashboard design"
          afterSrc="/dashboard-after.png"
          beforeAlt="Before dashboard design"
          beforeSrc="/dashboard-before.png"
        />
        <div className="spotlight-grid">
          {customerTypes.map((customer) => (
            <SpotlightCard
              className="info-spotlight-card"
              key={customer.title}
              spotlightColor="rgba(139, 248, 255, 0.2)"
            >
              <h2>{customer.title}</h2>
              <p>{customer.body}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="section-block" id="pricing" aria-label="Pricing plans">
        <div className="section-heading">
          <p className="panel-kicker">Pricing</p>
          <h2>Plans that scale</h2>
          <p>
            Start with the trial, then scale agent runs, apps, environments,
            and controls as your release process gets more serious.
          </p>
        </div>
        <div className="spotlight-grid pricing-grid">
          {plans.map((plan) => (
            <SpotlightCard
              className={`info-spotlight-card pricing-card ${
                plan.featured ? "pricing-card-featured" : ""
              }`}
              key={plan.name}
              spotlightColor="rgba(255, 119, 217, 0.22)"
            >
              <div className="pricing-card-header">
                <h2>{plan.name}</h2>
                <p>{plan.description}</p>
              </div>
              <strong>{plan.price}</strong>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href="/waitlist">Join waitlist</a>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>BreachBot</span>
        <span>Autonomous app testing for fast-built products.</span>
      </footer>
    </main>
  );
}
