import { useParams } from "react-router-dom";
import { DocumentLink } from "../components/DocumentLink";
import { ExternalLink } from "../components/ExternalLink";
import { RelatedContent } from "../components/RelatedContent";
import { articles } from "../data/articles";
import { NotFound } from "./NotFound";

export function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  if (!article) return <NotFound />;

  return (
    <article className="article-detail">
      <header>
        <p className="eyebrow">
          {article.category} / {article.topic}
        </p>
        <h1>{article.title}</h1>
        <p>{article.summary}</p>
        <div className="article-meta">
          <span>{article.date}</span>
          <span>{article.readingTime}</span>
          <span>{article.authors.join(", ")}</span>
          {article.organization && <span>{article.organization}</span>}
        </div>
      </header>

      {article.cover && <img className="article-cover" src={article.cover.src} alt={article.cover.alt} />}

      <div className="article-body">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {!!article.links?.length && (
        <section className="detail-section">
          <h2>External sources</h2>
          <div className="link-row">
            {article.links.map((link) => (
              <ExternalLink key={link.label} href={link.href}>
                {link.label}
              </ExternalLink>
            ))}
          </div>
        </section>
      )}

      {!!article.documents?.length && (
        <section className="detail-section">
          <h2>Files</h2>
          <div className="document-list">
            {article.documents.map((document) => (
              <DocumentLink key={document.label} item={document} />
            ))}
          </div>
        </section>
      )}

      <RelatedContent title="Related projects" items={article.relatedProjects} />
      <RelatedContent title="Related experiences" items={article.relatedExperiences} />
      <RelatedContent title="Related articles" items={article.relatedArticles} />
    </article>
  );
}
