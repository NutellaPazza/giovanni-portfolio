import { useParams } from "react-router-dom";
import { MediaGallery } from "../components/MediaGallery";
import { PageHead } from "../components/PageHead";
import { ChipSection, LinksSection, ListSection, RelatedSection, TextSection } from "../components/Report";
import { projects } from "../data/projects";
import { NotFound } from "./NotFound";

export function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) return <NotFound />;

  const gallery = project.gallery?.filter((item) => item.src !== project.cover?.src);

  return (
    <article>
      <PageHead
        code={project.ticker}
        crumb={{ label: "All work", href: "/projects" }}
        title={project.title}
        lede={project.summary}
        facts={[
          { label: "Year", value: <span className="num">{project.year}</span> },
          { label: "Type", value: project.category === "Projects" ? "Build" : project.category },
          { label: "Status", value: project.status },
        ]}
      />

      <div className="report">
        <div className="wrap">
          <MediaGallery featuredItem={project.cover} items={gallery} />
          <TextSection title="Overview" content={project.overview} />
          <TextSection title="Context" content={project.context} />
          <TextSection title="Idea" content={project.idea} />
          <TextSection title="Approach" content={project.approach} />
          <TextSection title="My role" content={project.contribution} />
          <ListSection title="Process" items={project.process} />
          <TextSection title="Results" content={project.results} />
          <TextSection title="What I learned" content={project.learned} />
          <ChipSection title="Skills" items={project.skills} />
          <LinksSection title="Read more" links={project.links} documents={project.documents} />
          <RelatedSection title="Related" items={[...(project.relatedArticles ?? []), ...(project.relatedExperiences ?? []), ...(project.relatedProjects ?? [])]} />
        </div>
      </div>
    </article>
  );
}
