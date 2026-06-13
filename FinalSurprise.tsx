import { motion } from "framer-motion";
import { Heart, Star, Sparkles } from "lucide-react";
import Fairy from "./Fairy";
import FloatingRoses from "./FloatingRoses";
import Fireworks from "./Fireworks";

export default function FinalSurprise() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-950 via-purple-950 to-indigo-950 overflow-hidden relative">
      <FloatingRoses />
      <Fireworks />
      
      {/* Only 6 fairies - all happy! */}
      {[...Array(6)].map((_, i) => (
        <Fairy key={i} id={i} mood="happy" />
      ))}

      {/* Stars */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 2, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Star className="w-2 h-2 md:w-4 md:h-4 text-yellow-200 fill-yellow-200" />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Big Heart */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <div className="relative">
              <Heart className="w-28 h-28 md:w-40 md:h-40 text-rose-500 fill-rose-500 mx-auto drop-shadow-2xl" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-28 h-28 md:w-40 md:h-40 text-rose-400 fill-rose-400" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-7xl font-bold text-white mb-6 font-serif drop-shadow-lg"
          >
            I Knew It! 💕
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-3xl text-rose-200 mb-10"
          >
            You still love me... and that makes me the happiest person alive
          </motion.p>

          {/* Letter */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-10 border border-white/20 shadow-2xl mb-8"
            style={{
              boxShadow: "0 0 80px rgba(244, 63, 94, 0.3), 0 0 120px rgba(139, 92, 246, 0.2)",
            }}
          >
            <motion.h2
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-2xl md:text-4xl font-bold text-rose-300 mb-6 font-serif flex items-center justify-center gap-3"
            >
              <Sparkles className="w-6 h-6" />
              A Letter From My Heart 💌
              <Sparkles className="w-6 h-6" />
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-left space-y-5 text-white/90 text-base md:text-lg leading-relaxed"
            >
              <motion.p
                animate={{ x: [0, 8, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0 }}
                className="text-xl text-rose-200 font-semibold"
              >
                My Dearest,
              </motion.p>
              
              <motion.p
                animate={{ x: [0, 8, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              >
                Even though we're not together anymore, you're still the first thought in my morning and the last whisper in my night. Every star I see reminds me of your eyes, every song carries your laughter.
              </motion.p>
              
              <motion.p
                animate={{ x: [0, 8, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >
                That day - 9th Feb 2024 - you made my farewell magical. Walking through those school corridors with you, talking for hours about everything and nothing, sharing our dreams and fears... those moments are etched in my heart forever.
              </motion.p>
              
              <motion.p
                animate={{ x: [0, 8, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
              >
                I'm not asking you to come back. I'm just letting you know - I still love you. I'm still waiting. And maybe, just maybe, that means something to you too.
              </motion.p>
              
              <motion.p
                animate={{ x: [0, 8, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                className="text-rose-300 font-semibold text-right italic text-lg md:text-xl"
              >
                Forever yours, with all my heart 💕
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {["🌹", "💕", "✨", "🌸", "💖", "🦋", "💫", "🌺", "💗", "🌷"].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-3xl md:text-5xl"
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          {/* Final message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="mt-10"
          >
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-2xl md:text-4xl font-bold text-white font-serif"
            >
              I Still Love You... Always Have, Always Will 💖
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}