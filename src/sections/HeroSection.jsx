import React, { useRef, useState, useEffect } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useNav } from "../utils/NavContext"
import Popup from "../components/Popup"
import videoSrc from "../assets/videogif.gif"
import img1 from "../assets/resturent3.jpg"
import "../styles/sections/HeroSection.css"

const HeroSection = () => {
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const ref = useRef(null)
  const prevV = useRef(0)
  const hasShownPopup = useRef(false)
  const { setPastHero, setNavTheme } = useNav()

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.2 })

  const morphProgress = useSpring(0, { stiffness: 100, damping: 20, mass: 0.2 })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const direction = v > prevV.current ? 'down' : 'up'
    prevV.current = v

    morphProgress.set(v > 0.01 ? 1 : 0)
    setPastHero(v >= 0.05)

    // Navbar Color Control
    if (v < 0.45) {
      setNavTheme('yellow')
    } else if (v < 0.95) {
      setNavTheme('purple')
    } else {
      setNavTheme('green')
    }

    // Forced scroll to next section when near the end and scrolling down
    if (v > 0.92 && direction === 'down' && window.lenis) {
      window.lenis.scrollTo("#dish-showcase", {
        duration: 1.2,
        easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      })
    }

    // Show popup in between hero scenes (mid-scroll transition)
    if (v >= 0.45 && !hasShownPopup.current) {
      setShowPopup(true)
      hasShownPopup.current = true
    }
  })

  const clipPath = useTransform(morphProgress, (v) => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const isMobile = vw < 768
    const startRadius = Math.sqrt(vw * vw + vh * vh) * (isMobile ? 0.8 : 0.6)
    const finalRadius = isMobile ? vh * 0.18 : vh * 0.22
    const r = startRadius * (1 - v) + finalRadius * v
    return `circle(${Math.round(r)}px at 50% 50%)`
  })

  const imgScale = useTransform(morphProgress, [0, 1], [1.15, 1])

  const forkX = useTransform(morphProgress, (v) => {
    const isMobile = window.innerWidth < 768
    const offset = isMobile ? 18 : 22
    if (v <= 0.5) return `calc(-50vw + ${(v / 0.5) * (isMobile ? 15 : 10)}vw - 100% - 2vh)`
    const p = (v - 0.5) / 0.5
    return `calc(-${isMobile ? 35 : 40}vw * ${1 - p} - ${offset}vh * ${p} - 100% - 1vh)`
  })
  const spoonX = useTransform(morphProgress, (v) => {
    const isMobile = window.innerWidth < 768
    const offset = isMobile ? 18 : 22
    if (v <= 0.5) return `calc(50vw - ${(v / 0.5) * (isMobile ? 15 : 10)}vw + 2vh)`
    const p = (v - 0.5) / 0.5
    return `calc(${isMobile ? 35 : 40}vw * ${1 - p} + ${offset}vh * ${p} + 1vh)`
  })

  const utensilsOpacity = useTransform(morphProgress, [0.2, 0.8], [0, 1])
  const nameOpacity = useTransform(morphProgress, [0.85, 1], [0, 1])
  const nameRevealY = useTransform(morphProgress, [0.85, 1], [20, 0])
  const isTransforming = useTransform(
    morphProgress,
    [0, 0.85, 1],
    [0, 1, 0]
  )
  // Scene 1 stays fixed, then fully exits
  const groupY = useTransform(
    smooth,
    [0, 0.4, 0.5],
    ["0vh", "0vh", "-100vh"]
  )

  // Scene 2 appears AFTER scene 1 is gone
  const s2Opacity = useTransform(
    smooth,
    [0.5, 0.6],
    [0, 1]
  )

  const s2Y = useTransform(
    smooth,
    [0.5, 0.6],
    [60, 0]
  )
  return (
    <section id="hero-section" ref={ref} className="hero-section">
      <div className="hero-sticky-container">
        {/* SCENE 2: Tagline Slide */}
        <motion.div style={{ opacity: s2Opacity }} className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-[#0d0d0d]/65 z-20" />
          <img src={img1} className="w-full h-full object-cover" alt="" />

          <motion.div
            style={{ y: s2Y }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center gap-10 px-6"
          >
            <p className="hero-tagline">A Culinary Journey</p>
            <h2 className="hero-title">
              <span className="hero-title-main">Every Bite</span>
              <span className="hero-title-main">Tells&nbsp;
                <span className="hero-title-italic">a Story</span>
              </span>
            </h2>
            <p className="hero-description">
              Where every ingredient is a chapter, every plate a masterpiece.
            </p>

            <div className="hero-btn-group">
              <button onClick={() => navigate("/menu")} className="btn-primary">
                Explore Menu
              </button>
              <button onClick={() => navigate("/reservation")} className="btn-secondary">
                Order Now
              </button>
              <button onClick={() => navigate("/menu")} className="btn-primary">
                Take away
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* SCENE 1: Morphing Plate Group */}
        <motion.div style={{ y: groupY }} className="absolute inset-0 z-40 flex items-center justify-center">
          <motion.div
            style={{
              clipPath,
              backgroundColor: isTransforming.get() > 0 ? "#0f2f2f" : "#F3F3F1",
            }}
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            <motion.div style={{ scale: imgScale }} className="absolute inset-0">
              <img
                src={videoSrc}
                className="w-full h-full object-cover"
                style={{
                  opacity: 0.85,
                  filter: "contrast(1.1) brightness(1.1) saturate(1.1)"
                }}
                alt="Chef cooking with fire"
              />
            </motion.div>
          </motion.div>

          {/* FORK */}
          <motion.div
            style={{ x: forkX, opacity: utensilsOpacity }}
            className="absolute top-1/2 left-1/2 -translate-y-1/2 z-20"
          >
            <svg className="w-[6vh] h-[30vh]" viewBox="0 0 100 400" stroke="#0F5C5C" fill="none">
              <path d="M20 20 L20 150 M40 20 L40 150 M60 20 L60 150 M80 20 L80 150" strokeWidth="6" />
              <path d="M20 150 C20 200 80 200 80 150" strokeWidth="6" />
              <path d="M50 185 L50 380" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* SPOON */}
          <motion.div
            style={{ x: spoonX, opacity: utensilsOpacity }}
            className="absolute top-1/2 left-1/2 -translate-y-1/2 z-20"
          >
            <svg className="w-[6vh] h-[30vh]" viewBox="0 0 100 400" stroke="#0F5C5C" fill="none">
              <ellipse cx="50" cy="80" rx="35" ry="60" strokeWidth="6" />
              <path d="M50 140 L50 380" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* RESTAURANT NAME */}
          <motion.div
            style={{ opacity: nameOpacity, y: nameRevealY }}
            className="absolute top-[50%] translate-y-[28vh] flex flex-col items-center z-30"
          >
            <h1 className="font-serif leading-[0.9] text-[#0F5C5C] select-none text-center mb-5">
              <span className="block text-[clamp(3rem,8vw,6rem)]">Restro</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.6em] text-[#7A688A] font-medium">
              Est. 2012 &nbsp;·&nbsp; Fine Dining
            </p>
            <div className="mt-6 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#E0A94B] to-transparent" />
          </motion.div>
        </motion.div>
      </div>
      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </section>
  )
}

export default HeroSection