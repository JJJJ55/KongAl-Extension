import type { Contents } from './content'

export type StorageData = {
  system: {
    theme: 'sys' | 'light' | 'dark'
    notiBeep: boolean
  }
  info: {
    studentId: number
    userId: string
    username: string
    noti: boolean
  }
  settings: {
    siteToken: string | null
    xToken: string | null
    version: string
    updateAt: string | null
    fetchCycle: number | null
    image: string
  }
  contents: Contents
}
