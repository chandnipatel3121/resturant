import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "What would you like to eat?",
  "Try our special today!",
  "Feeling hungry?",
  "Want something spicy?"
];

// Typing effect hook
const useTypingEffect = (text, isVisible) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText("");
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, [text, isVisible]);

  return displayedText;
};

const ChefMascot = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [cycles, setCycles] = useState(0);

  const [showMascot, setShowMascot] = useState(false); // 👈 NEW

  const currentMessage = messages[messageIndex];
  const displayedText = useTypingEffect(currentMessage, isVisible);

  // 👇 SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowMascot(true);
      } else {
        setShowMascot(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Message animation logic
  useEffect(() => {
    if (cycles >= 3 || !showMascot) return;

    let t1, t2;

    const delay = messageIndex === 0 && cycles === 0 ? 2000 : 1000;

    t1 = setTimeout(() => {
      setIsVisible(true);

      t2 = setTimeout(() => {
        setIsVisible(false);

        setTimeout(() => {
          setMessageIndex((prev) => {
            const next = prev + 1;
            if (next >= messages.length) {
              setCycles((c) => c + 1);
              return 0;
            }
            return next;
          });
        }, 400);
      }, 5000);
    }, delay);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [messageIndex, cycles, showMascot]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {showMascot && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-3"
        >
          {/* 💬 MESSAGE */}
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="bg-white px-4 py-2 rounded-full shadow-lg"
              >
                <p className="text-[11px] text-[#0F5C5C] whitespace-nowrap">
                  {displayedText}
                  <span className="animate-pulse ml-[2px]">|</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 👨‍🍳 MASCOT */}
          <motion.div
            onClick={handleClick}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative w-15 h-15 rounded-full bg-white shadow-xl flex items-center justify-center cursor-pointer hover:scale-105 transition"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-[#EAD7B7] blur-xl opacity-30 -z-10" />

            {/* 🔼 SVG ARROW WITH ROUND BG */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-15 flex flex-col items-center"
            >
              <div className="w-13 h-13 rounded-full bg-white shadow-md flex items-center justify-center border border-[#0F5C5C]/10">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0F5C5C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </div>
              <div className="w-1.5 h-1.5 bg-[#0F5C5C] rounded-full mt-1 opacity-50" />
            </motion.div>

            {/* CHEF SVG */}
            <svg viewBox="0 0 200 200" className="w-[80%] h-[80%]">
              <g transform="rotate(3, 100, 100)">
                <path d="M60 200 C 60 110, 140 110, 140 200 Z" fill="#FFF9F2" stroke="#0F5C5C" strokeWidth="5" />
                <path d="M75 130 C 100 150, 125 130, 125 130 L 115 155 Z" fill="#E76F51" stroke="#0F5C5C" strokeWidth="4" />
                <circle cx="100" cy="100" r="34" fill="#FFDCA8" stroke="#0F5C5C" strokeWidth="5" />
                <circle cx="86" cy="95" r="4" fill="#0F5C5C" />
                <circle cx="114" cy="95" r="4" fill="#0F5C5C" />
                <path d="M92 110 Q 100 120 108 110" stroke="#0F5C5C" strokeWidth="4" fill="none" />
                <path d="M68 72 C 45 60, 60 25, 85 35 C 95 5, 130 15, 125 45 C 155 40, 150 75, 132 75 Z" fill="#FFF9F2" stroke="#0F5C5C" strokeWidth="5" />
              </g>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChefMascot;