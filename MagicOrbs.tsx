import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export default function MagicOrbs() {
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    const colors = [
      "from-rose-400 to-pink-300",
      "from-purple-400 to-violet-300",
      "from-blue-400 to-indigo-300",
      "from-amber-300 to-yellow-200",
      "from-emerald-400 to-teal-300",
    ];

    const newOrbs: Orb[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
    }));

    setOrbs(newOrbs);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} opacity-20 blur-xl`}
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}