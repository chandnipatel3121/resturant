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
import { NavProvider } from "./utils/NavContext"

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

  useEffect(() => {
    if (isHomePage) {
      document.documentElement.classList.add("home-page")
    } else {
      document.documentElement.classList.remove("home-page")
    }
  }, [isHomePage])

  return (
    <>
      <ScrollToTop />
      <NavProvider>
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
            {isHomePage && <Footer />}
          </main>
        </SmoothScroll>
      </NavProvider>
    </>
  )
}

function App() {
  // 🔄 Force scroll to top on refresh
  useEffect(() => {
    window.history.scrollRestoration = "manual"
    window.scrollTo(0, 0)
  }, [])

  return (
    <Router basename="/">
      <AppContent />
    </Router>
  )
}

export default App
