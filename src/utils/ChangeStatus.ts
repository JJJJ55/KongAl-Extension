import type { StorageData } from '@/types'
import { ChangeDutAt } from './FormatDate'

type ChangeStatusProps = {
  courseId: string
  itemId: string
  isFlag?: boolean
  updateFn: <K extends keyof StorageData>(key: K, update: (prev: StorageData[K]) => StorageData[K]) => Promise<void>
}

export const ChangeBoardStatus = ({ courseId, itemId, updateFn }: ChangeStatusProps) => {
  updateFn('contents', prev => {
    const newCourseDetail = { ...prev.courseDetail }
    const mergedCourseList = { ...prev.courseList }

    const currentDetail = newCourseDetail[courseId]
    const boardInfo = currentDetail.BoardList[itemId]

    newCourseDetail[courseId] = {
      ...newCourseDetail[courseId],
      BoardList: {
        ...currentDetail.BoardList,
        [itemId]: {
          ...boardInfo,
          isOk: true,
        },
      },
    }
    mergedCourseList[courseId] = {
      ...mergedCourseList[courseId],
      isBoard: mergedCourseList[courseId].isBoard - 1,
    }

    return {
      ...prev,
      courseDetail: newCourseDetail,
      courseList: mergedCourseList,
    }
  })
}

export const ChangeReportStatus = ({ courseId, itemId, isFlag, updateFn }: ChangeStatusProps) => {
  updateFn('contents', prev => {
    const newCourseDetail = { ...prev.courseDetail }
    const mergedCourseList = { ...prev.courseList }

    const currentDetail = newCourseDetail[courseId]
    const ReportInfo = currentDetail.ReportList[itemId]

    if (isFlag) {
      newCourseDetail[courseId] = {
        ...newCourseDetail[courseId],
        ReportList: {
          ...currentDetail.ReportList,
          [itemId]: {
            ...ReportInfo,
            isOk: false,
            isChange: false,
          },
        },
      }
      if (ChangeDutAt(ReportInfo.dueAt) !== '마 감') {
        mergedCourseList[courseId] = {
          ...mergedCourseList[courseId],
          isReport: mergedCourseList[courseId].isReport + 1,
        }
      }
    } else {
      newCourseDetail[courseId] = {
        ...newCourseDetail[courseId],
        ReportList: {
          ...currentDetail.ReportList,
          [itemId]: {
            ...ReportInfo,
            isOk: true,
            isChange: true,
          },
        },
      }
      if (ChangeDutAt(ReportInfo.dueAt) !== '마 감') {
        mergedCourseList[courseId] = {
          ...mergedCourseList[courseId],
          isReport: mergedCourseList[courseId].isReport - 1,
        }
      }
    }

    return {
      ...prev,
      courseDetail: newCourseDetail,
      courseList: mergedCourseList,
    }
  })
}
