import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroSlide from './IntroSlide';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
import MemorySlides from './MemorySlides';
import FinalSlide from './FinalSlide';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6;

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 overflow-hidden">
      <AnimatePresence mode="wait">
        {currentSlide === 0 && (
          <IntroSlide
            key="intro"
            isActive={currentSlide === 0}
            onYesClick={nextSlide}
            slideNumber={1}
            totalSlides={totalSlides}
          />
        )}
        {currentSlide === 1 && (
          <Slide2
            key="slide2"
            isActive={currentSlide === 1}
            onYesClick={nextSlide}
            slideNumber={2}
            totalSlides={totalSlides}
          />
        )}
        {currentSlide === 2 && (
          <Slide3
            key="slide3"
            isActive={currentSlide === 2}
            onYesClick={nextSlide}
            slideNumber={3}
            totalSlides={totalSlides}
          />
        )}
        {currentSlide === 3 && (
          <Slide4
            key="slide4"
            isActive={currentSlide === 3}
            onYesClick={nextSlide}
            slideNumber={4}
            totalSlides={totalSlides}
          />
        )}
        {currentSlide === 4 && (
          <Slide5
            key="slide5"
            isActive={currentSlide === 4}
            onYesClick={nextSlide}
            slideNumber={5}
            totalSlides={totalSlides}
          />
        )}
        {currentSlide === 5 && (
          <FinalSlide
            key="final"
            isActive={currentSlide === 5}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
