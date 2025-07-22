import { Text } from '@/components'
import type { IssueItem } from '@/types'

type BoardProps = {
  data: IssueItem
}

const NotReadIssue = () => <div className="bg-negative h-[6px] w-[6px] rounded-full"></div>
export const BoardCard = ({ data }: BoardProps) => {
  const handleLink = (link: string) => {
    window.location.href = `${import.meta.env.VITE_REDIRECT_URL}${link}`
  }
  return (
    <div
      className="bg-knuBlue flex h-[60px] w-[282px] cursor-pointer justify-end rounded-xl"
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)' }}
      onClick={() => handleLink(data.html_url)}
    >
      <div className="flex h-full w-[277px] flex-col justify-center gap-2 rounded-xl bg-white p-5">
        <div className="flex items-start justify-between">
          <Text className="w-[220px] truncate text-[13px]">{data.title}</Text>
          {!data.isOk && <NotReadIssue />}
        </div>
        <div>
          <Text className="text-[11px]">{data.createAt}</Text>
        </div>
      </div>
    </div>
  )
}
