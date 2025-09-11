import { BottomNavItem } from './BottomNavItem'
import { BottomNavContent, SettingIcon, SubjectIcon } from '@/components'

type BottomNavProps = {
  activeType: 'subjects' | 'settings'
  setActiveType: (type: 'subjects' | 'settings') => void
}

export const BottomNavBar = ({ activeType, setActiveType }: BottomNavProps) => {
  return (
    <BottomNavContent>
      <BottomNavItem activeType={activeType} setActiveType={setActiveType} item="subjects" itemName="과 목">
        <SubjectIcon />
      </BottomNavItem>
      <BottomNavItem activeType={activeType} setActiveType={setActiveType} item="settings" itemName="설 정">
        <SettingIcon />
      </BottomNavItem>
    </BottomNavContent>
  )
}
