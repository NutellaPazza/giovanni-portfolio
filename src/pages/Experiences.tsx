import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CareerChart } from "../components/CareerChart";
import { PageHead } from "../components/PageHead";
import { Tabs } from "../components/Tabs";
import { experiences } from "../data/experiences";
import type { Experience } from "../types";

type Filter = "All" | Experience["category"];

const filters: Filter[] = ["All", "Work Experience", "Associations", "Sideworks", "Competitions"];

export function Experiences() {
  const [active, setActive] = useState<Filter>("All");
  const visible = active === "All" ? experiences : experiences.filter((item) => item.category === active);

  return (
    <>
      <PageHead
        code="EXP"
        title="Experience"
        lede="Market research for a fintech, a research organisation I co-founded, a quant association, an accelerator and a global trading challenge."
      />

      <section className="band dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <CareerChart />
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <Tabs
            label="Filter by type"
            active={active}
            onChange={setActive}
            tabs={filters.map((id) => ({
              id,
              label: id,
              count: id === "All" ? experiences.length : experiences.filter((item) => item.category === id).length,
            }))}
          />
          <ul className="roles" style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {visible.map((experience) => (
              <li className="role" key={experience.id}>
                <div>
                  <p className="num" style={{ fontSize: "0.86rem", fontWeight: 700 }}>
                    {experience.startDate === experience.endDate
                      ? experience.endDate
                      : `${experience.startDate} to ${experience.endDate}`}
                  </p>
                  <p className="label" style={{ marginTop: 6 }}>
                    {experience.category}
                  </p>
                </div>
                <div>
                  <h3>
                    <Link to={`/experiences/${experience.slug}`}>{experience.role}</Link>
                  </h3>
                  <p className="org">
                    {experience.organization} · {experience.location}
                  </p>
                  <p>{experience.summary}</p>
                  <div className="chip-list">
                    {experience.skills.map((skill) => (
                      <span className="chip" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="blotter-arrow role-arrow" aria-hidden="true">
                  <ArrowRightIcon />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
