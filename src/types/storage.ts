import type { Contents } from './content'

export type StorageData = {
  info: {
    studentId: number
    userId: string
    username: string
  }
  settings: {
    siteToken: string | null
    version: string
    updateAt: string
    fetchCycle: number | null
    image: string
  }
  contents: Contents
}
