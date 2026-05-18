import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import "../styles/pages/Gallery.css"

// Import assets for categories
import dining from "../assets/dining.jpg"
import chef1 from "../assets/chef1.jpg"
import dish1 from "../assets/dish1.jpg"
import restro3 from "../assets/resturent3.jpg"
import restro2 from "../assets/resturent2.jpg"

const categories = [
  {
    id: "01",
    title: "Ambience",
    desc: "Step behind the curtain and explore the grand architecture and vibrant atmosphere of our main dining halls and intimate spaces.",
    img: dining,
    link: "#ambience"
  },
  {
    id: "02",
    title: "Craft",
    desc: "Witness the precision and passion of our master chefs as they orchestrate culinary perfection in the heart of the kitchen.",
    img: chef1,
    link: "#craft"
  },
  {
    id: "03",
    title: "Signatures",
    desc: "A visual tasting menu. Explore our most iconic and meticulously plated signature dishes that define the Anando experience.",
    img: dish1,
    link: "#signatures"
  }
]

// Framer Motion Variants for the sleek mask wipe effect
const slideVariants = {
  enter: (direction) => {
    return {
      clipPath: direction > 0 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
      scale: 1.1,
    }
  },
  center: {
    clipPath: "inset(0% 0 0 0)",
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1], // Premium easing
    }
  },
  exit: (direction) => {
    return {
      clipPath: direction < 0 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
      scale: 0.95,
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
      }
    }
  }
}

const contentVariants = {
  enter: { y: 50, opacity: 0 },
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.4, ease: "easeOut" }
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: { duration: 0.4 }
  }
}

const Gallery = () => {
  const [[page, direction], setPage] = useState([0, 0])
  const [hPage, setHPage] = useState(0)
  const [inHorizontal, setInHorizontal] = useState(false)
  const isAnimating = useRef(false)
  const touchStartY = useRef(0)

  const moreMoments = [
    { id: 1, text1: "BEHIND", text2: "THE CURTAIN", img: restro2, bg: "#170a24", color1: "#a855f7", color2: "#fde047" },
    { id: 2, text1: "PRIVATE", text2: "DINING", img: restro3, bg: "#0a171d", color1: "#38bdf8", color2: "#fde047" },
    { id: 3, text1: "THE", text2: "BAR", img: dining, bg: "#231118", color1: "#fb7185", color2: "#fde047" },
    { id: 4, text1: "MASTER", text2: "CHEF", img: chef1, bg: "#101912", color1: "#4ade80", color2: "#fde047" }
  ]

  // Clamp the page index
  const activeIndex = Math.max(0, Math.min(page, categories.length - 1))

  const paginateVertical = (newDirection) => {
    const newPage = page + newDirection
    if (newPage >= 0 && newPage < categories.length) {
      setPage([newPage, newDirection])
    } else if (newPage >= categories.length) {
      setInHorizontal(true)
      setHPage(0)
    }
  }

  const paginateHorizontal = (newDirection) => {
    const newHPage = hPage + newDirection
    if (newHPage >= 0 && newHPage < moreMoments.length) {
      setHPage(newHPage)
    } else if (newHPage < 0) {
      setInHorizontal(false)
      setPage([categories.length - 1, -1])
    }
  }

  const handleScrollAction = (direction) => {
    if (isAnimating.current) return
    isAnimating.current = true
    
    if (inHorizontal) {
      paginateHorizontal(direction)
    } else {
      paginateVertical(direction)
    }
    
    setTimeout(() => {
      isAnimating.current = false
    }, 1200)
  }

  // Wheel event for desktop scrolling
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0) handleScrollAction(1)
        else handleScrollAction(-1)
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [page, hPage, inHorizontal])

  // Touch events for mobile swiping
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }
    const handleTouchMove = (e) => {
      e.preventDefault() // prevent all native scrolling
    }
    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY
      const distance = touchStartY.current - touchEndY
      if (Math.abs(distance) > 50) {
        if (distance > 0) handleScrollAction(1)
        else handleScrollAction(-1)
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd, { passive: false })
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [page, hPage, inHorizontal])



  return (
    <div className="gallery-page">
      {/* Global UI (Stays fixed) */}
      <div className={`gallery-global-ui ${inHorizontal ? "hidden-ui" : ""}`}>
        <div className="gallery-top-bar">
          <span>THE ANANDO ARCHIVE</span>
          <span>SCROLL TO EXPLORE</span>
        </div>
        <div className="gallery-bottom-bar">
          GALLERY / 2026
        </div>
      </div>

      {/* Pagination Tracker */}
      <div className={`gallery-pagination ${inHorizontal ? "hidden-ui" : ""}`}>
        {categories.map((cat, index) => (
          <div
            key={cat.id}
            className={`pagination-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => {
              if (index !== activeIndex && !isAnimating.current) {
                const dir = index > activeIndex ? 1 : -1
                isAnimating.current = true
                setPage([index, dir])
                setTimeout(() => { isAnimating.current = false }, 1200)
              }
            }}
          >
            {cat.id}
          </div>
        ))}
      </div>

      <motion.div 
        className="gallery-main-wrapper"
        animate={{ y: inHorizontal ? "-100vh" : "0vh" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="gallery-hero-section">
          {/* Fullscreen Slider */}
          <div className="gallery-slider-container">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="gallery-slide active"
              >
                {/* Background Image Mask */}
                <div className="slide-image-wrapper">
                  <motion.img
                    src={categories[activeIndex].img}
                    alt={categories[activeIndex].title}
                    className="slide-img"
                  />
                </div>

                {/* Content Overlay */}
                <div className="slide-content">
                  <motion.div variants={contentVariants} initial="enter" animate="center" exit="exit">
                    <div className="slide-number">{categories[activeIndex].id}</div>
                    <h1 className="slide-title">{categories[activeIndex].title}</h1>
                    <p className="slide-desc">{categories[activeIndex].desc}</p>

                    <a href={categories[activeIndex].link} className="view-gallery-btn" onClick={(e) => e.preventDefault()}>
                      VIEW GALLERY
                      <ArrowRight size={16} />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Horizontal Scroll Section (Awwwards Style) */}
        <div className="gallery-horizontal-section">
          <motion.div 
            className="horizontal-track"
            animate={{ x: `-${hPage * 100}vw` }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            style={{ display: "flex", width: `${moreMoments.length * 100}vw`, height: "100vh" }}
          >
            {moreMoments.map((item, index) => {
              const isActive = (hPage === index && inHorizontal);
              return (
                <div key={item.id} className="h-slide" style={{ width: "100vw", height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: item.bg, transition: "background-color 1.2s ease" }}>
                  
                  {/* Content Container (3 Columns) */}
                  <div style={{ display: "flex", width: "100%", padding: "0 4vw", alignItems: "center", justifyContent: "space-between", gap: "3vw", zIndex: 1 }}>
                    
                    {/* Left Text */}
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                      <motion.h2 
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: isActive ? 0 : -50, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                        style={{ fontSize: "clamp(2rem, 6vw, 8.5rem)", fontFamily: "var(--font-serif)", margin: 0, lineHeight: 0.9, color: item.color1, textTransform: "uppercase", textAlign: "right", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}
                      >
                        {item.text1.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}
                      </motion.h2>
                    </div>

                    {/* Center Image */}
                    <motion.div 
                      className="h-slide-img-wrapper"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: isActive ? 1 : 0.6, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                      style={{ flexShrink: 0, width: "32vw", height: "55vh", zIndex: 10, overflow: "hidden", borderRadius: "4px", boxShadow: "0 20px 50px rgba(0,0,0,0.8)" }}
                    >
                      <motion.img 
                        src={item.img} 
                        alt={`${item.text1} ${item.text2}`} 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        initial={{ scale: 1.5 }}
                        animate={{ scale: isActive ? 1 : 1.5 }}
                        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                      />
                    </motion.div>

                    {/* Right Text */}
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
                      <motion.h2 
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: isActive ? 0 : 50, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                        style={{ fontSize: "clamp(2rem, 6vw, 8.5rem)", fontFamily: "var(--font-serif)", margin: 0, lineHeight: 0.9, color: item.color2, textTransform: "uppercase", textAlign: "left", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}
                      >
                        {item.text2.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}
                      </motion.h2>
                    </div>

                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Gallery
