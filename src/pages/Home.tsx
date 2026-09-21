import { ArrowRightIcon, DownloadIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";

export function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Personal portfolio</p>
          <h1 className="hero-name">
            <span>Giovanni</span>
            <span>De Stasio</span>
          </h1>
          <p className="hero-descriptor">{profile.descriptor}</p>
          <div className="button-row hero-actions">
            <Link className="button" to="/projects">
              Explore my work
              <ArrowRightIcon aria-hidden="true" />
            </Link>
            <Link className="button button--ghost" to="/about">
              About me
            </Link>
            <a className="button button--ghost" href={profile.cvPath} download>
              <DownloadIcon aria-hidden="true" />
              Download CV
            </a>
          </div>
          <div className="social-strip" aria-label="Social links">
            {profile.social.map((item) => (
              <a key={item.label} href={item.href.startsWith("[") ? "#" : item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <figure className="portrait-panel">
          <img src="/giovanni-home-portrait.jpg" alt="Portrait of Giovanni De Stasio" />
        </figure>
      </section>
    </div>
  );
}
