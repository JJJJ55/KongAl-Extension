import { BoardCard } from './BoardCard'
import { NotFound } from '../NotFound'
import { useStoragestore } from '@/store/useStorageStore'
import { ChangeBoardStatus } from '@/utils/ChangeStatus'

export const DetailBoard = ({ courseId }: { courseId: string | '' }) => {
  const { contents, updateData } = useStoragestore()

  const handleLink = (link: string, bid: string, isOk: boolean) => {
    if (!isOk) {
      ChangeBoardStatus({ courseId, itemId: bid, updateFn: updateData })
    }
    window.location.href = `${import.meta.env.VITE_REDIRECT_URL}${link}`
  }
  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
      {Object.keys(contents.courseDetail[courseId].BoardList).length ? (
        Object.entries(contents.courseDetail[courseId].BoardList)
          .sort(([, a], [, b]) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
          .map(([bid, b], idx) => (
            <BoardCard key={b.html_url} index={idx} data={b} onLink={() => handleLink(b.html_url, bid, b.isOk)} />
          ))
      ) : (
        <NotFound />
      )}
    </div>
  )
}
