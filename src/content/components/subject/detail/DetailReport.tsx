import { useStoragestore } from '@/store/useStorageStore'
import { ReportCard } from './ReportCard'
import { NotFound } from '../NotFound'

export const DetailReport = ({ courseId }: { courseId: string | '' }) => {
  const { contents } = useStoragestore()
  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
      {Object.keys(contents.courseDetail[courseId].ReportList).length ? (
        Object.values(contents.courseDetail[courseId].ReportList)
          .sort((a, b) => new Date(b.dueAt!).getTime() - new Date(a.dueAt!).getTime())
          .map(r => <ReportCard key={r.html_url} data={r} />)
      ) : (
        <NotFound />
      )}
    </div>
  )
}
