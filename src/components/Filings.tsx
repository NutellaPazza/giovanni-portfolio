import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import type { Article } from "../types";

export function Filings({ articles }: { articles: Article[] }) {
  return (
    <ul className="filings" style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {articles.map((article) => (
        <li key={article.id} className="filing">
          <div className="filing-date">
            <span className="num">{article.date}</span>
            <span className="label">{article.topic}</span>
          </div>
          <div>
            <h3>
              <Link to={`/projects/research/${article.slug}`} className="stretch">
                {article.title}
              </Link>
            </h3>
            <p>{article.summary}</p>
          </div>
          <div className="filing-meta">
            <span>
              <b>{article.organization ?? "Independent research"}</b>
            </span>
            <span>{article.authors.join(", ")}</span>
          </div>
          <span className="blotter-arrow" aria-hidden="true">
            <ArrowRightIcon />
          </span>
        </li>
      ))}
    </ul>
  );
}
