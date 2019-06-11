import React, { createContext, useState } from 'react'

export const DEFAULT_BACKGROUND_COLOR = 'rgb(243, 190, 143)'

export const ColorContext = createContext({})

export const ColorProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState(
    DEFAULT_BACKGROUND_COLOR
  )

  return (
    <ColorContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      {children}
    </ColorContext.Provider>
  )
}
