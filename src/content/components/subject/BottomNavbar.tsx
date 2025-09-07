import { SettingIcon, SubjectIcon, Text } from '@/components'
import clsx from 'clsx'

type BottomNavProps = {
  activeType: 'subjects' | 'settings'
  setActiveType: (type: 'subjects' | 'settings') => void
}

export const BottomNavBar = ({ activeType, setActiveType }: BottomNavProps) => {
  return (
    <div
      className="dark:bg-dark12 flex justify-around rounded-2xl bg-white transition-colors duration-500"
      style={{ boxShadow: '0 -5px 5px -5px rgba(0,0,0,0.3)', height: '70px' }}
    >
      <button
        className={clsx(
          'flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px] text-[12px]',
          activeType === 'subjects' ? 'text-knuBlue dark:text-positive' : 'text-gray4',
        )}
        onClick={() => setActiveType('subjects')}
      >
        <SubjectIcon />
        <Text>과 목</Text>
      </button>
      <button
        className={clsx(
          'flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px] text-[12px]',
          activeType === 'settings' ? 'text-knuBlue dark:text-positive' : 'text-gray4',
        )}
        onClick={() => setActiveType('settings')}
      >
        <SettingIcon />
        <Text>설 정</Text>
      </button>
    </div>
  )
}
