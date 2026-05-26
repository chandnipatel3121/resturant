import React, { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

import paneerCube from "../assets/ingredients/paneer_cube.png"
import coriander from "../assets/ingredients/coriander.png"
import chili from "../assets/ingredients/chili.png"
import lemon from "../assets/ingredients/lemon.png"
import strawberry from "../assets/ingredients/strawberry.png"
import bayLeaf from "../assets/ingredients/bay_leaf.png"
import carrot from "../assets/ingredients/carrot.png"
import beetroot from "../assets/ingredients/beetrooot.png"
import thali from "../assets/ingredients/thali.png"
import thali2 from "../assets/ingredients/thali2.png"
import pav from "../assets/ingredients/pav.png"
import onion from "../assets/ingredients/onion.png"
import kiwi from "../assets/ingredients/kiwi.png"

const INGREDIENT_GROUPS = {
  0: [thali, thali2, bayLeaf], // Gujarati Thali
  1: [paneerCube, coriander], // Shahi Paneer
  2: [pav, onion, lemon], // Pav Bhaji
  3: [chili, lemon, coriander], // Dragon Platter
  4: [strawberry, kiwi], // Desert
  5: [carrot, beetroot], // Halwa (Mix Veg)
}

const generateFloatingItems = (isMobile, isShort) => {
  const zones = [
    { x: [2, 12], y: [2, 10] },
    { x: [88, 98], y: [2, 10] },
    { x: [2, 12], y: [85, 98] },
    { x: [88, 98], y: [85, 98] },
    { x: [0, 10], y: [25, 65] },
    { x: [90, 100], y: [15, 45] },
    { x: [20, 40], y: [80, 95] },
    { x: [60, 80], y: [80, 95] },
    { x: [40, 60], y: [75, 90] },
    { x: [15, 35], y: [25, 45] },
    { x: [65, 85], y: [35, 75] },
  ]

  // For small/mobile viewports we use deterministic positions
  // (previous mobileZones approach produced inconsistent overlaps)

  // viewport-aware sizing so items scale nicely across devices
  const vw =
    typeof window !== "undefined" ? Math.max(window.innerWidth, 320) : 1024
  const vh =
    typeof window !== "undefined" ? Math.max(window.innerHeight, 320) : 800
  const minDim = Math.min(vw, vh)
  // Mobile sizes: keep ingredients visible but avoid covering title/hero
  const baseSize = isMobile
    ? Math.round(minDim * 0.22)
    : Math.round(minDim * 0.12)
  const scaleFactor = isMobile ? 0.95 : isShort ? 0.98 : 1
  const minSizePx = Math.max(44, Math.round(minDim * 0.08))
  const maxSizePx = Math.max(220, Math.round(minDim * 0.55))

  // Deterministic mobile positions (more reliable than random zones)
  // Avoid center X (40-60) and center Y (30-60) to prevent overlap
  const mobileFixedPositions = [
    { x: 10, y: 12 }, // top-left
    { x: 90, y: 12 }, // top-right
    { x: 8, y: 42 }, // left-middle (away from center)
    { x: 92, y: 42 }, // right-middle (away from center)
    { x: 76, y: 78 }, // bottom-right (near dish rim but outside center)
  ]

  // For mobile return deterministic positions to avoid overlap with center dish
  if (isMobile) {
    const items = mobileFixedPositions.map((p, i) => ({
      id: i,
      x: p.x,
      y: p.y,
      // compute size and clamp to min/max so items remain visible but not huge
      size: (() => {
        const raw = Math.round(
          (baseSize + Math.random() * baseSize * 0.4) * scaleFactor,
        )
        return Math.max(minSizePx, Math.min(maxSizePx, raw))
      })(),
      duration: 18 + Math.random() * 12,
      delay: Math.random() * -6,
      rotate: Math.random() * 180,
      floatX: (Math.random() - 0.5) * 8,
      floatY: (Math.random() - 0.5) * 6,
      entryX: (Math.random() - 0.5) * 80,
      entryY: (Math.random() - 0.5) * 80,
      entryRotate: (Math.random() - 0.5) * 240,
      blur: i % 5 === 0 ? "blur(0.8px)" : "blur(0px)",
      opacity: 0.6 + Math.random() * 0.2,
    }))

    return items
  }

  let chosenZones = zones

  return chosenZones.map((zone, i) => ({
    id: i,
    x: zone.x[0] + Math.random() * (zone.x[1] - zone.x[0]),
    y: zone.y[0] + Math.random() * (zone.y[1] - zone.y[0]),
    // compute size and clamp to min/max so items remain visible but not huge
    size: (() => {
      const raw = Math.round(
        (baseSize + Math.random() * baseSize * 0.6) * scaleFactor,
      )
      return Math.max(minSizePx, Math.min(maxSizePx, raw))
    })(),
    duration: 28 + Math.random() * 24,
    delay: Math.random() * -14,
    rotate: Math.random() * 360,
    floatX: (Math.random() - 0.5) * (isMobile ? 22 : 48),
    floatY: (Math.random() - 0.5) * (isMobile ? 18 : 40),
    entryX: (Math.random() - 0.5) * (isMobile ? 200 : 640),
    entryY: (Math.random() - 0.5) * (isMobile ? 200 : 640),
    entryRotate: (Math.random() - 0.5) * 720,
    blur: i % 6 === 0 ? "blur(1.5px)" : "blur(0px)",
    opacity: 0.65 + Math.random() * 0.3,
  }))
}

const FloatingIngredients = ({ activeIndex, bgColor, isMobile, isShort }) => {
  const currentGroup = INGREDIENT_GROUPS[activeIndex] || [coriander]
  // regenerate positions when device characteristics change
  const fixedItems = useMemo(
    () => generateFloatingItems(isMobile, isShort),
    [isMobile, isShort],
  )

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{ backgroundColor: bgColor }}
    >
      {/* ADVANCED SVG FILTER: Removes white backgrounds without black frames */}
      <svg width="0" height="0" className="absolute">
        <filter id="remove-white-clean" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -1.1 -1.1 -1.1 1 1.1"
            result="mask"
          />
          <feComposite in="SourceGraphic" in2="mask" operator="in" />
        </filter>
      </svg>

      <div className="relative w-full h-full">
        {fixedItems.map((item, i) => {
          const ingredientImg = currentGroup[i % currentGroup.length]
          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: item.size,
                height: item.size,
                transform: "translate(-50%, -50%)",
                filter: item.blur,
                opacity: item.opacity,
              }}
              animate={{
                x: [0, item.floatX, 0],
                y: [0, item.floatY, 0],
                rotate: [item.rotate, item.rotate + 360],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${ingredientImg}-${item.id}`}
                  src={ingredientImg}
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                    x: item.entryX,
                    y: item.entryY,
                    rotate: item.entryRotate,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    x: -item.entryX / 2,
                    y: -item.entryY / 2,
                    transition: { duration: 0.8 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 40,
                    damping: 12,
                    mass: 1,
                    opacity: { duration: 0.6 },
                  }}
                  alt="ingredient"
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default FloatingIngredients
