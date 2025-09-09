import clsx from 'clsx'

type BottomNavItemProps = {
  activeType: 'subjects' | 'settings'
  setActiveType: (type: 'subjects' | 'settings') => void
  children: React.ReactNode
  itemName: string
  item: 'subjects' | 'settings'
}

export const BottomNavItem = ({ activeType, setActiveType, children, item, itemName }: BottomNavItemProps) => {
  return (
    <button
      className={clsx(
        'flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px] text-[12px]',
        activeType === item ? 'text-knuBlue dark:text-positive' : 'text-gray4',
      )}
      onClick={() => setActiveType(item)}
    >
      {children}
      <span className="font-pretendard font-bold">{itemName}</span>
    </button>
  )
}
