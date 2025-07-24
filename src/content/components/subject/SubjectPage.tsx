import { useState } from 'react'
import { LoadingSkeleton } from './LoadingSkeleton'
import { NotFound } from './NotFound'
import { SubjectCard } from './SubjectCard'
import { TopNavBar } from './TopNavbar'
import { useStoragestore } from '@/store/useStorageStore'
import { AnimatePresence } from 'framer-motion'
import { SubjectDetailPage } from './detail/SubjectDetailPage'
import type { CourseItem, IssueItem, Noti } from '@/types'

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
        const newBoardList: Record<string, Record<string, IssueItem>> = {}
        const newReportList: Record<string, Record<string, IssueItem>> = {}
        const newNoti: Record<string, Noti> = {}

        for (const data of response.data) {
          const { course_id, plannable, plannable_id, html_url, plannable_type, plannable_date, submissions } = data

          const currentDetail = contents.courseDetail[course_id] || {
            PlayList: {},
            BoardList: {},
            ReportList: {},
          }

          if (!newNoti[course_id]) newNoti[course_id] = { isBoard: 0, isReport: 0 }

          if (plannable_type === 'announcement') {
            if (!currentDetail.BoardList[plannable_id]) {
              if (!newBoardList[course_id]) newBoardList[course_id] = {}
              newBoardList[course_id][plannable_id] = {
                title: plannable.title,
                createAt: plannable.created_at,
                html_url,
                isOk: plannable.read_state === 'read' ? true : false,
              }
              if (plannable.read_state !== 'read') {
                newNoti[course_id].isBoard = newNoti[course_id].isBoard! + 1
                console.log('공지 미 숙지', newNoti[course_id].isBoard)
              }
            }
          } else {
            if (!currentDetail.ReportList[plannable_id]) {
              if (!newReportList[course_id]) newReportList[course_id] = {}
              newReportList[course_id][plannable_id] = {
                title: plannable.title,
                createAt: plannable.created_at,
                dueAt: plannable_date,
                html_url,
                isOk: submissions.submitted ?? false,
              }
              if (!newReportList[course_id][plannable_id].isOk) {
                newNoti[course_id].isReport = newNoti[course_id].isReport! + 1
                console.log('과제 미 이행', newNoti[course_id].isReport)
              }
            }
          }
        }

        updateData('contents', prev => {
          const newCourseDetail = { ...prev.courseDetail }
          for (const courseId in newBoardList) {
            const currentDetail = newCourseDetail[courseId] || {
              PlayList: {},
              BoardList: {},
              ReportList: {},
            }
            newCourseDetail[courseId] = {
              ...currentDetail,
              BoardList: {
                ...currentDetail.BoardList,
                ...newBoardList[courseId],
              },
            }
          }

          for (const courseId in newReportList) {
            const currentDetail = newCourseDetail[courseId] || {
              PlayList: {},
              BoardList: {},
              ReportList: {},
            }
            newCourseDetail[courseId] = {
              ...currentDetail,
              ReportList: {
                ...currentDetail.ReportList,
                ...newReportList[courseId],
              },
            }
          }

          const mergedCourseList = { ...prev.courseList }

          for (const courseId in newNoti) {
            if (!mergedCourseList[courseId]) continue
            mergedCourseList[courseId] = {
              ...mergedCourseList[courseId],
              ...newNoti[courseId],
            }
          }

          return {
            ...prev,
            courseDetail: newCourseDetail,
            courseList: mergedCourseList,
          }
        })
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
