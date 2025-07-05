import { Text } from '@/components'

const ReportIssue = () => <span className="bg-kongju rounded-2xl px-2 text-[10px] text-white">과제 미제출</span>
const ClassIssue = () => <span className="bg-chenan rounded-2xl px-2 text-[10px] text-white">강의 확인</span>
const BoardIssue = () => <span className="bg-yesan rounded-2xl px-2 text-[10px] text-white">공지 확인</span>

type SubjectProps = {
  onClick: () => void
}
export const SubjectCard = ({ onClick }: SubjectProps) => {
  return (
    <div
      className="bg-knuBlue flex h-[60px] w-[282px] cursor-pointer justify-end rounded-xl"
      style={{ boxShadow: '0 5px 10px rgba(0,0,0,0.3)' }}
      onClick={onClick}
    >
      <div className="flex h-full w-[277px] flex-col justify-center rounded-xl bg-white p-5">
        <div>
          <Text className="text-[15px]">데이터 통신</Text>
        </div>
        <div className="flex items-center justify-between">
          <Text className="text-[12px]">김용강 교수</Text>
          <div className="flex gap-1">
            <ReportIssue />
            <ClassIssue />
            <BoardIssue />
          </div>
        </div>
      </div>
    </div>
  )
}
