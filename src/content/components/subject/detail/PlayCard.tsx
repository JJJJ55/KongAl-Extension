import { Text, TimeIcon } from '@/components'
import { ClockAlert } from 'lucide-react'

const UnCheckIssue = () => <span className="bg-kongju rounded-2xl px-2 text-[10px] text-white">미 출 석</span>
const CheckIssue = () => <span className="bg-knuGreen rounded-2xl px-2 text-[10px] text-white">출 석</span>

const ChangeStateBtn = () => (
  <button className="bg-kongju cursor-pointer rounded-xl p-1 text-[10px] text-white">임의로 상태변경</button>
)

export const PlayCard = () => {
  return (
    <div
      className="bg-kongju flex h-[60px] w-[282px] cursor-pointer justify-end rounded-xl"
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)' }}
    >
      <div className="flex h-full w-[277px] flex-col justify-center gap-3 rounded-xl bg-white p-5">
        <div className="flex items-center justify-between">
          <Text className="w-[190px] truncate text-[13px]">과제과제과제과제과제과제과제과제과제</Text>
          {/* <CheckIssue /> */}
          <UnCheckIssue />
        </div>
        <div className="flex items-center">
          <TimeIcon className="h-[16px] w-[16px]" />
          <Text className="ml-2 text-[12px] font-bold">2일 전</Text>
        </div>
      </div>
    </div>
  )
}
