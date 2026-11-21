import { useState } from "react";
import { Blotter } from "../components/Blotter";
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
        code="WORK"
        title="Projects and research"
        lede="Trading systems, market research and startup builds. Each one began as a question I wanted to test with real data."
      />
      <section className="band">
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
          <Blotter projects={visible} label={`${active} projects`} />
        </div>
      </section>
    </>
  );
}
