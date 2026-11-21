import { PageHead } from "../components/PageHead";
import { education } from "../data/education";

/** "Computer Science: 30L/30" -> ["Computer Science", "30L/30"]; plain entries have no grade. */
const splitGrade = (item: string) => {
  const match = /^(.*):\s*(\d+L?\/\d+)$/.exec(item);
  return match ? { name: match[1], grade: match[2] } : null;
};

export function Education() {
  return (
    <>
      <PageHead
        code="EDU"
        title="Education"
        lede="International Economics and Finance at Bocconi, after graduating from a scientific high school two years ahead of the Italian average."
      />
      <section className="band">
        <div className="wrap">
          {education.map((entry) => {
            const grades = entry.coursework.map(splitGrade).filter((g): g is { name: string; grade: string } => !!g);
            const topics = entry.coursework.filter((item) => !splitGrade(item));
            return (
              <article className="school" key={entry.id}>
                <div>
                  <p className="label num">
                    {entry.startDate ? `${entry.startDate} to ${entry.endDate}` : `Graduated ${entry.endDate}`}
                  </p>
                  <h2>{entry.institution}</h2>
                  <p className="meta">
                    {entry.program} · {entry.location}
                  </p>
                  {!!grades.length && (
                    <dl className="grades">
                      {grades.map((g) => (
                        <div key={g.name}>
                          <dt>{g.name}</dt>
                          <dd>{g.grade}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
                <div>
                  <p className="lede">{entry.description}</p>
                  <div className="school-lists">
                    <InfoList title="Coursework" items={topics} />
                    <InfoList title="Activities" items={entry.activities} />
                    <InfoList title="Achievements" items={entry.achievements} />
                    <InfoList title="Certifications" items={entry.certifications} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
