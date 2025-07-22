import { useStoragestore } from '@/store/useStorageStore'
import { ReportCard } from './ReportCard'
import { NotFound } from '../NotFound'

export const DetailReport = ({ courseId }: { courseId: string | '' }) => {
  const { contents } = useStoragestore()
  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
      {Object.keys(contents.courseDetail[courseId].ReportList).length ? (
        Object.values(contents.courseDetail[courseId].ReportList).map(r => <ReportCard key={r.createAt} data={r} />)
      ) : (
        <NotFound />
      )}
    </div>
  )
}
