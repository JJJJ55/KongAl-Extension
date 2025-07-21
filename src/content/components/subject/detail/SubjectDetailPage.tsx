import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { DetailTopNav } from './DetailTopNav'
import { DetailBottomNav } from './DetailBottomNav'
import { DetailPlay } from './DetailPlay'
import { DetailBoard } from './DetailBoard'
import { DetailReport } from './DetailReport'
import { useMemo, useState } from 'react'
import type { CourseItem } from '@/types'

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

export const SubjectDetailPage = ({ data, onClick }: { data: [string, CourseItem] | null; onClick: () => void }) => {
  const [activeType, setActiveType] = useState<'play' | 'board' | 'report'>('play')

  const ActiveContent = useMemo(() => {
    return activeType === 'play' ? (
      <DetailPlay courseId={data?.[0]} />
    ) : activeType === 'board' ? (
      <DetailBoard courseId={data?.[0]} />
    ) : (
      <DetailReport courseId={data?.[0]} />
    )
  }, [activeType])

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="flex h-full flex-col"
    >
      <DetailTopNav title={data?.[1].title} teacher={data?.[1].teacher} onClick={onClick} />
      {ActiveContent}
      <DetailBottomNav activeType={activeType} setActiveType={setActiveType} />
    </motion.div>
  )
}
