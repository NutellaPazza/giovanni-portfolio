import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { ventures } from "../data/ventures";

export function DealRoom() {
  return (
    <div className="deals">
      {ventures.map((venture) => (
        <article className="sheet" key={venture.id}>
          <div className="sheet-top">
            <span className="label">Term sheet</span>
            <span className="sheet-stamp">{venture.stamp}</span>
          </div>
          <div>
            <h3>{venture.name}</h3>
            <p style={{ marginTop: 10, color: "var(--ink-2)" }}>{venture.pitch}</p>
          </div>
          <dl className="sheet-terms">
            {venture.terms.map((row) => (
              <div key={row.term}>
                <dt>{row.term}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          <Link className="text-link stretched" to={venture.link.href}>
            {venture.link.label}
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );
}
