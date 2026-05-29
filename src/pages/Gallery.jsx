import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X, Grid } from "lucide-react"
import "../styles/pages/Gallery.css"
import { useNav } from "../utils/NavContext"

// Import assets for categories
import dining from "../assets/dining.jpg"
import chef1 from "../assets/chef1.jpg"
import dish1 from "../assets/dish1.jpg"
import restro3 from "../assets/resturent3.jpg"
import restro2 from "../assets/resturent2.jpg"

import ambienceImg from "../assets/gallery/ambience.png"
import privateImg from "../assets/gallery/private.png"
import barImg from "../assets/gallery/bar.png"
import chefImg from "../assets/gallery/chef.png"
import kitchenImg from "../assets/gallery/kitchen.png"
import signatureImg from "../assets/gallery/signature.png"

const categories = [
  {
    id: "01",
    title: "Ambience",
    desc: "Step behind the curtain and explore the grand architecture and vibrant atmosphere of our main dining halls and intimate spaces.",
    img: ambienceImg,
    link: "#ambience",
    subImages: [
      ambienceImg,
      privateImg,
      barImg,
      restro2
    ]
  },
  {
    id: "02",
    title: "Craft",
    desc: "Witness the precision and passion of our master chefs as they orchestrate culinary perfection in the heart of the kitchen.",
    img: chefImg,
    link: "#craft",
    subImages: [
      chefImg,
      kitchenImg,
      chef1,
      dish1
    ]
  },
  {
    id: "03",
    title: "Signatures",
    desc: "A visual tasting menu. Explore our most iconic and meticulously plated signature dishes that define the Anando experience.",
    img: signatureImg,
    link: "#signatures",
    subImages: [
      signatureImg,
      dish1,
      chefImg,
      restro3
    ]
  }
]

const masonryImages = [
  ambienceImg,
  signatureImg,
  barImg,
  restro2,
  kitchenImg,
  dish1,
  privateImg,
  chef1,
  chefImg
];

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
  const [inMasonry, setInMasonry] = useState(false)
  const [activeSubGallery, setActiveSubGallery] = useState(null)
  const isAnimating = useRef(false)

  const { setNavTheme } = useNav()

  // Enforce green theme for the navbar on this specific page
  useEffect(() => {
    setNavTheme("green")
    return () => setNavTheme("light")
  }, [setNavTheme])
  const touchStartY = useRef(0)

  const moreMoments = [
    {
      id: 1,
      text1: "BEHIND",
      text2: "THE CURTAIN",
      img: restro2,
      bg: "#b4f5f5ff", // Brand light mint-grey background
      color1: "#0F5C5C", // Brand deep Forest Teal text
      color2: "#E0A94B", // Brand Kashmiri gold accent
      subImages: [
        restro2,
        privateImg,
        kitchenImg,
        chef1
      ]
    },
    {
      id: 2,
      text1: "PRIVATE",
      text2: "DINING",
      img: restro3,
      bg: "#b2ddc9ff", // Brand light mint variant
      color1: "#0F5C5C", // Brand deep Forest Teal text
      color2: "#E0A94B", // Brand Kashmiri gold accent
      subImages: [
        restro3,
        privateImg,
        ambienceImg,
        barImg
      ]
    },
    {
      id: 3,
      text1: "THE",
      text2: "BAR",
      img: dining,
      bg: "#ebdcc9", // Brand light sand/gold variant
      color1: "#0F5C5C", // Brand deep Forest Teal text
      color2: "#E0A94B", // Brand Kashmiri gold accent
      subImages: [
        dining,
        barImg,
        signatureImg,
        dish1
      ]
    },
    {
      id: 4,
      text1: "MASTER",
      text2: "CHEF",
      img: chef1,
      bg: "#edf7f7", // Brand light mint-grey background
      color1: "#0F5C5C", // Brand deep Forest Teal text
      color2: "#E0A94B", // Brand Kashmiri gold accent
      subImages: [
        chef1,
        chefImg,
        kitchenImg,
        signatureImg
      ]
    }
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
    } else if (newHPage >= moreMoments.length) {
      setInMasonry(true)
    }
  }

  const handleScrollAction = (direction) => {
    if (activeSubGallery) return // Disable scrolling when expanded!
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
      if (activeSubGallery) return // Skip native wheel intercept if sub-gallery is open

      if (inMasonry) {
        const isMobile = window.innerWidth < 1024
        const scrollContainer = isMobile ? document.querySelector('.app-scroll-container') : document.querySelector('.masonry-scroll-container')
        const scrollTop = scrollContainer ? scrollContainer.scrollTop : 0
        if (scrollContainer && scrollTop <= 1 && e.deltaY < 0) {
          e.preventDefault()
          if (!isAnimating.current) {
            isAnimating.current = true
            setInMasonry(false)
            setTimeout(() => { isAnimating.current = false }, 1200)
          }
        }
        return
      }

      e.preventDefault()
      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0) handleScrollAction(1)
        else handleScrollAction(-1)
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [page, hPage, inHorizontal, activeSubGallery, inMasonry])

  // Touch events for mobile swiping
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }
    const handleTouchMove = (e) => {
      if (activeSubGallery) return
      
      if (inMasonry) {
        const isMobile = window.innerWidth < 1024
        const scrollContainer = isMobile ? document.querySelector('.app-scroll-container') : document.querySelector('.masonry-scroll-container')
        if (scrollContainer) {
          const scrollTop = scrollContainer.scrollTop
          if (scrollTop <= 1) {
            const currentY = e.touches[0].clientY
            const distance = touchStartY.current - currentY
            if (distance < -30) {
              e.preventDefault() // Crucial: Stop browser pull-to-refresh
              if (!isAnimating.current) {
                isAnimating.current = true
                setInMasonry(false)
                setTimeout(() => { isAnimating.current = false }, 1200)
              }
            }
          } else {
            touchStartY.current = e.touches[0].clientY
          }
        }
        return
      }

      e.preventDefault() // prevent all native scrolling
    }
    const handleTouchEnd = (e) => {
      if (activeSubGallery || inMasonry) return
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
  }, [page, hPage, inHorizontal, activeSubGallery, inMasonry])



  return (
    <div className={`gallery-page ${inMasonry ? "gallery-masonry-active" : ""}`}>
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
        animate={{ y: inHorizontal ? "-100dvh" : "0dvh" }}
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

                    <a
                      href={categories[activeIndex].link}
                      className="view-gallery-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveSubGallery({
                          id: categories[activeIndex].id,
                          title: categories[activeIndex].title,
                          desc: categories[activeIndex].desc,
                          subImages: categories[activeIndex].subImages,
                          bg: "#edf7f7"
                        });
                      }}
                    >
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
            style={{ display: "flex", width: `${moreMoments.length * 100}vw`, height: "100dvh" }}
          >
            {moreMoments.map((item, index) => {
              const isActive = (hPage === index && inHorizontal);
              return (
                <div key={item.id} className="h-slide" style={{ width: "100vw", height: "100dvh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: item.bg, transition: "background-color 1.2s ease" }}>

                  {/* Content Container (3 Columns) */}
                  <div className="h-slide-content-container">

                    {/* Left Text */}
                    <div className="h-slide-text-left-wrapper">
                      <motion.h2
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: isActive ? 0 : -50, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                        className="h-slide-text-left"
                        style={{ color: item.color1 }}
                      >
                        {item.text1.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br /></React.Fragment>)}
                      </motion.h2>
                    </div>

                    {/* Center Image */}
                    <motion.div
                      className="h-slide-img-wrapper"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: isActive ? 1 : 0.6, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                      onClick={() => setActiveSubGallery({
                        id: item.id,
                        title: `${item.text1} ${item.text2}`,
                        desc: "Exclusive capture of the premium culinary design and authentic interior atmosphere at Anando.",
                        subImages: item.subImages,
                        bg: item.bg
                      })}
                      style={{ cursor: "pointer" }}
                    >
                      <motion.img
                        src={item.img}
                        alt={`${item.text1} ${item.text2}`}
                        className="h-slide-img"
                        initial={{ scale: 1.5 }}
                        animate={{ scale: isActive ? 1 : 1.5 }}
                        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                      />
                    </motion.div>

                    {/* Right Text */}
                    <div className="h-slide-text-right-wrapper">
                      <motion.h2
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: isActive ? 0 : 50, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                        className="h-slide-text-right"
                        style={{ color: item.color2 }}
                      >
                        {item.text2.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br /></React.Fragment>)}
                      </motion.h2>
                    </div>

                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Masonry Gallery Section */}
      <AnimatePresence>
        {inMasonry && (
          <motion.div
            className="masonry-scroll-container"
            initial={{ y: "100dvh" }}
            animate={{ y: "0dvh" }}
            exit={{ y: "100dvh" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100dvh",
              overflowY: "auto",
              backgroundColor: "var(--bg-primary)",
              zIndex: 90
            }}
          >
            <section className="animated-masonry-gallery">
              <div className="masonry-header">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  The Anando Experience
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                >
                  Explore the culinary art and sophisticated spaces that define our restaurant.
                </motion.p>
              </div>

              <div className="masonry-grid">
                {masonryImages.map((src, idx) => (
                  <motion.div
                    key={idx}
                    className={`masonry-item masonry-item-${idx}`}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: (idx % 3) * 0.15
                    }}
                    whileHover={{ scale: 0.98, filter: "brightness(0.9)" }}
                  >
                    <img src={src} alt={`Gallery visual ${idx + 1}`} loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Sub-Gallery Overlay */}
      <AnimatePresence>
        {activeSubGallery && (
          <motion.div
            className="sub-gallery-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSubGallery(null)}
          >
            <motion.div
              className="sub-gallery-container"
              initial={{ opacity: 0, scale: 0.3, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.3, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="sub-gallery-close"
                onClick={() => setActiveSubGallery(null)}
                aria-label="Close gallery"
              >
                <X size={20} />
              </button>

              <div className="sub-gallery-header">
                <span className="sub-gallery-index">0{activeSubGallery.id} / ARCHIVE</span>
                <h2 className="sub-gallery-title">{activeSubGallery.title}</h2>
                <p className="sub-gallery-desc">{activeSubGallery.desc}</p>
              </div>

              <motion.div
                className="sub-gallery-grid"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12,
                      delayChildren: 0.1
                    }
                  }
                }}
              >
                {(activeSubGallery.subImages || []).map((imgUrl, i) => (
                  <motion.div
                    key={i}
                    className="sub-gallery-card"
                    variants={{
                      hidden: { opacity: 0, scale: 0.6, y: 50 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { type: "spring", damping: 18, stiffness: 100 }
                      }
                    }}
                    whileHover={{ scale: 1.04, y: -8, transition: { duration: 0.3 } }}
                  >
                    <img src={imgUrl} alt={`Sub Gallery ${i + 1}`} className="sub-gallery-img" />
                    <div className="sub-gallery-card-frame"></div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="sub-gallery-footer">
                <Grid size={16} className="sub-gallery-footer-icon" />
                <span>CLICK ANYWHERE OUTSIDE TO ESCAPE THE VAULT</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery
