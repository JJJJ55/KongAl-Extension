import type { CourseItem, IssueItem, Noti, StorageData } from '@/types'
import { ChangeDutAt } from './FormatDate'

type UpdateDataProps = {
  itemData: any
  ids?: Record<string, CourseItem>
  updateFn: <K extends keyof StorageData>(key: K, update: (prev: StorageData[K]) => StorageData[K]) => Promise<void>
}

export const UpdateSubject = ({ itemData, updateFn }: UpdateDataProps) => {
  console.log(itemData)
  const newCourseList: Record<string, CourseItem> = {}
  for (const data of itemData) {
    const { id, name, teachers } = data
    newCourseList[id] = {
      title: name,
      teacher: teachers.length > 1 ? `${teachers[0].display_name} 등 ${teachers.length}인` : teachers[0].display_name,
      isReport: 0,
      isPlay: 0,
      isBoard: 0,
    }
  }
  updateFn('contents', prev => ({ ...prev, courseList: { ...newCourseList } }))
  return Object.keys(newCourseList)
}

export const UpdateIssue = ({ itemData, updateFn }: UpdateDataProps) => {
  console.log(itemData)
  const newBoardList: Record<string, Record<string, IssueItem>> = {}
  const newReportList: Record<string, Record<string, IssueItem>> = {}
  const newNoti: Record<string, Noti> = {}

  for (const data of itemData) {
    const { course_id, plannable, plannable_id, html_url, plannable_type, plannable_date, submissions } = data

    if (!newNoti[course_id]) newNoti[course_id] = { isBoard: 0, isReport: 0 }
    if (plannable_type === 'announcement') {
      if (!newBoardList[course_id]) newBoardList[course_id] = {}
      newBoardList[course_id][plannable_id] = {
        title: plannable.title,
        createAt: plannable.created_at,
        html_url,
        isOk: plannable.read_state === 'read' ? true : false,
      }
      if (plannable.read_state !== 'read') {
        newNoti[course_id].isBoard = newNoti[course_id].isBoard! + 1
      }
    } else {
      if (!newReportList[course_id]) newReportList[course_id] = {}
      newReportList[course_id][plannable_id] = {
        title: plannable.title,
        createAt: plannable.created_at,
        dueAt: plannable_date,
        html_url,
        isOk: submissions.submitted ?? false,
      }
      if (!newReportList[course_id][plannable_id].isOk && ChangeDutAt(plannable_date) !== '마감') {
        console.log(ChangeDutAt(plannable_date))
        newNoti[course_id].isReport = newNoti[course_id].isReport! + 1
      }
    }
  }

  updateFn('contents', prev => {
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
  updateFn('settings', prev => ({ ...prev, updateAt: new Date().toISOString() }))
}
