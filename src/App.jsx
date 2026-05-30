import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./sections/Footer"
import SmoothScroll from "./components/SmoothScroll"
import { NavProvider, useNav } from "./utils/NavContext"
import Popup from "./components/Popup"

import Home from "./pages/Home"
import Menu from "./pages/Menu"
import ChefPage from "./pages/Chefpage"
import ContactPage from "./pages/Contact"
import Gallery from "./pages/Gallery"
import Reservation from "./pages/Reservation"
import ScrollToTop from "./components/ScrollToTop"

function AppContent() {
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const isChefPage = location.pathname === "/chef"
  const isContactPage = location.pathname === "/contact"
  const { showPopup, setShowPopup } = useNav()

  useEffect(() => {
    if (isHomePage) {
      document.documentElement.classList.add("home-page")
    } else {
      document.documentElement.classList.remove("home-page")
    }
  }, [isHomePage])

  // 📱 Mobile Viewport Browser Address Bar Visibility & Animation Synchronization
  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    if (!isMobile) return

    const container = document.querySelector(".app-scroll-container")
    if (!container) return

    // Define read-only scroll property overrides on window to mirror scroll wrapper position
    try {
      Object.defineProperty(window, "scrollY", {
        get: () => container.scrollTop,
        configurable: true,
      })
      Object.defineProperty(window, "pageYOffset", {
        get: () => container.scrollTop,
        configurable: true,
      })
    } catch (e) {
      console.warn("Could not redefine scroll properties", e)
    }

    const handleScroll = () => {
      // Forward the inner scroll event to the window so Framer Motion useScroll registers it
      window.dispatchEvent(new Event("scroll"))
    }

    container.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      container.removeEventListener("scroll", handleScroll)
      try {
        delete window.scrollY
        delete window.pageYOffset
      } catch (e) {}
    }
  }, [location.pathname])

  return (
    <div className={`app-scroll-container ${isHomePage ? "home-page-scroll" : ""} ${isContactPage ? "contact-page-scroll" : ""}`}>
      <ScrollToTop />
      <SmoothScroll>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/chef" element={<ChefPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reservation" element={<Reservation />} />
          </Routes>
        </main>
      </SmoothScroll>
      {location.pathname !== "/gallery" && location.pathname !== "/contact" && location.pathname !== "/chef" && <Footer />}
      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  )
}

function App() {
  // 🔄 Force scroll to top on refresh
  useEffect(() => {
    window.history.scrollRestoration = "manual"

    const resetScroll = () => {
      window.scrollTo(0, 0)
      const container = document.querySelector(".app-scroll-container")
      if (container) {
        container.scrollTop = 0
      }
    }

    resetScroll()
    const timer = setTimeout(resetScroll, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Router basename="/">
      <NavProvider>
        <AppContent />
      </NavProvider>
    </Router>
  )
}

export default App
