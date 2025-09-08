import type {
  Contents,
  CourseItem,
  Detail,
  DetailItem,
  IssueItem,
  Noti,
  NotificationItem,
  PlayItem,
  StorageData,
} from '@/types'
import { ChangeDutAt, CompareDueAt, CompareUpdateAt } from './FormatDate'

type UpdateDataProps = {
  itemData: any
  contents: Contents
  id?: string
  ids?: string[]
  updateAt?: string | null
  isBeep?: boolean
  updateFn: <K extends keyof StorageData>(key: K, update: (prev: StorageData[K]) => StorageData[K]) => Promise<void>
}

const courseDetailItems: DetailItem = {
  PlayList: {},
  BoardList: {},
  ReportList: {},
}

export const UpdateSubject = ({ contents, itemData, updateFn }: UpdateDataProps) => {
  const currentList = contents.courseList
  const newCourseList: Record<string, CourseItem> = {}
  for (const data of itemData) {
    const { id, name, teachers } = data
    if (currentList[id] !== undefined) {
      newCourseList[id] = { ...currentList[id] }
    } else {
      newCourseList[id] = {
        title: name,
        teacher: teachers.length > 1 ? `${teachers[0].display_name} 등 ${teachers.length}인` : teachers[0].display_name,
        isReport: 0,
        isPlay: 0,
        isBoard: 0,
        updateAt: null,
      }
    }
  }
  updateFn('contents', prev => ({ ...prev, courseList: { ...newCourseList } }))
  return Object.keys(newCourseList)
}

export const UpdateIssue = ({ isBeep, contents, ids, updateAt, itemData, updateFn }: UpdateDataProps) => {
  const newBoardList: Record<string, Record<string, IssueItem>> = {}
  const newReportList: Record<string, Record<string, IssueItem>> = {}
  const newNoti: Record<string, Noti> = {}
  const notificationList: NotificationItem[] = []
  const seen: Set<string> = new Set()

  const pushNotification = (title: string, msg: string) => {
    const key = `${title}-${msg}`
    if (!seen.has(key)) {
      seen.add(key)
      notificationList.push({ title, msg })
    }
  }

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
          pushNotification(contents?.courseList[course_id]?.title || '콩알', '새로운 공지가 있어요!')
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
        ChangeDutAt(plannable_date) !== '마 감'
      ) {
        newNoti[course_id].isReport = newNoti[course_id].isReport! + 1
        if (updateAt === null) {
          pushNotification(contents?.courseList[course_id]?.title || '콩알', '새로운 과제가 있어요!')
        } else {
          const type = CompareDueAt(plannable_date, new Date().toISOString())
          if (type === '오늘') {
            pushNotification(contents?.courseList[course_id]?.title || '콩알', '오늘 마감인 과제가 있어요!')
          } else if (type === '이내') {
            pushNotification(contents?.courseList[course_id]?.title || '콩알', '곧 마감되는 과제가 있어요!')
          } else if (CompareUpdateAt(plannable.created_at, updateAt)) {
            pushNotification(contents?.courseList[course_id]?.title || '콩알', '새로운 과제가 있어요!')
          }
        }
      }
    }
  }
  if (notificationList.length > 0) {
    updateFn('info', prev => ({ ...prev, noti: true }))
    chrome.runtime.sendMessage({ type: 'NOTI', beep: isBeep, notification: notificationList })
  }

  updateFn('contents', prev => {
    const currentCourseDetail = { ...prev.courseDetail }
    const newCourseDetail: Detail = {}
    ids!.forEach((id, _) => (newCourseDetail[id] = courseDetailItems))

    for (const courseId in newBoardList) {
      const currentDetail = currentCourseDetail[courseId] || courseDetailItems
      newCourseDetail[courseId] = {
        ...currentDetail,
        BoardList: {
          ...currentDetail.BoardList,
          ...newBoardList[courseId],
        },
      }
    }

    for (const courseId in newReportList) {
      const currentDetail = currentCourseDetail[courseId] || courseDetailItems
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
      courseDetail: newCourseDetail || courseDetailItems,
      courseList: mergedCourseList,
    }
  })
}

export const UpdatePlay = ({ itemData, id, isBeep, contents, updateAt, updateFn }: UpdateDataProps) => {
  const newPlayList: Record<string, Record<string, PlayItem>> = {}
  const newNoti: Record<string, Noti> = {}
  const notificationList: NotificationItem[] = []
  const seen: Set<string> = new Set()

  const pushNotification = (title: string, msg: string) => {
    const key = `${title}-${msg}`
    if (!seen.has(key)) {
      seen.add(key)
      notificationList.push({ title, msg })
    }
  }

  if (!newNoti[id!]) newNoti[id!] = { isPlay: 0 }
  for (const data of itemData) {
    const { position } = data
    for (const d of data.module_items) {
      const { module_item_id, title, content_type, completed } = d
      if (!newPlayList[position]) newPlayList[position] = {}
      newPlayList[position][module_item_id] = {
        title,
        isComplete: completed,
        isAttendance: null,
        dueAt: d.content_data.due_at,
      }
      if (content_type === 'attendance_item') {
        const { use_attendance, omit_progress } = d.content_data
        if (use_attendance === true && omit_progress === false) {
          newPlayList[position][module_item_id].isAttendance = d.attendance_status
          if (d.attendance_status !== 'attendance' || d.attendance_status !== 'absent') {
            //출석 또는 결석은 알림을 안울림
            if (ChangeDutAt(d.content_data.due_at) !== '마 감') {
              newNoti[id!].isPlay = newNoti[id!].isPlay! + 1
              if (isBeep === undefined) continue
              if (updateAt === null || updateAt === undefined) {
                pushNotification(contents?.courseList[id!]?.title || '콩알', '새로운 주차학습이 있어요!')
              } else {
                const type = CompareDueAt(d.content_data.due_at, updateAt)
                if (type === '오늘') {
                  pushNotification(contents?.courseList[id!]?.title || '콩알', '오늘 마감인 학습이 있어요!')
                } else if (type === '이내') {
                  pushNotification(contents?.courseList[id!]?.title || '콩알', '곧 마감되는 학습이 있어요!')
                } else if (CompareUpdateAt(d.content_data.created_at, updateAt)) {
                  pushNotification(contents?.courseList[id!]?.title || '콩알', '새로운 주차학습이 있어요!')
                }
              }
            }
          }
        }
      }
    }
  }

  if (notificationList.length > 0) {
    updateFn('info', prev => ({ ...prev, noti: true }))
    chrome.runtime.sendMessage({ type: 'NOTI', beep: isBeep, notification: notificationList })
  }

  updateFn('contents', prev => {
    const currentDetail = prev.courseDetail[id!] || courseDetailItems
    const newCourseList = { ...prev.courseList }
    newCourseList[id!] = {
      ...prev.courseList[id!],
      ...newNoti[id!],
      updateAt: new Date().toISOString(),
    }

    return {
      ...prev,
      courseList: { ...newCourseList },
      courseDetail: {
        ...prev.courseDetail,
        [id!]: {
          ...currentDetail, // 기존 BoardList/ReportList 보존
          PlayList: {
            ...newPlayList,
          },
        },
      },
    }
  })
}
