import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { useNav } from "../utils/NavContext"
import "../styles/pages/ChefPage.css"

import {
  Utensils,
  Clock,
  Users,
  Leaf,
  ChevronRight,
  Star,
  Flame,
  Award,
  Heart,
  Sparkles,
  ArrowRight,
  Share2
} from "lucide-react"

// --- DATA STRUCTURES ---

const timelineData = [
  {
    year: "1970",
    title: "The Beginning",
    desc: "Anando Foods began as a small vegetarian food corner built on family recipes, fresh ingredients, and heartfelt hospitality.",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "1990",
    title: "Growing Recognition",
    desc: "Known for authentic South Indian delicacies and traditional Indian flavors, the restaurant became a local favorite.",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2010",
    title: "Modern Dining Evolution",
    desc: "The dining experience expanded with contemporary interiors, curated menus, and a stronger focus on comfort and quality.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "TODAY",
    title: "A Culinary Destination",
    desc: "Today, Anando Foods continues to serve generations of families with timeless vegetarian cuisine and modern culinary presentation.",
    img: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=600&auto=format&fit=crop"
  }
]

const philosophyCards = [
  {
    id: 1,
    title: "Fresh Every Day",
    desc: "Carefully selected vegetables, spices, and ingredients prepared fresh to preserve authentic flavor and purity.",
    icon: <Leaf className="phil-icon" />
  },
  {
    id: 2,
    title: "Heritage Recipes",
    desc: "Classic Indian and Gujarati recipes passed through generations with timeless preparation methods.",
    icon: <Flame className="phil-icon" />
  },
  {
    id: 3,
    title: "Elegant Dining",
    desc: "Combining traditional flavors with refined plating and contemporary dining aesthetics.",
    icon: <Sparkles className="phil-icon" />
  },
  {
    id: 4,
    title: "Vegetarian Excellence",
    desc: "A dedicated pure vegetarian kitchen focused on quality, hygiene, and flavor harmony.",
    icon: <Heart className="phil-icon" />
  }
]

const masterChefs = [
  {
    id: "aarav",
    name: "Aarav Malhotra",
    role: "Culinary Director",
    philosophy: "Translating emotional stories and ancient Indian cultural heritage into modern edible memories.",
    portrait: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=800&auto=format&fit=crop",
    signatureDish: {
      name: "Truffle Saffron Tortellini",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
      metrics: [
        { label: "Umami", value: 95, icon: "🍂" },
        { label: "Herbaceous", value: 60, icon: "🌿" },
        { label: "Richness", value: 85, icon: "🧈" }
      ],
      tags: ["Black Truffle", "Kashmiri Saffron", "Aged Ricotta"],
      note: "An homage to the rich soils of Northern Italy blended with the royal saffron valleys of Kashmir."
    }
  },
  {
    id: "miriam",
    name: "Miriam Chen",
    role: "Pastry Virtuoso",
    philosophy: "Pastry is a dialogue between tension and release—the crisp snap of sugar and the sudden warmth of spice.",
    portrait: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=800&auto=format&fit=crop",
    signatureDish: {
      name: "Golden Mango Sphere",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop",
      metrics: [
        { label: "Sweetness", value: 88, icon: "🍯" },
        { label: "Crispness", value: 70, icon: "✨" },
        { label: "Warmth", value: 40, icon: "🔥" }
      ],
      tags: ["Alphonso Mango", "Green Cardamom", "Coconut Snow"],
      note: "A playful, multi-sensory tribute to Indian summers that triggers immediate childhood nostalgia."
    }
  },
  {
    id: "koji",
    name: "Koji Sato",
    role: "Hearth Master",
    philosophy: "Smoke is an active ingredient. The searing heat of binchotan reveals the true soul of food.",
    portrait: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
    signatureDish: {
      name: "Ash-Roasted Sweet Potato",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200&auto=format&fit=crop",
      metrics: [
        { label: "Smokiness", value: 92, icon: "💨" },
        { label: "Sweetness", value: 75, icon: "🍯" },
        { label: "Crispness", value: 85, icon: "🔥" }
      ],
      tags: ["Binchotan Charcoal", "Pine Embers", "Wild Garlic"],
      note: "Charring creates a complex bitter-sweet crust that contrasts with the earthy sweetness of the slow ash-roast."
    }
  }
]

const experienceCards = [
  {
    title: "Comfortable Dining",
    desc: "Relaxed A/C seating designed for family gatherings and memorable dining moments.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Warm Hospitality",
    desc: "Courteous staff committed to making every guest feel welcomed and cared for.",
    img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Hygienic Kitchen",
    desc: "Clean preparation standards and quality-focused cooking practices in every meal served.",
    img: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Family Celebrations",
    desc: "Perfect for casual dining, celebrations, and shared moments around flavorful vegetarian cuisine.",
    img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop"
  }
]

const ChefPage = () => {
  const { setNavTheme } = useNav()

  useEffect(() => {
    setNavTheme("yellow")
    document.documentElement.classList.add("journey-page-active")
    window.scrollTo(0, 0)

    return () => {
      document.documentElement.classList.remove("journey-page-active")
    }
  }, [setNavTheme])

  // Parallax Setup
  const { scrollY } = useScroll()
  const bgTextY = useTransform(scrollY, [0, 1000], [0, 100])

  // Interactive Dishes State
  const [activeChefId, setActiveChefId] = useState(masterChefs[0].id)
  const [activeAccordion, setActiveAccordion] = useState(3)
  const activeChef = masterChefs.find(c => c.id === activeChefId)

  // Timeline Scroll Animation
  const timelineRef = useRef(null)
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end center"]
  })
  const lineWidth = useTransform(timelineProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="journey-portfolio">

      {/* ==========================================================================
          1. HERO SECTION (Advanced Centered Layout)
          ========================================================================== */}
      <section className="journey-hero-advanced">

        {/* Massive Vertical Background Text */}
        <div className="hero-bg-vertical left">ANANDO</div>
        <div className="hero-bg-vertical right">LEGACY</div>
        <div className="hero-center-wrapper">
          {/* Top Pill / Badge */}
          <motion.div
            className="hero-top-pill"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="pill-item active">EST. 1970</div>
            <div className="pill-item">PURE VEGETARIAN</div>
            <div className="pill-item">BHUJ CITY</div>
          </motion.div>

          {/* Main Portrait Image */}
          <motion.div
            className="hero-center-image-frame"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop" alt="Master Kitchen" />
            <div className="hero-image-overlay-gradient"></div>
          </motion.div>

          {/* Overlapping Dark Info Card */}
          <motion.div
            className="hero-dark-info-card"
            initial={{ opacity: 0, x: 30, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="dic-label">
              <Star size={12} className="inline-block mr-1 mb-[2px]" />
              THE ARCHITECTS OF FLAVOR
            </div>
            <h1 className="dic-title">A LEGACY OF <br /><span>EXCELLENCE</span></h1>
            <p className="dic-desc">
              For over 50 years, crafting unforgettable sensory experiences where traditional
              Indian flavors converge with comforting hospitality. A pioneer in pure vegetarian dining.
            </p>

            <div className="dic-stats">
              <div className="dic-stat-pill"><Award size={14} className="inline-block mr-1" /> 50+ Years</div>
              <div className="dic-stat-pill"><Clock size={14} className="inline-block mr-1" /> 100+ Dishes</div>
            </div>

            <div className="dic-actions">
              <button className="dic-primary-btn" onClick={() => {
                document.getElementById("signature-section").scrollIntoView({ behavior: "smooth" })
              }}>
                Discover Masterpieces <ArrowRight size={16} />
              </button>
              <div className="dic-socials">
                <button className="dic-icon-btn"><Heart size={16} /></button>
                <button className="dic-icon-btn"><Share2 size={16} /></button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
          2. OUR STORY SECTION (Interactive Accordion Timeline)
          ========================================================================== */}
      <section className="journey-story-accordion" id="story-section">
        <div className="accordion-header center">
          <div className="dic-label justify-center flex items-center">
            <Star size={12} className="inline-block mr-2 mb-[2px]" />
            OUR LEGACY
          </div>
          <h2 className="accordion-hero-title">
            From a humble food corner to <br/><span>Bhuj’s beloved vegetarian destination.</span>
          </h2>
        </div>

        <div className="accordion-container">
          {timelineData.map((item, idx) => (
            <div 
              className={`accordion-panel ${activeAccordion === idx ? 'active' : ''}`} 
              key={idx}
              onMouseEnter={() => setActiveAccordion(idx)}
              onClick={() => setActiveAccordion(idx)}
            >
              <div className="ap-bg-img">
                <img src={item.img} alt={item.title} />
                <div className="ap-overlay"></div>
              </div>
              
              {/* Always visible year / title tab (Vertical on desktop) */}
              <div className="ap-tab">
                <h3>{item.year}</h3>
                <span className="ap-tab-title">{item.title}</span>
              </div>

              {/* Content revealed on expansion */}
              <div className="ap-content">
                <div className="ap-content-inner">
                  <div className="ap-year-bg">{item.year}</div>
                  <div className="ap-text-content">
                    <h3 className="ap-title">{item.title}</h3>
                    <p className="ap-desc">{item.desc}</p>
                    <button className="ap-btn">
                      DISCOVER THE ERA <ArrowRight size={14}/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
          3. CHEF PHILOSOPHY SECTION (Advanced Split Layout)
          ========================================================================== */}
      <section className="journey-philosophy-advanced" id="philosophy-section">
        {/* Massive Background Text */}
        <div className="phil-bg-text">PHILOSOPHY</div>

        <div className="phil-advanced-wrapper">
          
          {/* Header Row (Split Left/Right) */}
          <div className="phil-header-split">
            <div className="phil-header-left">
              <div className="dic-label flex items-center">
                <Star size={12} className="inline-block mr-2 mb-[2px]" />
                THE KITCHEN PHILOSOPHY
              </div>
              <h2 className="phil-title-main">
                The core principles <br/>of our <span>culinary artistry</span>
              </h2>
            </div>
            <div className="phil-header-right">
              <div className="phil-quote-line"></div>
              <p className="phil-quote-text">
                "We don’t simply cook meals — we craft experiences that bring warmth, nostalgia, and joy to every table. Every dish carries tradition, emotion, and artistry."
              </p>
            </div>
          </div>

          {/* Cards Row */}
          <div className="phil-cards-row">
            {philosophyCards.map((card, idx) => (
              <motion.div 
                className="phil-card-advanced glass-panel" 
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                whileHover={{ y: -5 }}
              >
                <div className="pc-top">
                  <div className="pc-number">/0{idx + 1}</div>
                  <Star size={14} className="pc-star text-[#eaa43b]" />
                </div>
                <div className="pc-content">
                  <h3>{card.title}</h3>
                  <div className="pc-subtitle">GUIDING PRINCIPLE</div>
                  <p>{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          4. MASTER CHEFS & SIGNATURE DISHES SHOWCASE
          ========================================================================== */}
      <section className="journey-signature" id="signature-section">
        <div className="accordion-header center" style={{ marginBottom: '1rem' }}>
          <div className="dic-label justify-center flex items-center">
            <Star size={12} className="inline-block mr-2 mb-[2px]" />
            MASTER CHEFS
          </div>
          <h2 className="accordion-hero-title">
            Meet the artisans behind our <br/><span>signature collection.</span>
          </h2>
        </div>

        <div className="interactive-chef-showcase">
          {/* Left: Chef Selector */}
          <div className="ims-left">
            <div className="ims-chef-list">
              {masterChefs.map(chef => (
                <div
                  key={chef.id}
                  className={`ims-chef-item ${activeChefId === chef.id ? 'active' : ''}`}
                  onClick={() => setActiveChefId(chef.id)}
                >
                  <div className="chef-selector-avatar">
                    <img src={chef.portrait} alt={chef.name} />
                  </div>
                  <div className="chef-selector-info">
                    <h3>{chef.name}</h3>
                    <span>{chef.role}</span>
                  </div>
                  <ChevronRight className="chef-selector-arrow" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Chef & Dish Preview */}
          <div className="ims-right">
            <AnimatePresence mode="wait">
              {activeChef && (
                <motion.div
                  className="ims-preview-card"
                  key={activeChef.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="ims-img-container">
                    <img src={activeChef.signatureDish.image} alt={activeChef.signatureDish.name} />
                    <div className="ims-chef-overlay-badge glass-panel">
                      <img src={activeChef.portrait} alt={activeChef.name} className="mini-portrait" />
                      <div className="badge-text">
                        <span>Crafted by</span>
                        <strong>{activeChef.name}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="ims-details">
                    <div className="chef-phil-quote">
                      "{activeChef.philosophy}"
                    </div>

                    <div className="dish-showcase-divider"></div>

                    <div className="note-label">Signature Dish</div>
                    <h3>{activeChef.signatureDish.name}</h3>

                    <div className="ims-tags">
                      {activeChef.signatureDish.tags.map((tag, i) => (
                        <span key={i} className="ims-tag">{tag}</span>
                      ))}
                    </div>

                    <div className="ims-metrics">
                      {activeChef.signatureDish.metrics.map((m, i) => (
                        <div key={i} className="metric-row">
                          <span className="metric-label">{m.icon} {m.label}</span>
                          <div className="metric-bar-bg">
                            <motion.div
                              className="metric-bar-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${m.value}%` }}
                              transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                            ></motion.div>
                          </div>
                          <span className="metric-val">{m.value}%</span>
                        </div>
                      ))}
                    </div>

                    <div className="ims-note">
                      <p>"{activeChef.signatureDish.note}"</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          5. THE EXPERIENCE SECTION (Light Theme)
          ========================================================================== */}
      <section className="journey-experience" id="experience-section">
        <div className="experience-content">
          <div className="section-header center">
            <div className="sec-label">✦ THE EXPERIENCE</div>
            <h2>A place where comfort, flavor, and togetherness meet.</h2>
          </div>

          <div className="experience-grid">
            {experienceCards.map((card, idx) => (
              <motion.div
                className="exp-card glass-panel"
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
              >
                <div className="exp-img-wrapper">
                  <img src={card.img} alt={card.title} />
                </div>
                <div className="exp-text-content">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
                <div className="exp-card-border"></div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="experience-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>Join us to create your own memories at Anando Foods.</p>
            <button className="primary-btn gold-btn">
              Reserve a Table <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default ChefPage
