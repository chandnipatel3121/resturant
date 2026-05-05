import React, { useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useNav } from "../utils/NavContext"
import "../styles/components/Navbar.css"

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { navTheme, pastHero } = useNav()
  const navigate = useNavigate()

  const navLinks = [
    { label: "Restaurant", path: "/" },
    { label: "Menu", path: "/menu" },
    { label: "Chef", path: "/about" },
    { label: "Contact", path: "/contact" },
  ]

  const isLight = pastHero && navTheme === 'green'

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`navbar ${isLight ? "navbar-light" : "navbar-dark"}`}
      >
        <div className="nav-container">

          {/* Logo */}
          <div className="nav-logo-wrapper">
            <Link
              to="/"
              className={`nav-logo nav-logo-${navTheme}`}
            >
              Restro
            </Link>
          </div>

          {/* Center Nav Links */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`nav-link nav-link-${navTheme}`}
              >
                {link.label}
                <span className="nav-link-line" />
              </Link>
            ))}
          </div>

          {/* Right: Reservation CTA */}
          <div className="nav-cta-wrapper">
            <button
              onClick={() => navigate("/reservation")}
              className={`nav-btn nav-btn-${navTheme}`}
            >
              Reservation
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="mobile-toggle">
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className={`mobile-toggle-btn mobile-toggle-${navTheme}`}
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -16, pointerEvents: "none" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mobile-menu-drawer"
      >
        <div className="mobile-nav-list">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="mobile-nav-link"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { navigate("/contact"); setMobileOpen(false) }}
            className="mobile-nav-btn"
          >
            Reservation
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default Navbar
