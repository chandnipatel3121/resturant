import React, { createContext, useContext, useState } from "react"

const NavContext = createContext({ 
  pastHero: false, 
  setPastHero: () => { },
  navTheme: 'yellow',
  setNavTheme: () => { }
})

export const NavProvider = ({ children }) => {
  const [pastHero, setPastHero] = useState(false)
  const [navTheme, setNavTheme] = useState('yellow')

  return (
    <NavContext.Provider value={{ pastHero, setPastHero, navTheme, setNavTheme }}>
      {children}
    </NavContext.Provider>
  )
}

export const useNav = () => useContext(NavContext)
