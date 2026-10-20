"use client";

import Image from "next/image";
import HoverSky from "./HoverSky";
import { useEffect, useRef, useState } from "react";

const documents = [
  { title: "Cooptrade", category: "Visual identity", file: "/pdfs/identitas-cooptrade.pdf", preview: "/pdfs/cooptrade-preview.jpg" },
  { title: "Simkopdes", category: "Design system", file: "/pdfs/identitas-simkopdes.pdf", preview: "/pdfs/simkopdes-preview.jpg" },
  { title: "Hackathon", category: "Visual identity", file: "/pdfs/identitas-hackathon.pdf", preview: "/pdfs/hackathon-preview.jpg" },
  { title: "Pakta", category: "Visual identity", file: "/pdfs/identitas-pakta.pdf", preview: "/pdfs/pakta-preview.jpg", fit: "contain" },
];

export default function PdfShowcase() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || documents.length < 2) return;

    const handleKeyDown = (event) => {
      if (!section.contains(document.activeElement)) return;
      if (event.key === "ArrowLeft") setActive((index) => (index - 1 + documents.length) % documents.length);
      if (event.key === "ArrowRight") setActive((index) => (index + 1) % documents.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const move = (direction) => setActive((index) => (index + direction + documents.length) % documents.length);

  return (
    <section className="pdf-showcase" id="visual-identity" aria-labelledby="pdf-showcase-title" ref={sectionRef}>
      <div className="pdf-showcase-heading">
        <p className="eyebrow">02 / Visual identity &amp; design systems</p>
        <h2 id="pdf-showcase-title">A closer look at<br /><span className="serif-text">the details.</span></h2>
        <p className="pdf-showcase-intro">Design systems, visual identities, and logos—collected as working documents.</p>
      </div>

      {documents.length ? (
        <>
          <HoverSky className="pdf-carousel" aria-roledescription="carousel" aria-label="Portfolio PDF documents">
            <button className="pdf-nav pdf-nav-prev" type="button" onClick={() => move(-1)} aria-label="Previous document">‹</button>
            <div className="pdf-stage" aria-live="polite">
              {documents.map((document, index) => {
                const offset = (index - active + documents.length) % documents.length;
                const position = offset === 0 ? "active" : offset === 1 ? "next" : offset === documents.length - 1 ? "previous" : "hidden";
                return (
                  <article className={`pdf-card pdf-card-${position}`} key={document.file} aria-hidden={position !== "active"}>
                    <Image src={document.preview} alt={`Preview ${document.title}`} fill sizes="(max-width: 720px) 62vw, min(43vw, 480px)" className={`pdf-preview-image${document.fit === "contain" ? " pdf-preview-contain" : ""}`} />
                    <a className="pdf-card-open" href={document.file} target="_blank" rel="noopener noreferrer" tabIndex={position === "active" ? 0 : -1} aria-label={`Open ${document.title} PDF in a new tab`}>Open PDF <span aria-hidden="true">↗</span></a>
                  </article>
                );
              })}
            </div>
            <button className="pdf-nav pdf-nav-next" type="button" onClick={() => move(1)} aria-label="Next document">›</button>
          </HoverSky>
          <div className="pdf-caption" aria-live="polite">
            <p className="pdf-count">{String(active + 1).padStart(2, "0")} / {String(documents.length).padStart(2, "0")} <span>{documents[active].category}{documents[active].year ? ` · ${documents[active].year}` : ""}</span></p>
            <h3>{documents[active].title}</h3>
            <a className="text-link" href={documents[active].file} target="_blank" rel="noopener noreferrer">Open PDF <span aria-hidden="true">↗</span></a>
          </div>
        </>
      ) : (
        <div className="pdf-empty">
          <div className="pdf-empty-copy"><span className="pdf-empty-index">PDF / 00</span><h3>Your design work,<br /><span className="serif-text">in full detail.</span></h3><p>Add your design system, visual identity, or logo presentation PDFs to <code>public/pdfs/</code>, then list each file in <code>app/PdfShowcase.js</code>.</p></div>
          <div className="pdf-empty-sheet" aria-hidden="true"><span>DESIGN<br />SYSTEM</span><i>Aa</i><b>01 — 04</b></div>
        </div>
      )}
    </section>
  );
}