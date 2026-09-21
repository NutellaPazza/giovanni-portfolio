import { useEffect, useMemo, useState, type TouchEvent } from "react";
import type { MediaItem } from "../types";

type MediaGalleryProps = {
  items?: MediaItem[];
  featuredItem?: MediaItem;
};

export function MediaGallery({ items, featuredItem }: MediaGalleryProps) {
  const galleryItems = items ?? [];
  const lightboxItems = useMemo(
    () => (featuredItem ? [featuredItem, ...galleryItems] : galleryItems),
    [featuredItem, galleryItems],
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const activeItem = activeIndex === null ? null : lightboxItems[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => (current === null ? current : (current - 1 + lightboxItems.length) % lightboxItems.length));
  };

  const showNext = () => {
    setActiveIndex((current) => (current === null ? current : (current + 1) % lightboxItems.length));
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, lightboxItems.length]);

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null || lightboxItems.length < 2) return;

    const deltaX = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 44) {
      if (deltaX > 0) showPrevious();
      else showNext();
    }
    setTouchStartX(null);
  };

  if (!featuredItem && !galleryItems.length) return null;

  return (
    <>
      {featuredItem && (
        <figure className="detail-cover">
          <button className="media-open detail-cover-button" type="button" onClick={() => setActiveIndex(0)}>
            <img src={featuredItem.src} alt={featuredItem.alt} />
          </button>
          {featuredItem.caption && <figcaption>{featuredItem.caption}</figcaption>}
        </figure>
      )}

      {!!galleryItems.length && (
        <div className="media-gallery">
          {galleryItems.map((item, index) => (
            <figure key={`${item.src}-${item.alt}`}>
              <button
                className="media-open"
                type="button"
                onClick={() => setActiveIndex(featuredItem ? index + 1 : index)}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
              </button>
              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {activeItem && (
        <div className="lightbox-backdrop" role="dialog" aria-modal="true" aria-label="Project image viewer" onClick={() => setActiveIndex(null)}>
          <div
            className="lightbox-panel"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
            onTouchEnd={handleTouchEnd}
          >
            <button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)}>
              Close
            </button>
            {lightboxItems.length > 1 && (
              <button className="lightbox-nav lightbox-nav--prev" type="button" onClick={showPrevious}>
                Previous
              </button>
            )}
            <img className="lightbox-image" src={activeItem.src} alt={activeItem.alt} />
            {lightboxItems.length > 1 && (
              <button className="lightbox-nav lightbox-nav--next" type="button" onClick={showNext}>
                Next
              </button>
            )}
            <div className="lightbox-meta">
              <span>
                {(activeIndex ?? 0) + 1} / {lightboxItems.length}
              </span>
              {activeItem.caption && <p>{activeItem.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
