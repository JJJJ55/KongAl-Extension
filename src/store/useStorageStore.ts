import type { StorageData } from '@/types'
import { create } from 'zustand'
import pkg from '../../package.json'

interface StorageStore extends StorageData {
  isInit: boolean
  initializs: () => Promise<void>
  updateData: <K extends keyof StorageData>(key: K, update: (prev: StorageData[K]) => StorageData[K]) => Promise<void>
  resetStore: () => Promise<void>
}

const initialStorageData: StorageData = {
  settings: {
    siteToken: null,
    version: pkg.version,
    updateAt: '2025-01-01T00:00:00.000Z',
    fetchCycle: null,
    image: chrome.runtime.getURL('/kongal_Logo.png'),
  },
  contents: {
    courseList: [],
    courseDetail: [],
  },
}

export const useStoragestore = create((set, get) => ({}))
