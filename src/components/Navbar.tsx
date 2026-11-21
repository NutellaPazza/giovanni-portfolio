import { ArrowDownIcon, Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { profile } from "../data/profile";

export const navItems = [
  { label: "Work", href: "/projects" },
  { label: "Experience", href: "/experiences" },
  { label: "Education", href: "/education" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled || open}>
      <nav className="nav-shell" aria-label="Primary">
        <Link className="brand" to="/" aria-label="Giovanni De Stasio, home">
          <span>GDS</span>
          <span className="brand-sub">Giovanni De Stasio</span>
        </Link>

        <div className="desktop-nav">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <a className="btn btn--ghost btn--small nav-cv" href={profile.cvPath} download>
          Download CV
          <ArrowDownIcon aria-hidden="true" />
        </a>

        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <Cross2Icon aria-hidden="true" /> : <HamburgerMenuIcon aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="mobile-menu">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {item.label}
            </NavLink>
          ))}
          <a href={profile.cvPath} download>
            Download CV
          </a>
        </div>
      )}
    </header>
  );
}
