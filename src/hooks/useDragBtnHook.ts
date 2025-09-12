import { useState } from 'react'
import { useStoragestore } from '@/store/useStorageStore'

export const useDragBtn = () => {
  const { system } = useStoragestore()
  const [isDragging, setIsDragging] = useState(false)
  const [activeCorner, setActiveCorner] = useState<'tl' | 'tr' | 'bl' | 'br'>(system.pos)

  const handleOnDrag = (x: number, y: number) => {
    const midX = window.innerWidth / 2
    const midY = window.innerHeight / 2
    let newCorner = system.pos

    x = Math.abs(x)
    y = Math.abs(y)

    if (system.pos === 'tl') {
      if (x < midX && y < midY) newCorner = 'tl'
      else if (x >= midX && y < midY) newCorner = 'tr'
      else if (x < midX && y >= midY) newCorner = 'bl'
      else newCorner = 'br'
    } else if (system.pos === 'tr') {
      if (x > midX && y < midY) newCorner = 'tl'
      else if (x <= midX && y < midY) newCorner = 'tr'
      else if (x > midX && y >= midY) newCorner = 'bl'
      else newCorner = 'br'
    } else if (system.pos === 'bl') {
      if (x < midX && y > midY) newCorner = 'tl'
      else if (x >= midX && y > midY) newCorner = 'tr'
      else if (x < midX && y <= midY) newCorner = 'bl'
      else newCorner = 'br'
    } else if (system.pos === 'br') {
      if (x > midX && y > midY) newCorner = 'tl'
      else if (x <= midX && y > midY) newCorner = 'tr'
      else if (x > midX && y <= midY) newCorner = 'bl'
      else newCorner = 'br'
    }

    if (newCorner !== activeCorner) {
      setActiveCorner(newCorner) // 변경될 때만 리렌더
    }
  }

  return { handleOnDrag, isDragging, setIsDragging, activeCorner }
}
