import { useState } from "react";
import { WorkList } from "../components/Lists";
import { PageHead } from "../components/PageHead";
import { Tabs } from "../components/Tabs";
import { projects } from "../data/projects";
import type { Project } from "../types";

type Filter = "All" | Project["category"];

const filters: { id: Filter; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Projects", label: "Builds" },
  { id: "Research", label: "Research" },
  { id: "Hackathons", label: "Hackathons" },
];

export function Projects() {
  const [active, setActive] = useState<Filter>("All");
  const visible = active === "All" ? projects : projects.filter((project) => project.category === active);

  return (
    <>
      <PageHead
        eyebrow="Work"
        title="Trading systems, apps and research"
        lede="Each one started as a question I wanted to answer with data."
      />
      <section className="section">
        <div className="wrap">
          <Tabs
            label="Filter by type"
            active={active}
            onChange={setActive}
            tabs={filters.map((filter) => ({
              ...filter,
              count: filter.id === "All" ? projects.length : projects.filter((p) => p.category === filter.id).length,
            }))}
          />
          <WorkList projects={visible} />
        </div>
      </section>
    </>
  );
}
