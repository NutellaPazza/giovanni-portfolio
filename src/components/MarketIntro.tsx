import { useEffect, useRef, useState } from "react";

export function MarketIntro() {
  const [hidden, setHidden] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setHidden(true);
      return;
    }

    const timer = window.setTimeout(() => setHidden(true), 12000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = video.play();
    if (play) {
      play.catch(() => setHidden(true));
    }
  }, []);

  if (hidden) return null;

  return (
    <section className="market-intro market-intro--video" aria-label="Opening market animation">
      <video
        ref={videoRef}
        className="intro-video"
        src="/intro-market-breakout.mp4"
        muted
        playsInline
        preload="auto"
        onEnded={() => setHidden(true)}
        onError={() => setHidden(true)}
      />
      <button className="intro-skip" type="button" onClick={() => setHidden(true)}>
        Skip
      </button>
    </section>
  );
}
