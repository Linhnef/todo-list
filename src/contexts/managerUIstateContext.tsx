import * as React from "react"

export const ManagerUIstateContext = React.createContext<{ isCloseSodeMenu: boolean; change: () => void }>({
  isCloseSodeMenu: false,
  change: () => {},
})

interface contextChildren {
  children: any
}
export const ManagerUIstateProvider = (props: contextChildren) => {
  const [isCloseSodeMenu, setIsCloseSodeMenu] = React.useState<boolean>(false)
  const change = () => {
    setIsCloseSodeMenu(!isCloseSodeMenu)
  }
  const value: {
    isCloseSodeMenu: boolean
    change: () => void
  } = {
    isCloseSodeMenu: isCloseSodeMenu,
    change: change,
  }

  return <ManagerUIstateContext.Provider value={value}>{props.children}</ManagerUIstateContext.Provider>
}
