import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { SubjectDetailPage } from './detail/SubjectDetailPage'
import { LoadingSkeleton } from './LoadingSkeleton'
import { NotFound } from './NotFound'
import { SubjectCard } from './SubjectCard'
import { TopNavBar } from './TopNavbar'
import { NoticeIcon } from '@/components'
import { useStoragestore } from '@/store/useStorageStore'
import type { CourseItem } from '@/types'

export const SubjectPage = ({ isLoading }: { isLoading: boolean }) => {
  const [data, setData] = useState<[string, CourseItem] | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { contents } = useStoragestore()

  const ToggleModal = () => {
    setIsOpen(prev => !prev)
  }

  const handleDetailModal = (value: [string, CourseItem] | null) => {
    setData(value)
    ToggleModal()
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <SubjectDetailPage data={data} onClick={() => ToggleModal()} />
      ) : (
        <>
          <TopNavBar />
          <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
            {isLoading ? (
              <LoadingSkeleton />
            ) : Object.keys(contents.courseList).length ? (
              <>
                <div className="flex w-[300px] items-center gap-[5px] py-1">
                  <NoticeIcon className="h-[20px] w-[20px]" />
                  <a
                    href="https://www.notion.so/325faec81a4280adb040ff6b594e8088?source=copy_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-bold"
                  >
                    [공지] 주차학습 서비스 중지 안내드립니다.
                  </a>
                </div>
                {Object.entries(contents.courseList).map(([courseId, course], idx) => (
                  <SubjectCard
                    index={idx}
                    key={courseId}
                    color={idx % 2 === 0 ? 'bg-knuBlue' : 'bg-knuGreen'}
                    data={course}
                    onClick={() => handleDetailModal([courseId, course])}
                  />
                ))}
              </>
            ) : (
              <NotFound />
            )}
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
