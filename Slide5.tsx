import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Fairy from "./Fairy";
import FloatingRoses from "./FloatingRoses";
import Fireworks from "./Fireworks";

interface Slide5Props {
  isActive: boolean;
  onYesClick: () => void;
  slideNumber: number;
  totalSlides: number;
}

const funnyMessages = [
  "Last chance!",
  "Come on!",
  "You're close!",
  "Haha!",
  "Just click YES!",
];

export default function Slide5({ isActive, onYesClick, slideNumber, totalSlides }: Slide5Props) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [fairyMood, setFairyMood] = useState<"neutral" | "happy">("neutral");
  const [noMessage, setNoMessage] = useState("NO");
  const [isNearNo, setIsNearNo] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const yesButton = document.getElementById("yes-button");
      if (yesButton) {
        const rect = yesButton.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
          Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
        );
        setFairyMood(distance < 150 ? "happy" : "neutral");
      }

      if (noButtonRef.current) {
        const noRect = noButtonRef.current.getBoundingClientRect();
        const noCenterX = noRect.left + noRect.width / 2;
        const noCenterY = noRect.top + noRect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - noCenterX, 2) +
          Math.pow(e.clientY - noCenterY, 2)
        );

        if (distance < 180) {
          setIsNearNo(true);
          const randomMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
          setNoMessage(randomMsg);
          moveNoButton();
        } else {
          setIsNearNo(false);
          setNoMessage("NO");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const moveNoButton = () => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 60;
    const newX = Math.max(50, Math.min(maxX, Math.random() * maxX));
    const newY = Math.max(50, Math.min(maxY, Math.random() * maxY));
    setNoPosition({ x: newX, y: newY });
  };

  if (!isActive) return null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <FloatingRoses />
      <Fireworks />
      {[...Array(4)].map((_, i) => (
        <Fairy key={i} id={i} mood={fairyMood} />
      ))}

      {/* Stars */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <Heart className="w-16 h-16 text-rose-500 fill-rose-500 mx-auto drop-shadow-lg" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif drop-shadow-lg"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Sharing Everything 🤝
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-rose-200 mb-4 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          You were my personal therapist (free of cost)
        </motion.p>

        <motion.p
          className="text-base md:text-xl text-pink-100 mb-12 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Jokes aside, thanks for listening to all my drama. I still have nobody to rant to 😂
        </motion.p>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center relative min-h-[100px]">
          <motion.button
            id="yes-button"
            onClick={onYesClick}
            className="relative px-12 py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white text-xl md:text-3xl font-bold rounded-full shadow-2xl"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: ["0 0 30px rgba(244, 63, 94, 0.6)", "0 0 50px rgba(244, 63, 94, 0.9)", "0 0 30px rgba(244, 63, 94, 0.6)"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="relative z-10 flex items-center gap-2">
              YES! <Sparkles className="w-6 h-6" />
            </span>
          </motion.button>

          <motion.button
            ref={noButtonRef}
            className={`fixed px-8 py-3 text-lg font-semibold rounded-full cursor-not-allowed z-50 backdrop-blur-sm border transition-all duration-300 ${
              isNearNo ? "bg-rose-600/90 text-white border-rose-400 scale-110" : "bg-gray-700/90 text-gray-300 border-gray-500"
            }`}
            animate={{ left: noPosition.x || "auto", top: noPosition.y || "auto" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ left: noPosition.x || "auto", top: noPosition.y || "auto" }}
          >
            {noMessage}
          </motion.button>
        </div>

        <motion.p className="mt-10 text-sm text-rose-300/70">
          Slide {slideNumber} of {totalSlides}
        </motion.p>
      </motion.div>
    </div>
  );
}