"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      // Create sparkle particles on click
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: mousePosition.x,
        y: mousePosition.y,
      }));
      setParticles((prev) => [...prev, ...newParticles]);

      // Remove particles after animation
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id)),
        );
      }, 1000);
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Sparkle particles on click */}
      <AnimatePresence>
        {particles.map((particle, index) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-[9999]"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: particle.x + Math.cos((index * Math.PI) / 3) * 40,
              y: particle.y + Math.sin((index * Math.PI) / 3) * 40,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-2 h-2 bg-gradient-to-br from-rose-pink to-lavender rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.4 : 1,
          opacity: isClicking ? 0.5 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-pink/30 via-lavender/30 to-sky-blue/30 blur-md" />
      </motion.div>

      {/* Middle ring with gradient border */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 18,
          y: mousePosition.y - 18,
          scale: isHovering ? 1.3 : 1,
          rotate: isClicking ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          rotate: { duration: 0.3 },
        }}
      >
        <div className="w-9 h-9 rounded-full border-2 border-golden-yellow/60" />
      </motion.div>

      {/* Baby pacifier icon (main cursor) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {/* Baby pacifier design */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Pacifier handle */}
          <circle
            cx="12"
            cy="12"
            r="4"
            fill="#f8b4c4"
            stroke="#1a4d2e"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="2.5" fill="#d4c5f9" />
          {/* Pacifier ring */}
          <path
            d="M12 16.5C12 16.5 15 17 16.5 18.5C17.5 19.5 17.5 20.5 16.5 21.5C15.5 22.5 14.5 22.5 13.5 21.5L12 20"
            stroke="#f5c842"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      >
        <div className="w-full h-full rounded-full bg-forest-green shadow-lg" />
      </motion.div>

      {/* Trailing hearts */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] text-rose-pink opacity-60"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
      >
        <span className="text-xs">💕</span>
      </motion.div>
    </>
  );
}
