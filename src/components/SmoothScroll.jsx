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

    document.querySelectorAll("section[id]").forEach((s) =>
      visibilityObserver.observe(s)
    )

    const isHomePage = location.pathname === "/"
    const isDesktop = window.innerWidth >= 1024

    if (!isHomePage || !isDesktop) {
      return () => {
        visibilityObserver.disconnect()
        // Aggressive cleanup: Kill any active ScrollTriggers globally on navigating away
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }

    let scrollSnapTrigger = null

    // Dynamic targets calculation for custom layouts
    const getScrollTargets = () => {
      const vh = window.innerHeight
      const targets = [0, 1.5 * vh]

      // Snaps for all subsequent page sections after the Hero
      const sections = Array.from(document.querySelectorAll("section[id]"))
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

    const setupTrigger = () => {
      const targets = getScrollTargets()

      scrollSnapTrigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        snap: {
          snapTo: (progress, self) => {
            const maxScroll = ScrollTrigger.maxScroll(window)
            if (maxScroll <= 0) return progress

            const snapProgresses = targets.map((t) => Math.min(Math.max(t / maxScroll, 0), 1))
            const currentScroll = window.scrollY
            const currentProgress = currentScroll / maxScroll

            // If past the last section's snap target, allow natural scroll into the footer
            const lastProgress = snapProgresses[snapProgresses.length - 1]
            if (currentProgress > lastProgress + 0.005) {
              return progress
            }

            // Find the index of the currently active snap target
            let activeIndex = 0
            let minDiff = Infinity
            for (let i = 0; i < snapProgresses.length; i++) {
              const diff = Math.abs(snapProgresses[i] - currentProgress)
              if (diff < minDiff) {
                minDiff = diff
                activeIndex = i
              }
            }

            // 1. Scrolling Down (self.direction === 1)
            if (self.direction === 1) {
              const nextIndex = Math.min(activeIndex + 1, snapProgresses.length - 1)
              const dist = snapProgresses[nextIndex] - snapProgresses[activeIndex]
              if (dist > 0) {
                // Must scroll past 20% of the section distance to transition
                const threshold = snapProgresses[activeIndex] + 0.20 * dist
                return progress > threshold ? snapProgresses[nextIndex] : snapProgresses[activeIndex]
              }
              return snapProgresses[activeIndex]
            }

            // 2. Scrolling Up (self.direction === -1)
            if (self.direction === -1) {
              const prevIndex = Math.max(activeIndex - 1, 0)
              const dist = snapProgresses[activeIndex] - snapProgresses[prevIndex]
              if (dist > 0) {
                // Must scroll up past 20% of the section distance to transition
                const threshold = snapProgresses[activeIndex] - 0.20 * dist
                return progress < threshold ? snapProgresses[prevIndex] : snapProgresses[activeIndex]
              }
              return snapProgresses[activeIndex]
            }

            return progress
          },
          duration: { min: 0.4, max: 0.8 },
          ease: "power2.out"
        }
      })
    }

    // Allow DOM to settle before gathering dimensions
    const timer = setTimeout(setupTrigger, 200)

    return () => {
      visibilityObserver.disconnect()
      clearTimeout(timer)
      if (scrollSnapTrigger) {
        scrollSnapTrigger.kill()
      }
      // Aggressive cleanup: Kill any active ScrollTriggers globally on navigating away
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [location.pathname])

  return <>{children}</>
}

export default SmoothScroll
