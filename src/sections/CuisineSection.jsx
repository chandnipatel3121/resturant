import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
import anandoLogo from "../assets/anandofood.jpg"
import gujImg from "../assets/thali.jpg"
import punImg from "../assets/punjabi.jpg"
import southImg from "../assets/southindian.jpg"
import chinImg from "../assets/chinese.jpg"
import italImg from "../assets/italic.jpg"

import gujBg from "../assets/gujcuisine.png"
import punBg from "../assets/puncuisine.png"
import southBg from "../assets/southcuisine.png"
import chinBg from "../assets/chiniescuisine.png"
import italBg from "../assets/italiancuisine.png"

import "../styles/sections/CuisineSection.css"

const InternalCuisineCard = ({ cuisine, onClose, isMobile }) => {
  if (!cuisine) return null

  return (
    <motion.div
      className="cuisine-card-wrapper"
      initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 50 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 50 : 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="cuisine-glass-card" style={{
        '--theme-color': cuisine.border,
        '--card-bg': cuisine.cardBg,
        '--card-text': cuisine.textColor
      }}>
        {/* Optical Effects Layers */}
        <div className="glass-reflection-top" />
        <div className="glass-inner-glow" />
        <div className="glass-card-border-glow" />

        {isMobile && <button className="mobile-close-btn" onClick={onClose}>✕</button>}

        <div className="glass-card-content">
          <header className="glass-card-header">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-subheader"
            >
              <span className="luxury-divider-accent" />
              {cuisine.tagline}
              <span className="luxury-divider-accent" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card-title"
            >
              {cuisine.name}
            </motion.h2>

            <div className="luxury-ornament">
              <span className="ornament-line" />
              <span className="ornament-star">✦</span>
              <span className="ornament-line" />
            </div>
          </header>

          <div className="glass-card-body">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-card-desc-large"
            >
              {cuisine.description}
            </motion.p>
          </div>

          <div className="glass-card-footer-branding">
            <div className="pagination-minimal">
              <div className="pagination-line active" />
              <div className="pagination-line" />
              <div className="pagination-line" />
            </div>
          </div>
        </div>

        <div className="glass-wave-bottom">
          <div className="wave-branding-futuristic">
            <div className="brand-logo-symbol">
              <svg viewBox="0 0 100 100">
                <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
            <div className="brand-text-stack">
              <span className="brand-name-main">ANANDO FOODS</span>
              <span className="brand-tag-sub">Fine Dining Excellence</span>
            </div>
          </div>
          {/* Subtle wave pattern */}
          <svg className="wave-pattern-svg" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M0,150 L0,100 C150,150 350,20 500,100 L500,150 Z" fill={cuisine.border} opacity="0.15" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

const CUISINES = [
  {
    name: "Gujarati",
    tagline: "Sweet, subtle & traditional",
    specialty: "Authentic spices sourced from Rajkot, prepared using age-old family recipes for a truly soulful experience.",
    description: "A harmonious blend of sweet and savory notes, featuring the iconic Dhokla, Thepla, and a variety of seasonal vegetable preparations served with love.",
    img: gujImg,
    bgImage: gujBg,
    bg: "#000000",
    cardBg: "#f5deb3",       /* Warm wheat tone */
    cardBgAlt: "#ffe8b8",   /* Lighter amber highlight */
    border: "#C07A1A",      /* Deep golden amber */
    glow: "rgba(192, 122, 26, 0.3)",
    textColor: "#5c3a00",   /* Dark warm brown */
    items: [
      { name: "Undhiyu", desc: "Slow-cooked seasonal veggies", price: "450" },
      { name: "Khandvi Rolls", desc: "Gram flour, tempered spices", price: "250" },
      { name: "Surati Ghari", desc: "Rich sweet with mawa & nuts", price: "320" },
      { name: "Dhokla Platter", desc: "Steamed fermented lentil cakes", price: "280" },
      { name: "Thepla with Chunda", desc: "Spiced flatbreads & mango jam", price: "180" },
      { name: "Lilva Kachori", desc: "Fresh pigeon pea fritters", price: "220" },
      { name: "Patra", desc: "Colocasia leaves with gram flour", price: "240" },
      { name: "Doodhpak", desc: "Creamy saffron rice pudding", price: "290" }
    ]
  },
  {
    name: "Punjabi",
    tagline: "Rich, bold & buttery flavors",
    specialty: "Tandoor-fired to perfection with a secret blend of 12 hand-ground spices and premium farmhouse butter.",
    description: "Indulge in the robust heartiness of North India. Creamy Dal Makhani, buttery Naans, and the legendary Tandoori specialties that define culinary excellence.",
    img: punImg,
    bgImage: punBg,
    bg: "#000000",
    cardBg: "#ffcf9e",       /* Warm saffron-orange */
    cardBgAlt: "#ffe4c4",   /* Lighter bisque */
    border: "#A84200",      /* Deep tandoor rust */
    glow: "rgba(168, 66, 0, 0.3)",
    textColor: "#4a1800",   /* Deep mahogany */
    items: [
      { name: "Dal Makhani", desc: "24-hour slow-cooked black lentils", price: "380" },
      { name: "Butter Chicken", desc: "Tandoori chicken in tomato gravy", price: "550" },
      { name: "Amritsari Kulcha", desc: "Stuffed bread from the tandoor", price: "180" },
      { name: "Paneer Tikka", desc: "Clay oven charred cottage cheese", price: "420" },
      { name: "Sarson ka Saag", desc: "Mustard greens with corn bread", price: "350" },
      { name: "Mutton Rogan Josh", desc: "Slow-braised Kashmiri lamb", price: "650" },
      { name: "Tandoori Chicken", desc: "Classic bone-in roasted chicken", price: "480" },
      { name: "Gajar Halwa", desc: "Warm carrot pudding with nuts", price: "250" }
    ]
  },
  {
    name: "South Indian",
    tagline: "Light, fermented & aromatic",
    specialty: "Stone-ground fermented batter and cold-pressed coconut oil are the heart of our coastal preparations.",
    description: "A celebration of coastal flavors. Crispy Dosas, fluffy Idlis, and tangy Sambars prepared with fresh coconut, curry leaves, and secret spice blends.",
    img: southImg,
    bgImage: southBg,
    bg: "#000000",
    cardBg: "#b7e4c7",       /* Vibrant coconut green */
    cardBgAlt: "#d8f3dc",   /* Light minty highlight */
    border: "#22ea75e3",      /* Deep forest green */
    glow: "rgba(83, 224, 137, 0.75)",
    textColor: "#53e695ff",   /* Dark jungle green */
    items: [
      { name: "Masala Dosa", desc: "Crispy rice crepe with potato", price: "220" },
      { name: "Appam with Stew", desc: "Fermented lacey pancakes", price: "350" },
      { name: "Mysore Pak", desc: "Ghee-rich gram flour sweet", price: "150" },
      { name: "Medhu Vada", desc: "Savory lentil donuts", price: "180" },
      { name: "Chicken Chettinad", desc: "Spicy peppercorn based gravy", price: "520" },
      { name: "Lemon Rice", desc: "Zesty tempered basmati rice", price: "240" },
      { name: "Filter Coffee", desc: "Traditional brass tumbler brew", price: "90" },
      { name: "Payasam", desc: "Coconut milk & jaggery pudding", price: "180" }
    ]
  },
  {
    name: "Chinese",
    tagline: "Spicy, tangy & sizzling",
    specialty: "High-heat wok artistry combined with artisanal soy sauces and freshly picked Szechuan peppers.",
    description: "A fusion of fire and flavor. Wok-tossed delicacies featuring perfectly balanced sauces, crunchy vegetables, and the irresistible kick of Szechuan peppers.",
    img: chinImg,
    bgImage: chinBg,
    bg: "#000000",
    cardBg: "#ffb3b3",       /* Vivid chili red */
    cardBgAlt: "#ffd6d6",   /* Light rose highlight */
    border: "#ff6767ff",      /* Deep crimson */
    glow: "rgba(255, 119, 119, 0.81)",
    textColor: "#fa8282ff",   /* Dark blood red */
    items: [
      { name: "Dim Sum Basket", desc: "Hand-rolled steamed parcels", price: "420" },
      { name: "Kung Pao Paneer", desc: "Spicy stir-fry with peanuts", price: "450" },
      { name: "Hakka Noodles", desc: "Wok-tossed with garden veggies", price: "320" },
      { name: "Manchow Soup", desc: "Spicy garlic broth with noodles", price: "180" },
      { name: "Chilly Chicken", desc: "Crispy chicken in soy-chilly", price: "480" },
      { name: "Schezwan Fried Rice", desc: "Fiery wok-tossed rice", price: "350" },
      { name: "Spring Rolls", desc: "Crispy vegetable filled rolls", price: "280" },
      { name: "Honey Noodles", desc: "Crispy noodles with ice cream", price: "250" }
    ]
  },
  {
    name: "Italian",
    tagline: "Classic, cheesy & elegant",
    specialty: "House-made pasta flour imported from Italy and sun-ripened tomatoes for an authentic Mediterranean soul.",
    description: "The soul of the Mediterranean. Hand-rolled pastas, artisanal pizzas, and rich risottos crafted with the finest herbs, cheeses, and sun-ripened tomatoes.",
    img: italImg,
    bgImage: italBg,
    bg: "#000000",
    cardBg: "#6b8dffff",       /* Rich lavender violet */
    cardBgAlt: "#a6b4f0ff",   /* Soft periwinkle highlight */
    border: "#a4baffff",      /* Deep royal purple */
    glow: "rgba(85, 98, 240, 0.82)",
    textColor: "#446ee2ff",   /* Dark indigo */
    items: [
      { name: "Truffle Tortellini", desc: "Handmade pasta, sage butter", price: "580" },
      { name: "Burrata Salad", desc: "Fresh burrata, heirloom tomatoes", price: "480" },
      { name: "Classic Tiramisu", desc: "Coffee-soaked ladyfingers", price: "350" },
      { name: "Margherita Pizza", desc: "Wood-fired buffalo mozzarella", price: "550" },
      { name: "Pesto Genovese", desc: "Basil & pine nut linguine", price: "450" },
      { name: "Osso Buco", desc: "Slow-braised veal shanks", price: "850" },
      { name: "Panna Cotta", desc: "Silky vanilla cream with berries", price: "320" },
      { name: "Bruschetta Trio", desc: "Toasted bread with fresh toppings", price: "280" }
    ]
  }
]

const CuisineSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = React.useRef(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1199)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Smooth out the scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  useEffect(() => {
    CUISINES.forEach(c => {
      const img = new Image()
      img.src = c.bgImage
    })
  }, [])

  // 🎭 Dynamic 3D Transforms based on scroll
  const tableRotateX = useTransform(smoothProgress, [0, 0.5, 1], [18, 10, 0])
  const tableScale = useTransform(smoothProgress, [0, 0.3, 0.5, 1], [0.8, 0.9, 1, 0.9])
  const tableY = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [0, -15, -30] : [50, -50, -150])
  const tableOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const prevProgress = React.useRef(0)

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const direction = v > prevProgress.current ? "down" : "up"
    prevProgress.current = v

    // Force scroll to full section when entering from top
    if (v > 0.02 && v < 0.15 && direction === "down" && window.lenis) {
      window.lenis.scrollTo("#cuisine-section", {
        duration: 1.5,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      })
    }
  })
  const hoverTimeout = React.useRef(null)

  const handleEnter = (i) => {
    clearTimeout(hoverTimeout.current)
    setHoveredIndex(i)
  }

  const handleLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHoveredIndex(null)
    }, 80)
  }
  const handleDishClick = (e, i) => {
    e.stopPropagation()
    if (activeIndex === i) {
      setActiveIndex(null)
      setIsPaused(false)
    } else {
      setActiveIndex(i)
      setIsPaused(true)
      // Auto-resume after 8 seconds of inactivity
      setTimeout(() => setIsPaused(false), 8000)
    }
  }

  const activeCuisine = activeIndex !== null ? CUISINES[activeIndex] : null
  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex
  const displayCuisine = displayIndex !== null ? CUISINES[displayIndex] : null
  const isCurrentlyPaused = hoveredIndex !== null || isPaused

  const FEATURED_ITEMS = [
    { name: "Undhiyu", desc: "Seasonal Gujarati special", price: "450" },
    { name: "Dal Makhani", desc: "Classic Punjabi lentils", price: "380" },
    { name: "Masala Dosa", desc: "South Indian rice crepe", price: "220" },
    { name: "Dim Sum", desc: "Chinese steamed parcels", price: "420" },
    { name: "Truffle Pasta", desc: "Italian handmade luxury", price: "580" },
    { name: "Surati Ghari", desc: "Sweet Gujarati delicacy", price: "320" },
    { name: "Butter Chicken", desc: "Iconic North Indian gravy", price: "550" },
    { name: "Mutton Rogan Josh", desc: "Kashmiri lamb specialty", price: "650" }
  ]

  return (
    <section
      id="cuisine-section"
      className={`cuisine-section ${displayIndex !== null ? 'is-hovered' : ''}`}
      style={{
        backgroundColor: activeCuisine ? activeCuisine.bg : "var(--bg)",
      }}
      onClick={() => {
        setActiveIndex(null)
        setIsPaused(false)
      }}
    >
      <div className="cuisine-bg-image-wrapper">
        <motion.div
          className="cuisine-bg-image-layer"
          initial={{ opacity: 0 }}
          animate={{
            opacity: displayIndex !== null ? 0.4 : 0
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
          style={{
            backgroundImage: displayCuisine
              ? `url(${displayCuisine.bgImage})`
              : "none",
            willChange: "opacity, transform",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)"
          }}
        />
      </div>
      <div className="cuisine-noise-overlay" />

      <motion.div
        className="cuisine-ambient-glow"
        animate={{
          background: activeCuisine
            ? `radial-gradient(circle at 50% 50%, ${activeCuisine.glow}, transparent 70%)`
            : 'radial-gradient(circle at 50% 50%, transparent, transparent)'
        }}
        transition={{ duration: 1 }}
      />

      <div className="cuisine-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cuisine-main-title"
        >
          Signature <span className="cuisine-title-italic" style={{ color: activeCuisine ? activeCuisine.border : 'inherit' }}>Experiences</span>
        </motion.h2>
      </div>
      <div className="cuisine-footer-info">
        <p className="cuisine-footer-text"> a cuisine to explore our authentic flavors</p>
      </div>

      <div className="cuisine-table-perspective" ref={containerRef}>
        <motion.div
          className="cuisine-table-topview"
          style={{
            rotateX: tableRotateX,
            scale: tableScale,
            y: tableY,
            opacity: tableOpacity
          }}
        >
          <div className="cuisine-table-surface-round">
            <div className="cuisine-table-texture-light" />

            {/* 🦵 Table Leg - Visible in 3D incline */}
            <div className="cuisine-table-leg" />

            <div className="table-center-logo-top">
              <img src={anandoLogo} alt="Anando Foods" className="table-center-img" />
            </div>

            <motion.div
              className={`cuisine-dishes-round-grid ${isCurrentlyPaused ? 'is-paused' : ''}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {CUISINES.map((cuisine, i) => (
                <div key={i} className={`cuisine-dish-wrapper-round dish-round-${i}`}>
                  <motion.div
                    className="cuisine-dish-motion-wrapper"
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={handleLeave}
                    onClick={(e) => handleDishClick(e, i)}
                    animate={{
                      y: activeIndex === i ? -25 : 0,
                    }}
                    transition={{
                      y: { duration: 0.5 },
                    }}
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: i === 0 || i === 4 ? -400 : (i === 1 || i === 2 ? 400 : 0),
                        y: i === 0 || i === 1 ? -400 : (i === 3 ? 400 : 200),
                        scale: 0.5,
                        rotate: -120
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 50,
                          damping: 20,
                          delay: 0.2 + (i * 0.12)
                        }
                      }
                    }}
                    whileHover={{
                      scale: 1.05,
                      zIndex: 100
                    }}
                  >
                    <div className={`cuisine-dish-plate-premium ${activeIndex === i ? 'active-plate' : ''}`}>
                      <div className="plate-rim-gold">
                        <div className="plate-inner-content">
                          <img src={cuisine.img} alt={cuisine.name} className="dish-img-topview" />
                        </div>
                      </div>
                    </div>
                    <div className="dish-shadow-top" />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 🌑 Deep Ground Shadow */}
          <div className="cuisine-table-shadow-floor" />
        </motion.div>

        {/* 📋 Left Side - Synchronized Cuisine Menu */}
        <div className="cuisine-menu-container" onClick={(e) => e.stopPropagation()}>
          <div className="cuisine-floating-narrative">
            <div className="narrative-items">
              {CUISINES.map((cuisine, idx) => (
                <motion.div
                  key={idx}
                  className={`narrative-item ${displayIndex === idx ? 'is-active' : ''}`}
                  onMouseEnter={() => handleEnter(idx)}
                  onMouseLeave={handleLeave}
                  onClick={(e) => handleDishClick(e, idx)}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.8,
                        ease: "easeOut",
                        delay: idx * 0.1
                      }
                    }
                  }}
                  animate={displayIndex === idx ? { x: 10 } : { x: 0 }}
                >
                  <div className="narrative-item-index">
                    <span className="index-num">0{idx + 1}</span>
                    <span className="index-line" style={{
                      backgroundColor: displayIndex === idx ? cuisine.border : 'var(--accent)',
                    }} />
                  </div>
                  <div className="narrative-item-content">
                    <h4 className="narrative-item-name" style={{
                      color: displayIndex === idx ? cuisine.border : 'inherit',
                      letterSpacing: displayIndex === idx ? '0.15em' : '0.05em'
                    }}>
                      {cuisine.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>

            <svg className="narrative-decor-svg" viewBox="0 0 200 200">
              <motion.path
                d="M 20,100 Q 50,20 100,100 T 180,100"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>
          </div>
        </div>

        {/* 📋 Right Side - Cuisine Details */}
        {isMobile ? (
          displayIndex !== null && displayCuisine && createPortal(
            <div className="cuisine-info-container-mobile-modal" onClick={() => { setActiveIndex(null); setIsPaused(false); }}>
              <AnimatePresence>
                <InternalCuisineCard
                  cuisine={CUISINES[displayIndex]}
                  isMobile={true}
                  onClose={() => { setActiveIndex(null); setIsPaused(false); }}
                />
              </AnimatePresence>
            </div>,
            document.body
          )
        ) : (
          <div className="cuisine-info-container" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              {displayIndex !== null && displayCuisine && (
                <InternalCuisineCard
                  key={displayIndex}
                  cuisine={CUISINES[displayIndex]}
                  isMobile={false}
                />
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}

export default CuisineSection
