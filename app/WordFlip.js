"use client";

import { useEffect, useState } from "react";

const WORDS = ["written", "tested", "rewritten", "shipped"];
const INTERVAL_MS = 2200;

export default function WordFlip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="wordflip" aria-live="polite">
      {WORDS.map((word, i) => (
        <span
          key={word}
          className={`wordflip-word${i === index ? " is-active" : ""}`}
          aria-hidden={i === index ? "false" : "true"}
        >
          {word}
        </span>
      ))}
      {/* Sizing ghost so the line never shifts width. */}
      <span className="wordflip-ghost" aria-hidden="true">
        {WORDS.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
    </span>
  );
}