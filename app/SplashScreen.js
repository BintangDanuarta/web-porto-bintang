"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [visible, setVisible] = useState(() => typeof window === "undefined" || !window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    if (!visible) return;
    const hide = window.setTimeout(() => setVisible(false), 2600);
    return () => window.clearTimeout(hide);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="splash-screen" aria-hidden="true">
      <div className="splash-logo">
        <Image src="/images/logo.png" alt="" width={640} height={640} priority />
      </div>
    </div>
  );
}