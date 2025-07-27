import { Text } from '@/components'
import type { IssueItem } from '@/types'
import { ChangeCreateAt } from '@/utils/FormatDate'

type BoardProps = {
  data: IssueItem
  onLink: () => void
}

const NotReadIssue = () => <div className="bg-negative h-[6px] w-[6px] rounded-full"></div>
export const BoardCard = ({ data, onLink }: BoardProps) => {
  return (
    <div
      className="bg-knuBlue flex h-[60px] w-[282px] cursor-pointer justify-end rounded-xl"
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)' }}
      onClick={onLink}
    >
      <div className="flex h-full w-[277px] flex-col justify-center gap-2 rounded-xl bg-white px-3 py-5">
        <div className="flex items-start justify-between">
          <Text className="w-[240px] truncate text-[14px] font-bold">{data.title}</Text>
          {!data.isOk && <NotReadIssue />}
        </div>
        <div>
          <Text className="text-[11px]">{ChangeCreateAt(data.createAt)}</Text>
        </div>
      </div>
    </div>
  )
}
