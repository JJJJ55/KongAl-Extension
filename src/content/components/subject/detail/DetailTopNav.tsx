import { InfoIcon, LogoIcon, Text } from '@/components'
import { X } from 'lucide-react'

export const DetailTopNav = ({ onClick }: { onClick: () => void }) => {
  return (
    <header
      className="flex flex-row items-center rounded-2xl bg-white p-5"
      style={{ boxShadow: '0 5px 10px rgba(0,0,0,0.3)', height: '60px' }}
    >
      <InfoIcon className="h-[20px] w-[20px] flex-1/12" />
      <div className="ml-5 flex-10/12">
        <Text className="text-[15px] font-bold">데이터통신</Text>
        <Text className="text-[10px]">김용강 교수</Text>
      </div>
      <X size={24} onClick={onClick} className="flex-1/12 cursor-pointer" />
    </header>
  )
}
