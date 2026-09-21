import type { Article } from "../types";

export const articles: Article[] = [
  {
    id: "vix-research",
    slug: "vix-research",
    title: "Systematic VIX Strategy Research",
    category: "Research",
    topic: "Quant",
    date: "[Date]",
    authors: ["Giovanni De Stasio"],
    readingTime: "[Reading time]",
    summary:
      "Research note for the VIX futures accumulation strategy, focused on volatility regimes, mean-reversion triggers, position sizing, and backtest limitations.",
    body: [
      "This page will hold the full VIX research write-up once the final version is ready.",
      "The current project evidence supports Python backtesting, mean-reversion trigger logic, entry tiers, position sizing, and risk review.",
      "Before publishing, add charts, data sources, methodology, assumptions, limitations, and exact reproducibility notes.",
    ],
    cover: {
      src: "https://picsum.photos/seed/vix-research-note/1400/900",
      alt: "Black and white placeholder for VIX research",
    },
    relatedProjects: [{ kind: "project", slug: "vix-strategy", title: "Systematic VIX Trading Strategy" }],
  },
  {
    id: "asml-research",
    slug: "asml-research",
    title: "ASML Investment Research",
    category: "Research",
    topic: "Finance",
    date: "[Date]",
    authors: ["Giovanni De Stasio"],
    readingTime: "[Reading time]",
    summary:
      "Investment research note built around ASML, including a 3-statement model, DCF valuation, sensitivity analysis, and downside scenarios.",
    body: [
      "This page will hold the full ASML research write-up.",
      "The current evidence supports a 3-statement model, DCF valuation, five-year projections, sensitivity work, and an AI-driven semiconductor demand thesis.",
    ],
    cover: {
      src: "https://picsum.photos/seed/asml-research-note/1400/900",
      alt: "Black and white placeholder for ASML research",
    },
    relatedProjects: [{ kind: "project", slug: "asml-investment-research", title: "Selected Investment Research: ASML" }],
  },
  {
    id: "dcm-research-placeholder",
    slug: "dcm-research-placeholder",
    title: "[Vantaedge DCM research article]",
    category: "Articles",
    topic: "Markets",
    date: "[Date]",
    authors: ["Giovanni De Stasio"],
    organization: "Vantaedge",
    readingTime: "[Reading time]",
    summary:
      "Placeholder for a Vantaedge DCM article. Add exact title, link, publication date, and abstract when ready.",
    body: ["[Article body placeholder]"],
    relatedExperiences: [{ kind: "experience", slug: "vantaedge", title: "Vantaedge" }],
  },
  {
    id: "equity-research-placeholder",
    slug: "equity-research-placeholder",
    title: "[Vantaedge equity research article]",
    category: "Articles",
    topic: "Finance",
    date: "[Date]",
    authors: ["Giovanni De Stasio"],
    organization: "Vantaedge",
    readingTime: "[Reading time]",
    summary:
      "Placeholder for a Vantaedge equity research article. Add exact title, link, publication date, and abstract when ready.",
    body: ["[Article body placeholder]"],
    relatedExperiences: [{ kind: "experience", slug: "vantaedge", title: "Vantaedge" }],
  },
  {
    id: "hormuz-shock-market-transmission",
    slug: "hormuz-shock-market-transmission",
    title: "The 2026 Hormuz Shock and Its Market Transmission",
    category: "Articles",
    topic: "Energy Markets",
    date: "July 10, 2026",
    authors: ["Greta Colia", "Giovanni De Stasio", "Attilio Sferlazza"],
    organization: "Bocconi Students for Quantitative Finance",
    readingTime: "Research paper",
    summary:
      "Analysis of the February 2026 Strait of Hormuz escalation and its transmission across oil, LNG, inflation, ECB channels, and company-level exposure.",
    body: [
      "The paper treats the 2026 Hormuz shock as more than an oil story. It studies how a chokepoint shock around roughly 20 million barrels per day of crude and a major LNG artery transmitted through Brent, European gas, inflation expectations, and central-bank reaction channels.",
      "The research maps the move from Brent at USD 61 per barrel to USD 118 per barrel by the end of Q1, QatarEnergy's force majeure, Europe's competition with Asia for LNG cargoes, and the refill-season pressure on European gas.",
      "It then translates the macro shock into sector and company implications: Shell and TotalEnergies can monetize volatility, while chemicals, fertilisers, airlines, and leveraged real estate absorb the pressure.",
      "The article closes with a scenario-conditional portfolio framework across escalation, contained conflict, and de-escalation, with key variables to monitor including Hormuz traffic, TTF/JKM spreads, EU storage, OVX, and iTraxx Crossover.",
    ],
    cover: {
      src: "https://boqolufmhwdrlukomukn.supabase.co/storage/v1/object/public/paper-images/cbeb7525-994f-4547-a209-44169765d55c.jpg",
      alt: "The 2026 Hormuz Shock and Its Market Transmission article cover",
    },
    links: [
      {
        label: "Read full article",
        href: "https://www.bocconistudentsquantitativefinance.com/research-papers/the-2026-hormuz-shock-and-its-market-transmission",
      },
    ],
    documents: [
      {
        label: "Download PDF",
        href: "/hormuz-shock-market-transmission.pdf",
      },
    ],
    relatedExperiences: [{ kind: "experience", slug: "bocconi-quant-finance", title: "Bocconi Students for Quantitative Finance" }],
    relatedProjects: [{ kind: "project", slug: "hormuz-shock-market-transmission", title: "The 2026 Hormuz Shock and Its Market Transmission" }],
  },
  {
    id: "macro-financial-assessment-global-regime",
    slug: "macro-financial-assessment-global-regime",
    title: "Macro-Financial Assessment of the Global Regime",
    category: "Articles",
    topic: "Macro",
    date: "February 7, 2026",
    authors: ["Carlo Iannazzo", "Matteo Comi", "Paolo Bosco", "Leonardo Lallo", "Giovanni De Stasio"],
    organization: "Bocconi Students for Quantitative Finance",
    readingTime: "Research paper",
    summary:
      "Macro-financial assessment of the structural forces defining the current regime: US debt, consumer-credit fragility, gold, monetary debasement, and global fragmentation.",
    body: [
      "Drafted between late 2025 and early 2026, the paper analyses the structural forces defining the current macro-financial regime.",
      "The research focuses on US debt unsustainability, hidden fragility in consumer credit and the K-shaped economy, gold's role as a shield against monetary debasement, and the effects of global fragmentation.",
      "Its medium-to-long term view is that market corrections do not invalidate the thesis. Instead, they can represent a washout of speculative excess in favour of stronger fundamentals.",
      "The portfolio conclusion is that resilience and strategic diversification matter more than chasing cyclical beta in this regime.",
    ],
    cover: {
      src: "https://www.bocconistudentsquantitativefinance.com/images/papers/macro-financial.jpg",
      alt: "Macro-Financial Assessment of the Global Regime article cover",
    },
    links: [
      {
        label: "Read full article",
        href: "https://www.bocconistudentsquantitativefinance.com/research-papers/macro-financial-assessment",
      },
    ],
    documents: [
      {
        label: "Download PDF",
        href: "/macro-financial-assessment-global-regime.pdf",
      },
    ],
    relatedExperiences: [{ kind: "experience", slug: "bocconi-quant-finance", title: "Bocconi Students for Quantitative Finance" }],
    relatedProjects: [{ kind: "project", slug: "macro-financial-assessment-global-regime", title: "Macro-Financial Assessment of the Global Regime" }],
  },
];
