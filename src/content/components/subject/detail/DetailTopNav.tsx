import { X } from 'lucide-react'
import { InfoIcon, Text, TopNavContent } from '@/components'

type DetailTopNavProps = {
  title: string | undefined
  teacher: string | undefined
  onClick: () => void
}

export const DetailTopNav = ({ title, teacher, onClick }: DetailTopNavProps) => {
  return (
    <TopNavContent>
      <InfoIcon className="dark:text-positive text-knuBlue h-[20px] w-[20px] flex-1/12" />
      <div className="ml-5 flex-10/12">
        <Text className="w-[230px] truncate text-[15px] font-bold">{title}</Text>
        <Text className="text-[11px] font-medium">{`${teacher} 교수`}</Text>
      </div>
      <X size={24} onClick={onClick} className="flex-1/12 cursor-pointer dark:text-white" />
    </TopNavContent>
  )
}
