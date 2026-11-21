import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "btc-5-minute-prediction",
    slug: "btc-5-minute-prediction",
    title: "BTC 5-Minute Algorithmic Trading System",
    category: "Projects",
    year: "2026",
    status: "Live-tested algorithmic trading system",
    summary:
      "Built and live-tested a Polymarket BTC 5-minute up/down algorithmic trading system after analysing 16 years of 1-, 5- and 15-minute BTC data.",
    overview:
      "This was not a generic predictor. The project started with hypothesis testing on historical BTC data, then moved into live Polymarket execution to see whether the strategy logic survived real market conditions.",
    context:
      "The core question was whether short-horizon BTC signals could be translated into a live 5-minute prediction-market trading process without treating backtests as proof of future performance.",
    approach:
      "Analysed 16 years of BTC data at 1-minute, 5-minute and 15-minute frequencies, tested short-horizon signals across in-sample and out-of-sample periods, then traded the strategy live on Polymarket for two months.",
    contribution:
      "Developed the strategy research, translated the hypotheses into a live trading process, and tested execution under real market conditions.",
    results:
      "Recorded approximately a 75% win rate and double-digit profit over two months of live 5-minute BTC up/down trading.",
    learned:
      "The useful story is probability, discipline, sample-size caution, live execution, and short-horizon market structure, not a claim of guaranteed alpha.",
    skills: ["Algorithmic trading", "Prediction markets", "BTC market data", "Backtesting", "Live trading"],
    cover: {
      src: "/polymarket-project-cover-bw.jpg",
      alt: "Polymarket logo in black and white",
    },
  },
  {
    id: "option-pricing-calculator",
    slug: "option-pricing-calculator",
    title: "Option Pricing Calculator",
    category: "Projects",
    year: "2025",
    status: "Open-source app",
    summary:
      "A Streamlit app that prices European and American options with Black-Scholes, Monte Carlo and a binomial tree, with Greeks, heatmaps and 11 option strategies.",
    overview:
      "An interactive pricing tool that puts three models side by side, so the same option can be priced analytically, by simulation and on a lattice, and the differences become visible.",
    approach:
      "Every model sits behind one common interface, so the app and the tests treat them interchangeably. The Monte Carlo engine uses antithetic variates, and the binomial tree checks early exercise at every node for American options.",
    process: [
      "Black-Scholes closed form with analytical Greeks.",
      "Monte Carlo simulation with antithetic variates and confidence intervals.",
      "Cox-Ross-Rubinstein binomial tree with early exercise, convergence analysis and the early-exercise boundary.",
      "Sensitivity charts, price and Greek heatmaps, a volatility surface and 11 multi-leg strategies with payoff diagrams.",
    ],
    skills: ["Python", "Streamlit", "Options pricing", "Monte Carlo", "Binomial trees"],
    links: [{ label: "Code on GitHub", href: "https://github.com/NutellaPazza/option-pricing-calculator" }],
  },
  {
    id: "vix-strategy",
    slug: "vix-strategy",
    title: "Systematic VIX Futures Risk Research",
    category: "Research",
    year: "2026",
    status: "Independent quantitative research",
    summary:
      "Built a Python backtest engine for a progressive long accumulation strategy on VIX futures, testing whether the typical VIX spike and mean-reversion pattern could be exploited systematically.",
    overview:
      "Independent quantitative research project on VIX futures, built to test a specific market pattern rather than to claim a finished trading product. The strategy uses mean-reversion thresholds as entry triggers, opens independent positions by tier, and closes each position once its predefined target is reached.",
    context:
      "The project started from the recurring VIX spike pattern: volatility tends to jump sharply during stress and then mean-revert. I pulled historical data directly from the CBOE and built the backtest engine from scratch in Python to test whether that behaviour could become a systematic strategy.",
    approach:
      "I ran three iterations. Backtest 1 used the base logic with no time stop, producing strong headline results but allowing some positions to stay open for more than 400 days. Backtest 2 added a variable time stop per entry tier, lowering CAGR but reducing drawdown and making the system less dependent on isolated spike events. Backtest 3 used a mean-reversion probability study to calibrate entry tiers and position sizing before running the final test.",
    process: [
      "Backtest 1, base logic: CAGR around 22%, Sharpe 0.71, max drawdown 32%, win rate 88%, but with unrealistic long-held positions.",
      "Backtest 2, variable time stop by tier: lower CAGR, max drawdown reduced to 26%, no negative years across 13 years of data.",
      "Backtest 3, statistically driven tiers: CAGR 16.7%, Sharpe 0.82, max drawdown 24.1%, and the best risk-adjusted profile of the three.",
      "Compared the strategy with S&P 500 buy and hold to evaluate drawdown behaviour and possible portfolio-level decorrelation.",
    ],
    results:
      "The third iteration achieved a 16.7% CAGR, 0.82 Sharpe ratio, 24.1% maximum drawdown, and 76% win rate over the 2013-2026 test window. One key finding was the opportunity cost of idle capital: in 2022, earlier versions opened no positions because volatility stayed above the entry threshold for the entire year.",
    learned:
      "The strategy showed meaningful stress-period behaviour: across the versions, max drawdown stayed below S&P 500 buy and hold, and in 2022 the strategy stayed flat or slightly positive while the S&P 500 lost around 19%. The result is interesting as a portfolio component, but still needs further robustness checks, live assumptions, and risk work.",
    skills: ["Python", "VIX futures", "Backtesting", "Mean reversion", "Risk analysis"],
    links: [{ label: "Research write-up on GitHub", href: "https://github.com/NutellaPazza/vix-futures-strategy" }],
    relatedArticles: [{ kind: "article", slug: "vix-research", title: "Systematic VIX Strategy Research" }],
    cover: {
      src: "/vx2-dashboard-backtest-3.png",
      alt: "VX2 accumulation strategy backtest 3 dashboard",
    },
    gallery: [
      {
        src: "/vx2-dashboard-backtest-1.png",
        alt: "VX2 accumulation strategy backtest 1 dashboard",
        caption: "Backtest 1: base logic without time stop, strong returns but unrealistic long-held positions.",
      },
      {
        src: "/vx2-dashboard-backtest-2.png",
        alt: "VX2 accumulation strategy backtest 2 dashboard",
        caption: "Backtest 2: variable time stop per entry tier, lower drawdown and more stable behaviour.",
      },
      {
        src: "/vx2-dashboard-backtest-3.png",
        alt: "VX2 accumulation strategy backtest 3 dashboard",
        caption: "Backtest 3: statistically driven tiers, 16.7% CAGR, 0.82 Sharpe and 24.1% max drawdown.",
      },
      {
        src: "/vx2-dashboard-comparison.png",
        alt: "VX2 accumulation strategy comparison dashboard",
        caption: "Comparison of the three strategy iterations across CAGR, drawdown, Sharpe and win rate.",
      },
      {
        src: "/vx2-dashboard-vs-sp500.png",
        alt: "VX2 strategy versus S&P 500 buy and hold dashboard",
        caption: "Strategy comparison against S&P 500 buy and hold, highlighting drawdown and decorrelation behaviour.",
      },
    ],
  },
  {
    id: "who-will-buy-the-debt",
    slug: "who-will-buy-the-debt",
    title: "Who Will Buy the Debt? The Global Bond Sell-Off and the New Price of Capital",
    category: "Research",
    year: "2026",
    status: "Vantedge DCM report",
    summary:
      "Credit market flow report on developed-market sovereigns and USD credit, 1 September to 6 October 2026: borrowers still clear, but at higher yields and shorter tenors than they are used to.",
    overview:
      "Written as Head of DCM at Vantedge. It covers the macro and rates backdrop, supply, demand, spreads and relative value, notable deals, and what the new price of capital means for issuers.",
    contribution:
      "Sole author of the report.",
    skills: ["Debt Capital Markets", "Credit", "Rates", "Fixed income research"],
    links: [
      { label: "Read on Vantedge", href: "https://vantedgeorg.com/research" },
      { label: "Open the report (PDF)", href: "https://vantedgeorg.com/static/reports/giovanni-dcm-credit-flow-oct2026.pdf" },
    ],
    relatedArticles: [
      { kind: "article", slug: "who-will-buy-the-debt", title: "Who Will Buy the Debt? The Global Bond Sell-Off and the New Price of Capital" },
    ],
    relatedExperiences: [{ kind: "experience", slug: "vantaedge", title: "Vantedge" }],
  },
  {
    id: "hormuz-shock-market-transmission",
    slug: "hormuz-shock-market-transmission",
    title: "The 2026 Hormuz Shock and Its Market Transmission",
    category: "Research",
    year: "2026",
    status: "Association article",
    summary:
      "Research article on the February 2026 Strait of Hormuz escalation and its transmission across oil, LNG, inflation, ECB channels, and sector-level winners and losers.",
    overview:
      "Written for Bocconi Students for Quantitative Finance with Greta Colia and Attilio Sferlazza. The paper analyses how a geopolitical shock around Hormuz moved from crude and LNG markets into inflation, European gas stress, and portfolio construction.",
    context:
      "The piece frames Hormuz as a multi-asset transmission shock, not only an oil story: Brent, LNG cargo competition, European storage, inflation expectations, ECB reaction channels, OVX, TTF/JKM spreads, and iTraxx Crossover all become part of the market map.",
    contribution:
      "Co-authored the research and helped translate the macro shock into company-level and portfolio implications.",
    skills: ["Macro research", "Energy markets", "Inflation", "Portfolio scenarios"],
    links: [
      {
        label: "Read article",
        href: "https://www.bocconistudentsquantitativefinance.com/research-papers/the-2026-hormuz-shock-and-its-market-transmission",
      },
    ],
    cover: {
      src: "https://boqolufmhwdrlukomukn.supabase.co/storage/v1/object/public/paper-images/cbeb7525-994f-4547-a209-44169765d55c.jpg",
      alt: "The 2026 Hormuz Shock and Its Market Transmission article cover",
    },
    relatedArticles: [{ kind: "article", slug: "hormuz-shock-market-transmission", title: "The 2026 Hormuz Shock and Its Market Transmission" }],
  },
  {
    id: "macro-financial-assessment-global-regime",
    slug: "macro-financial-assessment-global-regime",
    title: "Macro-Financial Assessment of the Global Regime",
    category: "Research",
    year: "2026",
    status: "Association article",
    summary:
      "Research paper on US debt sustainability, consumer-credit fragility, gold, monetary debasement, global fragmentation, and resilient portfolio construction.",
    overview:
      "Written for Bocconi Students for Quantitative Finance with Carlo Iannazzo, Matteo Comi, Paolo Bosco, and Leonardo Lallo. Drafted between late 2025 and early 2026, the paper studies the structural forces defining the current macro-financial regime.",
    context:
      "The thesis prioritises resilience and strategic diversification over chasing cyclical beta, interpreting market corrections as a washout of speculative excess rather than a contradiction of the medium-to-long term view.",
    contribution:
      "Co-authored the research and contributed to the macro-financial regime assessment.",
    skills: ["Macro research", "Portfolio construction", "Gold", "Credit fragility"],
    links: [
      {
        label: "Read article",
        href: "https://www.bocconistudentsquantitativefinance.com/research-papers/macro-financial-assessment",
      },
    ],
    cover: {
      src: "https://www.bocconistudentsquantitativefinance.com/images/papers/macro-financial.jpg",
      alt: "Macro-Financial Assessment of the Global Regime article cover",
    },
    relatedArticles: [{ kind: "article", slug: "macro-financial-assessment-global-regime", title: "Macro-Financial Assessment of the Global Regime" }],
  },
  {
    id: "ai-campus-navigator-innovate",
    slug: "ai-campus-navigator-innovate",
    title: "AI Campus Navigator",
    category: "Hackathons",
    year: "2025",
    status: "INNOVA/TE 24h Hackathon, Bocconi University",
    summary:
      "Designed a start-up concept for custom AI agents that help university students navigate fragmented institutional websites and support flows.",
    overview:
      "During the first edition of the INNOVA/TE 24h Hackathon, organised by Bocconi University student associations, I worked on the track focused on start-up ideas powered by custom AI agents.",
    context:
      "Our team identified a recurring student problem: university websites are often complex, fragmented, and difficult to navigate. We validated this pain point through a survey across several Bocconi student groups.",
    idea:
      "AI Campus Navigator proposed custom AI agents for universities, built on top of their websites and information resources. The agents would help students and external users find information quickly, answer questions that the website alone does not resolve, and improve the university knowledge base over time through an integrated support flow.",
    approach:
      "We designed the concept around a B2U model, licensing and partnerships directly with universities, with no cost for students. The future roadmap included university login integration so responses could become more contextual and personalised.",
    contribution:
      "Contributed to problem validation, start-up concept design, business model framing, and AI-agent product logic using the Datapizza framework.",
    process: [
      "Surveyed Bocconi student groups to validate the information-access pain point.",
      "Defined the AI-agent use case around university websites, FAQs, support offices, and recurring student inquiries.",
      "Framed the B2U licensing model and future personalised-response roadmap.",
    ],
    skills: ["AI agents", "Startup design", "User research", "Datapizza", "B2U strategy"],
    links: [
      {
        label: "LinkedIn project",
        href: "https://www.linkedin.com/in/gds-/details/projects/edit/forms/1511518083/",
      },
    ],
    cover: {
      src: "/ai-campus-navigator-cover.jpg",
      alt: "AI Campus Navigator hackathon cover slide",
    },
  },
];
