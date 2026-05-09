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
import img1 from "../assets/resturent4.jpg"
import "../styles/sections/HeroSection.css"

const HeroSection = () => {
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const ref = useRef(null)
  const prevV = useRef(0)
  const hasShownPopup = useRef(false)
  const { setPastHero, setNavTheme } = useNav()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start start", "end end"] 
  })

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1
  })

  // Basic Morph Progress - using raw scroll for responsiveness
  const morphProgress = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.2] : [0, 0.25],
    [0, 1]
  )

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const direction = v > prevV.current ? 'down' : 'up'
    prevV.current = v

    setPastHero(v >= 0.9)

    // Navbar Color Control
    if (v < 0.15) {
      setNavTheme('yellow')
    } else if (v < 0.5) {
      setNavTheme('green')
    } else if (v < 0.9) {
      setNavTheme('purple')
    } else {
      setNavTheme('green')
    }

    // Forced scroll to next section
    if (v > 0.95 && direction === 'down' && window.lenis) {
      window.lenis.scrollTo("#dish-showcase", {
        offset: 0,
        duration: 1.5,
        easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      })
    }

    // Popup Logic - triggered by raw scroll
    if (v >= 0.5 && !hasShownPopup.current) {
      setShowPopup(true)
      hasShownPopup.current = true
    }
  })

  // Transitions for Scene 1 and 2
  const groupY = useTransform(smooth, [0.45, 0.7], ["0vh", "-100vh"])
  const s2Opacity = useTransform(smooth, [0.45, 0.65], [0, 1])
  const s2Y = useTransform(smooth, [0.45, 0.65], [40, 0])

  const clipPath = useTransform(morphProgress, (v) => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const isMobileLocal = vw < 768
    const startRadius = Math.sqrt(vw * vw + vh * vh) * (isMobileLocal ? 0.9 : 0.7)
    const finalRadius = isMobileLocal ? vh * 0.2 : vh * 0.22
    const r = startRadius * (1 - v) + finalRadius * v
    return `circle(${Math.round(r)}px at 50% 50%)`
  })

  const imgScale = useTransform(morphProgress, [0, 1], [1.1, 1])
  const morphBg = useTransform(morphProgress, [0, 0.2], ["#F3F3F1", "#0f2f2f"])

  return (
    <section id="hero-section" ref={ref} className="hero-section">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent z-[999] pointer-events-none" />

      <motion.div className="hero-sticky-container">
        {/* SCENE 2: Tagline Slide */}
        <motion.div style={{ opacity: s2Opacity }} className="absolute inset-0 z-10">
          <img src={img1} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-black/80 z-20" />

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
              <button onClick={() => navigate("/menu")} className="btn-primary">Explore Menu</button>
              <button onClick={() => navigate("/reservation")} className="btn-secondary">Order Now</button>
            </div>
          </motion.div>
        </motion.div>

        {/* SCENE 1: Morphing Plate Group */}
        <motion.div style={{ y: groupY }} className="absolute inset-0 z-40 flex items-center justify-center">
          <motion.div
            style={{
              clipPath,
              backgroundColor: morphBg,
            }}
            className="absolute inset-0 flex items-center justify-center overflow-hidden video-container"
          >
            <motion.div style={{ scale: imgScale }} className="absolute inset-0">
              <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover video-desktop"
              />
              <video
                src={mobileVideoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover video-mobile"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </section>
  )
}

export default HeroSection