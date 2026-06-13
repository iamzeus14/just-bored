import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function SparkleTrail() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    let id = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.7) {
        setSparkles(prev => [...prev.slice(-20), { id: id++, x: e.clientX, y: e.clientY }]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="fixed pointer-events-none z-30"
          initial={{ x: sparkle.x - 4, y: sparkle.y - 4, scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0] }}
          transition={{ duration: 0.8 }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M4 0L4.5 3.5L8 4L4.5 4.5L4 8L3.5 4.5L0 4L3.5 3.5L4 0Z"
              fill="white"
            />
          </svg>
        </motion.div>
      ))}
    </>
  );
}