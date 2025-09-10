import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { SubjectPage } from './subject/SubjectPage'
import { BottomNavBar } from './subject/BottomNavbar'
import { SettingPage } from './setting/SettingPage'
import { useMemo, useState } from 'react'
import { useStoragestore } from '@/store/useStorageStore'
import ToastComponent from '@/components/ToastComponent'
import { useThemeCheck } from '@/hooks/useThemeHook'

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

export const MainModal = ({ isLoading }: { isLoading: boolean }) => {
  const [activeType, setActiveType] = useState<'subjects' | 'settings'>('subjects')
  const { mainRef } = useThemeCheck()
  const { system } = useStoragestore()

  const ActiveContent = useMemo(() => {
    return activeType === 'subjects' ? <SubjectPage isLoading={isLoading} /> : <SettingPage />
  }, [activeType, isLoading])

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="bg-bgColor fixed z-500 h-[600px] w-[350px] origin-bottom-right overflow-hidden rounded-3xl shadow-[0_0_100px_0_rgba(0,0,0,0.2)] backdrop-blur-sm"
      style={{
        boxShadow: ' 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        ...(system.pos === 'tl' && { top: '96px', left: '25px' }),
        ...(system.pos === 'tr' && { top: '96px', right: '25px' }),
        ...(system.pos === 'bl' && { bottom: '96px', left: '25px' }),
        ...(system.pos === 'br' && { bottom: '96px', right: '25px' }),
      }}
    >
      <div ref={mainRef} className="dark:bg-dark flex h-full flex-col transition-colors duration-500">
        {ActiveContent}
        <BottomNavBar activeType={activeType} setActiveType={setActiveType} />
        <ToastComponent />
      </div>
    </motion.div>
  )
}
