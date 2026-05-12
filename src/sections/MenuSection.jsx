import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Plus,
  Minus,
  X,
  Flame,
  Star,
  Clock,
  ChevronRight,
  Filter,
  ShoppingCart,
  Trash2,
} from "lucide-react"
import menuData from "../data/menuData"
import "../styles/sections/MenuSection.css"

const categories = [
  { name: "All", icon: "🍽️" },
  { name: "Burgers", icon: "🍔" },
  { name: "Main Course", icon: "🍛" },
  { name: "Starter", icon: "🍟" },
  { name: "Dessert", icon: "🍦" },
  { name: "Drinks", icon: "🥤" },
]

const diets = ["All", "Veg", "Non-Veg"]
const mealTimes = ["All", "Breakfast", "Lunch", "Dinner"]

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeDiet, setActiveDiet] = useState("All")
  const [activeMealTime, setActiveMealTime] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDish, setSelectedDish] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState([])

  const filteredItems = useMemo(() => {
    return menuData.filter((item) => {
      const matchCategory = activeCategory === "All" || item.course === activeCategory || (activeCategory === "Burgers" && item.title.toLowerCase().includes("burger"))
      const matchDiet = activeDiet === "All" || item.diet === activeDiet
      const matchMealTime = activeMealTime === "All" || item.mealTime.includes(activeMealTime)
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchCategory && matchDiet && matchMealTime && matchSearch
    })
  }, [activeCategory, activeDiet, activeMealTime, searchQuery])

  const openDetails = (dish) => {
    setSelectedDish(dish)
    setQuantity(1)
  }

  const addToCart = (dish, qty) => {
    const existing = cart.find(item => item.id === dish.id)
    if (existing) {
      setCart(cart.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + qty } : item))
    } else {
      setCart([...cart, { ...dish, quantity: qty }])
    }
    setSelectedDish(null)
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="menu-kiosk-container">
      <div className="kiosk-layout">
        
        {/* LEFT SIDEBAR: CATEGORIES */}
        <aside className="kiosk-sidebar">
          <div className="sidebar-scroll">
            {categories.map((cat) => (
              <motion.button
                key={cat.name}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.name)}
                className={`sidebar-item ${activeCategory === cat.name ? "active" : ""}`}
              >
                <div className="sidebar-icon-box">
                  <span className="sidebar-emoji">{cat.icon}</span>
                </div>
                <span className="sidebar-label">{cat.name}</span>
                {activeCategory === cat.name && <motion.div layoutId="sidebar-active" className="active-glow" />}
              </motion.button>
            ))}
          </div>
        </aside>

        <main className="kiosk-main">
          {/* HEADER: TITLE & SEARCH */}
          <header className="kiosk-header">
            <div className="header-left">
              <h1>{activeCategory === "All" ? "Our Menu" : activeCategory}</h1>
            </div>
            
            <div className="header-right">
              <div className="search-wrapper">
                <Search size={20} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </header>

          {/* TOP FILTERS (Sub-tabs) */}
          <div className="kiosk-sub-filters">
            <div className="filter-group">
              {diets.map((diet) => (
                <button
                  key={diet}
                  onClick={() => setActiveDiet(diet)}
                  className={`sub-tab ${activeDiet === diet ? "active" : ""}`}
                >
                  {diet}
                </button>
              ))}
            </div>
            <div className="filter-group">
              {mealTimes.map((meal) => (
                <button
                  key={meal}
                  onClick={() => setActiveMealTime(meal)}
                  className={`sub-tab ${activeMealTime === meal ? "active" : ""}`}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>

          {/* DISH GRID */}
          <section className="kiosk-grid-container">
            <AnimatePresence mode="popLayout">
              <motion.div className="dish-grid" layout>
                {filteredItems.map((dish) => (
                  <motion.div
                    key={dish.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dish-card"
                    onClick={() => openDetails(dish)}
                  >
                    <div className="card-image-box">
                      <img src={dish.image} alt={dish.title} />
                    </div>
                    <div className="card-info">
                      <h4>{dish.title}</h4>
                      <div className="card-bottom">
                        <span className="price">₹{dish.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            
            {filteredItems.length === 0 && (
              <div className="empty-state">
                <Search size={48} opacity={0.1} />
                <p>No items found</p>
              </div>
            )}
          </section>

        </main>
      </div>

      {/* DISH DETAILS MODAL (Simplified to match reference) */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="details-overlay-minimal"
            onClick={() => setSelectedDish(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="details-modal-minimal"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedDish.image} alt={selectedDish.title} className="modal-img" />
              <div className="modal-info">
                <h2>{selectedDish.title}</h2>
                <p>{selectedDish.description}</p>
                <div className="modal-bottom">
                  <span className="modal-price">₹{selectedDish.price.toFixed(2)}</span>
                </div>
              </div>
              <button className="modal-close" onClick={() => setSelectedDish(null)}><X size={20}/></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}