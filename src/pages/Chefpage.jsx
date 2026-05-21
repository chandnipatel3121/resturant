import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '../utils/NavContext';
import '../styles/pages/ChefPage.css';

// Import Assets
import chef1 from '../assets/chef1.jpg';
import chef2 from '../assets/chef2.jpg';
import dish1 from '../assets/dish1.jpg';
import chili from '../assets/ingredients/chili.png';
import bayLeaf from '../assets/ingredients/bay_leaf.png';
import coriander from '../assets/ingredients/coriander.png';

// Subcomponent: Animated SVG Dial
const CircularDial = ({ progress, label }) => {
  const radius = 30;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="alchemy-dial-wrapper">
      <svg width="74" height="74" viewBox="0 0 74 74">
        {/* Background Track */}
        <circle
          cx="37"
          cy="37"
          r={radius}
          fill="none"
          stroke="rgba(15, 92, 92, 0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Animated Progress Bar */}
        <motion.circle
          cx="37"
          cy="37"
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          strokeLinecap="round"
          transform="rotate(-90 37 37)"
        />
        {/* Percentage Text */}
        <text
          x="37"
          y="42"
          textAnchor="middle"
          fill="var(--text)"
          fontSize="13"
          fontWeight="700"
          fontFamily="var(--font-sans)"
        >
          {progress}%
        </text>
      </svg>
      <span className="alchemy-dial-lbl">{label}</span>
    </div>
  );
};

const About = () => {
  const { setNavTheme } = useNav();
  const [activeTab, setActiveTab] = useState('journey');
  const [activeSpice, setActiveSpice] = useState('chili');

  // Ensure scroll is at top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    setNavTheme('green');
  }, [setNavTheme]);

  // Tab Details Data
  const tabsData = {
    journey: {
      tagline: "A Twenty-Year Culinary Pilgrimage",
      description: "Chef Vikram Anando’s culinary journey is a story of continuous curiosity and dedication. Growing up in Jammu & Kashmir, his mornings were spent learning the deep mysteries of spices from his grandmother. Over two decades, he traveled the length of India and across classical kitchens of France and Japan, exploring how modern culinary precision can elevate ancient Indian heritage.",
      stats: [
        { num: "20+", label: "Years of Craft" },
        { num: "12", label: "Secret Spice Blends" },
        { num: "3", label: "Global Mentorships" }
      ],
      image: chef1
    },
    philosophy: {
      tagline: "The Alchemy of Clean, Sacred Eating",
      description: "Vikram's culinary philosophy sits at the intersection of Ayurvedic nourishment and state-of-the-art culinary design. Every dish should serve a dual purpose: to spark immediate epicurean delight, and to harmonize the body. We believe in minimal handling, wild-crafted local ingredients, and slow-cooking methods that preserve clean flavors.",
      pillars: [
        { num: "01", title: "Ayurvedic Balance", text: "Aligning bitter, sweet, pungent, and sour flavors." },
        { num: "02", title: "Slow Fire Dum Cooking", text: "Preserving organic nutrients through gentle heat." },
        { num: "03", title: "Earthy Traceability", text: "Direct relationships with heritage organic spice farms." }
      ],
      image: chef2
    },
    alchemy: {
      tagline: "The Spice Alchemist Explorer",
      description: "Vikram does not view spices simply as elements of heat; he views them as aromatic layers. Click a spice below to explore its alchemical footprint in our laboratory dials, representing intensity of flavor, aroma volatility, and grounding earthiness."
    }
  };

  // Spices Specific Data
  const spicesData = {
    chili: {
      name: "Kashmiri Chili",
      lbl: "The Vibrant Fire",
      bio: "Hand-picked from organic fields in Jammu, our Kashmiri chili is celebrated for its deep brilliant red hue and mild, complex heat that slowly blooms on the palate, rather than overwhelming it.",
      image: chili,
      dials: [
        { progress: 90, label: "Intensity" },
        { progress: 65, label: "Aroma Bloom" },
        { progress: 45, label: "Earthiness" }
      ]
    },
    bayLeaf: {
      name: "Tejpatta Leaf",
      lbl: "The Wild Laurel",
      bio: "Wild-crafted bay leaves sourced directly from sub-tropical Himalayan foothills. Shaded-dried to lock in volatile oils, releasing clean notes of cinnamon, black pepper, and pine wood.",
      image: bayLeaf,
      dials: [
        { progress: 30, label: "Intensity" },
        { progress: 90, label: "Aroma Bloom" },
        { progress: 80, label: "Earthiness" }
      ]
    },
    coriander: {
      name: "Heritage Dhania",
      lbl: "The Citrus Orchard",
      bio: "Organically grown heritage green coriander seeds, cracked by hand right before service. They yield sweet, warm, and highly refreshing citrus oil notes that brighten slow-braised sauces.",
      image: coriander,
      dials: [
        { progress: 50, label: "Intensity" },
        { progress: 85, label: "Aroma Bloom" },
        { progress: 70, label: "Earthiness" }
      ]
    }
  };

  // Framer Motion Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="chef-page-wrapper">
      {/* ── SECTION 1: HERO OVERHAUL ── */}
      <section className="chef-page-hero">
        <div className="chef-hero-container">
          <motion.div 
            className="chef-hero-text-side"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span className="chef-hero-editorial" variants={fadeInUp}>
              Master Chef & Alchemist
            </motion.span>
            <motion.h1 className="chef-hero-name" variants={fadeInUp}>
              Vikram Anando
            </motion.h1>
            <motion.p className="chef-hero-title-lbl" variants={fadeInUp}>
              “The Alchemist of Heritage Flavors”
            </motion.p>
            <motion.blockquote className="chef-hero-quote" variants={fadeInUp}>
              “Every spice has a history; every plate tells a story. Cooking is not a technique—it is a conversation across generations.”
            </motion.blockquote>
          </motion.div>

          <motion.div 
            className="chef-hero-image-side"
            initial="hidden"
            animate="visible"
            variants={scaleUp}
          >
            <div className="chef-hero-img-frame">
              <img 
                src={chef1} 
                alt="Chef Vikram Anando Editorial Portrait" 
                className="chef-hero-img"
              />
              <div className="chef-hero-deco-tag">
                <span className="chef-hero-deco-num">20+</span>
                <span className="chef-hero-deco-lbl">Years of Mastery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: INTERACTIVE CRAFT EXPLORER ── */}
      <section className="chef-page-interactive-section">
        <div className="craft-container">
          {/* Tabs Nav */}
          <div className="craft-tabs">
            {Object.keys(tabsData).map((tab) => (
              <button
                key={tab}
                className={`craft-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Dynamic Tab Content with Animations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="craft-content-box"
            >
              {/* If Journey or Philosophy Tab */}
              {activeTab !== 'alchemy' ? (
                <>
                  <div className="craft-left-panel">
                    <h3 className="craft-tagline">{tabsData[activeTab].tagline}</h3>
                    <p className="craft-description">{tabsData[activeTab].description}</p>
                    
                    {/* Journey Stats */}
                    {activeTab === 'journey' && (
                      <div className="craft-stats-grid">
                        {tabsData.journey.stats.map((stat, i) => (
                          <div key={i} className="craft-stat-card">
                            <div className="craft-stat-num">{stat.num}</div>
                            <div className="craft-stat-lbl">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Philosophy Pillars */}
                    {activeTab === 'philosophy' && (
                      <div className="craft-pillars-list">
                        {tabsData.philosophy.pillars.map((pillar, i) => (
                          <div key={i} className="craft-pillar-card">
                            <span className="craft-pillar-icon">{pillar.num}</span>
                            <div className="craft-pillar-meta">
                              <div className="craft-pillar-text">{pillar.title}</div>
                              <span style={{ fontSize: '0.82rem', opacity: 0.7 }}>{pillar.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="craft-right-panel">
                    <div className="craft-img-frame">
                      <img 
                        src={tabsData[activeTab].image} 
                        alt={`Chef Vikram ${activeTab}`} 
                        className="craft-img"
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* Interactive Spices Alchemy Panel */
                <div className="craft-alchemy-layout">
                  <div className="alchemy-spices-picker">
                    {Object.keys(spicesData).map((spiceKey) => (
                      <div
                        key={spiceKey}
                        className={`alchemy-spice-item ${activeSpice === spiceKey ? 'active' : ''}`}
                        onClick={() => setActiveSpice(spiceKey)}
                      >
                        <div className="alchemy-spice-thumb-frame">
                          <img 
                            src={spicesData[spiceKey].image} 
                            alt={spicesData[spiceKey].name} 
                            className="alchemy-spice-thumb"
                          />
                        </div>
                        <div className="alchemy-spice-meta">
                          <span className="alchemy-spice-name">{spicesData[spiceKey].name}</span>
                          <span className="alchemy-spice-lbl">{spicesData[spiceKey].lbl}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSpice}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="alchemy-details-panel"
                    >
                      <div className="alchemy-detail-head">
                        <span className="alchemy-detail-lbl">{spicesData[activeSpice].lbl}</span>
                        <h4 className="alchemy-detail-name">{spicesData[activeSpice].name}</h4>
                      </div>
                      <p className="alchemy-detail-bio">{spicesData[activeSpice].bio}</p>
                      
                      <div className="alchemy-dials-grid">
                        {spicesData[activeSpice].dials.map((dial, idx) => (
                          <CircularDial 
                            key={idx} 
                            progress={dial.progress} 
                            label={dial.label} 
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── SECTION 3: VERTICAL TIMELINE OF CAREER ── */}
      <section className="chef-timeline-section">
        <div className="chef-section-header">
          <span className="chef-section-lbl">Our Legacy</span>
          <h2 className="chef-section-title">Milestones of Taste</h2>
        </div>

        <div className="chef-timeline-container">
          {/* Milestone 1 */}
          <div className="chef-timeline-item">
            <span className="chef-timeline-badge" />
            <div className="chef-timeline-year-col">
              <span className="chef-timeline-year">2010</span>
            </div>
            <div className="chef-timeline-content-col">
              <h4 className="chef-timeline-title">Refinement in Lyon, France</h4>
              <p className="chef-timeline-desc">
                Immersed himself in classical saucing and structural plating at multi-Michelin-starred establishments, building a rigorous technical foundation.
              </p>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="chef-timeline-item">
            <span className="chef-timeline-badge" />
            <div className="chef-timeline-year-col">
              <span className="chef-timeline-year">2015</span>
            </div>
            <div className="chef-timeline-content-col">
              <h4 className="chef-timeline-title">The Sacred Spices Expedition</h4>
              <p className="chef-timeline-desc">
                Embarked on an 18-month journey through Kashmir, Kerala, Andhra Pradesh, and Rajasthan, sourcing ancient, wild heirloom crops directly from heritage farms.
              </p>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="chef-timeline-item">
            <span className="chef-timeline-badge" />
            <div className="chef-timeline-year-col">
              <span className="chef-timeline-year">2020</span>
            </div>
            <div className="chef-timeline-content-col">
              <h4 className="chef-timeline-title">Founding of Anando Foods</h4>
              <p className="chef-timeline-desc">
                Established the brand with a clear vision: to bring ancient Indian alchemical flavor structures to modern gastronomy, using clean sustainable techniques.
              </p>
            </div>
          </div>

          {/* Milestone 4 */}
          <div className="chef-timeline-item">
            <span className="chef-timeline-badge" />
            <div className="chef-timeline-year-col">
              <span className="chef-timeline-year">2026</span>
            </div>
            <div className="chef-timeline-content-col">
              <h4 className="chef-timeline-title">The Immersive Sensory Paradigm</h4>
              <p className="chef-timeline-desc">
                Overhauled the flagship restaurant, introducing high-fidelity physical interaction and interactive elements to tell a beautiful culinary story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SIGNATURE MASTERPIECE DISH SHOWCASE ── */}
      <section className="chef-signature-section">
        <div className="chef-sig-container">
          <div className="chef-sig-text-side">
            <span className="chef-section-lbl">Culinary Gem</span>
            <h2 className="chef-sig-heading">Signature Creation</h2>
            <p className="chef-sig-desc">
              A masterful study of flavor equilibrium, texture, and heritage: Chef Vikram’s celebrated Smoked Beetroot Salad. An absolute synthesis of rustic Indian clay-oven embers and classical French presentation.
            </p>

            <div className="chef-sig-profile">
              <div className="chef-sig-profile-item">
                <span className="chef-sig-profile-num">01</span>
                <div className="chef-sig-profile-meta">
                  <span className="chef-sig-profile-title">The Applewood Smoke</span>
                  <span className="chef-sig-profile-text">
                    Organic beetroots slow-cooked inside standard charcoal tandoors, then cold-smoked with real applewood shavings for deep, forest-like complexity.
                  </span>
                </div>
              </div>

              <div className="chef-sig-profile-item">
                <span className="chef-sig-profile-num">02</span>
                <div className="chef-sig-profile-meta">
                  <span className="chef-sig-profile-title">Saffron Sensation</span>
                  <span className="chef-sig-profile-text">
                    Drizzled elegantly in an emulsion of mountain-sourced organic honey and premium saffron threads hand-imported directly from Pampore.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="chef-sig-image-side">
            <div className="chef-sig-img-frame">
              <img 
                src={dish1} 
                alt="Chef Vikram Signature Smoked Beetroot Salad" 
                className="chef-sig-img"
              />
              <div className="chef-sig-img-caption">
                <h4 className="chef-sig-img-name">Smoked Saffron Beetroot</h4>
                <span className="chef-sig-img-lbl">Signature Masterpiece</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
