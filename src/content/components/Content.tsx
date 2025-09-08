import { AnimatePresence } from 'framer-motion'
import { ModalButton } from './ModalButton'
import { MainModal } from './MainModal'
import { useState } from 'react'

export const Content = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDataLoading = (isFlag: boolean) => setIsLoading(isFlag)

  const toggleModalOpen = () => setIsOpen(prev => !prev)
  return (
    <>
      <ModalButton isOpen={isOpen} onClick={toggleModalOpen} onLoading={handleDataLoading} />
      <AnimatePresence>{isOpen && <MainModal isLoading={isLoading} />}</AnimatePresence>
    </>
  )
}
