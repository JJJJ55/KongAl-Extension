import { LogoIcon, Text } from '@/components'

export const TopNavBar = () => {
  return (
    <div
      // style={{ boxShadow: '0 0 30px rgba(0,0,0,0.3)' }}
      className="flex flex-row items-center justify-start rounded-2xl bg-white p-5"
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)', height: '60px' }}
    >
      <LogoIcon className="ml-3 h-[36px] w-[36px]" />
      <div className="ml-6">
        <Text className="text-[16px] font-bold">콩알</Text>
        <Text className="text-[11px]">공주대 LMS 알림을 한번에!</Text>
      </div>
    </div>
  )
}
