import { ArrowRightIcon, DownloadIcon, EnvelopeClosedIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { PaperGrid, Timeline, VentureGrid, WorkList } from "../components/Lists";
import { articles } from "../data/articles";
import { profile } from "../data/profile";
import { projects } from "../data/projects";

const linkedIn = profile.social.find((item) => item.label === "LinkedIn")?.href;
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Home() {
  return (
    <>
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-main">
          <div data-enter>
            <p className="kicker" style={delay(0)}>
              <span className="dot" aria-hidden="true" />
              <span className="label">GDS · Finance at Bocconi · Milan</span>
            </p>
            <h1 id="hero-title" style={delay(90)}>
              <span>Giovanni</span>
              <span>
                <strong>De Stasio</strong>
              </span>
            </h1>
            <p className="lede" style={delay(200)}>
              I study financial markets, build <b>trading systems</b> and develop <b>apps</b>.
            </p>
            <div className="btn-row" style={delay(280)}>
              <Link className="btn btn--solid" to="/projects">
                See my work
                <ArrowRightIcon aria-hidden="true" />
              </Link>
              <a className="btn btn--ghost" href={profile.email}>
                Get in touch
              </a>
            </div>
          </div>
          <div data-enter>
            <figure className="portrait" style={delay(160)}>
              <img src="/giovanni-home-portrait.jpg" alt="Giovanni De Stasio in a dark suit and tie" />
            </figure>
          </div>
        </div>

        <div data-enter>
          <dl className="facts" style={delay(420)}>
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
              <dd>Quant analyst, two papers</dd>
            </div>
            <div>
              <dt>Bocconi</dt>
              <dd>Computer Science 30L/30</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="label">Selected work</span>
              <h2 id="work-title">
                Built, <strong>tested</strong>, written
              </h2>
            </div>
            <p className="lede">
              Trading systems, apps and market research. Each one started as a question I wanted to answer with data.
            </p>
          </div>
          <WorkList projects={projects} />
        </div>
      </section>

      <section className="section section--raised" aria-labelledby="research-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="label">Research</span>
              <h2 id="research-title">
                Papers <strong>and reports</strong>
              </h2>
            </div>
            <p className="lede">From debt capital markets to energy shocks and volatility, written alone or with my teams.</p>
          </div>
          <PaperGrid articles={articles} />
        </div>
      </section>

      <section className="section" aria-labelledby="ventures-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="label">Ventures</span>
              <h2 id="ventures-title">
                Teams <strong>and ideas</strong>
              </h2>
            </div>
            <p className="lede">
              A research organisation I co-founded, a venture platform I pitched in an accelerator, and an AI product
              built in 24 hours.
            </p>
          </div>
          <VentureGrid />
        </div>
      </section>

      <section className="section" aria-labelledby="experience-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="label">Experience</span>
              <h2 id="experience-title">Where I've worked</h2>
            </div>
            <Link className="text-link" to="/experiences" style={{ justifySelf: "end" }}>
              All experience
              <ArrowRightIcon aria-hidden="true" />
            </Link>
          </div>
          <Timeline />
        </div>
      </section>

      <section className="close" aria-labelledby="close-title">
        <div className="wrap">
          <span className="label">Contact</span>
          <h2 id="close-title" style={{ marginTop: 24 }}>
            Let's <strong>talk.</strong>
          </h2>
          <div className="btn-row">
            <a className="btn btn--solid" href={profile.email}>
              <EnvelopeClosedIcon aria-hidden="true" />
              Email me
            </a>
            {linkedIn && (
              <a className="btn btn--ghost" href={linkedIn} target="_blank" rel="noreferrer">
                <LinkedInLogoIcon aria-hidden="true" />
                LinkedIn
              </a>
            )}
            <a className="btn btn--ghost" href={profile.cvPath} download>
              <DownloadIcon aria-hidden="true" />
              Download CV
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
