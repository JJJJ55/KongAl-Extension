import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Text, TimeIcon } from '@/components'
import type { IssueItem } from '@/types'
import { ChangeDutAt } from '@/utils/FormatDate'

type ReportProps = {
  index: number
  data: IssueItem
  onStatus: () => void
}

const UnSubmitIssue = () => <span className="bg-kongju rounded-2xl px-1 text-[10px] text-white">미 제 출</span>
const SubmitIssue = () => <span className="bg-knuGreen rounded-2xl px-1 text-[10px] text-white">제출 완료</span>
const UserSubmitIssue = () => <span className="bg-positive rounded-2xl px-1 text-[10px] text-white">임의 제출</span>

export const ReportCard = ({ index, data, onStatus }: ReportProps) => {
  const [hover, setHover] = useState(false)

  const handleLink = (link: string) => {
    window.location.href = `${import.meta.env.VITE_REDIRECT_URL}${link}`
  }

  return (
    <motion.div
      key={index}
      className={clsx(
        'relative flex h-[60px] w-[300px] cursor-pointer justify-end rounded-xl',
        data.isOk ? 'bg-knuGreen' : 'bg-kongju',
        data.isChange && 'bg-positive',
      )}
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)' }}
      onClick={() => handleLink(data.html_url)}
      onMouseEnter={() => (!data.isOk || data.isChange) && setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="dark:bg-dark12 flex h-full w-[295px] flex-col justify-center gap-2 overflow-hidden rounded-xl bg-white px-3 py-5 transition-colors duration-500">
        <div className="flex items-center justify-between">
          <Text className="w-[213px] truncate text-[13px] font-medium">{data.title}</Text>
          {data.isChange ? <UserSubmitIssue /> : data.isOk ? <SubmitIssue /> : <UnSubmitIssue />}
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center">
            <TimeIcon className="h-[16px] w-[16px] dark:text-white" />
            <Text className="ml-1 text-[12px] font-medium">{ChangeDutAt(data.dueAt)}</Text>
          </div>
        </div>
      </div>
      {(!data.isOk || data.isChange) && (
        <div
          className={clsx(
            'absolute top-0 right-0 flex h-full items-center rounded-r-xl text-[11px] text-white transition-all duration-300 ease-in-out',
            hover ? 'w-[65px] translate-x-0 opacity-100' : 'pointer-events-none w-0 translate-x-2 opacity-0',
            data.isChange ? 'bg-kongju' : 'bg-positive',
          )}
        >
          <div className="dark:bg-dark12 h-full w-[10px] rounded-r-xl bg-white" />
          <div
            className="flex w-[55px] flex-col items-center justify-center"
            onClick={e => {
              e.stopPropagation()
              onStatus()
            }}
          >
            {data.isChange ? (
              <>
                <div>미제출로</div>
                <div>변경</div>
              </>
            ) : (
              <>
                <div>제출로</div>
                <div>변경</div>
              </>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}
