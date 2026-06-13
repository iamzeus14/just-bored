import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function Fireworks() {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    const colors = ["bg-rose-500", "bg-pink-500", "bg-purple-500", "bg-yellow-400", "bg-blue-400"];

    const interval = setInterval(() => {
      const newFirework: Firework = {
        id: Date.now() + Math.random(),
        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
        y: Math.random() * ((typeof window !== "undefined" ? window.innerHeight : 800) * 0.6),
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setFireworks((prev) => [...prev.slice(-8), newFirework]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {fireworks.map((firework) => (
        <motion.div
          key={firework.id}
          className={`fixed pointer-events-none ${firework.color} rounded-full`}
          style={{ left: firework.x, top: firework.y }}
          initial={{ width: 4, height: 4, opacity: 1 }}
          animate={{
            width: [4, 20, 4],
            height: [4, 20, 4],
            opacity: [1, 0.8, 0],
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      ))}
    </>
  );
}