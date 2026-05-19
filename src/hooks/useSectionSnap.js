import { useEffect, useRef, useCallback } from "react"

/**
 * useSectionSnap
 * When the target section crosses the snap threshold, it smoothly
 * scrolls the section's top edge to the viewport top.
 *
 * @param {number} threshold  - fraction of section visible to trigger (0–1), default 0.45
 * @param {number} cooldown   - ms before snapping again after snap, default 900
 */
export function useSectionSnap(threshold = 0.45, cooldown = 900) {
  const ref = useRef(null)
  const isSnapping = useRef(false)
  const lastSnapTime = useRef(0)

  const snapToSection = useCallback(() => {
    if (!ref.current) return
    const now = Date.now()
    if (isSnapping.current || now - lastSnapTime.current < cooldown) return

    const rect = ref.current.getBoundingClientRect()
    // Only snap if we're scrolling towards the section (top approaching 0)
    if (rect.top > -80 && rect.top < window.innerHeight * 0.6) {
      isSnapping.current = true
      lastSnapTime.current = now

      const targetScrollY = window.scrollY + rect.top
      window.scrollTo({ top: targetScrollY, behavior: "smooth" })

      // Release snap lock after animation completes
      setTimeout(() => {
        isSnapping.current = false
      }, cooldown + 200)
    }
  }, [cooldown])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            snapToSection()
          }
        })
      },
      {
        threshold: [threshold],
        rootMargin: "0px 0px 0px 0px",
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, snapToSection])

  return ref
}
