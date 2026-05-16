import React, { useState, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Star, Clock, Users, ArrowRight, Flame, Pizza, Soup, Fish, Utensils, Leaf, Sun, Coffee, X, ShoppingBag, MapPin, Info } from 'lucide-react';
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

const DishCard = memo(({ dish, quantity, handleUpdateCart, onOpenDetail }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="dish-card-premium-kiosk"
      style={{ '--card-bg': dish.cardBg || '#1a1a1a' }}
      onClick={() => onOpenDetail(dish)}
    >
      <div className="card-media-wrapper">
        <img src={dish.image} alt={dish.title} className="card-img-main" decoding="async" />
        <div className="media-overlay-top">
          <div className={`diet-badge ${dish.diet === 'Veg' ? 'veg' : 'non-veg'}`}>
            <div className="badge-dot"></div>
            <span>{dish.diet}</span>
          </div>
        </div>
        <div className="media-status-pill">
          <div className="status-dot-live"></div>
          <span className="status-text-kiosk">{dish.availability || "In Stock"}</span>
        </div>
      </div>

      <div className="card-content-grid">
        <div className="grid-left-side">
          <h3 className="dish-name-kiosk">{dish.title}</h3>
          <div className="dish-tags-kiosk">
            {(dish.ingredients || []).slice(0, 3).map(ing => (
              <span key={ing} className="tag-pill-kiosk">{ing}</span>
            ))}
          </div>
          <p className="dish-desc-kiosk">{dish.shortDescription || dish.description}</p>
          <div className="origin-badge-kiosk">
            <span className="dot-small"></span>
            {dish.origin || "International"}
          </div>
        </div>

        <div className="grid-divider-kiosk"></div>

        <div className="grid-right-side">
          <div className="price-tag-kiosk">₹{dish.price}</div>

          <div className="action-area-kiosk" onClick={(e) => e.stopPropagation()}>
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
                className={i < (dish.spiceLevel || 1) ? 'flame-active' : 'flame-inactive'}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const BookDetailView = ({ dish, onClose, onAddToCart, quantity }) => {
  if (!dish) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="book-detail-overlay"
      onClick={onClose}
      style={{ pointerEvents: 'auto', zIndex: 10000 }}
    >
      <div
        className="book-close-btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close book"
      >
        <X size={32} />
      </div>

      <motion.div
        className="book-detail-container"
        onClick={(e) => e.stopPropagation()}
        initial={{ rotateY: 90, scale: 0.8, opacity: 0 }}
        animate={{ rotateY: 0, scale: 1, opacity: 1 }}
        exit={{ rotateY: -90, scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
      >


        <div className="book-content-wrapper">
          <div className="book-spine"></div>

          {/* Left Page: Boxy structural reveal */}
          <motion.div
            className="book-page left-page"
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 15 }}
            transition={{ duration: 0.8 }}
            style={{ '--book-cover-bg': dish.cardBg || '#153a3a' }}
          >
            <div className="page-inner">
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
          </motion.div>

          {/* Right Page: Details - Flipping open like a real book */}
          <motion.div
            className="book-page right-page"
            initial={{ rotateY: -180, translateZ: -1 }}
            animate={{ rotateY: -12, translateZ: 0 }}
            exit={{ rotateY: -180, translateZ: -1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ transformOrigin: "left center" }}
          >
            <div className="page-inner">
              <div className="detail-header">
                <h2 className="detail-title-large">{dish.title}</h2>
                <div className="detail-price-pill">₹{dish.price}</div>
              </div>

              <div className="detail-section">
                <h4 className="section-title">The Story</h4>
                <p className="detail-description-long">{dish.description}</p>
              </div>

              <div className="detail-grid-info">
                <div className="info-item">
                  <Clock size={18} className="info-icon" />
                  <div className="info-content">
                    <span className="info-label">Prep Time</span>
                    <span className="info-value">{dish.prepTime} mins</span>
                  </div>
                </div>
                <div className="info-item">
                  <Users size={18} className="info-icon" />
                  <div className="info-content">
                    <span className="info-label">Serves</span>
                    <span className="info-value">{dish.serves} Person</span>
                  </div>
                </div>
                <div className="info-item">
                  <MapPin size={18} className="info-icon" />
                  <div className="info-content">
                    <span className="info-label">Origin</span>
                    <span className="info-value">{dish.origin}</span>
                  </div>
                </div>
                <div className="info-item">
                  <Flame size={18} className="info-icon" />
                  <div className="info-content">
                    <span className="info-label">Spiciness</span>
                    <div className="spice-dots">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className={`spice-dot ${i < dish.spiceLevel ? 'active' : ''}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4 className="section-title">Essential Ingredients</h4>
                <div className="detail-ingredients-list">
                  {dish.ingredients.map((ing, i) => (
                    <span key={i} className="ingredient-chip">{ing}</span>
                  ))}
                </div>
              </div>

              <div className="book-actions">
                {quantity === 0 ? (
                  <button className="book-add-cart-btn" onClick={() => onAddToCart(dish, 1)}>
                    <ShoppingBag size={20} />
                    <span>Experience this Flavor</span>
                  </button>
                ) : (
                  <div className="book-quantity-control">
                    <button onClick={() => onAddToCart(dish, -1)}>-</button>
                    <span className="qty-val">{quantity}</span>
                    <button onClick={() => onAddToCart(dish, 1)}>+</button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MenuSection = () => {
  const [activeCuisines, setActiveCuisines] = useState([]);
  const [activeMeals, setActiveMeals] = useState([]);
  const [activeDiets, setActiveDiets] = useState([]);
  const [activeCourses, setActiveCourses] = useState([]);

  // Helper to toggle multi-filters
  const toggleFilter = (current, setter, value) => {
    if (value === 'All') {
      setter([]);
      return;
    }
    if (current.includes(value)) {
      setter(current.filter(item => item !== value));
    } else {
      setter([...current, value]);
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  // Expanded categories with better visuals
  const cuisinies = [
    { name: "Indian", icon: <Flame size={20} />, img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=300" },
    { name: "Italian", icon: <Pizza size={20} />, img: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&q=80&w=300" },
    { name: "Chinese", icon: <Soup size={20} />, img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=300" },
    { name: "Japanese", icon: <Fish size={20} />, img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=300" },
    { name: "Mexican", icon: <Utensils size={20} />, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=300" },
    { name: "Thai", icon: <Leaf size={20} />, img: "https://images.unsplash.com/photo-1559311648-d46f4d8593d6?auto=format&fit=crop&q=80&w=300" },
    { name: "Mediterranean", icon: <Sun size={20} />, img: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=300" },
    { name: "French", icon: <Coffee size={20} />, img: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?auto=format&fit=crop&q=80&w=300" }
  ];

  const meals = ['All', 'Breakfast', 'Lunch', 'Dinner'];
  const diets = ['All', 'Veg', 'Nonveg', 'Vegan'];
  const courses = ['All', 'Starter', 'Main Course', 'Dessert', 'Drinks', 'Beverages', 'Soups', 'Specials'];

  const filteredItems = useMemo(() => {
    return menuData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCuisine = activeCuisines.length === 0 || activeCuisines.includes(item.cuisine);
      const matchesCourse = activeCourses.length === 0 || activeCourses.includes(item.course);
      const matchesMeal = activeMeals.length === 0 || activeMeals.some(m => item.mealTime?.includes(m));
      const matchesDiet = activeDiets.length === 0 || activeDiets.includes(item.diet);

      return matchesSearch && matchesCuisine && matchesCourse && matchesMeal && matchesDiet;
    });
  }, [activeCuisines, activeCourses, activeMeals, activeDiets, searchQuery]);

  const handleUpdateCart = (dish, delta) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === dish.id);
      if (existing) {
        const newQty = (existing.quantity || 1) + delta;
        if (newQty <= 0) return prevCart.filter(item => item.id !== dish.id);
        return prevCart.map(item => item.id === dish.id ? { ...item, quantity: newQty } : item);
      }
      if (delta > 0) return [...prevCart, { ...dish, quantity: 1 }];
      return prevCart;
    });

    if (delta > 0 && !cart.find(item => item.id === dish.id)) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <section className="subpage-layout w-full min-h-screen bg-[var(--bg)] pb-24 relative is-visible" id="menu">
      {/* Optimized Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[var(--accent)] rounded-full blur-[80px] opacity-5"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[30vw] h-[30vw] bg-[var(--text)] rounded-full blur-[80px] opacity-5"></div>
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

      <div className="min-h-screen bg-[#fcfcfc]">
        {/* Full-Width Hero */}
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

            <div className="hero-panel-content flex flex-col lg:flex-row gap-10 items-center justify-around">
              <div className="flex-1 text-left">
                <h1 className="hero-title-main !text-white reveal">
                  A <span className="italic-serif text-[var(--accent)]">Symphony</span> of <br />
                  Culinary Art.
                </h1>
                <p className="hero-subtitle-text mt-6 !text-white/70 reveal delay-1">
                  Discover our hand-picked selection of gourmet masterpieces, where every plate is a canvas of tradition and innovation.
                </p>
              </div>

              <div className="w-full lg:w-[500px] reveal delay-2">
                <div className="neumorphic-search-wrapper">
                  <div className="neumorphic-input-pill">
                    <input
                      type="text"
                      placeholder="Search for flavors..."
                      className="neumorphic-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="neumorphic-search-btn">
                    <Search className="search-icon" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area with Sidebar and Grid */}
        <div className="menu-main-layout">
          {/* Vertical Sidebar for Cuisines */}
          <aside className="menu-sidebar reveal-left">
            <div className="sidebar-bg-effects">
              <div className="sidebar-blob blob-1"></div>
              <div className="sidebar-blob blob-2"></div>
            </div>
            <div className="sidebar-header">
              <span className="text-editorial !text-[var(--accent)]">Cuisines</span>
              <h2 className="sidebar-title">Global Flavors</h2>
              <div className="sidebar-line"></div>
            </div>
            <div className="sidebar-cuisines-list">
              {cuisinies.map((cat, idx) => (
                <button
                  key={cat.name}
                  onClick={() => toggleFilter(activeCuisines, setActiveCuisines, cat.name)}
                  className={`sidebar-cat-item ${activeCuisines.includes(cat.name) ? 'active' : ''}`}
                >
                  <div className={`sidebar-cat-pill color-${(idx % 4) + 1}`}></div>
                  <div className="sidebar-cat-icon-container">
                    {cat.icon}
                  </div>
                  <div className="sidebar-cat-info">
                    <span className="sidebar-cat-label">{cat.name}</span>
                    <p className="sidebar-cat-desc">Explore {cat.name} flavors</p>
                  </div>
                  {activeCuisines.includes(cat.name) && (
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
          <div className="menu-content-area px-16">
            {/* Horizontal Filter Bar */}
            <div className="menu-filters-sticky">
              <div className="max-w-[1800px] pl-10 pr-[var(--container-px)] py-10 border-b border-gray-100 mb-12">
                <div className="all-filters-horizontal-row">
                  <div className="filter-group meal-times-group">
                    <span className="group-label">Service</span>
                    <div className="filter-pills">
                      {meals.map((meal) => (
                        <button
                          key={meal}
                          onClick={() => toggleFilter(activeMeals, setActiveMeals, meal)}
                          className={`meal-pill-modern ${(meal === 'All' && activeMeals.length === 0) || activeMeals.includes(meal) ? 'active' : ''
                            }`}
                        >
                          {meal}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group diet-group">
                    <span className="group-label">Preference</span>
                    <div className="filter-toggles">
                      {diets.map((diet) => (
                        <button
                          key={diet}
                          onClick={() => toggleFilter(activeDiets, setActiveDiets, diet)}
                          className={`diet-toggle-modern ${diet.toLowerCase()} ${(diet === 'All' && activeDiets.length === 0) || activeDiets.includes(diet) ? 'active' : ''
                            }`}
                        >
                          <div className="toggle-dot"></div>
                          {diet}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group course-group">
                    <span className="group-label">Category</span>
                    <div className="course-chips">
                      {courses.map((course) => (
                        <button
                          key={course}
                          onClick={() => toggleFilter(activeCourses, setActiveCourses, course)}
                          className={`course-chip ${course.toLowerCase().replace(' ', '-')} ${(course === 'All' && activeCourses.length === 0) || activeCourses.includes(course) ? 'active' : ''
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
            <div className="max-w-[1900px] mx-auto px-12 pt-10 pb-24">
              <div className="explorer-grid">
                {filteredItems.map((dish) => {
                  const cartItem = cart.find(item => item.id === dish.id);
                  const quantity = cartItem ? cartItem.quantity : 0;

                  return (
                    <DishCard
                      key={dish.id}
                      dish={dish}
                      quantity={quantity}
                      handleUpdateCart={handleUpdateCart}
                      onOpenDetail={setSelectedDish}
                    />
                  );
                })}
              </div>

              <AnimatePresence>
                {selectedDish && (
                  <BookDetailView
                    dish={selectedDish}
                    onClose={() => setSelectedDish(null)}
                    onAddToCart={handleUpdateCart}
                    quantity={cart.find(item => item.id === selectedDish.id)?.quantity || 0}
                  />
                )}
              </AnimatePresence>

              {filteredItems.length === 0 && (
                <div className="explorer-empty">
                  <h3 className="italic">No flavors found...</h3>
                  <p>Try exploring a different cuisine or mood!</p>
                  <button
                    onClick={() => { setActiveCategory(""); setActiveCourse("All"); setActiveMeal("All"); setActiveDiet("All"); setSearchQuery(""); }}
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
    </section>
  );
};

export default MenuSection;