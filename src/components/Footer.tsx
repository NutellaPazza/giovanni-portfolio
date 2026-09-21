import { Link } from "react-router-dom";
import { profile } from "../data/profile";

const footerNav = [
  { label: "About", href: "/about" },
  { label: "Experiences", href: "/experiences" },
  { label: "Projects", href: "/projects" },
  { label: "Education", href: "/education" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="eyebrow">{profile.name}</p>
          <h2>Markets, research, projects, and competitions.</h2>
        </div>
        <div className="footer-links">
          <a href={profile.email}>Email</a>
          {profile.social
            .filter((item) => item.label !== "Email")
            .map((item) => (
              <a key={item.label} href={item.href.startsWith("[") ? "#" : item.href}>
                {item.label}
              </a>
            ))}
        </div>
        <div className="footer-links">
          {footerNav.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="copyright">Copyright {new Date().getFullYear()} {profile.name}.</p>
    </footer>
  );
}
