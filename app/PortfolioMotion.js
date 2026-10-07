"use client";
import { useEffect, useState } from "react";

export default function PortfolioMotion() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const header = document.querySelector(".site-header");
    const update = () => header?.classList.toggle("is-scrolled", window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      header?.classList.remove("is-scrolled");
    };
  }, []);
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cursor = document.createElement("div");
    cursor.className = "adaptive-cursor";
    cursor.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursor);
    const reset = () => {
      cursor.classList.remove("is-active");
      document.documentElement.classList.remove("custom-cursor-ready");
    };
    const move = (event) => {
      if (!fine.matches || reduced.matches || event.pointerType === "touch") { reset(); return; }
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest("a, button");
      const text = !link && target?.closest("p, h1, h2, h3, figcaption, .eyebrow");
      cursor.dataset.kind = link ? "link" : text ? "text" : "default";
      cursor.dataset.tone = target?.closest(".project-visual") ? "blue" : target?.closest(".work-section, .contact-section, .mobile-menu") ? "light" : "blue";
      cursor.textContent = link ? "↗" : "";
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add("is-active");
      document.documentElement.classList.add("custom-cursor-ready");
    };
    const keyboard = (event) => { if (event.key === "Tab") reset(); };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("keydown", keyboard);
    fine.addEventListener("change", reset);
    reduced.addEventListener("change", reset);
    return () => {
      reset(); cursor.remove();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("keydown", keyboard);
      fine.removeEventListener("change", reset);
      reduced.removeEventListener("change", reset);
    };
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    const syncMotion = () => {
      document.documentElement.classList.toggle("motion-ready", !media.matches);
      observer.disconnect();
      if (!media.matches) document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((target) => observer.observe(target));
      else {
        document.documentElement.style.removeProperty("--pointer-x");
        document.documentElement.style.removeProperty("--pointer-y");
      }
    };
    syncMotion();
    media.addEventListener("change", syncMotion);
    let frame;
    const move = (event) => {
      if (media.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--pointer-x", `${(event.clientX / innerWidth - .5) * 24}deg`);
        document.documentElement.style.setProperty("--pointer-y", `${(event.clientY / innerHeight - .5) * -24}deg`);
      });
    };
    window.addEventListener("pointermove", move);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); media.removeEventListener("change", syncMotion); document.documentElement.classList.remove("motion-ready"); };
  }, []);
  useEffect(() => {
    const escape = (event) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  return <div className="mobile-navigation"><button className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? "Close −" : "Menu +"}</button><nav id="mobile-menu" className="mobile-menu" hidden={!open} aria-label="Mobile navigation">{[["Work", "#work"], ["About", "#about"], ["Contact", "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<span>↗</span></a>)}</nav></div>;
}