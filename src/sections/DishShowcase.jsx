import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DISHES } from "./DishScrollSection"
import "../styles/sections/DishShowcase.css"

const AUTO_MS = 3800
const TRIPLE_DISHES = [...DISHES, ...DISHES, ...DISHES]

const Ring = ({ size, border, speed, dir = 1, className = "" }) => (
  <motion.div
    className={`absolute rounded-full pointer-events-none ${className}`}
    style={{ width: size, height: size, border }}
    animate={{ rotate: dir === 1 ? 360 : -360 }}
    transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
  />
)

const DishShowcase = () => {
  const [active, setActive] = useState(DISHES.length)
  const [isJumping, setIsJumping] = useState(false)
  const [slotSize, setSlotSize] = useState(520)

  useEffect(() => {
    const handleResize = () => {
      setSlotSize(window.innerWidth < 768 ? window.innerWidth * 0.85 : 520)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const go = useCallback((step) => {
    setActive((prev) => prev + step)
  }, [])

  useEffect(() => {
    if (active >= DISHES.length * 2) {
      const timer = setTimeout(() => {
        setIsJumping(true)
        setActive(DISHES.length)
        setTimeout(() => setIsJumping(false), 50)
      }, 800)
      return () => clearTimeout(timer)
    }
    if (active < DISHES.length) {
      const timer = setTimeout(() => {
        setIsJumping(true)
        setActive(DISHES.length * 2 - 1)
        setTimeout(() => setIsJumping(false), 50)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [active])

  useEffect(() => {
    const id = setInterval(() => go(1), AUTO_MS)
    return () => clearInterval(id)
  }, [go])

  return (
    <section id="dish-showcase" className="dish-showcase">

      <AnimatePresence mode="wait">
        <motion.div
          key={active % DISHES.length}
          className="dish-bg-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            background: `radial-gradient(ellipse 55% 42% at 50% 38%,
              rgba(224,169,75,0.11) 0%,
              rgba(15,92,92,0.06) 60%,
              transparent 100%)`
          }}
        />
      </AnimatePresence>

      <div className="dish-rings-container">
        <Ring size={420} border="1px solid rgba(15,92,92,0.07)" speed={38} />
        <Ring size={320} border="1px solid rgba(224,169,75,0.10)" speed={26} dir={-1} />
        <Ring size={240} border="1px solid rgba(15,92,92,0.05)" speed={18} />
      </div>

      <div className="dish-header">
        <h2 className="dish-title">
          <span className="dish-title-part">Restro's</span>
          <span className="dish-title-part">Creations</span>
        </h2>
      </div>

      <div className="dish-carousel-container">
        <motion.div
          className="dish-carousel-track"
          animate={{ x: -active * slotSize }}
          transition={isJumping ? { duration: 0 } : { duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          style={{ willChange: "transform" }}
        >
          {TRIPLE_DISHES.map((dish, i) => {
            const distance = i - active
            const isCenter = distance === 0
            const isVisible = Math.abs(distance) <= 1

            return (
              <motion.div
                key={i}
                className="dish-item"
                style={{
                  left: "50%",
                  x: "-50%",
                  marginLeft: i * slotSize,
                }}
                animate={{
                  y: isCenter ? 0 : 20,
                  opacity: isCenter ? 1 : isVisible ? 0.7 : 0,
                  scale: isCenter ? 1 : 0.7,
                  zIndex: isCenter ? 10 : 5,
                }}
              >
                <AnimatePresence>
                  {isCenter && (
                    <motion.div
                      key="glow"
                      className="dish-glow-effect"
                      initial={{ opacity: 0 }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  className="dish-image-wrapper"
                  whileHover={isCenter ? { scale: 1.05 } : {}}
                >
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="dish-image"
                    draggable={false}
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  {isCenter && (
                    <motion.div
                      key={dish.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="dish-info"
                    >
                      <h3 className="dish-name">
                        {dish.name}
                      </h3>
                      <p className="dish-tagline">
                        {dish.tagline}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="dish-controls">
        <button onClick={() => go(-1)} className="dish-nav-btn">
          <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 40 40" fill="none">
            <path d="M25 8 L13 20 L25 32" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <button onClick={() => go(1)} className="dish-nav-btn">
          <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 40 40" fill="none">
            <path d="M15 8 L27 20 L15 32" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default DishShowcase