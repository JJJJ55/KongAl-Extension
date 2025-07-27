import { useStoragestore } from '@/store/useStorageStore'
import { BoardCard } from './BoardCard'
import { NotFound } from '../NotFound'

export const DetailBoard = ({ courseId }: { courseId: string | '' }) => {
  const { contents, updateData } = useStoragestore()

  const handleLink = (link: string, bid: string, isOk: boolean) => {
    if (!isOk) {
      updateData('contents', prev => {
        const newCourseDetail = { ...prev.courseDetail }
        const mergedCourseList = { ...prev.courseList }

        const currentDetail = newCourseDetail[courseId]
        const boardInfo = currentDetail.BoardList[bid]

        newCourseDetail[courseId] = {
          ...newCourseDetail[courseId],
          BoardList: {
            ...currentDetail.BoardList,
            [bid]: {
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
    window.location.href = `${import.meta.env.VITE_REDIRECT_URL}${link}`
  }
  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
      {Object.keys(contents.courseDetail[courseId].BoardList).length ? (
        Object.entries(contents.courseDetail[courseId].BoardList)
          .sort(([, a], [, b]) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
          .map(([bid, b]) => <BoardCard key={b.html_url} data={b} onLink={() => handleLink(b.html_url, bid, b.isOk)} />)
      ) : (
        <NotFound />
      )}
    </div>
  )
}
