import React, { useState, useRef, useMemo, memo } from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion"
import {
  Search,
  Plus,
  Star,
  Clock,
  Users,
  ArrowRight,
  Flame,
  Pizza,
  Soup,
  Fish,
  Utensils,
  Leaf,
  Sun,
  Coffee,
  X,
  ShoppingBag,
  MapPin,
  Info,
  UtensilsCrossed,
  Store,
  Sandwich,
  ChefHat,
  Carrot,
  Globe,
} from "lucide-react"
import rawMenuData from "../data/menuData"
import patternBg from "../assets/pattern_bg.png"
import anandoLogo from "../assets/logo.png"
import "../styles/sections/MenuSection.css"

// Dynamically enrich menuData with realistic ingredients if default placeholders are present
const getRealisticIngredients = (dish) => {
  const title = dish.title.toLowerCase()
  const desc = (dish.description || "").toLowerCase()

  const foundIngredients = []

  // Check for common specific ingredient keywords in title and description
  if (title.includes("cheese") || desc.includes("cheese")) foundIngredients.push("Cheese")
  if (title.includes("paneer") || desc.includes("paneer")) foundIngredients.push("Paneer")
  if (title.includes("mushroom") || desc.includes("mushroom") || desc.includes("mushrooms")) foundIngredients.push("Mushrooms")
  if (title.includes("tomato") || desc.includes("tomato") || desc.includes("tomatoes")) foundIngredients.push("Tomatoes")
  if (title.includes("onion") || desc.includes("onion") || desc.includes("onions")) foundIngredients.push("Onions")
  if (title.includes("pineapple") || desc.includes("pineapple")) foundIngredients.push("Pineapple")
  if (title.includes("corn") || desc.includes("corn") || desc.includes("baby corn")) {
    if (title.includes("baby corn") || desc.includes("baby corn")) foundIngredients.push("Baby Corn")
    else foundIngredients.push("Sweet Corn")
  }
  if (title.includes("garlic") || desc.includes("garlic")) foundIngredients.push("Garlic")
  if (title.includes("ginger") || desc.includes("ginger")) foundIngredients.push("Ginger")
  if (title.includes("potato") || desc.includes("potato") || desc.includes("masala")) {
    if (title.includes("dosa") || desc.includes("dosa") || title.includes("uttapam")) {
      foundIngredients.push("Potato Masala")
    }
  }
  if (title.includes("chutney") || desc.includes("chutney")) foundIngredients.push("Green Chutney")
  if (title.includes("noodles") || desc.includes("noodles")) foundIngredients.push("Hakka Noodles")
  if (title.includes("schezwan") || desc.includes("schezwan")) foundIngredients.push("Schezwan Sauce")
  if (title.includes("butter") || desc.includes("butter")) foundIngredients.push("Butter")
  if (title.includes("chocolate") || desc.includes("chocolate")) foundIngredients.push("Chocolate")
  if (title.includes("fruit") || desc.includes("fruit")) foundIngredients.push("Fresh Fruits")

  // Fallbacks by base types to ensure we always have 3 ingredients
  const baseIngredients = []
  if (title.includes("dosa")) {
    if (title.includes("mysore")) baseIngredients.push("Mysore Chutney")
    if (title.includes("rava")) baseIngredients.push("Semolina (Rava)")
    else baseIngredients.push("Rice & Lentil Batter")
    baseIngredients.push("Curry Leaves", "Sambar")
  } else if (title.includes("uttapam")) {
    baseIngredients.push("Fermented Batter", "Curry Leaves", "Sambar")
  } else if (title.includes("idli")) {
    baseIngredients.push("Steamed Rice Batter", "Coconut Chutney", "Sambar")
  } else if (title.includes("vada")) {
    baseIngredients.push("Black Gram Batter", "Coconut Chutney", "Sambar")
  } else if (title.includes("pizza")) {
    baseIngredients.push("Pizza Crust", "Marinara Sauce", "Italian Herbs")
  } else if (title.includes("sandwich") || title.includes("burger") || title.includes("patty")) {
    baseIngredients.push("Fresh Bread / Bun", "Cucumber & Lettuce", "Mayonnaise")
  } else if (title.includes("noodles") || title.includes("chopsuey")) {
    baseIngredients.push("Sauteed Veggies", "Soy Sauce", "Spring Onion")
  } else if (title.includes("rice") || title.includes("pulao") || title.includes("biryani")) {
    baseIngredients.push("Basmati Rice", "Cardamom & Cloves", "Ghee")
  } else if (title.includes("manchurian") || title.includes("chilli") || title.includes("shanghai")) {
    baseIngredients.push("Soy Sauce", "Spring Onions", "Capsicum")
  } else {
    baseIngredients.push("Fresh Herbs", "House Spices", "Olive Oil")
  }

  const combined = [...new Set([...foundIngredients, ...baseIngredients])]
  return combined.slice(0, 3)
}

const menuData = rawMenuData.map(dish => {
  if (
    dish.ingredients &&
    dish.ingredients.length === 3 &&
    dish.ingredients[0] === "Fresh Ingredients" &&
    dish.ingredients[1] === "Secret Spices" &&
    dish.ingredients[2] === "Herbs"
  ) {
    return {
      ...dish,
      ingredients: getRealisticIngredients(dish)
    }
  }
  return dish
})

const DishCard = memo(({ dish, quantity, handleUpdateCart, onOpenDetail }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(0)

  const images =
    dish.images && dish.images.length > 0 ? dish.images : [dish.image]

  React.useEffect(() => {
    if (!isHovered || images.length <= 1) {
      return
    }
    const interval = setInterval(() => {
      setHoveredIndex((prev) => (prev + 1) % images.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [isHovered, images])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="dish-card-premium-kiosk"
      style={{ "--card-bg": dish.cardBg || "#1a1a1a" }}
      onClick={() => onOpenDetail(dish)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setHoveredIndex(0)
      }}
    >
      <div className="card-media-wrapper">
        {images.length > 1 ? (
          /* Dynamic Sliding Track - Kept stable in DOM for smooth hover transitions */
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${hoveredIndex * (100 / images.length)}%)`,
              width: `${images.length * 100}%`,
            }}
          >
            {images.map((imgUrl, i) => (
              <img
                key={i}
                src={imgUrl}
                alt={`${dish.title} - view ${i + 1}`}
                className={`card-img-main carousel-img ${hoveredIndex === i ? "active-slide" : "peeking-slide"}`}
                decoding="async"
                style={{ width: `${100 / images.length}%` }}
              />
            ))}
          </div>
        ) : (
          /* Static Single Image inside matching track structure for stable DOM zoom */
          <div className="carousel-track" style={{ width: "100%" }}>
            <img
              src={images[0]}
              alt={dish.title}
              className="card-img-main carousel-img active-slide"
              decoding="async"
              style={{ width: "100%" }}
            />
          </div>
        )}

        {/* Special Badge (Bestseller, Chef's Special) */}
        {dish.badge && (
          <div className="dish-badge-premium">
            <Star size={12} className="inline-block mr-1 mb-[2px]" />
            {dish.badge}
          </div>
        )}

        {/* Ingredients Tags Kiosk positioned beautifully at the bottom of the image */}
        <div className="dish-tags-kiosk-on-image">
          {(dish.ingredients || []).slice(0, 3).map((ing) => (
            <span key={ing} className="tag-pill-kiosk-image">
              {ing}
            </span>
          ))}
        </div>

        {/* iOS-Style Stretched Pagination Dots */}
        {isHovered && images.length > 1 && (
          <div className="carousel-indicators">
            {images.map((_, i) => (
              <div
                key={i}
                className={`indicator-dot ${hoveredIndex === i ? "active" : ""}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="card-content-grid">
        <div className="grid-left-side">
          <h3 className="dish-name-kiosk">{dish.title}</h3>
          <p className="dish-desc-kiosk">
            {dish.shortDescription || dish.description}
          </p>
          <div className="origin-badge-kiosk">
            <span className="dot-small"></span>
            {dish.origin || "International"}
          </div>
        </div>

        <div className="grid-divider-kiosk"></div>

        <div className="grid-right-side">
          <div className="price-tag-kiosk">₹{dish.price}</div>

          <div
            className="action-area-kiosk"
            onClick={(e) => e.stopPropagation()}
          >
            {quantity === 0 ? (
              <button
                className="add-btn-kiosk"
                onClick={() => handleUpdateCart(dish, 1)}
              >
                <span>Add</span>
                <Plus size={14} />
              </button>
            ) : (
              <div className="counter-kiosk">
                <button onClick={() => handleUpdateCart(dish, -1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleUpdateCart(dish, 1)}>+</button>
              </div>
            )}
          </div>

          <div className="spice-row-kiosk">
            {[...Array(3)].map((_, i) => (
              <Flame
                key={i}
                size={12}
                className={
                  i < (dish.spiceLevel || 1) ? "flame-active" : "flame-inactive"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
})

const LeftPageContent = ({ dish }) => {
  if (!dish) return null
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="book-image-container">
        <img
          src={dish.image}
          alt={dish.title}
          className="book-main-img"
          decoding="async"
        />
      </div>
      <div className="page-footer-branding">
        <span className="brand-text">anandofoods</span>
        <span className="brand-text">Est. 2026</span>
      </div>
    </div>
  )
}

const RightPageContent = ({ dish }) => {
  if (!dish) return null
  return (
    <div className="page-inner">
      <div className="detail-header">
        <h2 className="detail-title-large">{dish.title}</h2>
        <div className="detail-price-pill">₹{dish.price}</div>
      </div>

      <div className="detail-scroll-container">
        <div className="detail-section">
          <p className="detail-description-long">{dish.description}</p>
        </div>

        {/* Premium horizontal printed metadata bar */}
        <div className="detail-horizontal-ribbon">
          <span className="ribbon-item">
            <Clock size={15} />
            <span>{dish.prepTime} Mins</span>
          </span>
          <span className="ribbon-sep">•</span>
          <span className="ribbon-item">
            <Users size={15} />
            <span>Serves {dish.serves}</span>
          </span>
          <span className="ribbon-sep">•</span>
          <span className="ribbon-item">
            <MapPin size={15} />
            <span>{dish.origin}</span>
          </span>
          <span className="ribbon-sep">•</span>
          <span className="ribbon-item">
            <Flame size={15} />
            <span className="spice-dots">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`spice-dot ${i < dish.spiceLevel ? "active" : ""}`}
                />
              ))}
            </span>
          </span>
        </div>

        {/* Elegant bulleted ingredients row */}
        <div className="detail-section ingredients-section">
          <h4 className="section-title">Essential Ingredients</h4>
          <div className="detail-ingredients-bulleted">
            {dish.ingredients.join("  •  ")}
          </div>
        </div>
      </div>

      <div className="book-actions">
        <div
          className="book-add-cart-btn"
          style={{ cursor: "default", pointerEvents: "none" }}
        >
          <ShoppingBag size={20} />
          <span>Experience this Flavor</span>
        </div>
      </div>
    </div>
  )
}

const BookDetailView = ({
  dish,
  dishes = [],
  onClose,
  onAddToCart,
  cart = [],
}) => {
  // Track page index safely
  const initialIndex = dish ? dishes.findIndex((d) => d.id === dish.id) : 0
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0,
  )

  // Real page flipping animation states
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState("next") // 'next' or 'prev'

  // Framer Motion synchronized 3D page flip transition values
  const rotateY = useMotionValue(flipDirection === "next" ? 0 : -180)
  const opacityFront = useTransform(
    rotateY,
    [-180, -90.1, -90, 0],
    [0, 0, 1, 1],
  )
  const opacityBack = useTransform(rotateY, [-180, -90.1, -90, 0], [1, 1, 0, 0])
  const transform = useTransform(
    rotateY,
    (r) => `perspective(2000px) rotateY(${r}deg)`,
  )

  React.useEffect(() => {
    if (isFlipping) {
      const startValue = flipDirection === "next" ? 0 : -180
      const endValue = flipDirection === "next" ? -180 : 0
      rotateY.set(startValue)
      const controls = animate(rotateY, endValue, {
        duration: 0.85,
        ease: [0.25, 1, 0.5, 1],
        onComplete: () => {
          setCurrentIndex(
            flipDirection === "next" ? currentIndex + 1 : currentIndex - 1,
          )
          setIsFlipping(false)
        },
      })
      return () => controls.stop()
    }
  }, [isFlipping, flipDirection, rotateY, currentIndex])

  const handlePrev = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (isFlipping) return
    if (currentIndex > 0) {
      setFlipDirection("prev")
      setIsFlipping(true)
    }
  }

  const handleNext = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (isFlipping) return
    if (currentIndex < dishes.length - 1) {
      setFlipDirection("next")
      setIsFlipping(true)
    }
  }

  // Keyboard accessibility support
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev()
      } else if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, dishes, isFlipping])

  // Determine stationary page contents during the active flip
  let stationaryLeftDish = dishes[currentIndex]
  let stationaryRightDish = dishes[currentIndex]

  if (isFlipping) {
    if (flipDirection === "next") {
      stationaryLeftDish = dishes[currentIndex] // holds old image
      stationaryRightDish = dishes[currentIndex + 1] // reveals new details
    } else {
      stationaryLeftDish = dishes[currentIndex - 1] // reveals new details
      stationaryRightDish = dishes[currentIndex] // holds old image
    }
  }

  if (!dish) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="book-detail-overlay"
      onClick={onClose}
      style={{ pointerEvents: "auto", zIndex: 10000 }}
    >
      <motion.div
        className="book-detail-container"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.85, opacity: 0, rotateY: -35 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.85, opacity: 0, rotateY: 35 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Floating luxury close button positioned relative to the book container */}
        <div
          className="book-close-btn"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }}
          aria-label="Close book"
        >
          <X size={16} />
        </div>
        <div
          className="book-content-wrapper"
          style={{
            position: "relative",
            transformStyle: "preserve-3d",
            perspective: "2000px",
          }}
        >
          {/* Left Page: Boxy structural reveal acting as folding front cover */}
          <motion.div
            className="book-page left-page folding-cover"
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            style={{ transformOrigin: "right center" }}
          >
            <div className="cover-inner-3d">
              {/* Back of the cover (visible when open - shows dish image) */}
              <div className="cover-face-inner">
                <LeftPageContent dish={stationaryLeftDish} />
              </div>

              {/* Front of the cover (visible when closed) */}
              <div className="cover-face-outer">
                <div className="vintage-leather-texture"></div>
                <div className="gold-embossed-crest">
                  <img
                    src={anandoLogo}
                    alt="Anando Logo"
                    className="cover-brand-logo"
                  />
                  <h3 className="crest-title">ANANDO</h3>
                  <p className="crest-subtitle">CULINARY JOURNAL</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Spine */}
          <div className="book-spine"></div>

          {/* Right Page: Details - Stationary right page sitting behind the folding cover */}
          <motion.div
            className="book-page right-page"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            <RightPageContent
              dish={stationaryRightDish}
              onAddToCart={onAddToCart}
            />
          </motion.div>

          {/* Real 3D Physical Page Sheet in motion */}
          {isFlipping && (
            <motion.div
              className="book-page middle-flipping-page"
              key={`${currentIndex}-${flipDirection}`}
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: "50%",
                height: "100%",
                transformOrigin: "left center",
                zIndex: 15,
                transformStyle: "preserve-3d",
                pointerEvents: "none",
                padding: 0,
                margin: 0,
                boxShadow: "none",
                border: "none",
                borderRadius: 0,
                background: "transparent",
                transform,
              }}
            >
              <div
                className="flipping-inner"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front of the flipping page: shows details of old (next) or new (prev) */}
                <motion.div
                  className="flipping-page-front"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "visible",
                    WebkitBackfaceVisibility: "visible",
                    transform: "rotateY(0deg) translateZ(1px)",
                    transformStyle: "preserve-3d",
                    overflow: "hidden",
                    opacity: opacityFront,
                  }}
                >
                  <RightPageContent
                    dish={
                      flipDirection === "next"
                        ? dishes[currentIndex]
                        : dishes[currentIndex - 1]
                    }
                  />
                </motion.div>

                {/* Back of the flipping page: shows image of new (next) or old (prev) */}
                <motion.div
                  className="flipping-page-back"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "visible",
                    WebkitBackfaceVisibility: "visible",
                    transform: "rotateY(180deg) translateZ(1px)",
                    transformStyle: "preserve-3d",
                    overflow: "hidden",
                    opacity: opacityBack,
                  }}
                >
                  <LeftPageContent
                    dish={
                      flipDirection === "next"
                        ? dishes[currentIndex + 1]
                        : dishes[currentIndex]
                    }
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Gold-Leaf Index Navigation Tabs */}
          {!isFlipping && currentIndex > 0 && (
            <button
              className="page-nav-btn prev-page"
              onClick={handlePrev}
              aria-label="Previous Page"
            >
              <ArrowRight className="rotate-180" size={16} />
            </button>
          )}

          {!isFlipping && currentIndex < dishes.length - 1 && (
            <button
              className="page-nav-btn next-page"
              onClick={handleNext}
              aria-label="Next Page"
            >
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const CartAvatar = ({ item, index }) => {
  const [hasError, setHasError] = useState(false)
  const initials = useMemo(() => {
    if (!item.title) return ""
    const words = item.title.trim().split(/\s+/)
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    return item.title.substring(0, 2).toUpperCase()
  }, [item.title])

  return (
    <div className="cart-bar-avatar-ring" style={{ zIndex: 10 - index }}>
      {hasError || !item.image ? (
        <div className="cart-bar-avatar-fallback">{initials}</div>
      ) : (
        <img
          src={item.image}
          alt={item.title}
          className="cart-bar-avatar-img"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}

const CartItemImage = ({ item }) => {
  const [hasError, setHasError] = useState(false)
  const initials = useMemo(() => {
    if (!item.title) return ""
    const words = item.title.trim().split(/\s+/)
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    return item.title.substring(0, 2).toUpperCase()
  }, [item.title])

  return (
    <div className="cart-item-img-wrapper">
      {hasError || !item.image ? (
        <div className="cart-item-img-fallback">{initials}</div>
      ) : (
        <img
          src={item.image}
          alt={item.title}
          className="cart-item-img"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}

const MenuSection = () => {
  const [activeCuisines, setActiveCuisines] = useState([])
  const [activeMeals, setActiveMeals] = useState([])
  const [activeDiets, setActiveDiets] = useState([])
  const [activeCourses, setActiveCourses] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [hasInteracted, setHasInteracted] = useState(false)

  const mainLayoutRef = useRef(null)

  // Mount/Dismount effect for scroll snap on the Menu page
  React.useEffect(() => {
    // Force scroll to top before enabling snap to prevent unwanted jumping
    window.scrollTo(0, 0)
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    }

    let active = true
    let checkCount = 0

    const enableSnap = () => {
      if (!active) return
      // Ensure we are fully scrolled to the top before enabling scroll snap,
      // avoiding layout jumps where the browser snaps to the second section.
      if (window.scrollY === 0 || checkCount > 15) {
        document.documentElement.classList.add("menu-snap-page")
      } else {
        checkCount++
        window.scrollTo(0, 0)
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true })
        }
        requestAnimationFrame(enableSnap)
      }
    }

    // Delay briefly to allow DOM/route changes to settle, then verify scroll position
    const timer = setTimeout(() => {
      requestAnimationFrame(enableSnap)
    }, 150)

    // Dynamic scroll snapping controller for all viewports (Mobile & Desktop)
    const handleScroll = () => {
      const isDesktop = window.innerWidth >= 1024
      const heroHeight = isDesktop ? 400 : window.innerHeight // Mobile hero is 100dvh
      const currentScroll = window.scrollY

      // If scrolled past the hero transition zone, remove snapping to allow fluid natural scrolling inside the grid.
      // If returning to the top transition zone, re-enable snap for forced page snaps between Hero and Grid.
      if (currentScroll > heroHeight + 50) {
        document.documentElement.classList.remove("menu-snap-page")
      } else {
        document.documentElement.classList.add("menu-snap-page")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      active = false
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
      document.documentElement.classList.remove("menu-snap-page")
    }
  }, [])

  const hasActiveFilters = useMemo(() => {
    return (
      activeCuisines.length > 0 ||
      activeCourses.length > 0 ||
      activeMeals.length > 0 ||
      activeDiets.length > 0 ||
      searchQuery !== ""
    )
  }, [activeCuisines, activeCourses, activeMeals, activeDiets, searchQuery])

  // Disable scroll snapping completely when any filter is active, preventing scroll snapping glitches!
  React.useEffect(() => {
    if (hasActiveFilters) {
      document.documentElement.classList.remove("menu-snap-page")
    } else {
      // Re-evaluate snap state based on scroll
      const isDesktop = window.innerWidth >= 1024
      const heroHeight = isDesktop ? 400 : window.innerHeight
      if (window.scrollY <= heroHeight + 50) {
        document.documentElement.classList.add("menu-snap-page")
      }
    }
  }, [hasActiveFilters])

  // Smart dynamic scroll management to bypass all filter layout jumps (Desktop only)
  React.useEffect(() => {
    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop) return

    if (mainLayoutRef.current) {
      const rect = mainLayoutRef.current.getBoundingClientRect()
      const absoluteTop = window.pageYOffset + rect.top
      const targetScroll = Math.max(0, absoluteTop - 76) // Align perfectly below navbar

      const currentScroll = window.scrollY

      if (hasActiveFilters) {
        if (currentScroll < targetScroll - 10) {
          // Scrolled above the menu content (hero visible): scroll down smoothly to target content
          window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          })
        } else if (currentScroll > targetScroll + 150) {
          // Scrolled deep into the grid: scroll back up to the top of the grid smoothly
          window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          })
        }
        // If already in the sweet spot (sticky filter header is active & pinned), do not trigger any scroll adjustments!
      }
    }
  }, [
    hasActiveFilters,
    activeCuisines,
    activeCourses,
    activeMeals,
    searchQuery,
  ])

  // Helper to toggle Cuisine (sidebar) - single selection only, preserves other category filters
  const toggleCuisineFilter = (value) => {
    setHasInteracted(true)
    if (value === "All") {
      setActiveCuisines([])
      return
    }
    setActiveCuisines((prev) => (prev.includes(value) ? [] : [value]))
  }

  // Helper to toggle Cuisine Segment (course chips) - single selection only, preserves other category filters
  const toggleCourseFilter = (value) => {
    setHasInteracted(true)
    if (value === "All") {
      setActiveCourses([])
      return
    }
    setActiveCourses((prev) => (prev.includes(value) ? [] : [value]))
  }

  // Helper to toggle Service Session (meal pills) - single selection only, preserves other category filters
  const toggleMealFilter = (value) => {
    setHasInteracted(true)
    if (value === "All") {
      setActiveMeals([])
      return
    }
    setActiveMeals((prev) => (prev.includes(value) ? [] : [value]))
  }

  // Helper to reset all filters simultaneously
  const resetAllFilters = () => {
    setHasInteracted(true)
    setSearchQuery("")
    setActiveCuisines([])
    setActiveCourses([])
    setActiveMeals([])
  }

  const [cart, setCart] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [selectedDish, setSelectedDish] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  // Cart calculations for totals and item counts
  const cartItemCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  )
  const cartSubtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0,
      ),
    [cart],
  )
  const GST = useMemo(() => Math.round(cartSubtotal * 0.05), [cartSubtotal])
  const SGST = useMemo(() => Math.round(cartSubtotal * 0.05), [cartSubtotal])
  const cartTotal = useMemo(
    () => cartSubtotal + GST + SGST,
    [cartSubtotal, GST, SGST],
  )

  // Automatically close cart drawer if it becomes empty
  React.useEffect(() => {
    if (cartItemCount === 0 && cartOpen) {
      setCartOpen(false)
    }
  }, [cartItemCount, cartOpen])

  // Expanded categories with better visuals
  const cuisinies = [
    { name: "All", icon: <Globe size={30} /> },
    { name: "South Indian", icon: <Flame size={30} /> },
    { name: "Chinese", icon: <Soup size={30} /> },
    { name: "Fusion Food", icon: <UtensilsCrossed size={30} /> },
    { name: "Fast Food", icon: <Pizza size={30} /> },
    { name: "Street Food", icon: <Store size={30} /> },
    { name: "Pizza & Sandwich", icon: <Sandwich size={30} /> },
    { name: "Indo-Chinese", icon: <ChefHat size={30} /> },
    { name: "Vegetarian Specials", icon: <Carrot size={30} /> },
  ]

  const meals = ["All", "Breakfast", "Lunch", "Dinner"]
  const diets = ["All", "Veg", "Vegan", "Jain"]
  const courses = [
    "All",
    "Starters",
    "Main Course",
    "Desserts",
    "Soups",
    "Drinks",
    "Beverages",
    "Chef Specials",
  ]

  const filteredItems = useMemo(() => {
    return menuData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCuisine =
        activeCuisines.length === 0 || activeCuisines.includes(item.cuisine)
      const matchesCourse =
        activeCourses.length === 0 || activeCourses.includes(item.course)
      const matchesMeal =
        activeMeals.length === 0 ||
        activeMeals.some((m) => item.mealTime?.includes(m))
      const matchesDiet =
        activeDiets.length === 0 || activeDiets.includes(item.diet)

      return (
        matchesSearch &&
        matchesCuisine &&
        matchesCourse &&
        matchesMeal &&
        matchesDiet
      )
    })
  }, [activeCuisines, activeCourses, activeMeals, activeDiets, searchQuery])

  const handleUpdateCart = (dish, delta) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === dish.id)
      if (existing) {
        const newQty = (existing.quantity || 1) + delta
        if (newQty <= 0) return prevCart.filter((item) => item.id !== dish.id)
        return prevCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: newQty } : item,
        )
      }
      if (delta > 0) return [...prevCart, { ...dish, quantity: 1 }]
      return prevCart
    })

    if (delta > 0) {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  const renderCuisineLabel = (name) => {
    if (name === "Mediterranean") {
      return (
        <>
          Mediter
          <wbr />
          ranean
        </>
      )
    }
    return name
  }

  return (
    <section
      className="subpage-layout w-full min-h-screen bg-[var(--bg)] pb-24 relative is-visible"
      id="menu"
    >
      {/* Optimized Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[var(--accent)] rounded-full blur-[80px] opacity-5"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[30vw] h-[30vw] bg-[var(--text)] rounded-full blur-[80px] opacity-5"></div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-36 left-1/2 z-[100] bg-[var(--text)] text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 font-bold"
          >
            <div className="bg-[var(--accent)] rounded-full p-1">
              <Plus size={16} />
            </div>
            Flavor added to your collection!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-transparent">
        <AnimatePresence>
          {!hasInteracted && !hasActiveFilters && (
            <motion.div
              className="enhanced-menu-hero pattern-variant"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 400, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className="hero-bg-media">
                <img
                  src={patternBg}
                  alt=""
                  className="hero-bg-img pattern-img"
                />
                <div className="hero-bg-overlay pattern-overlay"></div>
              </div>

              <div className="w-full max-w-[1800px] mx-auto px-[var(--container-px)] relative z-20 h-full flex flex-col justify-center py-8">
                <div className="hero-panel-header flex justify-between items-center mb-4">
                  <div className="brand-group">
                    <span className="text-editorial !text-[var(--accent)] block leading-none mb-1">
                      anandofoods
                    </span>
                  </div>
                  <div className="menu-year text-editorial !text-white/60">
                    Collection '26
                  </div>
                </div>

                <div className="hero-panel-content flex flex-col items-center justify-center text-center w-full max-w-[800px] mx-auto py-8">
                  <div className="text-center overflow-hidden">
                    <h1 className="hero-title-main !text-white text-center">
                      A{" "}
                      <span className="italic-serif text-[var(--accent)]">
                        Symphony
                      </span>{" "}
                      of <br />
                      Culinary Art.
                    </h1>

                    <p className="hero-subtitle-text mt-6 !text-white/70 text-center">
                      Discover our hand-picked selection of gourmet
                      masterpieces, where every plate is a canvas of tradition
                      and innovation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area with Sidebar and Grid */}
        <div className="menu-main-layout" ref={mainLayoutRef}>
          {/* Vertical Sidebar for Cuisines */}
          <aside className="menu-sidebar reveal-left">
            <div className="sidebar-bg-effects">
              <div className="sidebar-blob blob-1"></div>
              <div className="sidebar-blob blob-2"></div>
            </div>
            <div className="sidebar-header">
              <span className="text-editorial !text-[var(--accent)]">
                Cuisines
              </span>
              <h2 className="sidebar-title">Global Flavors</h2>
              <div className="sidebar-line"></div>
            </div>
            <div className="sidebar-cuisines-list">
              {cuisinies.map((cat, idx) => (
                <button
                  key={cat.name}
                  onClick={() => toggleCuisineFilter(cat.name)}
                  className={`sidebar-cat-item ${(cat.name === "All" && activeCuisines.length === 0) || activeCuisines.includes(cat.name) ? "active" : ""}`}
                >
                  <div
                    className={`sidebar-cat-pill color-${(idx % 4) + 1}`}
                  ></div>
                  <div className="sidebar-cat-icon-container">{cat.icon}</div>
                  <div className="sidebar-cat-info">
                    <span className="sidebar-cat-label">
                      {renderCuisineLabel(cat.name)}
                    </span>
                    <p className="sidebar-cat-desc">
                      Explore {cat.name} flavors
                    </p>
                  </div>
                  {((cat.name === "All" && activeCuisines.length === 0) ||
                    activeCuisines.includes(cat.name)) && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="sidebar-active-indicator"
                    />
                  )}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Grid Area - Added significant padding for breathing room */}
          <div className="menu-content-area px-4 md:px-16">
            {/* Horizontal Filter Bar */}
            <div className="menu-filters-sticky">
              <div className="max-w-[1800px] px-4 md:pl-10 md:pr-[var(--container-px)] py-4 md:py-6 mb-6 md:mb-12">
                {/* General Search Bar Row */}
                {/* Row 1: Search, Service Sessions, and Stats in ONE line */}
                <div className="filters-top-line">
                  <div className="general-search-container">
                    <Search className="general-search-icon" size={18} />
                    <input
                      type="text"
                      placeholder="Search across all cuisines and dishes..."
                      className="general-search-input"
                      value={searchQuery}
                      onChange={(e) => {
                        setHasInteracted(true)
                        setSearchQuery(e.target.value)
                      }}
                    />
                    {searchQuery && (
                      <button
                        className="general-search-clear"
                        onClick={() => setSearchQuery("")}
                        aria-label="Clear search"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div className="meal-stats-row">
                    <div className="filter-group meal-times-group">
                      <div className="filter-pills">
                        {meals.map((meal) => (
                          <button
                            key={meal}
                            onClick={() => toggleMealFilter(meal)}
                            className={`meal-pill-modern ${
                              (meal === "All" && activeMeals.length === 0) ||
                              activeMeals.includes(meal)
                                ? "active"
                                : ""
                            }`}
                          >
                            {meal}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="search-stats text-editorial flex items-center gap-4">
                      <div>
                        <span className="desktop-stats-text">
                          {filteredItems.length}{" "}
                          {filteredItems.length === 1 ? "dish" : "dishes"}{" "}
                          available
                        </span>
                        <span className="mobile-stats-text">
                          {filteredItems.length} available
                        </span>
                      </div>
                      {(searchQuery ||
                        activeCuisines.length > 0 ||
                        activeCourses.length > 0 ||
                        activeMeals.length > 0) && (
                        <button
                          onClick={resetAllFilters}
                          className="text-sm font-medium text-[var(--accent)] hover:underline cursor-pointer border-none bg-transparent p-0 m-0 leading-none"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 2: Cuisine Segments taking full width */}
                <div className="filters-bottom-line">
                  <div className="filter-group course-group full-width-course">
                    <div className="course-header-row">
                      <span className="search-stats-inline">
                        {filteredItems.length} available
                      </span>
                    </div>
                    <div className="course-chips">
                      {courses.map((course) => (
                        <button
                          key={course}
                          onClick={() => toggleCourseFilter(course)}
                          className={`course-chip ${course.toLowerCase().replace(" ", "-")} ${
                            (course === "All" && activeCourses.length === 0) ||
                            activeCourses.includes(course)
                              ? "active"
                              : ""
                          }`}
                        >
                          {course}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Grid Container - Enhanced framing */}
            <div className="menu-grid-container max-w-[1900px] mx-auto px-4 md:px-12 pt-6 md:pt-10 pb-24">
              <div className="explorer-grid">
                {filteredItems.map((dish) => {
                  const cartItem = cart.find((item) => item.id === dish.id)
                  const quantity = cartItem ? cartItem.quantity : 0

                  return (
                    <DishCard
                      key={dish.id}
                      dish={dish}
                      quantity={quantity}
                      handleUpdateCart={handleUpdateCart}
                      onOpenDetail={setSelectedDish}
                    />
                  )
                })}
              </div>

              <AnimatePresence>
                {selectedDish && (
                  <BookDetailView
                    dish={selectedDish}
                    dishes={filteredItems}
                    onClose={() => setSelectedDish(null)}
                    onAddToCart={handleUpdateCart}
                    cart={cart}
                  />
                )}
              </AnimatePresence>

              {filteredItems.length === 0 && (
                <div className="explorer-empty">
                  <h3 className="italic">No flavors found...</h3>
                  <p>Try exploring a different cuisine or mood!</p>
                  <button
                    onClick={() => {
                      setActiveCuisines([])
                      setActiveCourses([])
                      setActiveMeals([])
                      setActiveDiets([])
                      setSearchQuery("")
                    }}
                    className="mt-6 px-8 py-3 bg-[var(--text)] text-white rounded-full font-bold"
                  >
                    Reset Gallery
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cart Bar / Pill */}
      <AnimatePresence>
        {cartItemCount > 0 && !cartOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 100, opacity: 0, x: "-50%" }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="floating-cart-bar-kiosk"
          >
            <div className="cart-bar-left">
              <div className="cart-bar-avatars-container">
                <div className="cart-bar-avatars-group">
                  {cart.slice(0, 3).map((item, index) => (
                    <CartAvatar key={item.id} item={item} index={index} />
                  ))}
                  {cart.length > 3 && (
                    <div className="cart-bar-avatar-more">
                      +{cart.length - 3}
                    </div>
                  )}
                </div>
              </div>
              <div className="cart-bar-info">
                <span className="cart-bar-label">Your Selection</span>
                <span className="cart-bar-subtext">
                  {cart.length === 1
                    ? cart[0].title
                    : `${cart[0].title} & ${cartItemCount - cart[0].quantity} more`}
                </span>
              </div>
            </div>

            <div className="cart-bar-right">
              <button
                className="cart-bar-view-btn"
                onClick={() => setCartOpen(true)}
              >
                <span>View</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="cart-drawer-overlay"
              onClick={() => setCartOpen(false)}
            />

            {/* Cart Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="cart-drawer-panel"
            >
              <div className="cart-drawer-header">
                <div>
                  <span className="cart-subtitle-brand">anandofoods</span>
                  <h2 className="cart-title-editorial">Your Selection</h2>
                </div>
                <button
                  className="cart-close-btn"
                  onClick={() => setCartOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="cart-items-container">
                {cart.length === 0 ? (
                  <div className="cart-empty-state">
                    <ShoppingBag size={48} className="empty-bag-icon" />
                    <h3>Your selection is empty</h3>
                    <p>
                      Add some gourmet dishes to begin your culinary experience.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="cart-item-card">
                      <CartItemImage item={item} />
                      <div className="cart-item-details">
                        <div className="cart-item-info">
                          <h4>{item.title}</h4>
                          <span
                            className={`cart-diet-pill ${item.diet.toLowerCase()}`}
                          >
                            {item.diet}
                          </span>
                        </div>
                        <div className="cart-item-action-row">
                          <div className="cart-item-price">₹{item.price}</div>
                          <div className="cart-item-counter">
                            <button onClick={() => handleUpdateCart(item, -1)}>
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleUpdateCart(item, 1)}>
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer / Totals */}
              {cart.length > 0 && (
                <div className="cart-drawer-footer">
                  <div className="cart-bill-details">
                    <div className="bill-row">
                      <span>Subtotal</span>
                      <span>₹{cartSubtotal}</span>
                    </div>
                    <div className="bill-row">
                      <span>GST (5%)</span>
                      <span>₹{GST}</span>
                    </div>
                    <div className="bill-row">
                      <span>SGST (5%)</span>
                      <span>₹{SGST}</span>
                    </div>
                    <div className="bill-divider"></div>
                    <div className="bill-row total-row">
                      <span>Total</span>
                      <span>₹{cartTotal}</span>
                    </div>
                  </div>
                  <button
                    className="cart-checkout-btn"
                    onClick={() => {
                      setCheckoutSuccess(true)
                      setCart([])
                    }}
                  >
                    <span>Place Culinary Order</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {checkoutSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="checkout-success-overlay"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="checkout-success-card"
            >
              <div className="success-icon-wrapper">
                <motion.svg
                  viewBox="0 0 52 52"
                  className="checkmark-svg"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                >
                  <circle
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="2"
                  />
                  <path
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </div>
              <h2>Order Confirmed!</h2>
              <p>
                Your culinary request has been received. Our chef is preparing
                your gourmet experience.
              </p>
              <button
                className="success-close-btn"
                onClick={() => {
                  setCheckoutSuccess(false)
                  setCartOpen(false)
                }}
              >
                Back to Menu
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default MenuSection
