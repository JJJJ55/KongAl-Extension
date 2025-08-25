import { useState } from 'react'
import { LoadingSkeleton } from './LoadingSkeleton'
import { NotFound } from './NotFound'
import { SubjectCard } from './SubjectCard'
import { TopNavBar } from './TopNavbar'
import { useStoragestore } from '@/store/useStorageStore'
import { AnimatePresence } from 'framer-motion'
import { SubjectDetailPage } from './detail/SubjectDetailPage'
import type { CourseItem } from '@/types'
import { UpdateIssue } from '@/utils/UpdateData'

export const SubjectPage = () => {
  const [data, setData] = useState<[string, CourseItem] | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { settings, contents, updateData } = useStoragestore()

  const ToggleModal = () => {
    setIsOpen(prev => !prev)
  }

  const handleDetailModal = (value: [string, CourseItem] | null) => {
    setData(value)
    ToggleModal()
  }

  const testGetIssue = () => {
    const ids = Object.keys(contents.courseList)
    chrome.runtime.sendMessage({ type: 'USER_ISSUE', token: settings.siteToken, ids }, response => {
      if (response.success) {
        UpdateIssue({ contents, itemData: response.data, updateAt: settings.updateAt, updateFn: updateData })
      } else {
        window.alert('실패')
      }
    })
  }

  const handleGetSubject = () => {
    setIsLoading(true)
    chrome.runtime.sendMessage({ type: 'USER_SUBJECT', token: settings.siteToken }, response => {
      if (response.success) {
        const newCourseList: Record<string, CourseItem> = {}
        for (const data of response.data) {
          const { id, name, teachers } = data
          newCourseList[id] = {
            title: name,
            teacher:
              teachers.length > 1 ? `${teachers[0].display_name} 등 ${teachers.length}인` : teachers[0].display_name,
            isReport: 0,
            isPlay: 0,
            isBoard: 0,
          }
        }
        updateData('contents', prev => ({ ...prev, courseList: { ...newCourseList } }))
      } else {
        window.alert('올바른 토큰이 아닙니다. 다시 확인해주세요.')
        console.log(response)
        //토스트 메세지
      }
    })
    setIsLoading(false)
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <SubjectDetailPage data={data} onClick={() => ToggleModal()} />
      ) : (
        <>
          <TopNavBar onClick={handleGetSubject} onIssueTest={testGetIssue} />
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
