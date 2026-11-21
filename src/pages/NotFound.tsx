import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="wrap not-found">
      <span className="label">404 · No result for this ticker</span>
      <h1 style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 300, letterSpacing: "-0.05em", maxWidth: "12ch" }}>
        This page <strong style={{ fontWeight: 600 }}>doesn't exist.</strong>
      </h1>
      <div className="btn-row">
        <Link className="btn btn--solid" to="/">
          Back to home
          <ArrowRightIcon aria-hidden="true" />
        </Link>
        <Link className="btn btn--ghost" to="/projects">
          See all work
        </Link>
      </div>
    </section>
  );
}
