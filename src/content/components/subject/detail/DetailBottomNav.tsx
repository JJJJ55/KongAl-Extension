import { BoardIcon, PlayIcon, ReportIcon, SettingIcon, SubjectIcon, Text } from '@/components'

export const DetailBottomNav = () => {
  return (
    <div
      className="flex justify-around rounded-2xl bg-white"
      style={{ boxShadow: '0 -5px 5px -5px rgba(0,0,0,0.3)', height: '70px' }}
    >
      <button className="flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px]">
        <PlayIcon />
        <Text>학 습</Text>
      </button>
      <button className="flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px]">
        <BoardIcon />
        <Text>공 지</Text>
      </button>
      <button className="flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px]">
        <ReportIcon />
        <Text>과 제</Text>
      </button>
    </div>
  )
}
