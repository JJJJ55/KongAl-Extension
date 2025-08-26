import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { DetailTopNav } from './DetailTopNav'
import { DetailBottomNav } from './DetailBottomNav'
import { DetailPlay } from './DetailPlay'
import { DetailBoard } from './DetailBoard'
import { DetailReport } from './DetailReport'
import { useMemo, useState } from 'react'
import type { CourseItem, PlayItem } from '@/types'
import { useStoragestore } from '@/store/useStorageStore'
import { toast } from 'react-toastify'
import { UpdatePlay } from '@/utils/UpdateData'

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

  const { contents, updateData } = useStoragestore()
  const handleGetPlay = (id: string) => {
    chrome.runtime.sendMessage({ type: 'SUBJECT_LIST', id }, response => {
      if (response.success) {
        UpdatePlay({ itemData: response.data, contents, id, updateFn: updateData })
        toast.success('학습 정보를 가져왔어요!', { icon: false })
      } else {
        toast.error('학습 정보 업데이트를 실패했어요.', { icon: false })
      }
    })
  }

  const ActiveContent = useMemo(() => {
    return activeType === 'play' ? (
      <DetailPlay courseId={data![0]} />
    ) : activeType === 'board' ? (
      <DetailBoard courseId={data![0]} />
    ) : (
      <DetailReport courseId={data![0]} />
    )
  }, [activeType])

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="bg-bgColor dark:bg-dark fixed z-500 h-[600px] w-[350px] origin-bottom-right overflow-hidden rounded-3xl shadow-[0_0_100px_0_rgba(0,0,0,0.2)] backdrop-blur-sm transition-colors duration-500"
    >
      <main className="flex flex-col h-full">
        <DetailTopNav
          title={data![1].title}
          teacher={data![1].teacher}
          onClick={onClick}
          onGet={() => handleGetPlay(data![0])}
        />
        {ActiveContent}
        <DetailBottomNav dId={data![0]} activeType={activeType} setActiveType={setActiveType} />
      </main>
    </motion.div>
  )
}
