import { education } from "../data/education";

export function Education() {
  return (
    <div className="page">
      <section className="page-hero">
        <h1>Education</h1>
      </section>

      <section className="section">
        <div className="education-list">
          {education.map((entry) => (
            <article className="education-entry" key={entry.id}>
              <div>
                <p className="eyebrow">
                  {entry.startDate} to {entry.endDate}
                </p>
                <h2>{entry.institution}</h2>
                <p>
                  {entry.program}, {entry.location}
                </p>
              </div>
              <div>
                <p>{entry.description}</p>
                <div className="education-details-grid">
                  <InfoList title="Relevant coursework" items={entry.coursework} />
                  <InfoList title="Activities" items={entry.activities} />
                  <InfoList title="Achievements" items={entry.achievements} />
                  <InfoList title="Certifications" items={entry.certifications} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="info-list">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
