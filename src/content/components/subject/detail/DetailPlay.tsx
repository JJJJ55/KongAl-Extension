import { LineText, Text } from '@/components'
import { PlayCard } from './PlayCard'
import { useStoragestore } from '@/store/useStorageStore'
import { NotFound } from '../NotFound'
import { useEffect } from 'react'
import { CheckPlayUpdate } from '@/utils/CheckPlayUpdate'
import { UpdatePlay } from '@/utils/UpdateData'

export const DetailPlay = ({ courseId }: { courseId: string | '' }) => {
  const { contents, updateData } = useStoragestore()

  const weeks = Array.from({ length: 15 }, (_, i) => String(i + 1))
  const playList = contents.courseDetail[courseId]?.PlayList || {}

  const handleLink = () => {
    window.location.href = `https://knulms.kongju.ac.kr/courses/${courseId}/external_tools/62`
  }

  useEffect(() => {
    console.log('학습주차')
    if (contents.courseList[courseId].updateAt === null || CheckPlayUpdate(contents.courseList[courseId].updateAt)) {
      console.log('학습 업데이트')
      chrome.runtime.sendMessage({ type: 'SUBJECT_LIST', id: courseId }, response => {
        if (response.success) {
          UpdatePlay({ itemData: response.data, contents, id: courseId, updateFn: updateData })
        }
      })
    } else {
      console.log('학습 업데이트 안함')
    }
  }, [])

  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
      {Object.keys(playList).length ? (
        weeks.map(week => {
          const weekData = playList[week]
          return (
            <>
              <LineText className="w-[60px] text-[13px] font-bold dark:text-white">{`${week}주차`}</LineText>
              {weekData ? (
                Object.entries(weekData).map(([pid, p], idx) => (
                  <PlayCard key={pid} index={idx} data={p} onLink={handleLink} />
                ))
              ) : (
                <Text className="text-[12px] dark:text-white">학습이 존재하지 않습니다.</Text>
              )}
            </>
          )
        })
      ) : (
        <NotFound />
      )}
    </div>
  )
}
