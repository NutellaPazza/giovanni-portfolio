import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { experiences } from "../data/experiences";
import { ventures } from "../data/ventures";
import type { Article, Project } from "../types";

const typeLabel = (category: Project["category"]) =>
  category === "Projects" ? "Build" : category === "Hackathons" ? "Hackathon" : "Research";

/**
 * Selected work. On devices with a fine pointer the project's cover follows the cursor
 * while a row is hovered; the image is only a preview, the row is the link.
 */
export function WorkList({ projects }: { projects: Project[] }) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  const canPreview =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const follow = () => {
    // Ease toward the pointer so the preview trails slightly behind it.
    current.current.x += (target.current.x - current.current.x) * 0.18;
    current.current.y += (target.current.y - current.current.y) * 0.18;
    previewRef.current?.style.setProperty("--x", `${current.current.x}px`);
    previewRef.current?.style.setProperty("--y", `${current.current.y}px`);
    if (Math.abs(target.current.x - current.current.x) + Math.abs(target.current.y - current.current.y) > 0.5) {
      frame.current = requestAnimationFrame(follow);
    } else {
      frame.current = 0;
    }
  };

  const onMove = (event: PointerEvent) => {
    if (!canPreview) return;
    target.current = { x: event.clientX + 28, y: event.clientY - 110 };
    if (!active) current.current = { ...target.current };
    if (!frame.current) frame.current = requestAnimationFrame(follow);
  };

  const cover = projects.find((p) => p.id === active)?.cover;

  return (
    <>
      <ul className="work" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
        {projects.map((project, i) => (
          <li key={project.id} className="work-row" onPointerEnter={() => setActive(project.cover ? project.id : null)}>
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
      {canPreview && (
        <div ref={previewRef} className="work-preview" data-on={!!cover} aria-hidden="true">
          {cover && <img src={cover.src} alt="" />}
        </div>
      )}
    </>
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
