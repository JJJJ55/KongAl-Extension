import clsx from 'clsx'
import { Text } from '@/components'

type SettingItemProps = {
  type: string
  title: string
  value: string
  items: string[]
  itemsName: string[]
  onFunc: (type: string, value: string) => void
}

export const SettingItem = ({ type, title, value, items, itemsName, onFunc }: SettingItemProps) => {
  return (
    <div>
      <Text>{title}</Text>
      <div className="text-gray4 mt-1 flex w-[300px] justify-center px-4 text-center text-[13px] font-medium">
        {items.map((x, i) => (
          <span
            key={x}
            className={clsx(
              'w-[100px] cursor-pointer',
              value === x ? 'text-positive font-bold' : 'text-gray4 font-medium',
            )}
            onClick={() => onFunc(type, x)}
          >
            {itemsName[i]}
          </span>
        ))}
      </div>
    </div>
  )
}
