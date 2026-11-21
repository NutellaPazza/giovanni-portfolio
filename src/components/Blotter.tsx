import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import type { Project } from "../types";

const typeLabel = (category: Project["category"]) =>
  category === "Projects" ? "Build" : category === "Hackathons" ? "Hackathon" : "Research";

export function Blotter({ projects, label }: { projects: Project[]; label: string }) {
  return (
    <div className="blotter">
      <div className="blotter-head" aria-hidden="true">
        <span>Code</span>
        <span>Position</span>
        <span className="col-type">Type</span>
        <span className="col-year">Year</span>
        <span className="col-status">Status</span>
        <span />
      </div>
      <ul aria-label={label} style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {projects.map((project) => (
          <li key={project.id}>
            <Link className="blotter-row" to={`/projects/${project.slug}`}>
              <span className="blotter-code">
                <span>{project.ticker}</span>
              </span>
              <span>
                <span className="blotter-title">{project.title}</span>
                <span className="blotter-sub">{project.summary}</span>
              </span>
              <span className="blotter-cell col-type">{typeLabel(project.category)}</span>
              <span className="blotter-cell num col-year">{project.year}</span>
              <span className="col-status">
                <span className={/live/i.test(project.status) ? "status status--live" : "status"}>{project.status}</span>
              </span>
              <span className="blotter-arrow">
                <ArrowRightIcon aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
