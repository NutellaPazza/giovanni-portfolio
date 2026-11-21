import type { LinkItem } from "../types";

export type Venture = {
  id: string;
  name: string;
  stamp: string;
  pitch: string;
  terms: { term: string; value: string }[];
  link: LinkItem;
};

// The startup side of the profile, summarised as term sheets. Every value comes from
// the matching experience or project entry.
export const ventures: Venture[] = [
  {
    id: "vault-capital",
    name: "Vault Capital",
    stamp: "Accelerator",
    pitch: "A retail venture-investing platform that gives small tickets access to startup deals.",
    terms: [
      { term: "Program", value: "TEF Ignition, six weeks, Mar to May 2026" },
      { term: "Structure", value: "SPV structuring, low-ticket access" },
      { term: "Product", value: "Vaults, portfolio and wallet, resale board, admin panel, sandbox demo" },
      { term: "Role", value: "Led the concept and the pitch deck" },
    ],
    link: { label: "Open Vault Capital", href: "/experiences/tef-ignition" },
  },
  {
    id: "vantedge",
    name: "Vantedge",
    stamp: "Co-founded",
    pitch: "A student-led finance and research organisation working across Europe and APAC.",
    terms: [
      { term: "Founded", value: "May 2026" },
      { term: "Network", value: "50+ students, Europe and APAC" },
      { term: "Desks", value: "M&A, DCM, ECM, Equity Research" },
      { term: "Role", value: "Co-founder and Head of DCM" },
    ],
    link: { label: "Open Vantedge", href: "/experiences/vantaedge" },
  },
  {
    id: "ai-campus-navigator",
    name: "AI Campus Navigator",
    stamp: "Hackathon",
    pitch: "Custom AI agents that help students find answers on fragmented university websites.",
    terms: [
      { term: "Event", value: "INNOVA/TE 24h Hackathon, Bocconi, 2025" },
      { term: "Model", value: "B2U licensing, free for students" },
      { term: "Validation", value: "Survey across Bocconi student groups" },
      { term: "Stack", value: "AI agents built with Datapizza" },
    ],
    link: { label: "Open AI Campus Navigator", href: "/projects/ai-campus-navigator-innovate" },
  },
];
