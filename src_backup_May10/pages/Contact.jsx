import React, { useEffect } from "react"
import ContactSection from "../sections/ContactSection"
import { useNav } from "../utils/NavContext"

const Contact = () => {
  const { setNavTheme } = useNav()
  useEffect(() => {
    setNavTheme('green')
  }, [setNavTheme])

  return (
    <div className="pt-20">
      <ContactSection />
    </div>
  )
}

export default Contact
