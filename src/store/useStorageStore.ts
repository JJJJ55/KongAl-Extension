import type { StorageData } from '@/types'
import { create } from 'zustand'
import pkg from '../../package.json'
import { chromeStorage } from './chromeStorage'

interface StorageStore extends StorageData {
  isInit: boolean
  initialize: () => Promise<void>
  updateData: <K extends keyof StorageData>(key: K, update: (prev: StorageData[K]) => StorageData[K]) => Promise<void>
  resetStore: () => Promise<void>
}

const initialStorageData: StorageData = {
  system: {
    theme: 'sys',
    notiBeep: false,
  },
  info: {
    studentId: 12345,
    userId: '12345',
    username: '홍길동',
    noti: false,
  },
  settings: {
    siteToken: null,
    xToken: null,
    version: pkg.version,
    updateAt: null,
    fetchCycle: 1000 * 60 * 60 * 12,
    image: chrome.runtime.getURL('/kongal_Logo.png'),
  },
  contents: {
    courseList: {},
    courseDetail: {},
  },
}

const mergeData = (initial: StorageData, stored: Partial<StorageData>): StorageData => ({
  system: { ...initial.system, ...stored.system },
  info: { ...initial.info, ...stored.info },
  settings: { ...initial.settings, ...stored.settings, version: pkg.version },
  contents: { ...initial.contents, ...stored.contents },
})

export const useStoragestore = create<StorageStore>((set, get) => ({
  ...initialStorageData,
  isInit: false,
  initialize: async () => {
    const chromeStorageData = await chromeStorage.getData()
    const mergedData = mergeData(initialStorageData, chromeStorageData)
    await chromeStorage.setData(mergedData)
    set({ ...mergedData, isInit: true })
  },
  updateData: async <K extends keyof StorageData>(key: K, update: (prev: StorageData[K]) => StorageData[K]) => {
    const updateData = update(get()[key])
    await chromeStorage.updateDataByKey(key, () => updateData)
    set(state => ({ ...state, [key]: updateData }))
  },
  resetStore: async () => {
    await chromeStorage.setData(initialStorageData)
    set({ ...initialStorageData, isInit: true })
  },
}))

useStoragestore.getState().initialize()

chromeStorage.onStorageChanged(changes => {
  const newState = Object.entries(changes).reduce((acc, [key, { newValue }]) => {
    if (key in initialStorageData) {
      acc[key as keyof StorageData] = newValue
    }
    return acc
  }, {} as Partial<StorageData>)

  if (Object.keys(newState).length > 0) {
    useStoragestore.setState(state => ({ ...state, ...newState }))
  }
})
