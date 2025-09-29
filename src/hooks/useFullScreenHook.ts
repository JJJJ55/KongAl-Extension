import { useEffect, useState } from 'react'

export const useFullScreen = () => {
  const [isFull, setIsFull] = useState(false)

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        setIsFull(true)
      } else {
        setIsFull(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullScreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
    }
  }, [])

  return { isFull }
}
