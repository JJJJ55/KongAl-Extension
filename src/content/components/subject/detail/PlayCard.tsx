import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Text, TimeIcon } from '@/components'
import type { PlayItem } from '@/types'
import { ChangeDutAt } from '@/utils/FormatDate'

type PlayProps = {
  index: number
  data: PlayItem
  onLink: () => void
}
const UnCheckIssue = () => <span className="bg-kongju rounded-2xl px-1 text-[10px] text-white">미 출 석</span>
const CheckIssue = () => <span className="bg-knuGreen rounded-2xl px-2 text-[10px] text-white">출 석</span>
const AbSentIssue = () => <span className="bg-kongju rounded-2xl px-2 text-[10px] text-white">결 석</span>

export const PlayCard = ({ index, data, onLink }: PlayProps) => {
  return (
    <motion.div
      key={index}
      className={clsx(
        'flex h-[60px] w-[300px] cursor-pointer justify-end rounded-xl',
        data.isComplete ? 'bg-knuGreen' : 'bg-kongju',
      )}
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)' }}
      onClick={onLink}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="dark:bg-dark12 flex h-[60px] w-[295px] flex-col justify-center gap-2 rounded-xl bg-white px-3 py-5 transition-colors duration-500">
        <div className="flex items-center justify-between">
          <Text
            className={clsx('truncate text-[13px] font-medium', data.isAttendance !== null ? 'w-[220px]' : 'w-full')}
          >
            {data.title}
          </Text>
          {data.isAttendance !== null ? (
            data.isAttendance !== 'none' ? (
              data.isAttendance === 'attendance' ? (
                <CheckIssue />
              ) : (
                <AbSentIssue />
              )
            ) : (
              <UnCheckIssue />
            )
          ) : (
            ''
          )}
        </div>
        <div className="flex items-center dark:text-white">
          <TimeIcon className="dark:text-gray2 h-[16px] w-[16px]" />
          <Text className="ml-1 text-[12px] font-medium">{ChangeDutAt(data.dueAt)}</Text>
        </div>
      </div>
    </motion.div>
  )
}
