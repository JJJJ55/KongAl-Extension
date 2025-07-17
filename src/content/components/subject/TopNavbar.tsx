import { LogoIcon, Text } from '@/components'

export const TopNavBar = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      // style={{ boxShadow: '0 0 30px rgba(0,0,0,0.3)' }}
      className="flex flex-row items-center justify-start p-5 bg-white rounded-2xl"
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)', height: '60px' }}
    >
      <LogoIcon className="ml-1 h-[36px] w-[36px]" />
      <div className="ml-3">
        <Text className="text-[16px] font-bold">콩알</Text>
        <Text className="text-[11px]">공주대 LMS 알림을 한번에!</Text>
      </div>
    </div>
  )
}
