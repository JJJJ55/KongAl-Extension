import { LineText } from '@/components'
import { PlayCard } from './PlayCard'

export const DetailPlay = () => {
  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
      <LineText className="w-[60px] text-[12px] font-bold">1주차</LineText>
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
