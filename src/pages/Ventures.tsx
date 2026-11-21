import { VentureGrid } from "../components/Lists";
import { PageHead } from "../components/PageHead";

export function Ventures() {
  return (
    <>
      <PageHead
        eyebrow="Ventures"
        title="Teams and ideas"
        lede="A research organisation I co-founded, a venture platform I pitched in an accelerator, and an AI product built in 24 hours."
      />
      <section className="section">
        <div className="wrap">
          <VentureGrid />
        </div>
      </section>
    </>
  );
}
