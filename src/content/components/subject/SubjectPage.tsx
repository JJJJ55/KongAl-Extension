import { useState } from 'react'
import { LoadingSkeleton } from './LoadingSkeleton'
import { NotFound } from './NotFound'
import { SubjectCard } from './SubjectCard'
import { TopNavBar } from './TopNavbar'
import { useStoragestore } from '@/store/useStorageStore'
import { AnimatePresence } from 'framer-motion'
import { SubjectDetailPage } from './detail/SubjectDetailPage'
import type { CourseItem } from '@/types'

export const SubjectPage = () => {
  const [data, setData] = useState<[string, CourseItem] | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { settings, contents, updateData } = useStoragestore()

  const ToggleModal = (value: [string, CourseItem] | null) => {
    setIsOpen(prev => !prev)
    setData(value)
  }

  const testGetIssue = () => {
    chrome.runtime.sendMessage({ type: 'USER_ISSUE', token: settings.siteToken }, response => {
      if (response.success) {
        console.log('a')
      } else {
        window.alert('실패')
      }
    })
  }

  const handleGetSubject = () => {
    setIsLoading(true)
    chrome.runtime.sendMessage({ type: 'USER_SUBJECT', token: settings.siteToken }, response => {
      if (response.success) {
        // const res = response.data.map(data => {
        //   const { id, name, teachers } = data
        //   if (teachers.length > 1) {
        //     return { courseId: id, title: name, teacher: `${teachers[0].display_name} 등 ${teachers.length}인` }
        //   } else {
        //     return { courseId: id, title: name, teacher: teachers[0].display_name }
        //   }
        // })
        // updateData('contents', prev => ({ ...prev, courseList: res }))
        // console.log(res)
        const newCourseList: Record<string, { title: string; teacher: string }> = {}
        for (const data of response.data) {
          const { id, name, teachers } = data
          newCourseList[id] = {
            title: name,
            teacher:
              teachers.length > 1 ? `${teachers[0].display_name} 등 ${teachers.length}인` : teachers[0].display_name,
          }
          // if (teachers.length > 1) {
          //   updateData('contents', prev => ({
          //     ...prev,
          //     courseList: {
          //       ...prev.courseList,
          //       [id]: { title: name, teacher: `${teachers[0].display_name} 등 ${teachers.length}인` },
          //     },
          //   }))
          // } else {
          //   updateData('contents', prev => ({
          //     ...prev,
          //     courseList: {
          //       ...prev.courseList,
          //       [id]: { title: name, teacher: teachers[0].display_name },
          //     },
          //   }))
          // }
        }
        updateData('contents', prev => ({ ...prev, courseList: { ...prev.courseList, ...newCourseList } }))
      } else {
        window.alert('올바른 토큰이 아닙니다. 다시 확인해주세요.')
        //토스트 메세지
      }
    })
    setIsLoading(false)
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <SubjectDetailPage data={data} onClick={() => ToggleModal(null)} />
      ) : (
        <>
          <TopNavBar onClick={handleGetSubject} onIssueTest={testGetIssue} />
          <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
            {isLoading ? (
              <LoadingSkeleton />
            ) : Object.keys(contents.courseList).length ? (
              Object.entries(contents.courseList).map(([courseId, course]) => (
                <SubjectCard key={courseId} data={course} onClick={() => ToggleModal([courseId, course])} />
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
