import { Cross2Icon, DownloadIcon, EnvelopeClosedIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { profile } from "../data/profile";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Experiences", href: "/experiences" },
  { label: "Projects", href: "/projects" },
  { label: "Education", href: "/education" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={scrolled ? "site-header site-header--scrolled" : "site-header"}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand-mark" to="/" aria-label="Home">
          {profile.initials}
        </Link>

        <div className="desktop-nav">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <a className="icon-link" href={profile.email} aria-label="Email">
            <EnvelopeClosedIcon aria-hidden="true" />
          </a>
          <a className="button button--small" href={profile.cvPath} download>
            <DownloadIcon aria-hidden="true" />
            <span>Download CV</span>
          </a>
          <button
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Cross2Icon aria-hidden="true" /> : <HamburgerMenuIcon aria-hidden="true" />}
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="mobile-menu">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <a href={profile.cvPath} download onClick={() => setOpen(false)}>
            Download CV
          </a>
        </div>
      )}
    </header>
  );
}
