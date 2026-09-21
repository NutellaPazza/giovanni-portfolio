import { Link } from "react-router-dom";
import type { Article, Experience, Project } from "../types";
import { SkillTag } from "./SkillTag";

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="preview-row">
      <div className="preview-meta">
        <span>{experience.category}</span>
        <span>
          {experience.startDate} to {experience.endDate}
        </span>
      </div>
      <div className="preview-main">
        <Link to={`/experiences/${experience.slug}`}>
          <h3>{experience.role}</h3>
        </Link>
        <p className="muted">
          {experience.organization}, {experience.location}
        </p>
        <p>{experience.summary}</p>
        <div className="tag-list">
          {experience.skills.map((skill) => (
            <SkillTag key={skill} label={skill} />
          ))}
        </div>
      </div>
    </article>
  );
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={featured ? "project-card project-card--featured" : "project-card"}>
      {project.cover && <img src={project.cover.src} alt={project.cover.alt} loading="lazy" />}
      <div>
        <div className="preview-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
          <span>{project.status}</span>
        </div>
        <Link to={`/projects/${project.slug}`}>
          <h3>{project.title}</h3>
        </Link>
        <p>{project.summary}</p>
        <div className="tag-list">
          {project.skills.map((skill) => (
            <SkillTag key={skill} label={skill} />
          ))}
        </div>
      </div>
    </article>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <div className="preview-meta">
        <span>{article.category}</span>
        <span>{article.topic}</span>
        <span>{article.readingTime}</span>
      </div>
      <Link to={`/projects/research/${article.slug}`}>
        <h3>{article.title}</h3>
      </Link>
      <p>{article.summary}</p>
      <p className="muted">{article.date}</p>
    </article>
  );
}
