import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Fact = { label: string; value: ReactNode };

type PageHeadProps = {
  code: string;
  crumb?: { label: string; href: string };
  title: string;
  lede?: string;
  facts?: Fact[];
  children?: ReactNode;
};

export function PageHead({ code, crumb, title, lede, facts, children }: PageHeadProps) {
  return (
    <header className="page-head dark">
      <div className="wrap" data-enter>
        <div className="crumbs">
          <span className="fkey">{code}</span>
          {crumb && <Link to={crumb.href}>← {crumb.label}</Link>}
        </div>
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {!!facts?.length && (
          <dl className="head-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {children}
      </div>
    </header>
  );
}
