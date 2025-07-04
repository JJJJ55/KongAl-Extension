import { SettingIcon, SubjectIcon, Text } from '@/components'

export const BottomNavBar = () => {
  return (
    <div
      className="flex justify-around rounded-2xl bg-white"
      style={{ boxShadow: '0 -5px 5px -5px rgba(0,0,0,0.3)', height: '70px' }}
    >
      <button className="flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px]">
        <SubjectIcon />
        <Text>과목</Text>
      </button>
      <button className="flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px]">
        <SettingIcon />
        <Text>설정</Text>
      </button>
    </div>
  )
}
