import { InfoIcon, LogoIcon, Text } from '@/components'
import type { Course } from '@/types'
import { X } from 'lucide-react'

export const DetailTopNav = ({ data, onClick }: { data: Course; onClick: () => void }) => {
  return (
    <header
      className="flex flex-row items-center rounded-2xl bg-white p-5"
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)', height: '60px' }}
    >
      <InfoIcon className="h-[20px] w-[20px] flex-1/12" />
      <div className="ml-5 flex-10/12">
        <Text className="w-[230px] truncate text-[15px] font-bold">{data.title}</Text>
        <Text className="text-[11px]">{`${data.teacher} 교수`}</Text>
      </div>
      <X size={24} onClick={onClick} className="flex-1/12 cursor-pointer" />
    </header>
  )
}
