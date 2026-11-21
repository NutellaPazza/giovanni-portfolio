import { useParams } from "react-router-dom";
import { MediaGallery } from "../components/MediaGallery";
import { PageHead } from "../components/PageHead";
import { ChipSection, LinksSection, ListSection, RelatedSection, TextSection } from "../components/Report";
import { experiences } from "../data/experiences";
import { NotFound } from "./NotFound";

export function ExperienceDetail() {
  const { slug } = useParams();
  const experience = experiences.find((item) => item.slug === slug);

  if (!experience) return <NotFound />;

  return (
    <article>
      <PageHead
        code="EXP"
        crumb={{ label: "All experience", href: "/experiences" }}
        title={experience.role}
        lede={`${experience.organization}. ${experience.summary}`}
        facts={[
          {
            label: "Period",
            value:
              experience.startDate === experience.endDate
                ? experience.endDate
                : `${experience.startDate} to ${experience.endDate}`,
          },
          { label: "Location", value: experience.location },
          { label: "Type", value: experience.category },
        ]}
      />

      <div className="report">
        <div className="wrap">
          <MediaGallery featuredItem={experience.image} items={experience.gallery} />
          <TextSection title="Overview" content={experience.overview} />
          <ListSection title="What I did" items={experience.responsibilities} />
          <ListSection title="Key work" items={experience.contributions} />
          <TextSection title="What I learned" content={experience.learned} />
          <ChipSection title="Skills" items={experience.skills} />
          <LinksSection title="Read more" links={experience.links} documents={experience.documents} />
          <RelatedSection
            title="Related"
            items={[...(experience.relatedArticles ?? []), ...(experience.relatedProjects ?? [])]}
          />
        </div>
      </div>
    </article>
  );
}
