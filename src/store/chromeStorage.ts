import type { StorageData } from '@/types'

class ChromeStorage {
  private static instance: ChromeStorage
  private storage: chrome.storage.LocalStorageArea

  private constructor() {
    this.storage = chrome.storage.local
  }

  public static getInstance(): ChromeStorage {
    if (!ChromeStorage.instance) {
      ChromeStorage.instance = new ChromeStorage()
    }
    return ChromeStorage.instance
  }

  public async getData(): Promise<StorageData> {
    return new Promise((resolve, reject) => {
      this.storage.get(null, result => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve(result as StorageData)
        }
      })
    })
  }

  public async setData(data: Partial<StorageData>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storage.set(data, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve()
        }
      })
    })
  }

  public async removeData(keys: string | string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storage.remove(keys, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve()
        }
      })
    })
  }

  public async clearData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storage.clear(() => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve()
        }
      })
    })
  }

  public async clearAllData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storage.clear(() => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve()
        }
      })
    })
  }

  public async getDataByKey<K extends keyof StorageData>(key: K): Promise<StorageData[K]> {
    return new Promise((resolve, reject) => {
      this.storage.get(key, result => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve(result[key] as StorageData[K])
        }
      })
    })
  }

  public async updateDataByKey<K extends keyof StorageData>(
    key: K,
    update: (prev: StorageData[K]) => StorageData[K],
  ): Promise<void> {
    const curV = await this.getDataByKey(key)
    const newV = update(curV)
    await this.setData({ [key]: newV } as Partial<StorageData>)
  }

  public onStorageChanged(
    callback: (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => void,
  ): void {
    chrome.storage.onChanged.addListener(callback)
  }

  public removeStorageChangedListener(
    callback: (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => void,
  ): void {
    chrome.storage.onChanged.removeListener(callback)
  }
}

export const chromeStorage = ChromeStorage.getInstance()
