import { Text, TimeIcon } from '@/components'
import type { IssueItem } from '@/types'
import clsx from 'clsx'

type ReportProps = {
  data: IssueItem
}

const UnSubmitIssue = () => <span className="bg-kongju rounded-2xl px-1 text-[10px] text-white">미 제 출</span>
const SubmitIssue = () => <span className="bg-knuGreen rounded-2xl px-1 text-[10px] text-white">제출 완료</span>

const ChangeStateBtn = () => (
  <button className="bg-knuBlue w-[45px] cursor-pointer rounded-xl p-1 text-[10px] font-bold text-white">변 경</button>
)

export const ReportCard = ({ data }: ReportProps) => {
  const handleLink = (link: string) => {
    window.location.href = `${import.meta.env.VITE_REDIRECT_URL}${link}`
  }

  return (
    <div
      className={clsx(
        'flex h-[60px] w-[282px] cursor-pointer justify-end rounded-xl',
        data.isOk ? 'bg-knuGreen' : 'bg-kongju',
      )}
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)' }}
      onClick={() => handleLink(data.html_url)}
    >
      <div className="flex h-full w-[277px] flex-col justify-center gap-2 rounded-xl bg-white p-5">
        <div className="flex items-center justify-between">
          <Text className="w-[185px] truncate text-[13px]">{data.title}</Text>
          {data.isOk ? <SubmitIssue /> : <UnSubmitIssue />}
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center">
            <TimeIcon className="h-[16px] w-[16px]" />
            <Text className="ml-1 text-[12px] font-bold">{`마감 ${data.dueAt}전`}</Text>
          </div>
          <ChangeStateBtn />
        </div>
      </div>
    </div>
  )
}
