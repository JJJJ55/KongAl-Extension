import { BoardCard } from './BoardCard'

export const DetailBoard = () => {
  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-6 overflow-auto py-5">
      <BoardCard />
      <BoardCard />
      <BoardCard />
      <BoardCard />
      <BoardCard />
      <BoardCard />
      <BoardCard />
      <BoardCard />
      <BoardCard />
    </div>
  )
}
