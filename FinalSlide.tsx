import { motion } from "framer-motion";
import { Heart, Sparkles, Laugh } from "lucide-react";
import Fairy from "./Fairy";
import FloatingRoses from "./FloatingRoses";
import Fireworks from "./Fireworks";

interface FinalSlideProps {
  isActive: boolean;
}

export default function FinalSlide({ isActive }: FinalSlideProps) {
  if (!isActive) return null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <FloatingRoses />
      <Fireworks />
      {[...Array(8)].map((_, i) => (
        <Fairy key={i} id={i} mood="happy" />
      ))}

      {/* Stars */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 2, 0.5] }}
          transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* Big Heart */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8"
        >
          <Heart className="w-24 h-24 md:w-32 md:h-32 text-rose-500 fill-rose-500 mx-auto drop-shadow-lg" />
        </motion.div>

        {/* Prank Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-rose-400/30 shadow-2xl mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Laugh className="w-12 h-12 text-yellow-400 mx-auto" />
          </motion.div>
          
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Just Kidding! 😂
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-rose-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            This is totally a prank... 
          </motion.p>
          <motion.p
            className="text-base text-rose-300 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            (if you want it to be)
          </motion.p>
        </motion.div>

        {/* Real Talk */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-rose-500/20 backdrop-blur-sm rounded-2xl p-8 border border-rose-400/50 shadow-2xl"
        >
          <motion.p
            className="text-lg md:text-xl text-white leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            But honestly? I miss the time spent with you.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-white leading-relaxed mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            It was something special, something meaningful.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-white leading-relaxed mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1 }}
          >
            At least for me. 💕
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mt-8 flex items-center justify-center gap-2 text-rose-300"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-lg italic">No hard feelings, just wanted to say hi</span>
          <Sparkles className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </div>
  );
}