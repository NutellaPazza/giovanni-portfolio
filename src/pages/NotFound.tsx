import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>This page is not in the archive yet.</h1>
      <p>The route may be a future project, article, or experience detail. Return home or explore the current structure.</p>
      <div className="button-row">
        <Link className="button" to="/">
          Back home
        </Link>
        <Link className="button button--ghost" to="/projects">
          Explore projects
        </Link>
      </div>
    </section>
  );
}
