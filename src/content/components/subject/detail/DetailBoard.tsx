import { useStoragestore } from '@/store/useStorageStore'
import { BoardCard } from './BoardCard'
import { NotFound } from '../NotFound'

export const DetailBoard = ({ courseId }: { courseId: string | '' }) => {
  const { contents } = useStoragestore()

  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
      {Object.keys(contents.courseDetail[courseId].BoardList).length ? (
        Object.values(contents.courseDetail[courseId].BoardList)
          .sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
          .map(b => <BoardCard key={b.html_url} data={b} />)
      ) : (
        <NotFound />
      )}
    </div>
  )
}
