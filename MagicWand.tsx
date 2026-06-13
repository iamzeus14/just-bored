import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function MagicWand() {
  const [wandTrails, setWandTrails] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    let id = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.85) {
        setWandTrails(prev => [...prev.slice(-15), { id: id++, x: e.clientX, y: e.clientY }]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {wandTrails.map((trail) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-50"
          initial={{ x: trail.x - 10, y: trail.y - 10, scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <div className="relative">
            <div className="w-5 h-5 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full blur-sm" />
            <div className="absolute inset-1 bg-white rounded-full" />
          </div>
        </motion.div>
      ))}
    </>
  );
}