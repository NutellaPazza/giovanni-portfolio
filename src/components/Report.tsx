import { ArrowRightIcon, ExternalLinkIcon, FileTextIcon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { LinkItem, RelatedItem } from "../types";

export function ReportSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="report-section">
      <h2>{title}</h2>
      <div className="prose">{children}</div>
    </section>
  );
}

export function TextSection({ title, content }: { title: string; content?: string }) {
  if (!content) return null;
  return (
    <ReportSection title={title}>
      <p>{content}</p>
    </ReportSection>
  );
}

export function ListSection({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ReportSection title={title}>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </ReportSection>
  );
}

export function ChipSection({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ReportSection title={title}>
      <div className="chip-list">
        {items.map((item) => (
          <span className="chip" key={item}>
            {item}
          </span>
        ))}
      </div>
    </ReportSection>
  );
}

export function LinksSection({ title, links, documents }: { title: string; links?: LinkItem[]; documents?: LinkItem[] }) {
  if (!links?.length && !documents?.length) return null;
  return (
    <ReportSection title={title}>
      <div className="link-list">
        {documents?.map((doc) => (
          <a key={doc.href} className="btn btn--ink btn--small" href={doc.href} target="_blank" rel="noreferrer">
            <FileTextIcon aria-hidden="true" />
            {doc.label}
          </a>
        ))}
        {links?.map((link) => (
          <a key={link.href} className="btn btn--line btn--small" href={link.href} target="_blank" rel="noreferrer">
            {link.label}
            <ExternalLinkIcon aria-hidden="true" />
          </a>
        ))}
      </div>
    </ReportSection>
  );
}

const pathByKind: Record<RelatedItem["kind"], string> = {
  experience: "/experiences",
  project: "/projects",
  article: "/projects/research",
  education: "/education",
  skill: "/about",
};

const hrefFor = (item: RelatedItem) => (item.kind === "education" ? "/education" : `${pathByKind[item.kind]}/${item.slug}`);

export function RelatedSection({ title, items }: { title: string; items?: RelatedItem[] }) {
  if (!items?.length) return null;
  return (
    <ReportSection title={title}>
      <div className="related">
        {items.map((item) => (
          <Link key={`${item.kind}-${item.slug}`} to={hrefFor(item)}>
            <span className="label">{item.kind}</span>
            <span>{item.title}</span>
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        ))}
      </div>
    </ReportSection>
  );
}
