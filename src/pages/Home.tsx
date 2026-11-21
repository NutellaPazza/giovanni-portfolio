import { ArrowRightIcon, ArrowTopRightIcon, EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { AsciiPortrait } from "../components/AsciiPortrait";
import { articles } from "../data/articles";
import { experiences } from "../data/experiences";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { ventures } from "../data/ventures";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const social = (label: string) => profile.social.find((item) => item.label === label)?.href;

const index = [
  {
    href: "/projects",
    title: "Work",
    text: "Trading systems, apps and hackathon builds.",
    count: projects.length,
    unit: "projects",
  },
  {
    href: "/research",
    title: "Research",
    text: "Papers and reports on debt markets, energy shocks and volatility.",
    count: articles.length,
    unit: "papers",
  },
  {
    href: "/ventures",
    title: "Ventures",
    text: "Vantedge, Vault Capital and AI Campus Navigator.",
    count: ventures.length,
    unit: "ventures",
  },
  {
    href: "/experiences",
    title: "Experience",
    text: "Roles, associations and the IMC Prosperity 4 final.",
    count: experiences.length,
    unit: "roles",
  },
];

export function Home() {
  const linkedIn = social("LinkedIn");
  const github = social("GitHub");

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
              <a className="btn btn--ghost" href={profile.cvPath} download>
                Download CV
              </a>
            </div>
            <nav className="socials" aria-label="Profiles" style={delay(340)}>
              {linkedIn && (
                <a href={linkedIn} target="_blank" rel="noreferrer">
                  <LinkedInLogoIcon aria-hidden="true" />
                  LinkedIn
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noreferrer">
                  <GitHubLogoIcon aria-hidden="true" />
                  GitHub
                </a>
              )}
              <a href={profile.email}>
                <EnvelopeClosedIcon aria-hidden="true" />
                Email
              </a>
            </nav>
          </div>
          <div data-enter>
            <div style={delay(160)}>
              <AsciiPortrait src="/giovanni-home-portrait.jpg" alt="Giovanni De Stasio in a dark suit and tie" />
            </div>
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
              <dt>TEF Ignition</dt>
              <dd>Accelerator with Vault Capital</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section index-section" aria-label="Sections">
        <div className="wrap">
          <ul className="index">
            {index.map((item, i) => (
              <li key={item.href} className="index-row">
                <span className="work-index">{String(i + 1).padStart(2, "0")}</span>
                <Link to={item.href} className="index-title stretch">
                  {item.title}
                </Link>
                <span className="index-text">{item.text}</span>
                <span className="index-count">
                  <span className="num">{item.count}</span> {item.unit}
                </span>
                <ArrowTopRightIcon className="work-arrow" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
