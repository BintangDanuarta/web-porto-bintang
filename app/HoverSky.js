"use client";

import { useState } from "react";
import SkyGradient from "./SkyGradient";

export default function HoverSky({ as: Component = "div", children, className = "", ...props }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <Component
      {...props}
      className={`hover-sky ${className}`}
      onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <div className="hover-sky-background" aria-hidden="true">
        {hovered || focused ? <SkyGradient /> : null}
      </div>
      {children}
    </Component>
  );
}
