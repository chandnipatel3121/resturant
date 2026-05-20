import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import testimonials from "../data/testimonials"
import "../styles/sections/TestimonialsSection.css"

/* ── Gold Star ── */
const Stars = ({ count = 5 }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <motion.svg
        key={i}
        initial={{ opacity: 0, scale: 0, rotate: -30 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className="w-3.5 h-3.5 fill-[#E0A94B]"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </motion.svg>
    ))}
  </div>
)

/* ── Single card ── */
const Card = ({ item }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -6 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className="testimonial-card-wrapper"
  >
    <div className="testimonial-card-shadow" />

    <div className="testimonial-card">
      <div className="testimonial-quote-mark">"</div>
      <Stars count={item.stars} />
      <p className="testimonial-quote">{item.quote}</p>
      <div className="testimonial-divider" />

      <div className="testimonial-profile">
        <div className="testimonial-avatar-wrapper">
          <img
            src={item.avatar}
            alt={item.name}
            className="testimonial-avatar"
          />
        </div>

        <div>
          <p className="testimonial-name">{item.name}</p>
          <p className="testimonial-role">{item.role}</p>
        </div>

        <div className="testimonial-verified">
          <svg className="w-3 h-3 fill-[#0F5C5C]" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="testimonial-verified-text">Verified</span>
        </div>
      </div>
    </div>
  </motion.div>
)

const TestimonialsSection = () => {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto swipe every 4 seconds on mobile, resetting timer on slide change
  useEffect(() => {
    if (!isMobile) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isMobile, currentIndex])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Swipe gesture dynamics using drag offsets (with loop support)
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50
    if (info.offset.x < -swipeThreshold) {
      // Swiped left -> Next card
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    } else if (info.offset.x > swipeThreshold) {
      // Swiped right -> Previous card
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  return (
    <section id="testimonials-section" ref={containerRef} className="testimonials-section">
      <div aria-hidden className="testimonials-ghost-text">
        Reviews
      </div>

      <div className="w-full relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="testimonials-header"
        >
          <p className="testimonials-subtitle">
            <span className="testimonials-subtitle-line" />
            Reflections
          </p>
          <h2 className="testimonials-title">Guest Experiences</h2>

          <div className="testimonials-aggregate">
            <Stars count={5} />
            <span className="testimonials-rating-num">5.0</span>
            <span className="testimonials-review-count">· {testimonials.length * 40}+ reviews</span>
          </div>
        </motion.div>

        {/* DESKTOP MARQUEE */}
        {!isMobile && (
          <div className="testimonials-marquee">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="testimonials-track"
            >
              {[...testimonials, ...testimonials].map((item, i) => (
                <Card key={i} item={item} />
              ))}
            </motion.div>
          </div>
        )}

        {/* MOBILE SWIPER */}
        {isMobile && (
          <div className="testimonials-mobile-slider">
            <div className="testimonials-mobile-track-container">
              <motion.div
                className="testimonials-mobile-track"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                animate={{ x: `-${currentIndex * (100 / testimonials.length)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ width: `${testimonials.length * 100}%` }}
              >
                {testimonials.map((item, idx) => (
                  <div
                    key={idx}
                    className="testimonials-mobile-slide"
                    style={{ width: `${100 / testimonials.length}%` }}
                  >
                    <Card item={item} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Premium Indicator Dots */}
            <div className="testimonials-mobile-dots">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`testimonial-dot ${currentIndex === idx ? 'is-active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default TestimonialsSection