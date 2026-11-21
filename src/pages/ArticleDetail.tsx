import { useParams } from "react-router-dom";
import { MediaGallery } from "../components/MediaGallery";
import { PageHead } from "../components/PageHead";
import { LinksSection, RelatedSection, ReportSection } from "../components/Report";
import { articles } from "../data/articles";
import { NotFound } from "./NotFound";

export function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  if (!article) return <NotFound />;

  return (
    <article>
      <PageHead
        code="RSCH"
        crumb={{ label: "All work", href: "/projects" }}
        title={article.title}
        lede={article.summary}
        facts={[
          { label: "Published", value: <span className="num">{article.date}</span> },
          { label: "Authors", value: article.authors.join(", ") },
          { label: "Organisation", value: article.organization ?? "Independent research" },
          { label: "Format", value: article.readingTime },
        ]}
      />

      <div className="report">
        <div className="wrap">
          <MediaGallery featuredItem={article.cover} />
          <ReportSection title={article.topic}>
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </ReportSection>
          <LinksSection title="Full document" links={article.links} documents={article.documents} />
          <RelatedSection
            title="Related"
            items={[...(article.relatedProjects ?? []), ...(article.relatedExperiences ?? []), ...(article.relatedArticles ?? [])]}
          />
        </div>
      </div>
    </article>
  );
}
