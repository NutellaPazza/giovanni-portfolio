import { ArrowRightIcon, DownloadIcon, EnvelopeClosedIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { Blotter } from "../components/Blotter";
import { CareerChart } from "../components/CareerChart";
import { DealRoom } from "../components/DealRoom";
import { EquityTerminal } from "../components/EquityTerminal";
import { Filings } from "../components/Filings";
import { Ticker } from "../components/Ticker";
import { articles } from "../data/articles";
import { profile } from "../data/profile";
import { projects } from "../data/projects";

const linkedIn = profile.social.find((item) => item.label === "LinkedIn")?.href;

export function Home() {
  return (
    <>
      <section className="hero dark" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy" data-enter>
            <div className="hero-kicker">
              <span className="live-dot" aria-hidden="true" />
              <span className="label">Finance · Bocconi University · Milan</span>
            </div>
            <h1 id="hero-title">
              <span>Giovanni</span>
              <span>
                De Stasio<span className="accent">.</span>
              </span>
            </h1>
            <p className="lede">
              I research markets with Python, build trading systems and work on startups and venture capital. Finance
              student at Bocconi.
            </p>
            <div className="btn-row">
              <Link className="btn btn--key" to="/projects">
                See my work
                <ArrowRightIcon aria-hidden="true" />
              </Link>
              <a className="btn btn--line" href={profile.cvPath} download>
                <DownloadIcon aria-hidden="true" />
                Download CV
              </a>
            </div>
            <dl className="hero-facts">
              <div>
                <dt>IMC Prosperity 4</dt>
                <dd>Finalist of 18,803 teams</dd>
              </div>
              <div>
                <dt>Vantedge</dt>
                <dd>Co-founder, Head of DCM</dd>
              </div>
              <div>
                <dt>BSQF</dt>
                <dd>Quant analyst, 2 papers</dd>
              </div>
            </dl>
          </div>
          <EquityTerminal />
        </div>
        <Ticker />
      </section>

      <section className="band" aria-labelledby="profile-title">
        <div className="wrap profile-grid">
          <figure className="portrait">
            <img src="/giovanni-home-portrait.jpg" alt="Giovanni De Stasio in a dark suit and tie" />
            <figcaption className="portrait-tag">
              <b>GDS</b> MILAN
            </figcaption>
          </figure>
          <div className="profile-copy">
            <p className="label">Profile</p>
            <h2 id="profile-title">Where markets meet the people who build companies.</h2>
            <p className="lede">
              I study International Economics and Finance at Bocconi. My work sits between financial markets and
              entrepreneurship: quantitative research, trading competitions, and startups I help build. I use
              AI-assisted development to turn an idea into a working tool in days, not months.
            </p>
            <dl className="data-grid">
              <div className="data-cell">
                <dt>Degree</dt>
                <dd>BSc International Economics and Finance, Bocconi, 2025 to now</dd>
              </div>
              <div className="data-cell">
                <dt>Grades</dt>
                <dd>
                  <span className="num up">30L</span> Computer Science · <span className="num up">30</span> Math for
                  Economics
                </dd>
              </div>
              <div className="data-cell">
                <dt>Certifications</dt>
                <dd>Bloomberg Finance Fundamentals · Akuna Capital Options 101</dd>
              </div>
              <div className="data-cell">
                <dt>Focus</dt>
                <dd>Quantitative finance · Financial markets · Venture capital · Startups</dd>
              </div>
            </dl>
            <Link className="text-link" to="/about">
              More about me
              <ArrowRightIcon aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="band band--tint" aria-labelledby="positions-title">
        <div className="wrap">
          <div className="band-head">
            <div>
              <p className="label">Track record</p>
              <h2 id="positions-title">Open positions</h2>
            </div>
            <p className="lede">
              Every project started as a question I wanted to test with real data. Open a row for the method, the
              numbers and what I learned.
            </p>
          </div>
          <Blotter projects={projects} label="Projects and research" />
        </div>
      </section>

      <section className="band band--deal" aria-labelledby="deals-title">
        <div className="wrap">
          <div className="band-head">
            <div>
              <p className="label">Deal room</p>
              <h2 id="deals-title">Startups and ventures</h2>
            </div>
            <p className="lede">
              The entrepreneurial side: a venture platform pitched in an accelerator, a research organisation I
              co-founded, and an AI product built in 24 hours.
            </p>
          </div>
          <DealRoom />
        </div>
      </section>

      <section className="band" aria-labelledby="filings-title">
        <div className="wrap">
          <div className="band-head">
            <div>
              <p className="label">Research desk</p>
              <h2 id="filings-title">Filings</h2>
            </div>
            <p className="lede">
              Reports and papers I wrote or co-wrote, from debt capital markets to energy shocks and volatility.
            </p>
          </div>
          <Filings articles={articles} />
        </div>
      </section>

      <section className="band dark" aria-labelledby="career-title">
        <div className="wrap">
          <div className="band-head">
            <div>
              <p className="label">Career</p>
              <h2 id="career-title">The timeline</h2>
            </div>
            <p className="lede">
              Studies, roles and organisations side by side. Select a desk to open it.
            </p>
          </div>
          <CareerChart />
        </div>
      </section>

      <section className="band" aria-labelledby="close-title">
        <div className="wrap close">
          <h2 id="close-title">
            Let's talk markets, <em>startups</em> or research.
          </h2>
          <div className="close-actions">
            <a className="btn btn--ink" href={profile.email}>
              <EnvelopeClosedIcon aria-hidden="true" />
              Email me
            </a>
            {linkedIn && (
              <a className="btn btn--line" href={linkedIn} target="_blank" rel="noreferrer">
                <LinkedInLogoIcon aria-hidden="true" />
                Connect on LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
