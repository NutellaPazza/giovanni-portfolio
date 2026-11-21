import type { Skill } from "../types";

export const skills: Skill[] = [
  {
    id: "financial-markets",
    name: "Financial Markets",
    category: "Finance",
    usedIn: [
      { kind: "project", slug: "polymarket-btc-study", title: "Polymarket BTC 5-Minute Prediction Market Study" },
      { kind: "project", slug: "vix-strategy", title: "Systematic VIX Trading Strategy" },
    ],
  },
  {
    id: "venture-capital",
    name: "Venture Capital",
    category: "Finance",
    usedIn: [{ kind: "education", slug: "education", title: "TEF Ignition Startup Accelerator" }],
  },
  {
    id: "python",
    name: "Python",
    category: "Technology",
    usedIn: [
      { kind: "project", slug: "vix-strategy", title: "Systematic VIX Trading Strategy" },
      { kind: "project", slug: "polymarket-btc-study", title: "Polymarket BTC 5-Minute Prediction Market Study" },
    ],
  },
  {
    id: "investment-research",
    name: "Investment Research",
    category: "Finance",
    usedIn: [
      { kind: "project", slug: "asml-investment-research", title: "Selected Investment Research: ASML" },
      { kind: "experience", slug: "vantaedge", title: "Vantedge" },
    ],
  },
  {
    id: "market-research",
    name: "Market research",
    category: "Finance",
    usedIn: [
      { kind: "experience", slug: "finanz", title: "Finanz" },
      { kind: "project", slug: "fintech-product-analysis", title: "Fintech Product and Onboarding Analysis" },
    ],
  },
  {
    id: "financial-modelling",
    name: "Financial Modelling",
    category: "Tools",
    usedIn: [{ kind: "project", slug: "asml-investment-research", title: "Selected Investment Research: ASML" }],
  },
  {
    id: "data-analysis",
    name: "Data analysis",
    category: "Data",
    usedIn: [
      { kind: "project", slug: "polymarket-btc-study", title: "Polymarket BTC 5-Minute Prediction Market Study" },
      { kind: "project", slug: "vix-strategy", title: "Systematic VIX Trading Strategy" },
    ],
  },
  {
    id: "business-development",
    name: "Business Development",
    category: "Soft Skills",
    usedIn: [{ kind: "experience", slug: "finanz", title: "Finanz" }],
  },
];
