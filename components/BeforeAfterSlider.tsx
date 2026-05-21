"use client";

import Image from "next/image";
import { useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className="before-after-card">
      <div
        className="before-after-slider"
        style={{ "--slider-position": `${position}%` } as React.CSSProperties}
      >
        <Image
          alt={afterAlt}
          className="comparison-image"
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 1120px"
          src={afterSrc}
        />
        <div className="comparison-before">
          <Image
            alt={beforeAlt}
            className="comparison-image"
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, 1120px"
            src={beforeSrc}
          />
        </div>

        <div className="comparison-label comparison-label-before">Before</div>
        <div className="comparison-label comparison-label-after">After</div>
        <div className="comparison-handle" aria-hidden="true" />

        <input
          aria-label="Compare before and after dashboard"
          className="comparison-range"
          max="100"
          min="0"
          onChange={(event) => setPosition(Number(event.target.value))}
          type="range"
          value={position}
        />
      </div>
    </div>
  );
}
