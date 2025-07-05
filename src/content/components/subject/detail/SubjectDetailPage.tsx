import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { DetailTopNav } from './DetailTopNav'
import { DetailBottomNav } from './DetailBottomNav'
import { DetailPlay } from './DetailPlay'
import { DetailBoard } from './DetailBoard'
import { DetailReport } from './DetailReport'

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 12, mass: 0.1 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { type: 'spring', stiffness: 300, damping: 12, mass: 0.1 },
  },
}

export const SubjectDetailPage = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="flex h-full flex-col"
    >
      <DetailTopNav onClick={onClick} />
      {/* <DetailPlay /> */}
      <DetailBoard />
      {/* <DetailReport /> */}
      <DetailBottomNav />
    </motion.div>
  )
}
