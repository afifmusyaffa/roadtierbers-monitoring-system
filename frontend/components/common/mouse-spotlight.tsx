"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function MouseSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    if (shouldReduceMotion) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame to throttle state updates for performance
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [shouldReduceMotion]);

  // Initial server and client render must be deterministic.
  // Before mount or if reduced motion is preferred, render an invisible stable wrapper.
  const isVisible = mounted && !shouldReduceMotion;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        background: isVisible
          ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(6,182,212,0.03), transparent 40%)`
          : "transparent",
      }}
    />
  );
}
