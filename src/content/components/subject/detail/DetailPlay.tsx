import { useEffect } from 'react'
import { Fragment } from 'react'
import { toast } from 'react-toastify'
import { PlayCard } from './PlayCard'
import { NotFound } from '../NotFound'
import { LineText, Text } from '@/components'
import { useStoragestore } from '@/store/useStorageStore'
import { CheckPlayUpdate } from '@/utils/CheckPlayUpdate'
import { UpdatePlay } from '@/utils/UpdateData'

export const DetailPlay = ({ courseId }: { courseId: string | '' }) => {
  const { settings, contents, updateData } = useStoragestore()

  const weeks = Array.from({ length: 15 }, (_, i) => String(i + 1))
  const playList = contents.courseDetail[courseId]?.PlayList || {}

  const handleLink = () => {
    window.location.href = `${import.meta.env.VITE_REDIRECT_URL}/courses/${courseId}/external_tools/62`
  }

  useEffect(() => {
    if (contents.courseList[courseId].updateAt === null || CheckPlayUpdate(contents.courseList[courseId].updateAt)) {
      chrome.runtime.sendMessage({ type: 'SUBJECT_LIST', id: courseId, token: settings.xToken }, response => {
        if (response.success) {
          // 비프 제외하여 알림 x
          UpdatePlay({
            itemData: response.data,
            contents,
            id: courseId,
            updateAt: contents.courseList[courseId].updateAt,
            updateFn: updateData,
          })
          toast.success('주차 학습이 업데이트 됐어요!', { icon: false })
        } else {
          toast.error('주차 학습 업데이트에 오류가 발생했어요.', { icon: false })
        }
      })
    }
  }, [])

  return (
    <div className="scrollbar-hidden flex flex-1 flex-col items-center gap-3 overflow-auto py-3">
      {Object.keys(playList).length ? (
        weeks.map(week => {
          const weekData = playList[week]
          return (
            <Fragment key={week}>
              <LineText className="w-[60px] text-[13px] font-bold dark:text-white">{`${week}주차`}</LineText>
              {weekData ? (
                Object.entries(weekData).map(([pid, p], idx) => (
                  <PlayCard key={pid} index={idx} data={p} onLink={handleLink} />
                ))
              ) : (
                <Text className="text-[12px]">학습이 존재하지 않습니다.</Text>
              )}
            </Fragment>
          )
        })
      ) : (
        <NotFound />
      )}
    </div>
  )
}
