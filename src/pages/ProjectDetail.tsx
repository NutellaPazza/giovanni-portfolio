import { useParams } from "react-router-dom";
import { DocumentLink } from "../components/DocumentLink";
import { ExternalLink } from "../components/ExternalLink";
import { MediaGallery } from "../components/MediaGallery";
import { RelatedContent } from "../components/RelatedContent";
import { SkillTag } from "../components/SkillTag";
import { projects } from "../data/projects";
import { NotFound } from "./NotFound";

export function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) return <NotFound />;

  const galleryItems = project.gallery?.filter((item) => item.src !== project.cover?.src);

  return (
    <article className="detail-page">
      <header className="detail-hero">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
        <dl>
          <div><dt>Year</dt><dd>{project.year}</dd></div>
          <div><dt>Status</dt><dd>{project.status}</dd></div>
          <div><dt>Category</dt><dd>{project.category}</dd></div>
        </dl>
      </header>

      <MediaGallery featuredItem={project.cover} items={galleryItems} />

      <DetailSection title="Overview" content={project.overview} />
      <DetailSection title="Context and problem" content={project.context} />
      <DetailSection title="Idea" content={project.idea} />
      <DetailSection title="Approach" content={project.approach} />
      <DetailSection title="My contribution" content={project.contribution} />
      <ListSection title="Process" items={project.process} />
      <DetailSection title="Results" content={project.results} />
      <DetailSection title="What I learned" content={project.learned} />

      <section className="detail-section">
        <h2>Skills</h2>
        <div className="tag-list">
          {project.skills.map((skill) => (
            <SkillTag key={skill} label={skill} />
          ))}
        </div>
      </section>

      {!!project.links?.length && (
        <section className="detail-section">
          <h2>Links</h2>
          <div className="link-row">
            {project.links.map((link) => (
              <ExternalLink key={link.label} href={link.href}>
                {link.label}
              </ExternalLink>
            ))}
          </div>
        </section>
      )}

      {!!project.documents?.length && (
        <section className="detail-section">
          <h2>Documents</h2>
          <div className="document-list">
            {project.documents.map((document) => (
              <DocumentLink key={document.label} item={document} />
            ))}
          </div>
        </section>
      )}

      <RelatedContent title="Related articles" items={project.relatedArticles} />
      <RelatedContent title="Related experiences" items={project.relatedExperiences} />
      <RelatedContent title="Related projects" items={project.relatedProjects} />
    </article>
  );
}

function DetailSection({ title, content }: { title: string; content?: string }) {
  if (!content) return null;
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
}

function ListSection({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
