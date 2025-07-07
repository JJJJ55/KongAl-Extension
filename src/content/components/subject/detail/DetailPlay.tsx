import { LineText } from '@/components'
import { PlayCard } from './PlayCard'

export const DetailPlay = () => {
  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-6 overflow-auto py-5">
      <LineText className="w-[60px] text-[12px]">1주차</LineText>
      <PlayCard />
      <PlayCard />
      <PlayCard />
      <PlayCard />
      <PlayCard />
      <PlayCard />
      <PlayCard />
      <PlayCard />
      <PlayCard />
      <PlayCard />
    </div>
  )
}
