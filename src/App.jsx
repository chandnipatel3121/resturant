import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./sections/Footer"
import SmoothScroll from "./components/SmoothScroll"
import { NavProvider } from "./utils/NavContext"

import Home from "./pages/Home"
import Menu from "./pages/Menu"
import About from "./pages/About"
import Contact from "./pages/Contact"
import ScrollToTop from "./components/ScrollToTop"

function AppContent() {
  const location = useLocation()
  const isMenuPage = location.pathname === "/menu"

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
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          {!isMenuPage && <Footer />}
        </SmoothScroll>
      </NavProvider>
    </>
  )
}

function App() {
  // 🔄 Force scroll to top on refresh
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  return (
    <Router basename="/">
      <AppContent />
    </Router>
  )
}

export default App

