import { useState } from "react";
import { ProjectCard } from "../components/Cards";
import { Tabs } from "../components/Tabs";
import { projects } from "../data/projects";
import type { Project } from "../types";

const tabs: Project["category"][] = ["Projects", "Research", "Hackathons"];

export function Projects() {
  const [active, setActive] = useState<Project["category"]>("Projects");
  const visible = projects.filter((project) => project.category === active);

  return (
    <div className="page">
      <section className="page-hero">
        <h1>Projects</h1>
      </section>
      <section className="section">
        <Tabs tabs={tabs} active={active} onChange={setActive} label="Project categories" />
        <div className="project-list">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
