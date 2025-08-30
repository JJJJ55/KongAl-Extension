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
  const { system, settings, contents, updateData } = useStoragestore()

  const ToggleModal = () => {
    setIsOpen(prev => !prev)
  }

  const handleDetailModal = (value: [string, CourseItem] | null) => {
    setData(value)
    ToggleModal()
  }

  const notiTest = () => {
    updateData('info', prev => ({ ...prev, noti: true }))
    chrome.runtime.sendMessage({
      type: 'NOTI',
      beep: system.notiBeep,
      notification: [{ title: '비프음 테스트', msg: '아아' }],
    })
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

  const handleGetSubject = async () => {
    chrome.runtime.sendMessage({ type: 'USER_SUBJECT', token: settings.siteToken }, async response => {
      if (response.success) {
        setIsLoading(true)
        // await new Promise(resolve => setTimeout(resolve, 3000))
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
            updateAt: null,
          }
        }
        updateData('contents', prev => ({ ...prev, courseList: { ...newCourseList } }))
        setIsLoading(false)
        // const currentList = contents.courseList
        // const newCourseList: Record<string, CourseItem> = {}
        // for (const data of response.data) {
        //   const { id, name, teachers } = data
        //   if (currentList[id] !== undefined) {
        //     console.log('1', currentList[id])
        //     newCourseList[id] = { ...currentList[id] }
        //     console.log('1', newCourseList[id])
        //   } else {
        //     console.log('2', currentList[id])
        //     newCourseList[id] = {
        //       title: name,
        //       teacher:
        //         teachers.length > 1 ? `${teachers[0].display_name} 등 ${teachers.length}인` : teachers[0].display_name,
        //       isReport: 0,
        //       isPlay: 0,
        //       isBoard: 0,
        //       updateAt: null,
        //     }
        //     console.log('2', newCourseList[id])
        //   }
        // }
      } else {
        window.alert('올바른 토큰이 아닙니다. 다시 확인해주세요.')
        console.log(response)
        //토스트 메세지
      }
    })
    console.log('eee')
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <SubjectDetailPage data={data} onClick={() => ToggleModal()} />
      ) : (
        <>
          <TopNavBar onClick={handleGetSubject} onIssueTest={testGetIssue} />
          <div className="flex flex-col items-center flex-1 gap-3 py-3 overflow-auto scrollbar-hidden">
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
