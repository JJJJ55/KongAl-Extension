import { Text } from '@/components'
import { ClockAlert } from 'lucide-react'

const UnSubmitIssue = () => <span className="bg-kongju rounded-2xl px-2 text-[10px] text-white">미 제 출</span>
const SubmitIssue = () => <span className="bg-knuGreen rounded-2xl px-2 text-[10px] text-white">제출 완료</span>

const ChangeStateBtn = () => (
  <button className="bg-kongju cursor-pointer rounded-xl p-1 text-[10px] text-white">임의로 상태변경</button>
)

export const ReportCard = () => {
  return (
    <div
      className="bg-kongju flex h-[60px] w-[282px] cursor-pointer justify-end rounded-xl"
      style={{ boxShadow: '0 5px 10px rgba(0,0,0,0.3)' }}
    >
      <div className="flex h-full w-[277px] flex-col justify-center gap-3 rounded-xl bg-white p-5">
        <div className="flex items-center justify-between">
          <Text className="w-[190px] truncate text-[13px]">과제과제과제과제과제과제과제과제과제</Text>
          {/* <SubmitIssue /> */}
          <UnSubmitIssue />
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center">
            <ClockAlert size={13} />
            <Text className="ml-2 text-[10px]">2일 전</Text>
          </div>
          <ChangeStateBtn />
        </div>
      </div>
    </div>
  )
}
