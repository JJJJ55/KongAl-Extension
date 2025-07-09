import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const CloseOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="bg-opacity-10 absolute inset-0 rounded-2xl bg-black/20 backdrop-blur-xs"
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
      className="fixed z-500 h-[56px] w-[56px] cursor-pointer rounded-2xl bg-cover bg-center bg-no-repeat"
      style={{
        bottom: '25px',
        right: '25px',
        backgroundImage: `url(${chrome.runtime.getURL('/assets/popup_getToken.png')})`,
      }}
    >
      <AnimatePresence> {isOpen && <CloseOverlay />}</AnimatePresence>
    </div>
  )
}
