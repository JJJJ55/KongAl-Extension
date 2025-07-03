import { AnimatePresence } from 'framer-motion'
import { ModalButton } from './ModalButton'
import { MainModal } from './MainModal'
import { useState } from 'react'

export const Content = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModalOpen = () => setIsOpen(prev => !prev)
  return (
    <>
      <ModalButton isOpen={isOpen} onClick={toggleModalOpen} />
      <AnimatePresence>{isOpen && <MainModal />}</AnimatePresence>
    </>
  )
}
