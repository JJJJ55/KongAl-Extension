import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 12, mass: 0.5 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { type: 'spring', stiffness: 150, damping: 18, mass: 0.5 },
  },
}

export const MainModal = () => {
  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="bg-kongju fixed z-500 h-[600px] w-[350px] origin-bottom-right overflow-hidden rounded-[36px]"
      style={{ bottom: '96px', right: '25px' }}
    >
      <div className="p-4">
        <button>토큰 생성 테스트</button>
        <div></div>
        <button>토큰 생성 테스트</button> <div></div>
        <button>토큰 생성 테스트</button> <div></div>
        <button>토큰 생성 테스트</button> <div></div>
        <button>토큰 생성 테스트</button>
      </div>
    </motion.div>
  )
}
