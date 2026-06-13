import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CuteAnimalsProps {
  slideIndex: number;
}

interface Animal {
  id: number;
  type: "cat" | "dog" | "bunny";
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
}

export default function CuteAnimals({ slideIndex }: CuteAnimalsProps) {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const colors = {
      cat: ["#fbbf24", "#f472b6", "#a78bfa"],
      dog: ["#fb923c", "#f87171", "#60a5fa"],
      bunny: ["#fda4af", "#c4b5fd", "#86efac"],
    };

    const newAnimals: Animal[] = Array.from({ length: 4 }, (_, i) => {
      const type = (["cat", "dog", "bunny"] as const)[i % 3];
      return {
        id: i,
        type,
        x: Math.random() * 100,
        y: Math.random() * 100,
        targetX: Math.random() * 100,
        targetY: Math.random() * 100,
        color: colors[type][Math.floor(Math.random() * 3)],
      };
    });

    setAnimals(newAnimals);
  }, [slideIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimals(prev => prev.map(animal => ({
        ...animal,
        targetX: Math.random() * 80 + 10,
        targetY: Math.random() * 80 + 10,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {animals.map((animal) => (
        <motion.div
          key={animal.id}
          className="absolute text-3xl md:text-4xl"
          animate={{
            x: `${animal.targetX}%`,
            y: `${animal.targetY}%`,
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
          style={{
            left: `${animal.x}%`,
            top: `${animal.y}%`,
          }}
        >
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: animal.id * 0.3,
            }}
          >
            {animal.type === "cat" && "🐱"}
            {animal.type === "dog" && "🐕"}
            {animal.type === "bunny" && "🐰"}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}