import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import Fairy from "./Fairy";
import FloatingRoses from "./FloatingRoses";
import CuteAnimals from "./CuteAnimals";

interface MemorySlidesProps {
  currentSlide: number;
  onYesClick: () => void;
}

const sadMessages = [
  "Please think again 🥺",
  "I'll cry 😢",
  "Are you sure? 💔",
  "Don't break my heart...",
  "I still love you 💔",
  "Please... 🙏",
  "That hurts... 😢",
  "Give me a chance?",
  "I'm still waiting...",
  "Remember our memories?",
  "Think about it... 💕",
  "My heart beats for you",
  "Don't go... 🥺",
  "I miss you...",
  "Please reconsider 💗",
];

const memories = [
  {
    title: "That Magical Day...",
    question: "Do you remember 9th Feb 2024?",
    description: "The day of my farewell... You made it sooooo magical! I can never forget that day. Every moment with you was special.",
    subtext: "You were the highlight of my farewell 💫",
    icon: "✨",
  },
  {
    title: "School Corridors",
    question: "Remember our walks?",
    description: "Spending time in school corridors was my best memory. Walking beside you, talking about everything and nothing...",
    subtext: "Those corridors felt like our own world 🌸",
    icon: "🏫",
  },
  {
    title: "Talking for Hours",
    question: "Miss our long conversations?",
    description: "We could talk for hours and never run out of things to say. Sharing problems, dreams, fears, and laughter...",
    subtext: "I still listen for your voice in the silence 🌙",
    icon: "💬",
  },
  {
    title: "Sharing Everything",
    question: "Remember our bond?",
    description: "We shared our problems, our happiness, our tears, and our smiles. You understood me like no one else did.",
    subtext: "You were my safe place 💕",
    icon: "🤝",
  },
  {
    title: "Still Waiting",
    question: "Can I still wait for you?",
    description: "I know we're not together anymore, but my heart still beats for you. I'm not proposing, just confessing... I still love you.",
    subtext: "Some feelings never fade away 🌹",
    icon: "💗",
  },
];

export default function MemorySlides({ currentSlide, onYesClick }: MemorySlidesProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [fairyMood, setFairyMood] = useState<"neutral" | "happy">("neutral");
  const [noMessage, setNoMessage] = useState("NO 😢");
  const [isNearNo, setIsNearNo] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const yesButton = document.getElementById(`yes-button-${currentSlide}`);
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
          const randomMsg = sadMessages[Math.floor(Math.random() * sadMessages.length)];
          setNoMessage(randomMsg);
          moveNoButton();
        } else {
          setIsNearNo(false);
          setNoMessage("NO 😢");
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (noButtonRef.current) {
        const noRect = noButtonRef.current.getBoundingClientRect();
        const noCenterX = noRect.left + noRect.width / 2;
        const noCenterY = noRect.top + noRect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(touch.clientX - noCenterX, 2) +
          Math.pow(touch.clientY - noCenterY, 2)
        );

        if (distance < 200) {
          setIsNearNo(true);
          const randomMsg = sadMessages[Math.floor(Math.random() * sadMessages.length)];
          setNoMessage(randomMsg);
          moveNoButton();
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [currentSlide]);

  const moveNoButton = () => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 60;
    const padding = 50;
    
    const newX = Math.max(padding, Math.min(maxX, Math.random() * maxX));
    const newY = Math.max(padding, Math.min(maxY, Math.random() * maxY));
    
    setNoPosition({ x: newX, y: newY });
  };

  if (currentSlide === 0) return null;

  const memory = memories[currentSlide - 1];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -100, scale: 0.9 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8"
      >
        <FloatingRoses />
        <CuteAnimals slideIndex={currentSlide} />
        
        {/* Only 4 fairies */}
        {[...Array(4)].map((_, i) => (
          <Fairy key={i} id={i} mood={fairyMood} />
        ))}

        {/* Animated Moon (on certain slides) */}
        {currentSlide % 2 === 0 && (
          <motion.div
            className="absolute top-8 left-8 md:top-16 md:left-16"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <div className="relative w-16 h-16 md:w-24 md:h-24">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(253, 224, 71, 0.4)",
                    "0 0 60px rgba(253, 224, 71, 0.7)",
                    "0 0 30px rgba(253, 224, 71, 0.4)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="absolute top-2 left-2 w-2 h-2 bg-amber-300/50 rounded-full" />
              <div className="absolute bottom-3 right-3 w-4 h-4 bg-amber-300/30 rounded-full" />
            </div>
          </motion.div>
        )}

        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star className="w-2 h-2 text-yellow-200 fill-yellow-200" />
          </motion.div>
        ))}

        {/* Content Card */}
        <motion.div
          className="relative z-10 max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-10 border border-white/20 shadow-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            boxShadow: "0 0 60px rgba(244, 63, 94, 0.2), 0 0 100px rgba(139, 92, 246, 0.1)",
          }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-4 text-4xl"
          >
            {memory.icon}
          </motion.div>

          <motion.h2
            className="text-2xl md:text-4xl font-bold text-white mb-4 font-serif text-center"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {memory.title}
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-rose-300 mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {memory.question}
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-white/90 mb-4 text-center leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {memory.description}
          </motion.p>

          <motion.p
            className="text-sm md:text-base text-rose-200/80 mb-8 text-center italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {memory.subtext}
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <motion.button
              id={`yes-button-${currentSlide}`}
              onClick={onYesClick}
              className="relative px-10 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white text-lg md:text-xl font-bold rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(244, 63, 94, 0.5)",
                  "0 0 40px rgba(244, 63, 94, 0.8)",
                  "0 0 20px rgba(244, 63, 94, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="flex items-center gap-2">
                Yes, I Remember <Sparkles className="w-5 h-5" />
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* NO Button */}
        <motion.button
          ref={noButtonRef}
          className={`fixed px-8 py-3 text-lg font-semibold rounded-full cursor-not-allowed select-none z-50 backdrop-blur-sm border transition-all duration-300 ${
            isNearNo 
              ? "bg-rose-600/90 text-white border-rose-400 scale-110" 
              : "bg-gray-700/90 text-gray-300 border-gray-500"
          }`}
          animate={{
            left: noPosition.x || "auto",
            top: noPosition.y || "auto",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onHoverStart={moveNoButton}
          onClick={moveNoButton}
          style={{
            left: noPosition.x || "auto",
            top: noPosition.y || "auto",
          }}
        >
          <motion.span
            key={noMessage}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {noMessage}
          </motion.span>
        </motion.button>

        <motion.p
          className="mt-6 text-sm text-rose-300/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Slide {currentSlide + 1} of 6
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}