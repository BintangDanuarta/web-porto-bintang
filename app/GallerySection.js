"use client";

import Image from "next/image";
import { useRef } from "react";

const photos = Array.from({ length: 50 }, (_, index) => ({
  src: `/images/gallery/Frame%20${index + 4}.jpg`,
  id: `photo-${index + 1}`,
}));

export default function GallerySection() {
  const collageRef = useRef(null);
  const dragRef = useRef(null);

  const startDrag = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.target.closest("button")) return;
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: collageRef.current.scrollLeft,
      top: collageRef.current.scrollTop,
    };
    collageRef.current.classList.add("is-dragging");
    collageRef.current.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event) => {
    if (!dragRef.current) return;
    collageRef.current.scrollLeft = dragRef.current.left - (event.clientX - dragRef.current.x);
    collageRef.current.scrollTop = dragRef.current.top - (event.clientY - dragRef.current.y);
  };

  const endDrag = () => {
    dragRef.current = null;
    collageRef.current?.classList.remove("is-dragging");
  };

  return (
    <section className="gallery-section" id="gallery" aria-labelledby="gallery-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">04 / Gallery</p>
        <h2 id="gallery-title">Moments<br /><span className="serif-text">in frames.</span></h2>
        <p className="section-intro">A collage of moments. Drag or scroll to explore.</p>
      </div>
      <div
        className="gallery-canvas"
        ref={collageRef}
        aria-label="Photo collage. Drag or scroll to explore."
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="gallery-collage" aria-hidden="true">
          {photos.map((photo, index) => (
            <div className="gallery-tile" key={photo.id}>
              <Image src={photo.src} alt="" fill sizes="(max-width: 560px) 36vw, 22vw" priority={index < 8} />
            </div>
          ))}
        </div>
      </div>
      <p className="gallery-hint" aria-hidden="true">Drag or scroll to explore</p>
    </section>
  );
}
