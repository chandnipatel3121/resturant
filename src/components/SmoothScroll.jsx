import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

const SmoothScroll = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    /* ── IntersectionObserver: .is-visible for CSS reveal animations ── */
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible")
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll("section[id], footer").forEach((s) =>
      visibilityObserver.observe(s)
    )

    /* ── Dynamic Snapping Controller with Three-Phase Snapping ── */
    const handleScroll = () => {
      const hero = document.getElementById("hero-section")
      if (!hero) {
        document.documentElement.classList.remove("snap-peak-only", "snap-mid-only", "snap-all-sections")
        return
      }

      const vh = window.innerHeight
      const currentScroll = window.scrollY
      const isDesktop = window.innerWidth >= 1024

      if (!isDesktop) {
        document.documentElement.classList.remove("snap-peak-only", "snap-mid-only", "snap-all-sections")
        return
      }

      const hasSnap = document.documentElement.classList.contains("snap-peak-only") ||
        document.documentElement.classList.contains("snap-mid-only") ||
        document.documentElement.classList.contains("snap-all-sections")

      // 1. Determine if snap should be active (hysteresis logic)
      let nextSnapActive = hasSnap
      if (hasSnap) {
        // Upward deactivation threshold: disable snap below 2.05vh to allow smooth free scroll entry back to Hero
        if (currentScroll < 2.05 * vh) {
          nextSnapActive = false
        }
      } else {
        // Downward activation threshold: enable snap past 1.8vh as the user exits the interactive Hero zone
        if (currentScroll >= 1.8 * vh) {
          nextSnapActive = true
        }
      }

      // 2. Apply snapping states
      if (!nextSnapActive) {
        document.documentElement.classList.remove("snap-peak-only", "snap-mid-only", "snap-all-sections")
      } else {
        // Map currentScroll position to the correct transition phase
        if (currentScroll < 2.6 * vh) {
          // Phase 1 (Peak): Snaps only to #hero-snap-peak (240vh)
          document.documentElement.classList.add("snap-peak-only")
          document.documentElement.classList.remove("snap-mid-only", "snap-all-sections")
        } else if (currentScroll < 2.95 * vh) {
          // Phase 2 (Mid): Snaps only to #hero-snap-mid (280vh)
          document.documentElement.classList.add("snap-mid-only")
          document.documentElement.classList.remove("snap-peak-only", "snap-all-sections")
        } else {
          // Phase 3 (Full/Downstream): Snaps sequentially to DishShowcase (320vh) and downstream sections
          document.documentElement.classList.add("snap-all-sections")
          document.documentElement.classList.remove("snap-peak-only", "snap-mid-only")
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Trigger once initially

    return () => {
      visibilityObserver.disconnect()
      window.removeEventListener("scroll", handleScroll)
      document.documentElement.classList.remove("snap-peak-only", "snap-mid-only", "snap-all-sections")
    }
  }, [location.pathname])

  return <>{children}</>
}

export default SmoothScroll
