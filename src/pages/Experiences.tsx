import { Timeline } from "../components/Lists";
import { PageHead } from "../components/PageHead";

export function Experiences() {
  return (
    <>
      <PageHead
        eyebrow="Experience"
        title="Where I've worked"
        lede="Market research for a fintech, a research organisation I co-founded, a quant association, an accelerator and a global trading challenge."
      />
      <section className="section">
        <div className="wrap">
          <Timeline />
        </div>
      </section>
    </>
  );
}
