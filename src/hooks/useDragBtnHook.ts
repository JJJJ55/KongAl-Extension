import { useStoragestore } from '@/store/useStorageStore'
import { useState } from 'react'

export const useDragBtn = () => {
  const { system, updateData } = useStoragestore()
  const [isDragging, setIsDragging] = useState(false)
  const [activeCorner, setActiveCorner] = useState<'tl' | 'tr' | 'bl' | 'br'>(system.pos)

  const handleDragEnd = (info: { point: { x: number; y: number } }) => {
    const { x, y } = info.point
    const midX = window.innerWidth / 2
    const midY = window.innerHeight / 2

    if (x < midX && y < midY) {
      updateData('system', prev => ({ ...prev, pos: 'tl' }))
    } else if (x >= midX && y < midY) {
      updateData('system', prev => ({ ...prev, pos: 'tr' }))
    } else if (x < midX && y >= midY) {
      updateData('system', prev => ({ ...prev, pos: 'bl' }))
    } else {
      updateData('system', prev => ({ ...prev, pos: 'br' }))
    }
  }

  const handleOnDrag = (info: { point: { x: number; y: number } }) => {
    const { x, y } = info.point
    const midX = window.innerWidth / 2
    const midY = window.innerHeight / 2
    let newCorner = system.pos

    if (x < midX && y < midY) newCorner = 'tl'
    else if (x >= midX && y < midY) newCorner = 'tr'
    else if (x < midX && y >= midY) newCorner = 'bl'
    else newCorner = 'br'

    if (newCorner !== activeCorner) {
      setActiveCorner(newCorner) // 변경될 때만 리렌더
    }
  }

  return { handleDragEnd, handleOnDrag, isDragging, setIsDragging, activeCorner }
}
