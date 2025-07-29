import { useStoragestore } from '@/store/useStorageStore'
import { ReportCard } from './ReportCard'
import { NotFound } from '../NotFound'
import { ChangeReportStatus } from '@/utils/ChangeStatus'

export const DetailReport = ({ courseId }: { courseId: string | '' }) => {
  const { contents, updateData } = useStoragestore()
  const handleChangeStatus = (rid: string, isChange: boolean) => {
    ChangeReportStatus({ courseId, itemId: rid, isFlag: isChange, updateFn: updateData })
  }
  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
      {Object.keys(contents.courseDetail[courseId].ReportList).length ? (
        Object.entries(contents.courseDetail[courseId].ReportList)
          .sort(([, a], [, b]) => new Date(b.dueAt!).getTime() - new Date(a.dueAt!).getTime())
          .map(([rid, r], idx) => (
            <ReportCard key={r.html_url} index={idx} data={r} onStatus={() => handleChangeStatus(rid, r.isChange!)} />
          ))
      ) : (
        <NotFound />
      )}
    </div>
  )
}
