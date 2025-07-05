import { Text } from '@/components'

const NotReadIssue = () => <div className="bg-negative h-[6px] w-[6px] rounded-full"></div>
export const BoardCard = () => {
  return (
    <div
      className="bg-knuBlue flex h-[60px] w-[282px] cursor-pointer justify-end rounded-xl"
      style={{ boxShadow: '0 5px 10px rgba(0,0,0,0.3)' }}
    >
      <div className="flex h-full w-[277px] flex-col justify-center rounded-xl bg-white p-5">
        <div className="flex items-start justify-between">
          <Text className="text-[15px]">기말고사 공지사항</Text>
          <NotReadIssue />
        </div>
        <div>
          <Text className="text-[12px]">김용강 교수</Text>
        </div>
      </div>
    </div>
  )
}
