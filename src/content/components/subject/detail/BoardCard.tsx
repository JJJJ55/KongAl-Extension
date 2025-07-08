import { Text } from '@/components'

const NotReadIssue = () => <div className="bg-negative h-[6px] w-[6px] rounded-full"></div>
export const BoardCard = () => {
  return (
    <div
      className="bg-knuBlue flex h-[60px] w-[282px] cursor-pointer justify-end rounded-xl"
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)' }}
    >
      <div className="flex h-full w-[277px] flex-col justify-center gap-2 rounded-xl bg-white p-5">
        <div className="flex items-start justify-between">
          <Text className="w-[220px] truncate text-[13px]">과제과제과제과제과제과제과제과제과제과제</Text>
          <NotReadIssue />
        </div>
        <div>
          <Text className="text-[11px]">김용강 교수</Text>
        </div>
      </div>
    </div>
  )
}
