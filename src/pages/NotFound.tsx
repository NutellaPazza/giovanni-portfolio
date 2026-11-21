import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="dark" style={{ minHeight: "70vh" }}>
      <div className="wrap not-found">
        <p className="code">404</p>
        <p className="label">No data for this ticker</p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", maxWidth: "18ch" }}>This page is not on the board.</h1>
        <div className="btn-row">
          <Link className="btn btn--key" to="/">
            Back to home
            <ArrowRightIcon aria-hidden="true" />
          </Link>
          <Link className="btn btn--line" to="/projects">
            See all work
          </Link>
        </div>
      </div>
    </section>
  );
}
