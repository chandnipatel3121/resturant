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
import videoSrc from "../assets/herovideo1.mp4"
import mobileVideoSrc from "../assets/mobilehero.mp4"
import img1 from "../assets/resturent3.jpg"
import "../styles/sections/HeroSection.css"

const HeroSection = () => {
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const ref = useRef(null)
  const prevV = useRef(0)
  const hasShownPopup = useRef(false)
  const randomPopupTrigger = useRef(Math.random() * 0.4 + 0.3) // Random between 0.3 and 0.7
  const { setPastHero, navTheme, setNavTheme } = useNav()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  const smooth = useSpring(scrollYProgress, {
    stiffness: isMobile ? 100 : 80,
    damping: isMobile ? 35 : 30,
    mass: isMobile ? 0.15 : 0.2
  })

  const morphProgress = useTransform(
    smooth,
    isMobile ? [0, 0.18] : [0, 0.2],
    [0, 1]
  )

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const direction = v > prevV.current ? 'down' : 'up'
    prevV.current = v

    // morphProgress.set(v > 0.01 ? 1 : 0) // Removed binary switch
    setPastHero(v >= 0.92)

    // Navbar Color Control aligned with background changes
    if (v < 0.15) {
      setNavTheme('yellow') // Gold on dark video background (Start)
    } else if (v < 0.5) {
      setNavTheme('green') // Dark teal on light background (Scene 1 morph)
    } else if (v < 0.92) {
      setNavTheme('purple') // Light purple on dark background (Scene 2)
    } else {
      setNavTheme('green') // Dark teal on next section
    }

    // Forced scroll to next section
    const threshold = isMobile ? 0.9 : 0.92
    if (v > threshold && direction === 'down' && window.lenis) {
      window.lenis.scrollTo("#dish-showcase", {
        offset: isMobile ? -100 : -120,
        duration: isMobile ? 1.2 : 1.5,
        easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      })
    }

    // Show popup exactly when Scene 1 is going up and Scene 2 is coming in (at 0.5 progress)
    if (v >= 0.5 && !hasShownPopup.current) {
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
  const nameOpacity = useTransform(morphProgress, [0.3, 0.8], [0, 1])
  const nameRevealY = useTransform(morphProgress, [0.85, 1], [20, 0])
  const isTransforming = useTransform(
    morphProgress,
    [0, 0.85, 1],
    [0, 1, 0]
  )
  // Scene 1 stays fixed, then fully exits
  const groupY = useTransform(
    smooth,
    isMobile
      ? [0, 0.42, 0.58] // Snappier swap for mobile
      : [0, 0.45, 0.65],
    ["0vh", "0vh", "-100vh"]
  )

  // Scene 2 appears as Scene 1 is leaving (direct transition)
  const s2Opacity = useTransform(
    smooth,
    isMobile
      ? [0.42, 0.58]
      : [0.45, 0.65],
    [0, 1]
  )

  const s2Y = useTransform(
    smooth,
    isMobile ? [0.42, 0.58] : [0.45, 0.65],
    [60, 0]
  )
  return (
    <section id="hero-section" ref={ref} className="hero-section">
      {/* Subtle top overlay for navbar readability during video */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent z-[999] pointer-events-none" />

      <div className="hero-sticky-container">
        {/* SCENE 2: Tagline Slide */}
        <motion.div style={{ opacity: s2Opacity }} className="absolute inset-0 z-10">
          <img src={img1} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-black/70 z-20" />

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
              <video
                key={isMobile ? "mobile" : "desktop"}
                src={isMobile ? mobileVideoSrc : videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{
                  opacity: 0.85,
                  filter: "contrast(1.1) brightness(1.1) saturate(1.1)"
                }}
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
            style={{
              opacity: nameOpacity,
              y: nameRevealY,
              translateY: isMobile ? "18vh" : "28vh"
            }}
            className="absolute top-[50%] flex flex-col items-center z-30"
          >
            <h1 className={`font-serif leading-[0.9] select-none text-center mb-5 transition-colors duration-500 ${navTheme === 'yellow' ? 'text-[#E0A94B]' : 'text-[#0F5C5C]'}`}>
              <span className="block text-[clamp(2.5rem,8vw,5rem)]">Restro</span>
            </h1>
            <p className={`text-[9px] uppercase tracking-[0.5em] font-medium ${navTheme === 'yellow' ? 'text-white/60' : 'text-[#7A688A]'}`}>
              Est. 2012 &nbsp;·&nbsp; Fine Dining
            </p>
            <div className="mt-4 w-16 h-[1px] bg-gradient-to-r from-transparent via-[#E0A94B] to-transparent" />
          </motion.div>
        </motion.div>
      </div>
      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </section>
  )
}

export default HeroSection