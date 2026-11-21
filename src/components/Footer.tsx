import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { navItems } from "./Navbar";

export function Footer() {
  const external = profile.social.filter((item) => !item.href.startsWith("mailto:"));

  return (
    <footer className="site-footer dark">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <p className="label">Milan · Bocconi University</p>
            <h2>Markets, research and startups, built in public.</h2>
          </div>
          <div className="footer-links">
            <p className="label">Contact</p>
            <a href={profile.email}>Email</a>
            {external.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
          <div className="footer-links">
            <p className="label">Site</p>
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                {item.label}
              </Link>
            ))}
            <a href={profile.cvPath} download>
              CV (PDF)
            </a>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Backtest figures are historical simulations, not investment advice.</span>
        </div>
      </div>
    </footer>
  );
}
