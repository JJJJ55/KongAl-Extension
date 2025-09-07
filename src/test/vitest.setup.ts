import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { vi } from 'vitest'
import 'jest-chrome'

beforeEach(() => {
  cleanup()
})

// matchMedia mock (JSDOM에는 없음)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((q: string) => ({
    matches: false,
    media: q,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

const chromeMokup = {
  runtime: {
    getURL: (p: string) => p,
    sendMessage: vi.fn((_msg: any, cb?: (res: any) => void) => {
      const res = { success: true, data: {} }
      cb?.(res)
      return Promise.resolve(res)
    }),
  },
  storage: {
    local: {
      get: vi.fn((_keys: any, cb?: (res: any) => void) => {
        const res = {}
        cb?.(res)
        return Promise.resolve(res)
      }),
      set: vi.fn((_items: any, cb?: () => void) => {
        cb?.()
        return Promise.resolve()
      }),
      remove: vi.fn((_keys: any, cb?: () => void) => {
        cb?.()
        return Promise.resolve()
      }),
      clear: vi.fn((cb?: () => void) => {
        cb?.()
        return Promise.resolve()
      }),
    },
  },
  tabs: {
    query: vi.fn((_q?: any, cb?: any) => {
      cb?.([]) // 기본은 빈 배열
      return Promise.resolve([])
    }),
    sendMessage: vi.fn((_id?: number, _msg?: any, cb?: any) => {
      cb?.({ success: true })
      return Promise.resolve({ success: true })
    }),
  },
}

// 최소 chrome mock
// @ts-ignore
global.chrome = chromeMokup

vi.mock('@/store/chromeStorage', () => {
  return {
    chromeStorage: {
      getData: vi.fn(async () => ({})),
      setData: vi.fn(async _data => {}),
      updateDataByKey: vi.fn(async (_key, cb) => cb()),
      onStorageChanged: vi.fn(_cb => {}),
    },
  }
})
