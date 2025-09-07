import { InfoIcon, Text } from '@/components'
import { X } from 'lucide-react'

type DetailTopNavProps = {
  title: string | undefined
  teacher: string | undefined
  onClick: () => void
  onGet: () => void
}

export const DetailTopNav = ({ title, teacher, onClick, onGet }: DetailTopNavProps) => {
  return (
    <header
      className="dark:bg-dark12 flex flex-row items-center rounded-2xl bg-white p-5 transition-colors duration-500"
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)', height: '60px' }}
    >
      <InfoIcon className="dark:text-positive text-knuBlue h-[20px] w-[20px] flex-1/12" />
      <div className="ml-5 flex-10/12" onClick={onGet}>
        <Text className="w-[230px] truncate text-[15px] font-bold dark:text-white">{title}</Text>
        <Text className="text-[11px] font-medium dark:text-white">{`${teacher} 교수`}</Text>
      </div>
      <X size={24} onClick={onClick} className="flex-1/12 cursor-pointer dark:text-white" />
    </header>
  )
}
