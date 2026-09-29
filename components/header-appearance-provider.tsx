"use client"

import { createContext, useContext, useMemo, useState } from "react"

type HeaderAppearanceContextValue = {
  forceSolid: boolean
  setForceSolid: (forceSolid: boolean) => void
}

const HeaderAppearanceContext = createContext<HeaderAppearanceContextValue | null>(
  null,
)

export function HeaderAppearanceProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [forceSolid, setForceSolid] = useState(false)
  const value = useMemo(
    () => ({ forceSolid, setForceSolid }),
    [forceSolid],
  )

  return (
    <HeaderAppearanceContext.Provider value={value}>
      {children}
    </HeaderAppearanceContext.Provider>
  )
}

export function useHeaderAppearance() {
  const context = useContext(HeaderAppearanceContext)

  if (!context) {
    return {
      forceSolid: false,
      setForceSolid: () => undefined,
    }
  }

  return context
}
