import { BoardIcon, PlayIcon, ReportIcon, SettingIcon, SubjectIcon, Text } from '@/components'

const IssueOn = () => (
  <div className="bg-negative absolute h-[6px] w-[6px] rounded-full" style={{ top: '8px', right: '40px' }}></div>
)

export const DetailBottomNav = () => {
  return (
    <div
      className="flex justify-around rounded-2xl bg-white"
      style={{ boxShadow: '0 -5px 5px -5px rgba(0,0,0,0.3)', height: '70px' }}
    >
      <button className="relative flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px] text-[12px]">
        <IssueOn />
        <PlayIcon />
        <Text>학 습</Text>
      </button>

      <button className="relative flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px] text-[12px]">
        <IssueOn />
        <BoardIcon />
        <Text>공 지</Text>
      </button>

      <button className="relative flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px] text-[12px]">
        <IssueOn />
        <ReportIcon />
        <Text>과 제</Text>
      </button>
    </div>
  )
}
