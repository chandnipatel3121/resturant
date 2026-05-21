import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useNav } from "../utils/NavContext";
import "../styles/pages/ChefPage.css";

import {
  Award,
  Sparkles,
  ChevronRight,
  UtensilsCrossed,
  Flame,
  Compass,
  Layers,
  Heart,
  Quote,
  ArrowUpRight,
  Star,
  Clock3,
} from "lucide-react";

const chefs = [
  {
    id: "aarav-malhotra",
    nameLeft: "AARAV",
    nameRight: "MALHOTRA",
    fullName: "Aarav Malhotra",
    italicName: "Malhotra",
    role: "Culinary Director",
    eyebrow: "THE ARCHITECT OF FLAVOR",
    heroDesc: "Crafting unforgettable sensory experiences where modern culinary science converges with raw emotional storytelling. A pioneer in high-contrast gastronomy.",
    heroImage: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop",
    awardsBadges: [
      { text: "3 MICHELIN STARS", icon: "Award" },
      { text: "12+ YRS CREATION", icon: "Clock3" }
    ],
    philosophyTitle1: "Every dish is an",
    philosophyTitle2: "emotional canvas",
    philosophyQuote: "I do not cook to merely feed. I cook to capture a transient moment in nature—the smell of mountain pine after heavy rain, the warmth of charcoal embers on cold winter skin—and translate it onto your plate.",
    philosophyImageLarge: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop",
    philosophyImageSmall: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=800&auto=format&fit=crop",
    pillars: [
      {
        icon: "Compass",
        title: "Origin & Terroir",
        desc: "We build relationships with local micro-farmers and foragers to harvest heirloom grains, wild mushrooms, and organic botanicals at their absolute peak of flavor."
      },
      {
        icon: "Flame",
        title: "Modern Elementals",
        desc: "Respecting age-old thermal chemistry. We combine primitive pit fire-roasting and wood smoke with modern techniques like cryogenic freezing and precision fermentation."
      },
      {
        icon: "Layers",
        title: "Visual Plating",
        desc: "Every dish is conceived as a canvas, utilizing heights, dynamic textures, natural clays, and custom ceramic vessels to create an art gallery experience on the table."
      }
    ],
    dishes: [
      {
        id: "aarav-dish-1",
        title: "Truffle Saffron Tortellini",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
        desc: "Creamy hand-folded semolina pasta filled with aged ricotta, served with freshly shaved Piedmont winter black truffles and a delicate Kashmiri saffron broth infusion.",
        metrics: [
          { name: "Umami", value: 95 },
          { name: "Sweetness", value: 20 },
          { name: "Herbaceous", value: 60 },
          { name: "Crispness", value: 30 },
          { name: "Heat", value: 15 }
        ],
        ingredients: ["Handmade Semolina", "Piedmont Black Truffle", "Kashmiri Saffron", "24-Month Parmigiano"],
        chefNote: "An homage to the rich soils of Northern Italy blended with the royal saffron valleys of Kashmir. Every bite carries a sense of grounding luxury and delicate floral aroma."
      },
      {
        id: "aarav-dish-2",
        title: "Smoked Juniper Wagyu",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop",
        desc: "Ultra-premium A5 Miyazaki Wagyu seared over open oak embers, smoked with dried forest juniper berries under a glass cloche, served with glazed wild Hina mushrooms and juniper jus.",
        metrics: [
          { name: "Umami", value: 98 },
          { name: "Sweetness", value: 12 },
          { name: "Herbaceous", value: 55 },
          { name: "Crispness", value: 40 },
          { name: "Heat", value: 50 }
        ],
        ingredients: ["A5 Miyazaki Wagyu", "Dried Juniper Berries", "White Oak Embers", "Wild Morel Mushrooms"],
        chefNote: "This dish is about pure woodfire elementals—smoke, fire, and absolute heat precision. The rich marbling of Wagyu is cut perfectly by the deep resinous aroma of smoked juniper."
      },
      {
        id: "aarav-dish-3",
        title: "Himalayan Forest Floor",
        image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1200&auto=format&fit=crop",
        desc: "An experimental botanical plate featuring crispy pine-needle crackers, rich earthy porcini mushroom soil, delicate wild garlic aerated cream, and a dew-drop glaze of spruce oil.",
        metrics: [
          { name: "Umami", value: 90 },
          { name: "Sweetness", value: 15 },
          { name: "Herbaceous", value: 92 },
          { name: "Crispness", value: 65 },
          { name: "Heat", value: 10 }
        ],
        ingredients: ["Porcini Essence", "Dehydrated Wild Lichen", "Wild Garlic Buds", "Spruce Shoot Oil"],
        chefNote: "An immersive sensory walk through a mist-shrouded Himalayan pine forest. Every element is designed to engage touch, smell, and deep forest earthiness simultaneously."
      }
    ],
    toolkit: [
      {
        title: "Decimal Precision",
        subtitle: "Thermal Control",
        desc: "Cooking is physics. From sous-vide water baths stable to 0.1°C to volcanic charcoal pits, we measure heat precisely to extract the sweet, aromatic soul of every protein."
      },
      {
        title: "Botanical Infusions",
        subtitle: "Cold-Pressed Oils",
        desc: "Instead of overwhelming the palate with heavy cream and butter, we lift flavors using custom cold-pressed herb extractions, wild pine, and mountain berries."
      },
      {
        title: "Spiritual Hospitality",
        subtitle: "The Hidden Soul",
        desc: "A menu is hollow without genuine intent. We cook with absolute devotion, translating emotional stories, seasons, and ancient cultural heritage into edible memories."
      }
    ],
    timeline: [
      {
        year: "2014",
        tag: "The Spark",
        title: "Mountain Embers",
        desc: "Began journey as a junior apprentice in high-altitude heritage kitchens, mastering primitive clay ovens and open log fires."
      },
      {
        year: "2018",
        tag: "The Discipline",
        title: "The Parisian Crucible",
        desc: "Graduated with top honors from Le Cordon Bleu, Paris. Spent four intensive years under legendary multi-Michelin starred mentors."
      },
      {
        year: "2021",
        tag: "The Vision",
        title: "Kyoto Innovations",
        desc: "Awarded International Gastronomy Trophy in Japan for pioneering the blend of traditional Indian spices with Japanese minimalism."
      },
      {
        year: "2026",
        tag: "The Home",
        title: "AnandoFoods Atelier",
        desc: "Established the flagship culinary collaborative studio at AnandoFoods to redefine modern luxury dining."
      }
    ],
    awards: [
      { title: "3 Michelin Stars", source: "Michelin Guide" },
      { title: "Top 50 Culinary Masters", source: "Global Gastronomy Council" },
      { title: "Innovative Plate Award", source: "World Gastronomy Federation" },
      { title: "Leader of Sustainable Dining", source: "Green Plate Alliance" }
    ]
  },
  {
    id: "miriam-chen",
    nameLeft: "MIRIAM",
    nameRight: "CHEN",
    fullName: "Miriam Chen",
    italicName: "Chen",
    role: "Pastry Virtuoso",
    eyebrow: "THE POET OF PATISSERIE",
    heroDesc: "Deconstructing classic dessert architecture to compose edible sculptures. Merging molecular precision with delicate botanical distillations and organic floral notes.",
    heroImage: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=1200&auto=format&fit=crop",
    awardsBadges: [
      { text: "BEST PASTRY CHEF ASIA", icon: "Award" },
      { text: "10+ YRS ATELIER", icon: "Clock3" }
    ],
    philosophyTitle1: "Sugar is structural",
    philosophyTitle2: "sculpture & memory",
    philosophyQuote: "Pastry is a dialogue between tension and release. The crisp snap of sugar, the chill of botanical sorbets, and the sudden warmth of spiced caramel evoke visceral emotional responses.",
    philosophyImageLarge: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1200&auto=format&fit=crop",
    philosophyImageSmall: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop",
    pillars: [
      {
        icon: "Heart",
        title: "Molecular Geometry",
        desc: "Designing structural sugar nets, perfect spheres, and custom silicone molds inspired by naturally occurring crystal formations."
      },
      {
        icon: "Sparkles",
        title: "Botanical Pastry",
        desc: "Infusing wild jasmines, rose geranium, lavender, and pine shoots into cream and sugar, replacing aggressive sweetness with refreshing aromas."
      },
      {
        icon: "Layers",
        title: "Temperature Plays",
        desc: "Pairing absolute sub-zero elements (cryo-frozen snows) side-by-side with hot syrups and warm pastries for dynamic palate shock."
      }
    ],
    dishes: [
      {
        id: "miriam-dish-1",
        title: "Golden Mango Sphere",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop",
        desc: "A stunning hand-cast white chocolate and cardamom dome. Upon table-side service, warm spiced Alphonso mango coulis is poured to collapse the sphere, revealing fresh coconut snow.",
        metrics: [
          { name: "Umami", value: 10 },
          { name: "Sweetness", value: 88 },
          { name: "Herbaceous", value: 45 },
          { name: "Crispness", value: 70 },
          { name: "Heat", value: 5 }
        ],
        ingredients: ["Alphonso Mango", "Green Cardamom", "Organic Coconut Cream", "Edible 24k Gold Leaf"],
        chefNote: "A playful, multi-sensory tribute to Indian summers. The snap of chocolate, the warmth of cardamom, and freezing coconut snow trigger immediate childhood nostalgia."
      },
      {
        id: "miriam-dish-2",
        title: "Jasmine Poached Pear",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
        desc: "Jasmine-poached conference pear served on a bed of toasted hazelnut soil, accompanied by a sphere of salted honeycomb gelato and a warm spiced cider mist.",
        metrics: [
          { name: "Umami", value: 15 },
          { name: "Sweetness", value: 75 },
          { name: "Herbaceous", value: 80 },
          { name: "Crispness", value: 50 },
          { name: "Heat", value: 8 }
        ],
        ingredients: ["Jasmine Flowers", "Conference Pear", "Salted Honeycomb", "Toasted Hazelnuts"],
        chefNote: "The jasmine flowers are freshly picked at dawn. The poaching broth is highly reduced to intensify the floral perfume while maintaining the pear's natural bite."
      },
      {
        id: "miriam-dish-3",
        title: "Lavender Cryo-Pavlova",
        image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=1200&auto=format&fit=crop",
        desc: "An ultra-light, feather-weight meringue crown with liquid nitrogen-dipped lavender buds, served with a velvety vanilla bean mousse and wild berries coulis.",
        metrics: [
          { name: "Umami", value: 5 },
          { name: "Sweetness", value: 82 },
          { name: "Herbaceous", value: 70 },
          { name: "Crispness", value: 90 },
          { name: "Heat", value: 2 }
        ],
        ingredients: ["Dehydrated Lavender", "French Vanilla Meringue", "Liquid Nitrogen Buds", "Wild Raspberries"],
        chefNote: "Traditional pavlova reimagined as a weightless, freezing cloud. The cold lavender buds shatter on contact, perfuming the entire palate instantly."
      }
    ],
    toolkit: [
      {
        title: "Cryogenic Tempering",
        subtitle: "Sub-Zero Texture",
        desc: "Utilizing liquid nitrogen at -196°C to snap-freeze fresh cream, herbal oils, and berry purees into micro-crystals that melt instantly on the tongue."
      },
      {
        title: "Hydration Control",
        subtitle: "Hydrocolloid Physics",
        desc: "Perfecting fluid gels, spherification layers, and elastic mousses using organic seaweed extracts and precision molecular thickeners for structural elegance."
      },
      {
        title: "Sugar Artistry",
        subtitle: "Blown & Pulled Satin",
        desc: "Using isomalt sugar at precisely 170°C to blow glass-like spheres, delicate wings, and ultra-thin golden filaments that elevate dessert into sculpture."
      }
    ],
    timeline: [
      {
        year: "2016",
        tag: "The Alchemy",
        title: "Shanghai Foundations",
        desc: "Trained under elite Chinese master pastry chefs, learning the delicate art of dim-sum doughs and traditional sweet syrups."
      },
      {
        year: "2019",
        tag: "The Perfection",
        title: "Zurich Chocolatier",
        desc: "Spent two rigorous years in Switzerland mastering chocolate tempering, bean-to-bar roasting, and luxury bonbon crafting."
      },
      {
        year: "2023",
        tag: "The Elevation",
        title: "Pastry Icon",
        desc: "Named Asia's Outstanding Pastry Chef for pioneering low-glycemic, botanical-infused molecular desserts."
      },
      {
        year: "2026",
        tag: "The Alliance",
        title: "AnandoFoods Patisserie",
        desc: "Joined AnandoFoods to build the avant-garde sweet atelier, creating custom visual art and dessert collaborations."
      }
    ],
    awards: [
      { title: "Best Pastry Chef Asia", source: "Global Pastry Academy" },
      { title: "Master of Sugar Artistry", source: "Zurich Chocolate Council" },
      { title: "Innovator in Botanical Baking", source: "Green Culinary Guild" },
      { title: "Top 10 Sweet Designers", source: "Dessert Digest International" }
    ]
  },
  {
    id: "koji-sato",
    nameLeft: "KOJI",
    nameRight: "SATO",
    fullName: "Koji Sato",
    italicName: "Sato",
    role: "Hearth Master",
    eyebrow: "THE ALCHEMIST OF ASH & EMBER",
    heroDesc: "Exploring the primitive depths of woodfire, smoke, and live-flame chemistry. Merging ancient Japanese binchotan techniques with wild rustic forest flavors.",
    heroImage: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop",
    awardsBadges: [
      { text: "HEARTH MASTER OF YEAR", icon: "Award" },
      { text: "15+ YRS LIVE FIRE", icon: "Clock3" }
    ],
    philosophyTitle1: "Fire is the ultimate",
    philosophyTitle2: "flavor catalyst",
    philosophyQuote: "Smoke is an active ingredient, not a cooking byproduct. The intense wood sap, the searing heat of binchotan, and the slow, deep caramelization of fats reveal the true soul of food.",
    philosophyImageLarge: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    philosophyImageSmall: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
    pillars: [
      {
        icon: "Flame",
        title: "Binchotan Chemistry",
        desc: "Using Japanese white oak charcoal that burns cleanly at over 1000°C, sealing juices instantly and creating an incomparable crisp crust."
      },
      {
        icon: "Compass",
        title: "Primitive Pit Roasting",
        desc: "Burying whole spices, roots, and proteins under hot volcanic rocks and layers of pine needles, slow-roasting them over 18 hours."
      },
      {
        icon: "Layers",
        title: "Deep Fermentation",
        desc: "Crafting custom shio-koji, smoked shoyu, and aged miso pastes to marinade ingredients, amplifying live-fire caramelization."
      }
    ],
    dishes: [
      {
        id: "koji-dish-1",
        title: "Smoked Binchotan Wagyu",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop",
        desc: "Premium A5 Miyazaki Wagyu seared over blazing binchotan embers, smoked with dried forest juniper berries under a glass cloche, served with glazed wild Hina mushrooms and juniper jus.",
        metrics: [
          { name: "Umami", value: 98 },
          { name: "Sweetness", value: 12 },
          { name: "Herbaceous", value: 55 },
          { name: "Crispness", value: 40 },
          { name: "Heat", value: 50 }
        ],
        ingredients: ["A5 Miyazaki Wagyu", "Dried Juniper Berries", "White Oak Embers", "Wild Morel Mushrooms"],
        chefNote: "Pure woodfire elementals—smoke, fire, and absolute heat precision. The rich marbling of Wagyu is cut perfectly by the deep resinous aroma of smoked juniper."
      },
      {
        id: "koji-dish-2",
        title: "Ash-Roasted Octopus",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200&auto=format&fit=crop",
        desc: "Tender octopus slow-cooked in dashi, charred heavily over pine-needle embers, served with an intense ash-roasted sweet potato puree and wild garlic oil.",
        metrics: [
          { name: "Umami", value: 92 },
          { name: "Sweetness", value: 30 },
          { name: "Herbaceous", value: 48 },
          { name: "Crispness", value: 85 },
          { name: "Heat", value: 35 }
        ],
        ingredients: ["Live Octopus", "Binchotan Charcoal", "Ash Sweet Potato", "Wild Garlic Buds"],
        chefNote: "Charring the octopus creates a complex bitter-sweet crust that contrasts beautifully with the rich, earthy sweetness of the slow ash-roasted sweet potato."
      },
      {
        id: "koji-dish-3",
        title: "Cherry-Smoked Duck",
        image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?q=80&w=1200&auto=format&fit=crop",
        desc: "Aged duck breast glazed with wild pine honey and five-spice, smoked over cherry wood, roasted to a perfect ruby pink, served with dynamic parsnip bark.",
        metrics: [
          { name: "Umami", value: 94 },
          { name: "Sweetness", value: 40 },
          { name: "Herbaceous", value: 50 },
          { name: "Crispness", value: 75 },
          { name: "Heat", value: 20 }
        ],
        ingredients: ["Cherry-Smoked Duck", "Wild Pine Honey", "Parsnip Bark", "Aged Smoked Shoyu"],
        chefNote: "Cherry wood smoke has a subtle sweetness that wraps around the rich duck fat, while the five-spice honey glaze caramelizes into a deep shell."
      }
    ],
    toolkit: [
      {
        title: "Thermal Elementalism",
        subtitle: "1000°C Open Flame",
        desc: "Manipulating extreme radiant heat without flare-ups, allowing precise crisping of skin while retaining complete internal moisture."
      },
      {
        title: "Aromatic Smokes",
        subtitle: "Wood & Herbal Saps",
        desc: "Selecting specialized woods (white oak, cherry wood, applewood, dried grapevine) to impart specific resinous, fruity, or herbal notes to proteins."
      },
      {
        title: "Koji Inoculations",
        subtitle: "Enzymatic Tenderizing",
        desc: "Using Aspergillus oryzae cultures on rice grains to pre-digest proteins, amplifying free amino acids and creating extreme caramelized finishes over fire."
      }
    ],
    timeline: [
      {
        year: "2010",
        tag: "The Apprentice",
        title: "Kyoto Hearthside",
        desc: "Apprenticed at a traditional high-end Robatayaki tavern, maintaining live charcoal beds for master chefs."
      },
      {
        year: "2015",
        tag: "The Quest",
        title: "Patagonian Wilds",
        desc: "Traveled across Argentina and Patagonia to study pit-cooking, whole-animal roasting, and wild woodfire orchestration."
      },
      {
        year: "2021",
        tag: "The Recognition",
        title: "Tokyo Hearth Master",
        desc: "Awarded Tokyo Fire-Craft Guild's Highest Honor for modernizing ancestral charcoal wood cooking."
      },
      {
        year: "2026",
        tag: "The Fire",
        title: "AnandoFoods Hearth",
        desc: "Inaugurated the live-fire custom brick hearth at AnandoFoods, dedicating the dining experience to primitive alchemy."
      }
    ],
    awards: [
      { title: "Hearth Master of the Year", source: "Tokyo Fire-Craft Guild" },
      { title: "Leader of Open Fire Dining", source: "Global Gastronomy Council" },
      { title: "Ancient Techniques Pioneer", source: "World Gastronomy Federation" },
      { title: "3 Stars Hearth Atelier", source: "Michelin Guide Review" }
    ]
  }
];

const iconMap = {
  Compass: <Compass className="pillar-icon" />,
  Flame: <Flame className="pillar-icon" />,
  Layers: <Layers className="pillar-icon" />,
  Heart: <Heart className="pillar-icon" />,
  Sparkles: <Sparkles className="pillar-icon" />
};

const badgeIconMap = {
  Award: <Award size={14} />,
  Clock3: <Clock3 size={14} />
};

const ChefPage = () => {
  const { setNavTheme } = useNav();
  
  useEffect(() => {
    setNavTheme('green');
    
    document.documentElement.classList.add('chef-page');
    
    const sections = document.querySelectorAll(".chef-portfolio > section");
    const activeSectionRef = { current: 0 };
    const isAnimatingRef = { current: false };
    
    const scrollToSection = (index) => {
      if (index < 0 || index >= sections.length) return;
      
      isAnimatingRef.current = true;
      activeSectionRef.current = index;
      
      const targetTop = sections[index].offsetTop;
      
      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });
      
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 1000);
    };
    
    // Make function globally accessible for hero button clicks
    window.__chefScrollToSection = scrollToSection;
    
    const handleWheel = (e) => {
      if (window.innerWidth < 1024) return;
      
      e.preventDefault();
      
      if (isAnimatingRef.current) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const targetIndex = activeSectionRef.current + direction;
      
      if (targetIndex >= 0 && targetIndex < sections.length) {
        scrollToSection(targetIndex);
      }
    };
    
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      if (window.innerWidth < 1024) return;
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      if (window.innerWidth < 1024) return;
      e.preventDefault();
    };
    
    const handleTouchEnd = (e) => {
      if (window.innerWidth < 1024) return;
      if (isAnimatingRef.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      
      if (Math.abs(diffY) > 50) {
        const direction = diffY > 0 ? 1 : -1;
        const targetIndex = activeSectionRef.current + direction;
        if (targetIndex >= 0 && targetIndex < sections.length) {
          scrollToSection(targetIndex);
        }
      }
    };
    
    const handleKeyDown = (e) => {
      if (window.innerWidth < 1024) return;
      
      if (["ArrowDown", "PageDown", " "].includes(e.key) && !e.shiftKey) {
        e.preventDefault();
        if (isAnimatingRef.current) return;
        if (activeSectionRef.current < sections.length - 1) {
          scrollToSection(activeSectionRef.current + 1);
        }
      } else if (["ArrowUp", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        if (isAnimatingRef.current) return;
        if (activeSectionRef.current > 0) {
          scrollToSection(activeSectionRef.current - 1);
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        if (isAnimatingRef.current) return;
        scrollToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        if (isAnimatingRef.current) return;
        scrollToSection(sections.length - 1);
      }
    };
    
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        const targetTop = sections[activeSectionRef.current]?.offsetTop;
        if (targetTop !== undefined) {
          window.scrollTo({ top: targetTop, behavior: "auto" });
        }
      }
    };
    window.addEventListener("resize", handleResize);
    
    return () => {
      document.documentElement.classList.remove('chef-page');
      delete window.__chefScrollToSection;
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, [setNavTheme]);


  const [currentChefIndex, setCurrentChefIndex] = useState(0);
  const chef = chefs[currentChefIndex];

  const [selectedDishIndex, setSelectedDishIndex] = useState(0);
  const activeDish = chef.dishes[selectedDishIndex];

  // ──── SCROLL PARALLAX SETUP FOR PHILOSOPHY (AWWWARDS STYLE) ────
  const philosophyRef = useRef(null);
  const { scrollYProgress: philosophyScroll } = useScroll({
    target: philosophyRef,
    offset: ["start end", "end start"]
  });

  const yLargeFrame = useTransform(philosophyScroll, [0, 1], [-70, 70]);
  const ySmallFrame = useTransform(philosophyScroll, [0, 1], [40, -110]);
  const scaleLargeImg = useTransform(philosophyScroll, [0, 1], [1.15, 1.02]);
  const scaleSmallImg = useTransform(philosophyScroll, [0, 1], [1.02, 1.25]);

  // Awwwards-style premium transforms
  const yWatermark = useTransform(philosophyScroll, [0, 1], [-150, 150]);
  const rotateCircle = useTransform(philosophyScroll, [0, 1], [0, 360]);
  const scaleCircle = useTransform(philosophyScroll, [0, 1], [0.8, 1.15]);
  const yAccentFrame = useTransform(philosophyScroll, [0, 1], [-40, 40]);

  // ──── MOTION MOUSE PHYSICS SETUP (GPU-ACCELERATED) ────
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 45, stiffness: 180, mass: 0.6 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax multi-layered translations
  const bgTextX = useTransform(springX, [0, 1], [-35, 35]);
  const bgTextY = useTransform(springY, [0, 1], [-25, 25]);

  const outlineOuterX = useTransform(springX, [0, 1], [30, -30]);
  const outlineOuterY = useTransform(springY, [0, 1], [30, -30]);

  const outlineInnerX = useTransform(springX, [0, 1], [-20, 20]);
  const outlineInnerY = useTransform(springY, [0, 1], [-20, 20]);

  const frameX = useTransform(springX, [0, 1], [-12, 12]);
  const frameY = useTransform(springY, [0, 1], [-12, 12]);

  const imgX = useTransform(springX, [0, 1], [10, -10]);
  const imgY = useTransform(springY, [0, 1], [10, -10]);

  const contentX = useTransform(springX, [0, 1], [-6, 6]);
  const contentY = useTransform(springY, [0, 1], [-6, 6]);

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const onMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // ──── ANIMATION VARIANTS FOR MOUNT TIME ────
  const nameLeft = chef.nameLeft;
  const nameRight = chef.nameRight;

  const letterContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      }
    }
  };

  const letterVariants = {
    hidden: { y: "105%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const clipVariants = {
    hidden: {
      clipPath: "inset(50% 50% 50% 50% rounded 16px)",
      scale: 1.2
    },
    visible: {
      clipPath: "inset(0% 0% 0% 0% rounded 8px)",
      scale: 1,
      transition: {
        duration: 1.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 1, 0.5, 1],
        delay: 0.4 + i * 0.12,
      }
    })
  };

  const scrollFadeInUp = {
    hidden: { opacity: 0, y: 45 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <div className="chef-portfolio">
      {/* SECTION 1: HERO - THE CULINARY COLLABORATIVE ATELIER */}
      <section
        className="portfolio-hero"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* Glassmorphic luxury chef selector bar absolute-positioned in the Hero section */}
        <div className="chef-selector-bar">
          {chefs.map((c, idx) => (
            <button
              key={c.id}
              className={`chef-selector-btn ${currentChefIndex === idx ? "active" : ""}`}
              onClick={() => {
                setCurrentChefIndex(idx);
                setSelectedDishIndex(0); // Reset masterpiece selection
              }}
            >
              <span className="chef-selector-role">{c.role}</span>
              <span className="chef-selector-name">{c.fullName}</span>
            </button>
          ))}
        </div>

        {/* Giant Vertical Words in the background with individual split letter reveals */}
        <div className="hero-giant-word-wrapper left-wrap" key={`left-giant-${currentChefIndex}`}>
          <motion.div
            className="hero-giant-word"
            style={{ x: bgTextX, y: bgTextY }}
            variants={letterContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {nameLeft.split("").map((char, index) => (
              <div key={index} className="char-overflow-wrapper">
                <motion.span variants={letterVariants} style={{ display: "inline-block" }}>
                  {char}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="hero-giant-word-wrapper right-wrap" key={`right-giant-${currentChefIndex}`}>
          <motion.div
            className="hero-giant-word"
            style={{ x: bgTextX, y: bgTextY }}
            variants={letterContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {nameRight.split("").map((char, index) => (
              <div key={index} className="char-overflow-wrapper">
                <motion.span variants={letterVariants} style={{ display: "inline-block" }}>
                  {char}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="hero-center-container">
          {/* Central Portrait Frame Wrapper to allow outlines to float outside boundaries */}
          <motion.div
            className="hero-portrait-wrapper"
            style={{ x: frameX, y: frameY }}
          >
            {/* Golden luxury outline frameworks */}
            <motion.div
              className="hero-frame-outline"
              style={{ x: outlineOuterX, y: outlineOuterY }}
            ></motion.div>

            {/* The clipping masked image viewport */}
            <motion.div
              className="hero-portrait-frame"
              variants={clipVariants}
              initial="hidden"
              animate="visible"
              key={`portrait-frame-${currentChefIndex}`}
            >
              <motion.div
                className="hero-frame-outline-inner"
                style={{ x: outlineInnerX, y: outlineInnerY }}
              ></motion.div>
              <motion.img
                src={chef.heroImage}
                alt={`Portrait of ${chef.fullName}`}
                className="hero-center-chef-img"
                style={{ x: imgX, y: imgY }}
              />
              {/* Dark editorial overlay inside portrait */}
              <div className="hero-portrait-overlay"></div>
            </motion.div>
          </motion.div>

          {/* Floating content overlaying the center portrait */}
          <motion.div
            className="hero-overlay-content"
            style={{ x: contentX, y: contentY }}
            key={`hero-details-${currentChefIndex}`}
          >
            <motion.div
              className="eyebrow-accent"
              custom={0}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
            >
              <Sparkles size={14} className="rotating-star" />
              <span>{chef.eyebrow}</span>
            </motion.div>

            <motion.h1
              className="hero-editorial-title"
              custom={1}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
            >
              {chef.fullName.split(" ")[0]} <span className="italic-serif">{chef.italicName}</span>
            </motion.h1>

            <motion.p
              className="hero-editorial-subtext"
              custom={2}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
            >
              {chef.heroDesc}
            </motion.p>

            <motion.div
              className="hero-stamp-and-badges"
              custom={3}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
            >
              {chef.awardsBadges.map((badge, idx) => (
                <div className="hero-badge-item" key={idx}>
                  {badgeIconMap[badge.icon]}
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="hero-buttons-row"
              custom={4}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
            >
              <button
                className="btn-hero-luxury-primary"
                onClick={() => {
                  if (typeof window.__chefScrollToSection === "function") {
                    window.__chefScrollToSection(2);
                  } else {
                    const element = document.getElementById("masterpieces-section");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span>Discover Masterpieces</span>
                <ArrowUpRight size={18} />
              </button>

              <div className="hero-social-links-wrap">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hero-circle-social" title="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hero-circle-social" title="Facebook">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: PHILOSOPHY - SYMPHONY OF FLAVORS */}
      <section ref={philosophyRef} className="portfolio-philosophy">
        {/* Background Vertical Watermark */}
        <motion.div style={{ y: yWatermark }} className="philosophy-watermark" key={`watermark-${currentChefIndex}`}>
          {chef.italicName.toUpperCase()}
        </motion.div>

        <div className="philosophy-grid">
          {/* Left panel with scroll-parallax overlapping frames */}
          <div className="philosophy-visual-block">
            {/* Rotating floating gold ring */}
            <motion.div 
              className="philosophy-floating-circle" 
              style={{ rotate: rotateCircle, scale: scaleCircle }}
            />

            {/* Background Kashmiri Gold Accent Frame */}
            <motion.div 
              className="philosophy-accent-frame" 
              style={{ y: yAccentFrame }}
            />

            <motion.div
              className="overlapping-frame-large"
              style={{ y: yLargeFrame }}
            >
              <motion.img
                src={chef.philosophyImageLarge}
                alt="Chef in active culinary work environment"
                className="philosophy-bg-img"
                style={{ scale: scaleLargeImg }}
                key={`large-img-${currentChefIndex}`}
              />
            </motion.div>

            <motion.div
              className="overlapping-frame-small"
              style={{ y: ySmallFrame }}
            >
              <motion.img
                src={chef.philosophyImageSmall}
                alt="Detailed hand crafting culinary elements"
                className="philosophy-detail-img"
                style={{ scale: scaleSmallImg }}
                key={`small-img-${currentChefIndex}`}
              />
            </motion.div>
          </div>

          <motion.div
            className="philosophy-content-block"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
          >
            <motion.div className="eyebrow-accent" variants={scrollFadeInUp}>
              <Sparkles size={16} />
              <span>THE VISION</span>
            </motion.div>

            {/* Premium Awwwards Line reveal for the Title */}
            <h2 className="philosophy-title">
              <div className="title-line-wrapper">
                <motion.span 
                   initial={{ y: "100%", opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                   style={{ display: "inline-block" }}
                   key={`phil1-${currentChefIndex}`}
                >
                  {chef.philosophyTitle1}
                </motion.span>
              </div>
              <div className="title-line-wrapper">
                <motion.span 
                   initial={{ y: "100%", opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                   style={{ display: "inline-block" }}
                   className="italic-accent"
                   key={`phil2-${currentChefIndex}`}
                >
                  {chef.philosophyTitle2}
                </motion.span>
              </div>
            </h2>

            {/* Luxurious divider line with gold accent */}
            <motion.div 
              className="philosophy-divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              key={`divider-${currentChefIndex}`}
            />

            <motion.div className="philosophy-pullquote" variants={scrollFadeInUp} key={`pullquote-${currentChefIndex}`}>
              <Quote className="quote-mark" />
              <p>"{chef.philosophyQuote}"</p>
              <span className="quote-author">— Chef {chef.fullName}</span>
            </motion.div>

            <div className="philosophy-pillars-list">
              {chef.pillars.map((pillar, i) => (
                <motion.div
                  className="philosophy-pillar-card"
                  key={`${currentChefIndex}-pillar-${i}`}
                  variants={scrollFadeInUp}
                >
                  {/* Decorative Number Tag */}
                  <div className="pillar-number">0{i + 1}</div>

                  <div className="pillar-icon-box">{iconMap[pillar.icon]}</div>
                  <div className="pillar-info">
                    <h3>{pillar.title}</h3>
                    <p>{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE SHOWCASE - CURATED MASTERPIECES */}
      <section className="portfolio-showcase" id="masterpieces-section">
        <div className="section-title-wrapper">
          <div className="eyebrow-accent center-eyebrow">
            <Sparkles size={16} />
            <span>EXQUISITE GALLERY</span>
          </div>
          <h2 className="showcase-title text-center">
            Curated Signature <span className="italic-accent">Masterpieces</span>
          </h2>
          <p className="showcase-lead text-center">
            Click on the dishes below to explore their visual artistry, exact botanical ingredients, complex taste profiles, and backstories.
          </p>
        </div>

        <div className="interactive-showcase-grid">
          {/* Left panel: Dish selector list */}
          <div className="showcase-selector-panel">
            <div className="selector-list-header">SELECT MASTERPIECE</div>
            <div className="selector-list" key={`dish-list-${currentChefIndex}`}>
              {chef.dishes.map((dish, index) => {
                const isActive = index === selectedDishIndex;
                return (
                  <button
                    key={dish.id}
                    className={`selector-row-item ${isActive ? "active-row" : ""}`}
                    onClick={() => setSelectedDishIndex(index)}
                  >
                    <span className="row-number">0{index + 1}</span>
                    <span className="row-title">{dish.title}</span>
                    <span className="row-arrow">
                      <ChevronRight size={18} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right panel: Active dish immersive details with elegant transitions */}
          <div className="showcase-presentation-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentChefIndex}-${selectedDishIndex}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="presentation-layout"
              >
                {/* Active Dish Image with Zoom */}
                <div className="presentation-visual-frame">
                  <motion.div
                    className="visual-outer-card"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="clip-reveal-overlay"
                      initial={{ clipPath: "inset(0 100% 0 0)" }}
                      animate={{ clipPath: "inset(0 0% 0 0)" }}
                      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <motion.img
                        src={activeDish.image}
                        alt={activeDish.title}
                        className="presentation-dish-img"
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                      />
                    </motion.div>
                    
                    {/* Spinning luxury circular badge overlapping the image */}
                    <div className="luxury-spinning-seal">
                      <svg viewBox="0 0 100 100" width="80" height="80">
                        <path
                          id="circlePath"
                          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                          fill="transparent"
                        />
                        <text fontStyle="normal" fontSize="7" fontWeight="600" letterSpacing="1.8" fill="#E0A94B">
                          <textPath href="#circlePath">
                            ANANDO FOODS • SIGNATURE COLLECTION • 
                          </textPath>
                        </text>
                      </svg>
                      <div className="seal-star">✦</div>
                    </div>

                    <div className="dish-stamp-tag">
                      <span>HANDCRAFTED</span>
                    </div>
                  </motion.div>
                </div>

                {/* Active Dish Flavor Profile & Ingredients */}
                <div className="presentation-detail-card">
                  <div className="active-tag-row">
                    <span className="signature-badge">SIGNATURE DICTIONARY</span>
                    <span className="dish-index-tag">NO. 0{selectedDishIndex + 1}</span>
                  </div>

                  <h3 className="active-dish-title">{activeDish.title}</h3>
                  <p className="active-dish-desc">{activeDish.desc}</p>

                  {/* Taste Meter Progress Bars */}
                  <div className="dish-taste-profile">
                    <h4 className="details-sub-heading">
                      <Compass size={14} />
                      <span>Sensory Flavor Profile</span>
                    </h4>
                    <div className="taste-bars-grid">
                      {activeDish.metrics.map((metric, i) => (
                        <div className="taste-bar-row" key={i}>
                          <div className="taste-label-row">
                            <span className="taste-name">{metric.name}</span>
                            <span className="taste-value">{metric.value}%</span>
                          </div>
                          <div className="taste-bar-bg">
                            <motion.div
                              className="taste-bar-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                              key={`${currentChefIndex}-${selectedDishIndex}-${i}`}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Raw Botanicals Ingredients Tags */}
                  <div className="dish-ingredients-row">
                    <h4 className="details-sub-heading">
                      <Layers size={14} />
                      <span>Key Botanical Elements</span>
                    </h4>
                    <div className="ingredients-pills">
                      {activeDish.ingredients.map((ing, i) => (
                        <span className="ing-pill" key={i}>
                          <Star size={10} className="pill-star" />
                          <span>{ing}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Chef's Emotional Note */}
                  <div className="dish-chef-quote">
                    <Heart size={14} className="heart-icon" />
                    <div>
                      <h5>CHEF'S CREATIVE NOTE</h5>
                      <p>"{activeDish.chefNote}"</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE ATELIER TOOLKIT */}
      <section className="portfolio-toolkit">
        <div className="toolkit-header">
          <div className="eyebrow-accent">
            <Sparkles size={16} />
            <span>KITCHEN ATELIER</span>
          </div>
          <h2 className="toolkit-title">
            The secret pillars <br />
            of our <span className="italic-accent">gastronomic toolkit</span>
          </h2>
        </div>

        <div className="toolkit-cards-grid" key={`toolkit-grid-${currentChefIndex}`}>
          {chef.toolkit.map((item, i) => (
            <motion.div
              className="toolkit-card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="card-top-accent">
                <span className="card-index">/0{i + 1}</span>
                <span className="card-line"></span>
              </div>
              <h3 className="card-title">{item.title}</h3>
              <h4 className="card-subtitle">{item.subtitle}</h4>
              <p className="card-description">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 5: TIMELINE & ACCOLADES */}
      <section className="portfolio-timeline">
        <div className="timeline-grid-layout">
          <div className="timeline-left-intro">
            <div className="sticky-intro-content" key={`timeline-left-${currentChefIndex}`}>
              <div className="eyebrow-accent">
                <Sparkles size={16} />
                <span>CHRONICLES</span>
              </div>
              <h2 className="timeline-section-title">
                The Journey of <br />
                <span className="italic-accent">Gastronomic Rise</span>
              </h2>
              <p className="timeline-lead">
                Tracing {chef.fullName}'s path from dedicated foundational years to a globally recognized innovator in luxury gastronomy at AnandoFoods.
              </p>

              {/* Awards Sidebar list */}
              <div className="timeline-awards-block">
                <h3>DISTINCTIONS & AWARDS</h3>
                <div className="awards-list">
                  {chef.awards.map((award, i) => (
                    <motion.div
                      className="award-item"
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <Star className="award-star-icon" size={14} />
                      <div className="award-info">
                        <span className="award-title-text">{award.title}</span>
                        <span className="award-source">{award.source}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-right-scrollable" key={`timeline-right-${currentChefIndex}`}>
            <div className="vertical-timeline-track">
              {chef.timeline.map((item, index) => (
                <motion.div
                  className="timeline-milestone-item"
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className="milestone-line-indicator">
                    <div className="milestone-dot">
                      <Star size={8} />
                    </div>
                  </div>
                  <div className="milestone-content-card">
                    <div className="milestone-meta-row">
                      <span className="milestone-year">{item.year}</span>
                      <span className="milestone-tag">{item.tag}</span>
                    </div>
                    <h3 className="milestone-title">{item.title}</h3>
                    <p className="milestone-desc">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: INVITATION CTA */}
      <section className="portfolio-cta">
        <motion.div
          className="cta-framed-card"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          key={`cta-card-${currentChefIndex}`}
        >
          <div className="cta-border-decoration"></div>
          <div className="cta-content-wrapper">
            <div className="cta-icon-badge">
              <UtensilsCrossed size={28} />
            </div>
            <h2 className="cta-title">
              Experience the Art <br />
              of <span className="italic-accent">Sensory Gastronomy</span>
            </h2>
            <p className="cta-desc">
              Join us at {chef.fullName}'s collaborative kitchen, where every recipe tells a story, and dining becomes a lifelong edible memory. Seats are highly limited.
            </p>
            <div className="cta-button-holder">
              <button
                className="btn-luxury-primary"
                onClick={() => {
                  window.location.href = "/contact";
                }}
              >
                <span>Request Reservation</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ChefPage;
