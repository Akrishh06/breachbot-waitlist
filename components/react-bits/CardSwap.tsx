"use client";

import {
  Children,
  MouseEvent,
  ReactNode,
  createRef,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

type CardProps = {
  customClass?: string;
} & React.HTMLAttributes<HTMLDivElement>;

type CardSwapProps = {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
};

type Slot = {
  x: number;
  y: number;
  z: number;
  zIndex: number;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { customClass, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={`card ${customClass ?? ""} ${className ?? ""}`.trim()}
    />
  );
});

function makeSlot(index: number, distX: number, distY: number, total: number): Slot {
  return {
    x: index * distX,
    y: -index * distY,
    z: -index * distX * 1.5,
    zIndex: total - index,
  };
}

function placeNow(element: HTMLDivElement | null, slot: Slot, skew: number) {
  if (!element) return;

  gsap.set(element, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });
}

export default function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}: CardSwapProps) {
  const config = useMemo(
    () =>
      easing === "elastic"
        ? {
            ease: "elastic.out(0.6,0.9)",
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05,
          }
        : {
            ease: "power1.inOut",
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2,
          },
    [easing],
  );

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const cardCount = childArr.length;
  const refs = useMemo(
    () => childArr.map(() => createRef<HTMLDivElement>()),
    [childArr],
  );

  const order = useRef<number[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const manualSwapRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    order.current = Array.from({ length: cardCount }, (_, index) => index);
  }, [cardCount]);

  useEffect(() => {
    refs.forEach((ref, index) => {
      placeNow(
        ref.current,
        makeSlot(index, cardDistance, verticalDistance, refs.length),
        skewAmount,
      );
    });

    const clearSwapInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const startSwapInterval = () => {
      clearSwapInterval();
      intervalRef.current = window.setInterval(swap, delay);
    };

    const swap = () => {
      if (order.current.length < 2) return;
      if (timelineRef.current?.isActive()) return;

      const [front, ...rest] = order.current;
      const frontElement = refs[front]?.current;
      if (!frontElement) return;

      const timeline = gsap.timeline();
      timelineRef.current = timeline;

      timeline.to(frontElement, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      timeline.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((index, restIndex) => {
        const element = refs[index]?.current;
        if (!element) return;

        const slot = makeSlot(restIndex, cardDistance, verticalDistance, refs.length);
        timeline.set(element, { zIndex: slot.zIndex }, "promote");
        timeline.to(
          element,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${restIndex * 0.15}`,
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      timeline.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      timeline.call(
        () => {
          gsap.set(frontElement, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return",
      );
      timeline.to(
        frontElement,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      );

      timeline.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    startSwapInterval();
    manualSwapRef.current = () => {
      clearSwapInterval();
      swap();
      startSwapInterval();
    };

    const node = container.current;
    if (pauseOnHover && node) {
      const pause = () => {
        timelineRef.current?.pause();
        clearSwapInterval();
      };
      const resume = () => {
        timelineRef.current?.play();
        startSwapInterval();
      };

      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);

      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        manualSwapRef.current = () => undefined;
        clearSwapInterval();
        timelineRef.current?.kill();
      };
    }

    return () => {
      manualSwapRef.current = () => undefined;
      clearSwapInterval();
      timelineRef.current?.kill();
    };
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    refs,
    config,
  ]);

  const rendered = childArr.map((child, index) => {
    if (!isValidElement<CardProps>(child)) {
      return child;
    }

    const {
      children: cardChildren,
      className,
      customClass,
      onClick,
      style,
      ...rest
    } = child.props;

    return (
      <div
        key={index}
        ref={refs[index]}
        {...rest}
        className={`card ${customClass ?? ""} ${className ?? ""}`.trim()}
        onClick={(event: MouseEvent<HTMLDivElement>) => {
          onClick?.(event);
          onCardClick?.(index);
          manualSwapRef.current();
        }}
        style={{ width, height, ...style }}
      >
        {cardChildren}
      </div>
    );
  });

  return (
    <div className="card-swap-container" ref={container} style={{ width, height }}>
      {rendered}
    </div>
  );
}
