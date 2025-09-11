import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { SubjectDetailPage } from './detail/SubjectDetailPage'
import { LoadingSkeleton } from './LoadingSkeleton'
import { NotFound } from './NotFound'
import { SubjectCard } from './SubjectCard'
import { TopNavBar } from './TopNavbar'
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
              Object.entries(contents.courseList).map(([courseId, course], idx) => (
                <SubjectCard
                  index={idx}
                  key={courseId}
                  color={idx % 2 === 0 ? 'bg-knuBlue' : 'bg-knuGreen'}
                  data={course}
                  onClick={() => handleDetailModal([courseId, course])}
                />
              ))
            ) : (
              <NotFound />
            )}
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
