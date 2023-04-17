import { useState, useEffect } from "react"

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const width = window.innerWidth
    const isMobile = width < 768 ? true : false
    if (isMobile) {
      setIsMobile(true)
    }
  }, [])

  return isMobile
}

export default useIsMobile
