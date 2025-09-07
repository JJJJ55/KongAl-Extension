import { Text } from '@/components'

export const SettingBottomNav = ({ version }: { version: string }) => {
  return (
    <footer className="text-center text-[11px]">
      <Text className="font-medium dark:text-white">공주대학교 LMS 알리미</Text>
      <Text className="font-medium dark:text-white">{`콩알 v${version}`}</Text>
    </footer>
  )
}
