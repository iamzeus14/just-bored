import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FairyProps {
  id: number;
  mood: "neutral" | "happy";
}

export default function Fairy({ id, mood }: FairyProps) {
  const [position, setPosition] = useState({
    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
    y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 400),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
        y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 400),
      });
    }, 3000 + id * 500);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <motion.div
      className="fixed pointer-events-none z-20"
      animate={{
        x: position.x,
        y: position.y,
        scale: mood === "happy" ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 3,
      }}
    >
      <motion.div
        className={`relative ${mood === "happy" ? "text-pink-400" : "text-yellow-200"}`}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, -10, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: id * 0.2,
        }}
      >
        {/* Fairy wings */}
        <motion.div
          className="absolute -left-2 top-1 w-4 h-6 rounded-full bg-current opacity-50"
          animate={{ rotate: [0, -20, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-2 top-1 w-4 h-6 rounded-full bg-current opacity-50"
          animate={{ rotate: [0, 20, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        
        {/* Fairy body */}
        <div className="relative w-3 h-3 bg-current rounded-full shadow-lg">
          <motion.div
            className={`absolute inset-0 rounded-full ${mood === "happy" ? "bg-pink-300" : "bg-yellow-100"}`}
            animate={{
              boxShadow: mood === "happy"
                ? ["0 0 10px rgba(236, 72, 153, 0.8)", "0 0 20px rgba(236, 72, 153, 0.5)", "0 0 10px rgba(236, 72, 153, 0.8)"]
                : ["0 0 5px rgba(253, 224, 71, 0.5)", "0 0 10px rgba(253, 224, 71, 0.3)", "0 0 5px rgba(253, 224, 71, 0.5)"],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        {/* Sparkle trail */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-current rounded-full opacity-50"
            style={{ top: (i + 1) * 4, left: 1 }}
            animate={{ opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}