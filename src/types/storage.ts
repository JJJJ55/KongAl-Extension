import type { Contents } from './content'

export type StorageData = {
  settings: {
    siteToken: string | null
    version: string
    updateAt: string
    fetchCycle: number | null
    image: string
  }
  contents: Contents
}
