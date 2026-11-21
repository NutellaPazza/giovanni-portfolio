import { ArrowRightIcon, Cross2Icon, DownloadIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { profile } from "../data/profile";

export const navItems = [
  { label: "Work", href: "/projects", code: "WORK" },
  { label: "Experience", href: "/experiences", code: "EXP" },
  { label: "Education", href: "/education", code: "EDU" },
  { label: "About", href: "/about", code: "BIO" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary">
        <Link className="brand" to="/" aria-label="Giovanni De Stasio, home">
          <span className="brand-key" aria-hidden="true">
            GDS
          </span>
          <span className="brand-name">Giovanni De Stasio</span>
        </Link>

        <div className="desktop-nav">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <a className="btn btn--key btn--small" href={profile.cvPath} download>
            <DownloadIcon aria-hidden="true" />
            Download CV
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
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="mobile-menu">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {item.label}
              <span className="label">{item.code}</span>
            </NavLink>
          ))}
          <a href={profile.cvPath} download>
            Download CV
            <ArrowRightIcon aria-hidden="true" />
          </a>
        </div>
      )}
    </header>
  );
}
