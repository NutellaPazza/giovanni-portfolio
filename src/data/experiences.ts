import type { Experience } from "../types";

export const experiences: Experience[] = [
  {
    id: "finanz",
    slug: "finanz",
    organization: "Finanz",
    role: "B2B Strategy Session, Business Development, Finance",
    location: "Hybrid / Italy, Milan",
    startDate: "Oct 2025",
    endDate: "Mar 2026",
    category: "Work Experience",
    summary:
      "Structured market research across six countries, screened 300+ potential clients, and supported partnership-tailored go-to-market decisions.",
    overview:
      "Worked on market intelligence, prospect segmentation, competitive analysis, and business development research for a fintech context.",
    responsibilities: [
      "Mapped potential B2B clients by geography, company size, and strategic fit.",
      "Produced market intelligence and competitive analysis across European markets.",
      "Supported prioritisation of partnerships and go-to-market opportunities.",
    ],
    learned:
      "This experience connected market research with commercial judgment: not only finding prospects, but understanding why some opportunities matter more than others.",
    skills: ["Excel", "Sales", "Competitive analysis", "Business Development", "Market research"],
  },
  {
    id: "vantaedge",
    slug: "vantaedge",
    organization: "Vantaedge",
    role: "Co-Founder and Head of DCM",
    location: "International",
    startDate: "May 2026",
    endDate: "Present",
    category: "Associations",
    summary:
      "Co-founded a student-led finance and research organisation connecting 50+ students across Europe and APAC, with workstreams across M&A, DCM, ECM and Equity Research.",
    overview:
      "Built research workstreams and developed Debt Capital Markets research for internal discussions, including issuer credit profiles, rates, spreads, debt issuance activity, and bond-market conditions.",
    responsibilities: [
      "Helped coordinate an international student finance organisation.",
      "Developed DCM-focused research work for internal discussions.",
      "Contributed to a broader finance research structure across multiple workstreams.",
    ],
    skills: ["Debt Capital Markets", "Investment Research", "Market Analysis", "Leadership"],
    relatedArticles: [
      { kind: "article", slug: "dcm-research-placeholder", title: "[Vantaedge DCM research article]" },
      { kind: "article", slug: "equity-research-placeholder", title: "[Vantaedge equity research article]" },
    ],
  },
  {
    id: "bocconi-quant-finance",
    slug: "bocconi-quant-finance",
    organization: "Bocconi Students for Quantitative Finance",
    role: "Capital Markets and Quantitative Analyst",
    location: "Bocconi University",
    startDate: "Sep 2025",
    endDate: "Present",
    category: "Associations",
    summary:
      "Wrote two research articles for the association's quantitative research and marketing division, while contributing to trading simulation and strategy activities.",
    overview:
      "Research and association work at the intersection of capital markets, quantitative finance, and market-facing writing.",
    responsibilities: [
      "Researched and wrote two articles for the quantitative research and marketing division.",
      "Participated in quantitative finance activities, including trading simulation, trading strategy, and trading strategy discussion sessions.",
      "Participated in a live trading competition.",
    ],
    skills: ["Quantitative Finance", "Trading Simulation", "Python", "Research writing"],
    relatedArticles: [
      { kind: "article", slug: "hormuz-shock-market-transmission", title: "The 2026 Hormuz Shock and Its Market Transmission" },
      { kind: "article", slug: "macro-financial-assessment-global-regime", title: "Macro-Financial Assessment of the Global Regime" },
    ],
  },
  {
    id: "ey-campus-ambassador",
    slug: "ey-campus-ambassador",
    organization: "EY",
    role: "Bocconi Campus Ambassador",
    location: "Bocconi University",
    startDate: "Oct 2025",
    endDate: "Present",
    category: "Sideworks",
    summary:
      "Represents EY on campus and participates in consulting-focused training sessions and development events.",
    overview:
      "A side quest that adds communication, campus leadership, and professional-services exposure to the more markets-heavy profile.",
    responsibilities: [
      "Represent EY in the Bocconi student community.",
      "Participate in EY development events and consulting-focused training sessions.",
    ],
    skills: ["Communication", "Campus leadership", "Consulting exposure"],
  },
  {
    id: "tef-ignition",
    slug: "tef-ignition",
    organization: "TEF Ignition",
    role: "Startup Accelerator Program for Vault Capital",
    location: "Milan, Italy",
    startDate: "Mar 2026",
    endDate: "May 2026",
    category: "Sideworks",
    summary:
      "Led a student startup concept for a retail venture-investing platform, shaping the pitch around SPV structuring, low-ticket access, revenue model, product flow, and investor validation.",
    overview:
      "Six-week acceleration program for Vault Capital, focused on turning a startup concept into a clearer venture proposition and product architecture.",
    responsibilities: [
      "Developed the pitch deck around SPV structuring, low-ticket access, revenue model, product flow, and investor validation.",
      "Mapped the platform's core modules: vaults and investments, portfolio and wallet, resale board, admin panel, and sandbox demo mode.",
    ],
    skills: ["Startups", "Venture building", "Pitch deck", "Product strategy"],
  },
  {
    id: "imc-prosperity-4",
    slug: "imc-prosperity-4",
    organization: "IMC",
    role: "Prosperity 4 Market-Making Challenge",
    location: "Global / Solo participant",
    startDate: "2026",
    endDate: "2026",
    category: "Competitions",
    summary:
      "Qualified for the final round of IMC's global Prosperity 4 trading challenge as a solo participant, competing in a five-round manual and algorithmic simulation across 18,803 teams.",
    overview:
      "Market-making challenge combining manual trading judgment with algorithmic simulation and fast feedback from simulated order-book conditions.",
    responsibilities: [
      "Built and iterated trading logic around market making, inventory and risk control, options-style pricing, and simulated order-book dynamics.",
      "Qualified for the final round as a solo participant among 18,803 teams.",
    ],
    skills: ["Market making", "Algorithmic trading", "Risk control", "Options pricing"],
    image: {
      src: "/imc-prosperity-4-finalist.jpg",
      alt: "IMC Prosperity 4 finalist certificate for Giovanni De Stasio",
      caption: "IMC Prosperity 4 finalist crew certificate.",
    },
  },
];
