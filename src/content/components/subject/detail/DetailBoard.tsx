import { BoardCard } from './BoardCard'

export const DetailBoard = () => {
  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
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
