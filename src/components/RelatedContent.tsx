import { Link } from "react-router-dom";
import type { RelatedItem } from "../types";

type RelatedContentProps = {
  title?: string;
  items?: RelatedItem[];
};

const pathByKind: Record<RelatedItem["kind"], string> = {
  experience: "/experiences",
  project: "/projects",
  article: "/projects/research",
  education: "/education",
  skill: "/about",
};

export function RelatedContent({ title = "Related", items }: RelatedContentProps) {
  if (!items?.length) return null;

  return (
    <section className="related-block" aria-labelledby="related-title">
      <h2 id="related-title">{title}</h2>
      <div className="related-list">
        {items.map((item) => (
          <Link key={`${item.kind}-${item.slug}`} to={`${pathByKind[item.kind]}/${item.slug}`.replace("/education/", "/education")}>
            <span>{item.kind}</span>
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
