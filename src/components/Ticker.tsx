import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type TickerItem = { code: string; text: string; move?: string };

// Every line is a verifiable fact from the portfolio data. Nothing here is fetched or live.
const items: TickerItem[] = [
  { code: "IMC", text: "Prosperity 4 finalist · 18,803 teams", move: "▲" },
  { code: "VX2", text: "Backtest 3 · CAGR 16.7% · Sharpe 0.82", move: "▲" },
  { code: "VNTG", text: "Co-founder · Head of DCM · 50+ members" },
  { code: "DCM", text: "Who Will Buy the Debt? · Oct 2026" },
  { code: "BSQF", text: "2 research papers · Hormuz shock · Macro regime" },
  { code: "BOCC", text: "Computer Science 30L/30 · Math for Economics 30/30", move: "▲" },
  { code: "TEF", text: "Ignition accelerator · Vault Capital" },
  { code: "BTC", text: "5-minute system · 2 months live on Polymarket" },
  { code: "MATH", text: "Math Olympiad · 1st place twice", move: "▲" },
];

export function Ticker() {
  const [paused, setPaused] = useState(false);

  const row = (hidden: boolean) =>
    items.map((item) => (
      <span className="ticker-item" key={`${item.code}-${hidden}`} aria-hidden={hidden || undefined}>
        <b>{item.code}</b>
        {item.text}
        {item.move && <span className="up">{item.move}</span>}
      </span>
    ));

  return (
    <section className="ticker" data-paused={paused} aria-label="Highlights">
      <div className="ticker-tag">
        <span aria-hidden="true">●</span> GDS
      </div>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
      <button
        type="button"
        className="ticker-pause"
        aria-label={paused ? "Play highlights ticker" : "Pause highlights ticker"}
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? <PlayIcon aria-hidden="true" /> : <PauseIcon aria-hidden="true" />}
      </button>
    </section>
  );
}
