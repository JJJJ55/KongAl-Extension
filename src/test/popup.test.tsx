import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from '@/popup/App.tsx'
import { Content } from '@/content/components/Content'
import { act } from 'react'

const { chrome } = global as any

describe('Popup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('팝업 렌더링(LMS x)', async () => {
    chrome.tabs.query.mockImplementation((_q: any, cb: any) => {
      setTimeout(() => cb([{ id: 1, url: 'https://google.com' }]), 0)
      return Promise.resolve([{ id: 1 }])
    })
    chrome.tabs.sendMessage.mockImplementation((_id: number, _msg: any, cb: any) => {
      cb({ success: false })
      return Promise.resolve({ success: false })
    })

    render(<App />)
    expect(await screen.findByText('LMS 사이트에서 로그인 후 진행해주세요!')).toBeInTheDocument()
  })
  it('팝업 렌더링(LMS o)', async () => {
    chrome.tabs.query.mockImplementation((_q: any, cb: any) => {
      // 동기 대신 비동기처럼 한 번만 콜백
      setTimeout(() => cb([{ id: 1, url: 'https://knulms.kongju.ac.kr/' }]), 0)
      return Promise.resolve([{ id: 1 }])
    })

    chrome.tabs.sendMessage.mockImplementation((_id: number, msg: any, cb: any) => {
      setTimeout(() => {
        if (msg?.type === 'GET_LMS') {
          cb({ success: true, lmsUser: '홍길동', xToken: 'token-123' })
        } else {
          cb({ success: true })
        }
      }, 0)
      return Promise.resolve({ success: true })
    })

    await act(async () => {
      render(<App />)
    })
    expect(await screen.findByText('LMS 토큰 생성 바로가기')).toBeInTheDocument()
  })
})

describe('ContentScript', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('메인 화면', () => {
    render(<Content />)

    expect(screen.queryByText('공주대 LMS 알림을 한번에!')).not.toBeInTheDocument()

    const button = screen.getByTestId('modal-button')
    fireEvent.click(button)

    expect(screen.getByText('공주대 LMS 알림을 한번에!')).toBeInTheDocument()
  })
})
