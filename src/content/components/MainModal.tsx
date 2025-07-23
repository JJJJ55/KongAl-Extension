import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { SubjectPage } from './subject/SubjectPage'
import { BottomNavBar } from './subject/BottomNavbar'
import { SettingPage } from './setting/SettingPage'
import { useMemo, useState } from 'react'

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
  const [activeType, setActiveType] = useState<'subjects' | 'settings'>('subjects')

  const ActiveContent = useMemo(() => {
    return activeType === 'subjects' ? <SubjectPage /> : <SettingPage />
  }, [activeType])

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="bg-bgColor fixed z-500 h-[600px] w-[350px] origin-bottom-right overflow-hidden rounded-3xl shadow-[0_0_100px_0_rgba(0,0,0,0.2)] backdrop-blur-sm"
      style={{ boxShadow: ' 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)', bottom: '96px', right: '25px' }}
    >
      <div className="flex h-full flex-col">
        {ActiveContent}
        <BottomNavBar activeType={activeType} setActiveType={setActiveType} />
      </div>
    </motion.div>
  )
}
