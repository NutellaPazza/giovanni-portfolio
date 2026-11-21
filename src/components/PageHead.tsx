import { ArrowLeftIcon } from "@radix-ui/react-icons";
import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";

type Fact = { label: string; value: ReactNode };

type PageHeadProps = {
  eyebrow?: string;
  crumb?: { label: string; href: string };
  title: string;
  lede?: string;
  facts?: Fact[];
};

export function PageHead({ eyebrow, crumb, title, lede, facts }: PageHeadProps) {
  return (
    <header className="page-head">
      <div className="wrap" data-enter>
        {crumb ? (
          <Link className="crumb" to={crumb.href}>
            <ArrowLeftIcon aria-hidden="true" />
            {crumb.label}
          </Link>
        ) : (
          eyebrow && <span className="label">{eyebrow}</span>
        )}
        <h1 style={{ "--d": "60ms" } as CSSProperties}>{title}</h1>
        {lede && (
          <p className="lede" style={{ "--d": "160ms" } as CSSProperties}>
            {lede}
          </p>
        )}
        {!!facts?.length && (
          <dl className="head-facts" style={{ "--d": "240ms" } as CSSProperties}>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
