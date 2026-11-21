import type { Article } from "../types";

export const articles: Article[] = [
  {
    id: "vix-research",
    slug: "vix-research",
    title: "Systematic VIX Strategy Research",
    category: "Research",
    topic: "Quant",
    date: "April 2026",
    authors: ["Giovanni De Stasio"],
    readingTime: "Research note",
    summary:
      "Research note on the VX2 accumulation strategy: how the data was built, how the strategy evolved across three backtests, and how it was stress-tested with walk-forward and Monte Carlo analysis.",
    body: [
      "Data first. There is no free continuous series for VIX futures, so I built one: daily OHLC for 155 individual VX contracts downloaded from the CBOE Futures Exchange archive (2013-2026), assembled into front-month (VX1) and second-month (VX2) series without back-adjustment, enriched with VIX spot, daily roll cost and a contango/backwardation regime flag, and checked by an automated quality report.",
      "Three iterations. Backtest 1 used the base mean-reversion logic and posted a 22.5% CAGR, but some positions stayed open for more than 400 days. Backtest 2 added a variable time stop per entry tier, cutting max drawdown from 32.1% to 26.4%. Backtest 3 derived tiers and sizing from a separate statistical study of VX2 mean reversion instead of picking them by hand: 16.7% CAGR, 0.82 Sharpe, 24.1% max drawdown and a 76% win rate over 2013-2026.",
      "Benchmark. Against S&P 500 buy and hold (13.9% CAGR, 33.7% max drawdown, 0.86 Sharpe) the strategy does not win on Sharpe. Its value is the drawdown profile and low correlation with equities, which makes it interesting as a portfolio component rather than a standalone bet.",
      "Robustness. A rolling walk-forward (3 years in-sample, 1 year out-of-sample, 11 windows) returned positive results in 9 of 11 out-of-sample years. A Monte Carlo reshuffling of realised daily returns (5,000 paths) put the median simulated max drawdown at 33.5% and the worst 5% at 46.9%, so position sizing should plan for deeper drawdowns than the 24.1% seen historically.",
      "Limitations: slippage and margin are simplified, and the sample starts in 2013, so the 2008-2009 regime is not covered. The full write-up and charts are on GitHub; the strategy code stays private.",
    ],
    cover: {
      src: "/vx2-dashboard-backtest-3.png",
      alt: "VX2 accumulation strategy backtest 3 dashboard",
    },
    links: [{ label: "Read the research on GitHub", href: "https://github.com/NutellaPazza/vix-futures-strategy" }],
    relatedProjects: [{ kind: "project", slug: "vix-strategy", title: "Systematic VIX Futures Risk Research" }],
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
