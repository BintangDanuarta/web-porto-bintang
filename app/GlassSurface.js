"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import "./GlassSurface.css";

const LiquidGlass = dynamic(() => import("liquid-glass-react"), { ssr: false });

export default function GlassSurface({ className = "", cornerRadius = 999 }) {
  const surfaceRef = useRef(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    const syncRefraction = () => {
      const warp = surface.querySelector(".glass__warp");
      if (warp?.style.filter) {
        warp.style.setProperty("--glass-refraction", warp.style.filter);
      }
    };
    syncRefraction();
    const observer = new MutationObserver(syncRefraction);
    observer.observe(surface, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={surfaceRef} className={`glass-surface ${className}`} aria-hidden="true">
      <LiquidGlass
        className="glass-surface-effect"
        displacementScale={64}
        blurAmount={0.025}
        saturation={140}
        aberrationIntensity={1.5}
        elasticity={0}
        cornerRadius={cornerRadius}
        padding="0"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <span />
      </LiquidGlass>
    </div>
  );
}
