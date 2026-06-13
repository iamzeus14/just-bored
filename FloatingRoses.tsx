import { motion } from "framer-motion";

export default function FloatingRoses() {
  return (
    <>
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-10 text-3xl"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
            y: -50,
            rotate: 0,
          }}
          animate={{
            y: (typeof window !== "undefined" ? window.innerHeight : 800) + 100,
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
            rotate: 360,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
        >
          🌹
        </motion.div>
      ))}
    </>
  );
}