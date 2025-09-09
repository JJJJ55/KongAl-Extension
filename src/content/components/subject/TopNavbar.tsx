import { Text, TopNavContent } from '@/components'
import KongalLogo from '@/assets/KongalLogo.svg?react'

export const TopNavBar = () => {
  return (
    <TopNavContent>
      <KongalLogo className="ml-1 h-[36px] w-[36px]" />
      <div className="ml-3">
        <Text className="text-[16px] font-bold">콩알</Text>
        <Text className="text-[11px] font-medium">공주대 LMS 알림을 한번에!</Text>
      </div>
    </TopNavContent>
  )
}
