import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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
      {
        root: window.innerWidth < 1024 ? document.querySelector(".app-scroll-container") : null,
        threshold: 0.15
      }
    )

    document.querySelectorAll("section[id], footer").forEach((s) =>
      visibilityObserver.observe(s)
    )

    const isHomePage = location.pathname === "/"
    const isDesktop = window.innerWidth >= 1024

    if (!isHomePage || !isDesktop) {
      return () => {
        visibilityObserver.disconnect()
      }
    }

    // Dynamic targets calculation for custom layouts
    const getScrollTargets = () => {
      const vh = window.innerHeight
      const targets = []

      // Snaps for all subsequent page sections after the Hero
      const sections = Array.from(document.querySelectorAll("section[id], footer"))
      sections.forEach((sec) => {
        if (sec.id === "hero-section") return
        const rect = sec.getBoundingClientRect()
        const top = rect.top + window.scrollY

        // Only target downstream sections (starting from DishShowcase at ~300dvh)
        if (top >= 2.8 * vh) {
          targets.push(top)
        }
      })

      // Clean duplicate coordinates
      const uniqueTargets = []
      targets.sort((a, b) => a - b).forEach((t) => {
        if (uniqueTargets.length === 0 || Math.abs(uniqueTargets[uniqueTargets.length - 1] - t) > 50) {
          uniqueTargets.push(t)
        }
      })

      return uniqueTargets
    }

    // Set up GSAP snapping based on calculated targets
    const ctx = gsap.context(() => {
      const targets = getScrollTargets()

      const setupTrigger = () => {
        const maxScroll = ScrollTrigger.maxScroll(window)
        if (maxScroll <= 0) return

        const snapProgresses = targets.map((t) => Math.min(Math.max(t / maxScroll, 0), 1))

        ScrollTrigger.create({
          start: 0,
          end: "max",
          snap: {
            snapTo: (progress) => {
              const firstSnapProgress = snapProgresses[0]

              // If the scroll position is inside the Hero section, bypass snapping completely
              if (progress < firstSnapProgress - 0.05) {
                return progress
              }

              let closest = snapProgresses[0]
              let minDiff = Infinity
              for (let i = 0; i < snapProgresses.length; i++) {
                const diff = Math.abs(snapProgresses[i] - progress)
                if (diff < minDiff) {
                  minDiff = diff
                  closest = snapProgresses[i]
                }
              }
              return closest
            },
            duration: 0.3,
            ease: "none"
          }
        })
      }

      // Allow DOM to settle before gathering dimensions
      const timer = setTimeout(setupTrigger, 200)
      return () => clearTimeout(timer)
    })

    return () => {
      visibilityObserver.disconnect()
      ctx.revert()
    }
  }, [location.pathname])

  return <>{children}</>
}

export default SmoothScroll
