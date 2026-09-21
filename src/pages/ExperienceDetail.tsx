import { useParams } from "react-router-dom";
import { DocumentLink } from "../components/DocumentLink";
import { MediaGallery } from "../components/MediaGallery";
import { RelatedContent } from "../components/RelatedContent";
import { SkillTag } from "../components/SkillTag";
import { experiences } from "../data/experiences";
import { NotFound } from "./NotFound";

export function ExperienceDetail() {
  const { slug } = useParams();
  const experience = experiences.find((item) => item.slug === slug);

  if (!experience) return <NotFound />;

  return (
    <article className="detail-page">
      <header className="detail-hero">
        <div>
          <p className="eyebrow">{experience.category}</p>
          <h1>{experience.role}</h1>
          <p>{experience.organization}</p>
        </div>
        <dl>
          <div><dt>Period</dt><dd>{experience.startDate} to {experience.endDate}</dd></div>
          <div><dt>Location</dt><dd>{experience.location}</dd></div>
          <div><dt>Category</dt><dd>{experience.category}</dd></div>
        </dl>
      </header>

      {experience.image && (
        <figure className="detail-cover">
          <img src={experience.image.src} alt={experience.image.alt} />
          {experience.image.caption && <figcaption>{experience.image.caption}</figcaption>}
        </figure>
      )}

      <DetailSection title="Overview" content={experience.overview} />
      <ListSection title="What I did" items={experience.responsibilities} />
      <ListSection title="Key work and contributions" items={experience.contributions} />
      <DetailSection title="What I learned" content={experience.learned} />

      <section className="detail-section">
        <h2>Skills used</h2>
        <div className="tag-list">
          {experience.skills.map((skill) => (
            <SkillTag key={skill} label={skill} />
          ))}
        </div>
      </section>

      {!!experience.documents?.length && (
        <section className="detail-section">
          <h2>Documents</h2>
          <div className="document-list">
            {experience.documents.map((document) => (
              <DocumentLink key={document.label} item={document} />
            ))}
          </div>
        </section>
      )}

      <MediaGallery items={experience.gallery} />
      <RelatedContent title="Related projects" items={experience.relatedProjects} />
      <RelatedContent title="Related articles" items={experience.relatedArticles} />
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
