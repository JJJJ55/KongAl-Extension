import { ReportCard } from './ReportCard'

export const DetailReport = ({ courseId }: { courseId: string | undefined }) => {
  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
    </div>
  )
}
