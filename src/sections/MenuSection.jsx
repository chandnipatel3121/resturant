import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Star, Clock, Users, ArrowRight, Flame } from 'lucide-react';
import menuData from '../data/menuData';
import gourmetSalad from '../assets/gourmet_salad.png';
import hero2 from '../assets/hero2.jpg';
import leafShadow from '../assets/leaf_shadow.png';
import chili from '../assets/ingredients/chili.png';
import lemon from '../assets/ingredients/lemon.png';
import coriander from '../assets/ingredients/coriander.png';
import bayLeaf from '../assets/ingredients/bay_leaf.png';
import patternBg from '../assets/pattern_bg.png';
import '../styles/sections/MenuSection.css';

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const [activeMood, setActiveMood] = useState('All');
  const [activeMeal, setActiveMeal] = useState('All');
  const [activeDiet, setActiveDiet] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);

  // Expanded categories with better visuals
  const cuisinies = [
    { name: "Indian", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=300" },
    { name: "Italian", img: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&q=80&w=300" },
    { name: "Chinese", img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=300" },
    { name: "Japanese", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=300" },
    { name: "Mexican", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=300" },
    { name: "Thai", img: "https://images.unsplash.com/photo-1559311648-d46f4d8593d6?auto=format&fit=crop&q=80&w=300" },
    { name: "Mediterranean", img: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=300" },
    { name: "French", img: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?auto=format&fit=crop&q=80&w=300" }
  ];

  const moods = [
    { name: "All", type: "mood" },
    { name: "Starter", type: "course" },
    { name: "Main Course", type: "course" },
    { name: "Dessert", type: "course" },
    { name: "Drinks", type: "course" },
    { name: "Specials", type: "course" },
    { name: "beverages", type: "course" },
    { name: "Soup", type: "course" }
  ];

  const filteredItems = useMemo(() => {
    return menuData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCuisine = !activeCategory || activeCategory === "All" || item.cuisine === activeCategory;

      let matchesMood = activeMood === "All";
      if (!matchesMood) {
        const moodObj = moods.find(m => m.name === activeMood);
        if (moodObj.type === "course") matchesMood = item.course === activeMood;
      }

      const matchesMeal = activeMeal === "All" || (item.mealTime && item.mealTime.includes(activeMeal));
      const matchesDiet = activeDiet === "All" || item.diet === activeDiet;

      return matchesSearch && matchesCuisine && matchesMood && matchesMeal && matchesDiet;
    });
  }, [activeCategory, activeMood, activeMeal, activeDiet, searchQuery]);

  const handleAddToCart = (dish) => {
    setCart([...cart, dish]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <section className="w-full min-h-screen bg-[var(--bg)] pb-24 relative overflow-hidden" id="menu">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[var(--accent)] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] bg-[var(--text)] rounded-full blur-[150px] opacity-5"></div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-50 bg-[var(--text)] text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 font-bold"
          >
            <div className="bg-[var(--accent)] rounded-full p-1"><Plus size={16} /></div>
            Flavor added to your collection!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full relative z-10">
        {/* Full-Width Pattern Hero (No Card) */}
        <div className="enhanced-menu-hero pattern-variant">
          <div className="hero-bg-media">
            <img src={patternBg} alt="" className="hero-bg-img pattern-img" />
            <div className="hero-bg-overlay pattern-overlay"></div>
          </div>

          <div className="max-w-[1800px] mx-auto px-[var(--container-px)] relative z-20 h-full flex flex-col justify-center py-8">
            <div className="hero-panel-header flex justify-between items-center mb-4">
              <div className="brand-group">
                <span className="text-editorial !text-[var(--accent)] block leading-none mb-1">anandofoods</span>
              </div>
              <div className="menu-year text-editorial !text-white/60">Collection '26</div>
            </div>

            <div className="hero-panel-content flex flex-col lg:flex-row gap-10 items-end justify-between">
              <div className="flex-1">
                <h1 className="hero-title-main !text-white">
                  Crafting <span className="italic-serif text-[var(--accent)]">culinary</span> <br />
                  stories since <span className="font-light">1974.</span>
                </h1>
                <p className="hero-subtitle-text mt-6 !text-white/70">
                  A curated gallery of flavors where every dish tells a story of heritage and passion.
                </p>
              </div>

              <div className="w-full lg:w-[450px]">
                <div className="liquid-search-container group !bg-black/40 !backdrop-blur-none !border-white/10 hover:!border-[var(--accent)]/30">
                  <Search className="text-white/60 group-focus-within:text-[var(--accent)] transition-colors" size={24} />
                  <input
                    type="text"
                    placeholder="Find your favorite flavor..."
                    className="flex-1 bg-transparent outline-none text-lg font-medium text-white placeholder:text-white/30"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="search-status-dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Explorer Shelf */}
        <div className="explorer-shelf-container">
          <div className="max-w-[1800px] mx-auto px-[var(--container-px)] relative">
            <div className="flex items-center justify-center min-h-[140px]">
              <div className="explorer-shelf">
                {cuisinies.map((cat, idx) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`explorer-cat-card ${activeCategory === cat.name ? 'active' : ''}`}
                  >
                    <div className="explorer-cat-img-wrapper">
                      <img src={cat.img} alt={cat.name} />
                    </div>
                    <span className="explorer-cat-label">{cat.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Meal Time Filter Panel */}
              <div className="meal-time-panel lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
                <span className="panel-label">Service Time</span>
                <div className="meal-options">
                  {['All', 'Breakfast', 'Lunch', 'Dinner'].map((meal) => (
                    <button
                      key={meal}
                      onClick={() => setActiveMeal(meal)}
                      className={`meal-btn ${activeMeal === meal ? 'active' : ''}`}
                    >
                      {meal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto px-[var(--container-px)] mb-20 mt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="mood-filters-row !mb-0 !p-0">
              {moods.map((mood, idx) => (
                <motion.button
                  key={mood.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActiveMood(mood.name)}
                  className={`mood-pill ${activeMood === mood.name ? 'active' : ''}`}
                >
                  {activeMood === mood.name && <div className="mood-dot" />}
                  {mood.name}
                </motion.button>
              ))}
            </div>

            {/* Diet Filter Panel */}
            <div className="diet-filter-panel">
              <div className="diet-options">
                {['All', 'Veg', 'Nonveg', 'Vegan'].map((diet) => (
                  <button
                    key={diet}
                    onClick={() => setActiveDiet(diet)}
                    className={`diet-btn ${activeDiet === diet ? 'active' : ''}`}
                  >
                    {diet}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid Container */}
        <div className="max-w-[1800px] mx-auto px-[var(--container-px)] pb-24">
          <div className="explorer-grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((dish) => (
                <motion.div
                  layout
                  key={dish.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="dish-card-modern"
                >
                  <div className="dish-img-wrapper-modern">
                    <img src={dish.image} alt={dish.title} className="dish-img-modern" />
                    {/* Icon-only veg/non-veg indicator */}
                    <div className={`diet-icon-only ${dish.diet === 'Veg' ? 'veg' : 'non-veg'}`}>
                      <div className="dot-inner"></div>
                    </div>
                  </div>

                  <div className="dish-content-modern">
                    <h3 className="dish-title-modern">{dish.title}</h3>
                    <p className="dish-desc-modern">{dish.description}</p>

                    <div className="dish-details-row-modern">
                      <div className="spice-indicator-modern">
                        {[...Array(3)].map((_, i) => (
                          <Flame
                            key={i}
                            size={14}
                            className={i < dish.spiceLevel ? 'text-orange-500 fill-orange-500' : 'text-gray-200'}
                          />
                        ))}
                      </div>
                      <div className="availability-tag">In Stock</div>
                    </div>

                    <div className="dish-footer-modern">
                      <div className="price-modern">
                        <span className="currency">₹</span>
                        <span className="amount">{dish.price}</span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(dish)}
                        className="add-btn-modern"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredItems.length === 0 && (
              <div className="explorer-empty">
                <h3 className="italic">No flavors found...</h3>
                <p>Try exploring a different cuisine or mood!</p>
                <button
                  onClick={() => { setActiveCategory(""); setActiveMood("All"); setSearchQuery(""); }}
                  className="mt-6 px-8 py-3 bg-[var(--text)] text-white rounded-full font-bold"
                >
                  Reset Gallery
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;