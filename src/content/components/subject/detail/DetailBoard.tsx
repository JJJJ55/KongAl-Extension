import { useStoragestore } from '@/store/useStorageStore'
import { BoardCard } from './BoardCard'
import { NotFound } from '../NotFound'

export const DetailBoard = ({ courseId }: { courseId: string | '' }) => {
  const { contents } = useStoragestore()
  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
      {Object.keys(contents.courseDetail[courseId].BoardList).length ? (
        Object.values(contents.courseDetail[courseId].BoardList).map(b => <BoardCard key={b.createAt} data={b} />)
      ) : (
        <NotFound />
      )}
    </div>
  )
}
