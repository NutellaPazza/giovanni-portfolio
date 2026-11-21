import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { experiences } from "../data/experiences";
import { ventures } from "../data/ventures";
import type { Article, Project } from "../types";

const typeLabel = (category: Project["category"]) =>
  category === "Projects" ? "Build" : category === "Hackathons" ? "Hackathon" : "Research";

/** Work as a numbered list. Hovering a row brings it forward and dims the others. */
export function WorkList({ projects }: { projects: Project[] }) {
  return (
    <ul className="work">
      {projects.map((project, i) => (
        <li key={project.id} className="work-row">
          <span className="work-index">{String(i + 1).padStart(2, "0")}</span>
          <span>
            <Link to={`/projects/${project.slug}`} className="work-title stretch">
              {project.title}
            </Link>
            <span className="work-sub">{project.summary}</span>
          </span>
          <span className="work-meta">{typeLabel(project.category)}</span>
          <span className="work-year">{project.year}</span>
          <ArrowTopRightIcon className="work-arrow" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export function PaperGrid({ articles }: { articles: Article[] }) {
  return (
    <ul className="papers">
      {articles.map((article) => (
        <li key={article.id} className="paper">
          <div className="paper-top">
            <span className="label">{article.topic}</span>
            <span className="label">{article.date}</span>
          </div>
          <div>
            <h3>
              <Link to={`/projects/research/${article.slug}`} className="stretch">
                {article.title}
              </Link>
            </h3>
            <p>{article.summary}</p>
          </div>
          <div className="paper-foot">
            <span>
              <b>{article.organization ?? "Independent research"}</b>
              {article.authors.join(", ")}
            </span>
            <ArrowTopRightIcon className="work-arrow" aria-hidden="true" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function VentureGrid() {
  return (
    <div className="ventures">
      {ventures.map((venture) => (
        <article className="venture" key={venture.id}>
          <span className="label">{venture.stamp}</span>
          <div>
            <h3>
              <Link to={venture.link.href} className="stretch">
                {venture.name}
              </Link>
            </h3>
            <p style={{ marginTop: 12 }}>{venture.pitch}</p>
          </div>
          <dl className="venture-terms">
            {venture.terms.map((row) => (
              <div key={row.term}>
                <dt>{row.term}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const sortKey = (date: string) => {
  const m = /^([A-Z][a-z]{2}) (\d{4})$/.exec(date);
  if (m) return Number(m[2]) * 12 + MONTHS.indexOf(m[1]);
  const y = /^(\d{4})$/.exec(date);
  return y ? Number(y[1]) * 12 : 0;
};

export function Timeline() {
  const items = [...experiences].sort((a, b) => sortKey(b.startDate) - sortKey(a.startDate));
  return (
    <ul className="timeline">
      {items.map((item) => (
        <li key={item.id}>
          <span className="when">
            {item.startDate === item.endDate ? item.endDate : `${item.startDate} – `}
            {item.startDate !== item.endDate && (
              <span className={item.endDate === "Present" ? "now" : undefined}>{item.endDate}</span>
            )}
          </span>
          <Link to={`/experiences/${item.slug}`} className="what stretch">
            {item.role}
          </Link>
          <span className="where">{item.organization}</span>
          <ArrowTopRightIcon className="work-arrow" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}
