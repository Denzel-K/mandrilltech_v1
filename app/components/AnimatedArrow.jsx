"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const AnimatedArrow = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set up the visibility cycle
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, isVisible ? 5000 : 3000); // 5 seconds visible, 3 seconds invisible

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          onClick={() => window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          })}
        >
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
            >
              <div className="arrow-gradient">
                <FaChevronDown size={24} />
              </div>
            </motion.div>
            <span className="text-xs mt-2 text-white/70">Scroll Down</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedArrow;
