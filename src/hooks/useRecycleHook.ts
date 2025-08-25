import { useStoragestore } from '@/store/useStorageStore'
import { useEffect, useState } from 'react'

export const useRefreshCheck = () => {
  const { settings } = useStoragestore()
  const [shouldRefresh, setShouldRefresh] = useState(false)

  useEffect(() => {
    if (settings.updateAt !== null) {
      const lastUpdateTime = new Date(settings.updateAt).getTime()
      const currentTime = new Date().getTime()
      const refreshTime = settings.fetchCycle

      console.log('마지막 업뎃', lastUpdateTime)
      console.log('현재', currentTime)
      console.log('업데이트 텀', refreshTime)
      console.log('결과', currentTime - lastUpdateTime)

      if (refreshTime !== null) setShouldRefresh(currentTime - lastUpdateTime > refreshTime)
    }
  }, [settings.updateAt, settings.fetchCycle])

  return { shouldRefresh }
}
