import { useState } from "react";
import { ExperienceCard } from "../components/Cards";
import { Tabs } from "../components/Tabs";
import { experiences } from "../data/experiences";
import type { Experience } from "../types";

const tabs: Experience["category"][] = ["Work Experience", "Associations", "Sideworks", "Competitions"];

export function Experiences() {
  const [active, setActive] = useState<Experience["category"]>("Work Experience");
  const visible = experiences.filter((experience) => experience.category === active);

  return (
    <div className="page">
      <section className="page-hero">
        <h1>Experiences</h1>
      </section>
      <section className="section">
        <Tabs tabs={tabs} active={active} onChange={setActive} label="Experience categories" />
        <div className="timeline-list">
          {visible.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </section>
    </div>
  );
}
