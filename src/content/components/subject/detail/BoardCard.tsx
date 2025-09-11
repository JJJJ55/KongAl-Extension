import { motion } from 'framer-motion'
import { Text } from '@/components'
import type { IssueItem } from '@/types'
import { ChangeCreateAt } from '@/utils/FormatDate'

type BoardProps = {
  index: number
  data: IssueItem
  onLink: () => void
}

const NotReadIssue = () => <div className="bg-negative h-[6px] w-[6px] rounded-full"></div>
export const BoardCard = ({ index, data, onLink }: BoardProps) => {
  return (
    <motion.div
      key={index}
      className="bg-knuBlue flex h-[60px] w-[300px] cursor-pointer justify-end rounded-xl"
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)' }}
      onClick={onLink}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="dark:bg-dark12 flex h-full w-[295px] flex-col justify-center gap-2 rounded-xl bg-white px-3 py-5 transition-colors duration-500">
        <div className="flex items-start justify-between">
          <Text className="w-[258px] truncate text-[13px] font-medium">{data.title}</Text>
          {!data.isOk && <NotReadIssue />}
        </div>
        <div>
          <Text className="text-[11px] font-medium">{ChangeCreateAt(data.createAt)}</Text>
        </div>
      </div>
    </motion.div>
  )
}
