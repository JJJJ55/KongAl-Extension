import { Text } from '@/components'
import type { CourseItem } from '@/types'
import clsx from 'clsx'
import { motion } from 'framer-motion'

const ReportIssue = () => <span className="bg-kongju rounded-2xl px-1 text-[10px] text-white">과제 미제출</span>
const ClassIssue = () => <span className="bg-chenan rounded-2xl px-1 text-[10px] text-white">강의 확인</span>
const BoardIssue = () => <span className="bg-yesan rounded-2xl px-1 text-[10px] text-white">공지 확인</span>

interface SubjectProps {
  index: number
  color: string
  data: CourseItem
  onClick: () => void
}
export const SubjectCard = ({ index, color, data, onClick }: SubjectProps) => {
  return (
    <motion.div
      key={index}
      className={clsx('flex h-[60px] w-[300px] cursor-pointer justify-end rounded-xl', color)}
      style={{ boxShadow: '0 3px 3px rgba(0,0,0,0.2)' }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="dark:bg-dark12 flex h-[60px] w-[295px] flex-col justify-center gap-2 rounded-xl bg-white px-3 transition-colors duration-500">
        <div>
          <Text className="w-[260px] truncate text-[15px] font-medium">{data.title}</Text>
        </div>
        <div className="flex items-center justify-between">
          <Text className="w-[100px] truncate text-[11px] font-medium">{`${data.teacher} 교수`}</Text>
          <div className="flex gap-1">
            {data.isReport > 0 && <ReportIssue />}
            {data.isPlay > 0 && <ClassIssue />}
            {data.isBoard > 0 && <BoardIssue />}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
