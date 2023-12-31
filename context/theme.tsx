'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface IThemeContext {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

const ThemeContext = createContext<IThemeContext>({
  theme: 'dark',
  setTheme: () => {},
})

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('dark')
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.className = 'dark'
    } else {
      document.documentElement.className = 'light'
    }
  }, [theme])
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => useContext(ThemeContext)
