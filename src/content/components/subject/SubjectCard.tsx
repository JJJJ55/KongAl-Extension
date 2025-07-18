import { Text } from '@/components'
import type { Course } from '@/types'

const ReportIssue = () => <span className="bg-kongju rounded-2xl px-1 text-[10px] text-white">과제 미제출</span>
const ClassIssue = () => <span className="bg-chenan rounded-2xl px-1 text-[10px] text-white">강의 확인</span>
const BoardIssue = () => <span className="bg-yesan rounded-2xl px-1 text-[10px] text-white">공지 확인</span>

interface SubjectProps {
  data: Course
  onClick: () => void
}
export const SubjectCard = ({ data, onClick }: SubjectProps) => {
  return (
    <div
      className="bg-knuBlue flex h-[60px] w-[300px] cursor-pointer justify-end rounded-xl"
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)' }}
      onClick={onClick}
    >
      <div className="flex h-[60px] w-[295px] flex-col justify-center gap-2 rounded-xl bg-white px-2">
        <div>
          <Text className="text-[15px] font-bold">{data.title}</Text>
        </div>
        <div className="flex items-center justify-between">
          <Text className="text-[12px]">{`${data.teacher} 교수`}</Text>
          <div className="flex gap-1">
            {data.isReport && <ReportIssue />}
            {data.isPlay && <ClassIssue />}
            {data.isBoard && <BoardIssue />}
          </div>
        </div>
      </div>
    </div>
  )
}
