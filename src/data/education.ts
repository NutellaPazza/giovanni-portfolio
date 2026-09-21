import type { Education } from "../types";

export const education: Education[] = [
  {
    id: "bocconi-bief",
    institution: "Bocconi University",
    program: "BSc in International Economics and Finance",
    location: "Milan, Italy",
    startDate: "Sep 2025",
    endDate: "Present",
    description:
      "BIEF student with a finance, markets, quantitative analysis, and venture capital orientation.",
    coursework: ["Computer Science: 30L/30", "Mathematics for Economics: 30/30", "Microeconomics: 29/30"],
    activities: [
      "Bocconi Students for Quantitative Finance",
      "TEF Ignition Startup Accelerator",
      "EY Campus Ambassador",
    ],
    achievements: [],
    certifications: ["Bloomberg Finance Fundamentals", "Akuna Capital Options 101"],
  },
  {
    id: "luigi-garofano",
    institution: "Luigi Garofano Scientific High School",
    program: "Scientific High School",
    location: "Italy",
    startDate: "[Start date]",
    endDate: "2025",
    description:
      "Graduated at 17, two years before the Italian average.",
    coursework: ["Scientific curriculum", "Mathematics", "Physics"],
    activities: ["Summer program at University of Limerick", "Summer program at University of Greenwich"],
    achievements: ["1st place in Math Olympiad twice"],
    certifications: ["Cambly English certificate"],
  },
];
