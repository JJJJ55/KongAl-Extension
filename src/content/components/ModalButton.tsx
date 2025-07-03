import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const CloseOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="bg-opacity-30 absolute inset-0 bg-black backdrop-blur-sm"
  >
    <div className="absolute inset-0 flex items-center justify-center text-white">
      <X size={24} />
    </div>
  </motion.div>
)

export const ModalButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="fixed right-2 bottom-2 z-500 h-[56px] w-[56px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${chrome.runtime.getURL('/assets/popup_getToken.png')})` }}
    >
      <AnimatePresence> {isOpen && <CloseOverlay />}</AnimatePresence>
    </div>
  )
}
