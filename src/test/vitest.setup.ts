// import '@testing-library/jest-dom'
// import { cleanup } from '@testing-library/react'
// import { vi } from 'vitest'
// import 'jest-chrome'

// beforeEach(() => {
//   cleanup()
// })

// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: vi.fn().mockImplementation(query => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: vi.fn(),
//     removeListener: vi.fn(),
//     addEventListener: vi.fn(),
//     removeEventListener: vi.fn(),
//     dispatchEvent: vi.fn(),
//   })),
// })

// const test = {
//   runtime: {
//     getURL: (path: string) => path,
//     sendMessage: vi.fn((msg: any, cb?: (res: any) => void) => {
//       const res = { success: true, data: {} }
//       if (cb) cb(res)
//       return Promise.resolve(res)
//     }),
//   },
//   storage: {
//     local: {
//       get: vi.fn((_keys: any, cb?: (res: any) => void) => {
//         const res = {}
//         if (cb) cb(res)
//         return Promise.resolve(res)
//       }),
//       set: vi.fn((_items: any, cb?: () => void) => {
//         if (cb) cb()
//         return Promise.resolve()
//       }),
//       remove: vi.fn((_keys: any, cb?: () => void) => {
//         if (cb) cb()
//         return Promise.resolve()
//       }),
//       clear: vi.fn((cb?: () => void) => {
//         if (cb) cb()
//         return Promise.resolve()
//       }),
//     },
//   },
//   tabs: {
//     query: vi.fn((_queryInfo: any, cb?: (tabs: any[]) => void) => {
//       const tabs = [{ id: 1 }]
//       if (cb) cb(tabs)
//       return Promise.resolve(tabs)
//     }),
//     sendMessage: vi.fn((_id: any, _msg: any, cb?: (res: any) => void) => {
//       const res = { success: true, data: {} }
//       if (cb) cb(res)
//       return Promise.resolve(res)
//     }),
//   },
// }

// // @ts-ignore
// global.chrome = test

// vi.mock('@/store/chromeStorage', () => {
//   return {
//     chromeStorage: {
//       getData: vi.fn(async () => ({})),
//       setData: vi.fn(async _data => {}),
//       updateDataByKey: vi.fn(async (_key, cb) => cb()),
//       onStorageChanged: vi.fn(_cb => {}),
//     },
//   }
// })

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
    // 각 테스트에서 mockImplementation으로 덮어쓸 예정
    query: vi.fn(),
    sendMessage: vi.fn(),
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
