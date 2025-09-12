import clsx from 'clsx'

type DetailBottomItemProps = {
  activeType: 'play' | 'board' | 'report'
  setActiveType: (type: 'play' | 'board' | 'report') => void
  item: 'play' | 'board' | 'report'
  itemName: string
  children: React.ReactNode
}

export const DetailBottomItem = ({ activeType, setActiveType, item, itemName, children }: DetailBottomItemProps) => {
  return (
    <button
      className={clsx(
        'relative flex flex-1 cursor-pointer flex-col items-center justify-center px-[16px] py-[12px] text-[12px]',
        activeType === item ? 'text-knuBlue dark:text-positive' : 'text-gray4',
      )}
      onClick={() => setActiveType(item)}
    >
      {children}
      <span className="font-pretendard font-bold">{itemName}</span>
    </button>
  )
}
