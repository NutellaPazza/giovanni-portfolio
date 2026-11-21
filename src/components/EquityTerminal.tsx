import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { equityCurve } from "../data/equityCurve";

const W = 600;
const H = 230;
const PAD = { top: 10, right: 10, bottom: 22, left: 46 };
const START_CAPITAL = 100_000;

const stats = [
  { label: "CAGR", value: "16.7%", tone: "up" },
  { label: "Sharpe", value: "0.82", tone: "" },
  { label: "Max drawdown", value: "−24.1%", tone: "down" },
  { label: "Win rate", value: "75.5%", tone: "up" },
  { label: "S&P 500 max DD", value: "−33.7%", tone: "down" },
  { label: "Trades", value: "2,328", tone: "" },
];

const money = (value: number) => (value >= 1_000_000 ? `$${(value / 1_000_000).toFixed(2)}M` : `$${Math.round(value / 1000)}k`);

const monthYear = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

export function EquityTerminal() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const { points, line, area, yTicks, xTicks } = useMemo(() => {
    const values = equityCurve.map(([, value]) => value);
    const min = 0;
    const max = Math.ceil(Math.max(...values) / 100_000) * 100_000;
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const x = (i: number) => PAD.left + (i / (equityCurve.length - 1)) * innerW;
    const y = (v: number) => PAD.top + innerH - ((v - min) / (max - min)) * innerH;

    const pts = equityCurve.map(([date, value], i) => ({ date, value, x: x(i), y: y(value) }));
    const linePath = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join("");
    const areaPath = `${linePath}L${pts[pts.length - 1].x.toFixed(1)},${PAD.top + innerH}L${PAD.left},${PAD.top + innerH}Z`;

    const yt = [];
    for (let v = 0; v <= max; v += 200_000) yt.push({ v, y: y(v) });

    const seen = new Set<string>();
    const xt: { label: string; x: number }[] = [];
    pts.forEach((p) => {
      const year = p.date.slice(0, 4);
      if (!seen.has(year) && Number(year) % 3 === 2) {
        seen.add(year);
        xt.push({ label: year, x: p.x });
      }
    });

    return { points: pts, line: linePath, area: areaPath, yTicks: yt, xTicks: xt };
  }, []);

  const active = points[index ?? points.length - 1];
  const change = (active.value / START_CAPITAL - 1) * 100;

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const sx = ((event.clientX - rect.left) / rect.width) * W;
    const ratio = (sx - PAD.left) / (W - PAD.left - PAD.right);
    const next = Math.round(Math.min(1, Math.max(0, ratio)) * (points.length - 1));
    setIndex(next);
  };

  const onKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    const last = points.length - 1;
    const step = event.shiftKey ? 12 : 1;
    if (event.key === "ArrowLeft") setIndex((current) => Math.max(0, (current ?? last) - step));
    else if (event.key === "ArrowRight") setIndex((current) => Math.min(last, (current ?? last) + step));
    else if (event.key === "Home") setIndex(0);
    else if (event.key === "End") setIndex(points.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <section className="term" aria-label="VIX futures research terminal">
      <div className="term-bar">
        <span className="fkey">VX2</span>
        <span className="fkey fkey--ghost">BT3</span>
        <span className="hide-sm">EQUITY · $100K START · 2013–2026</span>
        <span className="spacer" />
        <span>
          GDS &lt;GO&gt;
        </span>
      </div>

      <div className="term-body">
        <div className="term-chart">
          <div className="term-chart-head">
            <h2>VIX futures accumulation, backtest 3</h2>
            <p className="term-readout" aria-live="polite">
              {monthYear(active.date)} · <b>{money(active.value)}</b>{" "}
              <span className={change >= 0 ? "up" : "down"}>
                {change >= 0 ? "+" : "−"}
                {Math.abs(change).toFixed(0)}%
              </span>
            </p>
          </div>

          <svg
            ref={svgRef}
            className="chart-svg"
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            tabIndex={0}
            aria-label="Equity curve of the VIX futures strategy, backtest 3, from 100 thousand dollars in January 2013 to 772 thousand dollars in March 2026. Use the left and right arrow keys to read values."
            onPointerMove={onPointerMove}
            onPointerLeave={() => setIndex(null)}
            onKeyDown={onKeyDown}
            onBlur={() => setIndex(null)}
          >
            <defs>
              <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="oklch(79% 0.155 70)" stopOpacity="0.32" />
                <stop offset="1" stopColor="oklch(79% 0.155 70)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g className="chart-grid">
              {yTicks.map((t) => (
                <line key={t.v} x1={PAD.left} x2={W - PAD.right} y1={t.y} y2={t.y} />
              ))}
            </g>
            <g className="chart-axis">
              {yTicks.map((t) => (
                <text key={t.v} x={PAD.left - 8} y={t.y + 3} textAnchor="end">
                  {t.v === 0 ? "$0" : money(t.v)}
                </text>
              ))}
              {xTicks.map((t) => (
                <text key={t.label} x={t.x} y={H - 4} textAnchor="middle">
                  {t.label}
                </text>
              ))}
            </g>
            <path className="chart-area" d={area} />
            <path className="chart-line" d={line} pathLength={1} />
            {index !== null && (
              <g className="chart-cross">
                <line x1={active.x} x2={active.x} y1={PAD.top} y2={H - PAD.bottom} />
                <line x1={PAD.left} x2={W - PAD.right} y1={active.y} y2={active.y} />
                <circle cx={active.x} cy={active.y} r={4.5} />
              </g>
            )}
          </svg>
        </div>

        <dl className="term-stats">
          {stats.map((stat) => (
            <div className="term-stat" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd className={stat.tone}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="term-foot">
        <span>Historical simulation. Strategy code stays private.</span>
        <Link className="text-link" to="/projects/vix-strategy">
          Read the research
          <ArrowRightIcon aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
