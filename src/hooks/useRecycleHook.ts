import { useEffect, useState } from 'react'
import { useStoragestore } from '@/store/useStorageStore'

export const useRefreshCheck = () => {
  const { settings } = useStoragestore()
  const [shouldRefresh, setShouldRefresh] = useState(false)

  useEffect(() => {
    if (settings.updateAt !== null) {
      const lastUpdateTime = new Date(settings.updateAt).getTime()
      const currentTime = new Date().getTime()
      const refreshTime = settings.fetchCycle

      if (refreshTime !== null) setShouldRefresh(currentTime - lastUpdateTime > refreshTime)
    }
  }, [settings.updateAt, settings.fetchCycle])

  return { shouldRefresh }
}
