import { Link } from "react-router-dom";
import { education } from "../data/education";
import { experiences } from "../data/experiences";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Oct 2025" -> months since year 0. Returns null for dates without a month ("2026"). */
const toMonth = (value: string) => {
  const match = /^([A-Z][a-z]{2}) (\d{4})$/.exec(value.trim());
  if (!match) return null;
  return Number(match[2]) * 12 + MONTHS.indexOf(match[1]);
};

type Lane = {
  id: string;
  name: string;
  kind: string;
  role: string;
  start: number;
  end: number;
  open: boolean;
  href: string;
};

export function CareerChart() {
  const now = new Date();
  const nowMonth = now.getFullYear() * 12 + now.getMonth();

  const bocconi = education.find((entry) => entry.id === "bocconi-bief");

  const lanes: Lane[] = [];
  const milestones: { id: string; name: string; when: string; href: string }[] = [];

  if (bocconi) {
    const start = toMonth(bocconi.startDate);
    if (start !== null) {
      lanes.push({
        id: bocconi.id,
        name: "Bocconi University",
        kind: "Education",
        role: "BSc International Economics and Finance",
        start,
        end: nowMonth,
        open: true,
        href: "/education",
      });
    }
  }

  experiences.forEach((experience) => {
    const start = toMonth(experience.startDate);
    const openEnded = experience.endDate === "Present";
    const end = openEnded ? nowMonth : toMonth(experience.endDate);
    if (start === null || end === null) {
      milestones.push({
        id: experience.id,
        name: `${experience.organization} ${experience.role}`,
        when: experience.endDate,
        href: `/experiences/${experience.slug}`,
      });
      return;
    }
    lanes.push({
      id: experience.id,
      name: experience.organization,
      kind: experience.category,
      role: experience.role,
      start,
      end: Math.max(end, start + 1),
      open: openEnded,
      href: `/experiences/${experience.slug}`,
    });
  });

  lanes.sort((a, b) => a.start - b.start);

  const from = Math.min(...lanes.map((lane) => lane.start)) - 1;
  const to = Math.max(nowMonth, ...lanes.map((lane) => lane.end)) + 1;
  const span = to - from;
  const pct = (month: number) => ((month - from) / span) * 100;

  const ticks: { label: string; left: number }[] = [];
  for (let m = from + 1; m < to; m += 1) {
    if (m % 3 === 0) ticks.push({ label: `${MONTHS[m % 12]} ${String(Math.floor(m / 12)).slice(2)}`, left: pct(m) });
  }

  return (
    <div>
      <div className="career" role="list" aria-label="Career timeline">
        <div className="career-axis" aria-hidden="true">
          <div className="career-label">
            <span>Desk</span>
          </div>
          <div className="career-axis-scale">
            {ticks.map((tick) => (
              <span key={tick.label} className="career-tick" style={{ left: `${tick.left}%` }}>
                {tick.label}
              </span>
            ))}
          </div>
        </div>

        {lanes.map((lane, i) => (
          <div className="career-row" role="listitem" key={lane.id}>
            <div className="career-label">
              <b>{lane.name}</b>
              <span>{lane.kind}</span>
            </div>
            <div className="career-lane">
              <span
                className={lane.open ? "career-bar career-bar--open" : "career-bar"}
                style={{
                  left: `${pct(lane.start)}%`,
                  width: `${pct(lane.end) - pct(lane.start)}%`,
                  animationDelay: `${200 + i * 90}ms`,
                }}
                aria-hidden="true"
              >
                {lane.role}
              </span>
              <span className="career-now" style={{ left: `${pct(nowMonth)}%` }} aria-hidden="true">
                {i === 0 && <span>NOW</span>}
              </span>
            </div>
            <Link className="career-link" to={lane.href}>
              <span className="sr-only">
                {lane.name}, {lane.role}
              </span>
            </Link>
          </div>
        ))}
      </div>

      {!!milestones.length && (
        <div className="milestones">
          {milestones.map((milestone) => (
            <Link className="milestone" key={milestone.id} to={milestone.href}>
              <b>{milestone.when}</b>
              {milestone.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
