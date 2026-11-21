import { ArrowLeftIcon, ArrowRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import type { MediaItem } from "../types";

type MediaGalleryProps = {
  items?: MediaItem[];
  featuredItem?: MediaItem;
};

export function MediaGallery({ items = [], featuredItem }: MediaGalleryProps) {
  const all = featuredItem ? [featuredItem, ...items] : items;
  const [active, setActive] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const step = (delta: number) => setActive((current) => (current === null ? current : (current + delta + all.length) % all.length));

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [active, all.length]);

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchX.current === null || all.length < 2) return;
    const delta = event.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 44) step(delta > 0 ? -1 : 1);
    touchX.current = null;
  };

  if (!all.length) return null;
  const current = active === null ? null : all[active];

  return (
    <>
      {featuredItem && (
        <figure className="cover">
          <button type="button" onClick={() => setActive(0)} aria-label={`Enlarge: ${featuredItem.alt}`}>
            <img src={featuredItem.src} alt={featuredItem.alt} />
          </button>
        </figure>
      )}

      {!!items.length && (
        <div className="gallery">
          {items.map((item, index) => (
            <div key={item.src} className="gallery-item">
              <figure>
                <button type="button" onClick={() => setActive(featuredItem ? index + 1 : index)} aria-label={`Enlarge: ${item.alt}`}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </button>
              </figure>
              {item.caption && <p className="gallery-note">{item.caption}</p>}
            </div>
          ))}
        </div>
      )}

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={() => setActive(null)}>
          <div
            className="lightbox-panel"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => (touchX.current = event.touches[0].clientX)}
            onTouchEnd={onTouchEnd}
          >
            <img src={current.src} alt={current.alt} />
            <div className="lightbox-bar">
              <span className="num">
                {(active ?? 0) + 1} / {all.length}
              </span>
              {current.caption && <span style={{ flex: 1 }}>{current.caption}</span>}
              <div className="btn-row">
                {all.length > 1 && (
                  <>
                    <button type="button" className="btn btn--ghost btn--small" onClick={() => step(-1)} aria-label="Previous image">
                      <ArrowLeftIcon aria-hidden="true" />
                    </button>
                    <button type="button" className="btn btn--ghost btn--small" onClick={() => step(1)} aria-label="Next image">
                      <ArrowRightIcon aria-hidden="true" />
                    </button>
                  </>
                )}
                <button ref={closeRef} type="button" className="btn btn--solid btn--small" onClick={() => setActive(null)}>
                  <Cross2Icon aria-hidden="true" />
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
