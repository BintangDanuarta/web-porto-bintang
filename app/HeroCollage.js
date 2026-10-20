"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./HeroCollage.css";

const works = ["simkopdes", "agenda", "arcade", "treash", "sambi"];
const tiles = [...works, ...works];

export default function HeroCollage() {
  const rootRef = useRef(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const hero = root.closest(".hero");
    const cards = Array.from(root.querySelectorAll(".hero-collage-card"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 720px)");
    let width = hero.clientWidth;
    let height = hero.clientHeight;
    let phase = 0;
    let frame = 0;
    let last = 0;
    let visible = false;

    const paint = () => {
      const count = compact.matches ? 6 : cards.length;
      cards.forEach((card, index) => {
        if (index >= count) return;
        const angle = index / count * Math.PI * 2 + phase;
        const depth = Math.sin(angle);
        const x = Math.cos(angle) * width * (compact.matches ? .64 : .51);
        const y = depth * height * (compact.matches ? .43 : .44);
        const scale = .82 + (depth + 1) * .12;
        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${Math.cos(angle) * -7}deg) perspective(1000px) rotateY(${Math.cos(angle) * -15}deg)`;
        card.style.opacity = String(.65 + (depth + 1) * .175);
        card.style.zIndex = String(Math.round((depth + 1) * 10));
      });
    };
    const tick = (time) => {
      if (last) phase += Math.min(time - last, 64) / 1000 * (Math.PI * 2 / 110);
      last = time;
      paint();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (visible && !document.hidden && !reduced.matches && !pausedRef.current) {
        frame = requestAnimationFrame(tick);
      }
    };
    const resize = new ResizeObserver(() => {
      width = hero.clientWidth;
      height = hero.clientHeight;
      paint();
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    paint();
    resize.observe(hero);
    observer.observe(hero);
    reduced.addEventListener("change", sync);
    compact.addEventListener("change", paint);
    document.addEventListener("visibilitychange", sync);
    root.addEventListener("collage-pause", sync);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      compact.removeEventListener("change", paint);
      document.removeEventListener("visibilitychange", sync);
      root.removeEventListener("collage-pause", sync);
    };
  }, []);

  const toggle = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    rootRef.current?.dispatchEvent(new Event("collage-pause"));
  };

  return <>
    <div ref={rootRef} className="hero-collage" aria-hidden="true">
      {tiles.map((work, index) => <div className="hero-collage-card" key={`${work}-${index}`}>
        <Image src={`/projects/${work}.jpg`} alt="" width={720} height={500}
          sizes="(max-width: 720px) 170px, (max-width: 1200px) 260px, 360px"
          loading={index < 5 ? "eager" : "lazy"} draggable={false} />
      </div>)}
    </div>
    <button className="hero-motion-toggle" type="button" onClick={toggle}
      aria-pressed={paused} aria-label={paused ? "Resume background animation" : "Pause background animation"}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        {paused ? <path d="M4 2l10 6-10 6z" /> : <path d="M3 2h3v12H3zm7 0h3v12h-3z" />}
      </svg>
      <span>{paused ? "Resume motion" : "Pause motion"}</span>
    </button>
  </>;
}
