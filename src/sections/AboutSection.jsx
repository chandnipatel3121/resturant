import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import img1 from "../assets/dining.jpg"
import img2 from "../assets/dish1.jpg"
import "../styles/sections/AboutSection.css"

/* ── char-by-char reveal ── */
const SplitReveal = ({ text, className, delay = 0, isVisible }) => (
  <motion.span
    className={`inline-block overflow-hidden ${className}`}
    initial="hidden"
    animate={isVisible ? "visible" : "hidden"}
  >
    {text.split("").map((ch, i) => (
      <motion.span
        key={i}
        className="inline-block"
        variants={{
          hidden: { y: "110%", opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.025,
            },
          },
        }}
      >
        {ch === " " ? "\u00A0" : ch}
      </motion.span>
    ))}
  </motion.span>
)

const AboutSection = () => {
  const ref = useRef(null)

  /* ── Animation trigger: fires after snap settles ── */
  const [isSnapped, setIsSnapped] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            setIsSnapped(true)
          }
          if (!entry.isIntersecting && entry.intersectionRatio === 0) {
            setIsSnapped(false)
          }
        })
      },
      { threshold: [0, 0.45, 1] },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* ── Parallax ── */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  const bgTextY = useTransform(smooth, [0, 1], [160, -160])
  const img1Y = useTransform(smooth, [0, 1], ["-8%", "8%"])
  const img2Y = useTransform(smooth, [0, 1], [60, -60])
  const img2Rotate = useTransform(smooth, [0, 1], [-4, 4])

  return (
    <section
      id="about-section"
      ref={ref}
      className={`about-section ${isSnapped ? "about-snapped" : ""}`}
    >
      {/* ghost text */}
      <motion.div
        style={{ y: bgTextY }}
        className="about-ghost-text"
        aria-hidden
      >
        anandofoods
      </motion.div>

      {/* main grid */}
      <div className="about-grid">
        <div className="about-flex-container">
          {/* ── LEFT: TEXT ── */}
          <div className="about-text-content">
            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={
                isSnapped ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }
              }
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.05,
              }}
              className="about-subtitle"
            >
              <span className="about-subtitle-line" />
              Our Story
            </motion.p>

            <h2 className="about-title">
              <span className="block">
                <SplitReveal
                  text="The Essence"
                  className="text-[#0F5C5C]"
                  delay={0.1}
                  isVisible={isSnapped}
                />
              </span>
              <span className="block mt-1">
                <SplitReveal
                  text="of anandofoods"
                  className="italic text-[#E0A94B] font-light"
                  delay={0.25}
                  isVisible={isSnapped}
                />
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isSnapped ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.9,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="about-desc"
            >
              Dining is more than sustenance—it is a sequence of moments. Every
              ingredient, every texture, every presentation is crafted to awaken
              emotion and memory.
              <span className="block mt-3 md:hidden text-[14px] leading-relaxed font-semibold opacity-90">
                Rooted in heritage and refined by modern culinary art, we
                carefully source every ingredient to bring you the rich,
                authentic flavors of India. Every plate is a journey through our
                history, crafted with dedication and served with love.
              </span>
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isSnapped ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="about-cta"
            >
              <span className="about-cta-text">
                Discover Our Ethos
                <span className="about-cta-line" />
              </span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </motion.button>
          </div>

          {/* ── RIGHT: IMAGE COLLAGE ── */}
          <div className="about-image-collage">
            {/* MAIN IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 70 }}
              animate={
                isSnapped
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.88, y: 70 }
              }
              transition={{
                duration: 1.15,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              whileHover={{ scale: 1.02 }}
              className="about-img-main group"
            >
              <motion.img
                style={{ y: img1Y }}
                src={img1}
                alt="Dining experience"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#0F5C5C]/15 group-hover:bg-[#0F5C5C]/0 transition-all duration-700" />
            </motion.div>

            {/* FLOATING SMALL IMAGE */}
            <motion.div
              style={{ y: img2Y, rotate: img2Rotate }}
              initial={{ opacity: 0, x: -60, y: 90 }}
              animate={
                isSnapped
                  ? { opacity: 1, x: 0, y: 0 }
                  : { opacity: 0, x: -60, y: 90 }
              }
              transition={{
                duration: 1.2,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.08, rotate: 2, y: -20 }}
              className="about-img-secondary"
            >
              <img
                src={img2}
                alt="Signature dish"
                className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-700"
              />
            </motion.div>

            {/* decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="about-deco-ring"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
