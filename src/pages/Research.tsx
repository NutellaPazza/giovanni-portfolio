import { PaperGrid } from "../components/Lists";
import { PageHead } from "../components/PageHead";
import { articles } from "../data/articles";

export function Research() {
  return (
    <>
      <PageHead
        eyebrow="Research"
        title="Papers and reports"
        lede="From debt capital markets to energy shocks and volatility, written alone or with my teams."
      />
      <section className="section">
        <div className="wrap">
          <PaperGrid articles={articles} />
        </div>
      </section>
    </>
  );
}
