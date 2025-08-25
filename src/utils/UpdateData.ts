import type { Contents, CourseItem, IssueItem, Noti, NotificationItem, PlayItem, StorageData } from '@/types'
import { ChangeDutAt, CompareDueAt, CompareUpdateAt } from './FormatDate'

type UpdateDataProps = {
  itemData: any
  contents?: Contents
  id?: string
  updateAt?: string | null
  updateFn: <K extends keyof StorageData>(key: K, update: (prev: StorageData[K]) => StorageData[K]) => Promise<void>
}

const Item = {
  PlayList: {},
  BoardList: {},
  ReportList: {},
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

export const UpdateIssue = ({ contents, updateAt, itemData, updateFn }: UpdateDataProps) => {
  const newBoardList: Record<string, Record<string, IssueItem>> = {}
  const newReportList: Record<string, Record<string, IssueItem>> = {}
  const newNoti: Record<string, Noti> = {}
  const notificationList: NotificationItem[] = []
  console.log(itemData)
  console.log(updateAt)

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
        if (CompareUpdateAt(plannable.created_at, updateAt)) {
          console.log('알림예정')
          notificationList.push({
            title: contents?.courseList[course_id]?.title || '콩알',
            message: '새로운 공지가 있어요!',
          })
        }
      }
    } else {
      if (!newReportList[course_id]) newReportList[course_id] = contents?.courseDetail?.[course_id]?.ReportList || {}
      newReportList[course_id][plannable_id] = {
        title: plannable.title,
        createAt: plannable.created_at,
        dueAt: plannable_date,
        html_url,
        isOk: newReportList[course_id][plannable_id]
          ? newReportList[course_id][plannable_id].isChange
            ? true
            : (submissions.submitted ?? false)
          : (submissions.submitted ?? false),
        isChange: newReportList[course_id][plannable_id] ? newReportList[course_id][plannable_id].isChange : false,
      }
      if (
        !newReportList[course_id][plannable_id].isOk &&
        !newReportList[course_id][plannable_id].isChange &&
        ChangeDutAt(plannable_date) !== '마감'
      ) {
        newNoti[course_id].isReport = newNoti[course_id].isReport! + 1
        if (updateAt === null) {
          notificationList.push({
            title: contents?.courseList[course_id]?.title || '콩알',
            message: '새로운 과제가 있어요!',
          })
        } else {
          if (CompareUpdateAt(plannable.created_at, updateAt)) {
            notificationList.push({
              title: contents?.courseList[course_id]?.title || '콩알',
              message: '새로운 과제가 있어요!',
            })
          }
          const type = CompareDueAt(plannable_date, updateAt)
          console.log('과제 결과', type, newReportList[course_id][plannable_id])
          if (type === '오늘') {
            notificationList.push({
              title: contents?.courseList[course_id]?.title || '콩알',
              message: '오늘 마감인 과제가 있어요!',
            })
          } else if (type === '이내') {
            notificationList.push({
              title: contents?.courseList[course_id]?.title || '콩알',
              message: '곧 마감되는 과제가 있어요!',
            })
          }
        }
      }
    }
  }
  if (notificationList.length > 0) {
    updateFn('info', prev => ({ ...prev, noti: true }))
    chrome.runtime.sendMessage({ type: 'NOTI', notification: notificationList })
  }

  updateFn('contents', prev => {
    const newCourseDetail = { ...prev.courseDetail }
    for (const courseId in newBoardList) {
      const currentDetail = newCourseDetail[courseId] || Item
      newCourseDetail[courseId] = {
        ...currentDetail,
        BoardList: {
          ...currentDetail.BoardList,
          ...newBoardList[courseId],
        },
      }
    }

    for (const courseId in newReportList) {
      const currentDetail = newCourseDetail[courseId] || Item
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

export const UpdatePlay = ({ itemData, contents, id, updateFn }: UpdateDataProps) => {
  const newPlayList: Record<string, Record<string, PlayItem>> = {}
  const currentDetail = contents!.courseDetail[id!] || Item

  for (const data of itemData) {
    const { position } = data
    for (const d of data.module_items) {
      const { module_item_id, title, content_type, completed } = d
      if (!newPlayList[position]) newPlayList[position] = {}
      newPlayList[position][module_item_id] = {
        title,
        isComplete: completed,
        isAttendance: null,
        dueAt: null,
      }
      if (content_type === 'attendance_item') {
        const { use_attendance, omit_progress } = d.content_data
        if (use_attendance === true && omit_progress === false) {
          newPlayList[position][module_item_id].isAttendance = d.attendance_status
        }
      }
      newPlayList[position][module_item_id].dueAt = d.content_data.due_at
    }
  }
  updateFn('contents', prev => {
    const newCourseDetail = { ...prev.courseDetail }
    newCourseDetail[id!] = {
      ...currentDetail,
      PlayList: {
        ...newPlayList,
      },
    }

    return { ...prev, courseDetail: newCourseDetail }
  })
}
