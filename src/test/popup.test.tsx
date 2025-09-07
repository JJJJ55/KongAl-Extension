import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from '@/popup/App.tsx'
import { Content } from '@/content/components/Content'

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

    render(<App />)

    // async await로 대기
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

// describe('서비스 로그인', () => {
//   beforeEach(() => {
//     vi.clearAllMocks()
//   })

//   it('팝업에서 로그인 후 contentScript가 열리는지 확인', async () => {
//     // chrome.tabs.query.mockImplementation((_q: any, cb: any) => {
//     //   setTimeout(() => cb([{ id: 1, url: 'https://knulms.kongju.ac.kr/' }]), 0)
//     //   return Promise.resolve([{ id: 1 }])
//     // })

//     // chrome.tabs.sendMessage.mockImplementation((_id: number, msg: any, cb: any) => {
//     //   setTimeout(() => {
//     //     if (msg?.type === 'GET_LMS') {
//     //       cb({ success: true, lmsUser: '홍길동', xToken: 'token-123' })
//     //     } else {
//     //       cb({ success: true })
//     //     }
//     //   }, 0)
//     //   return Promise.resolve({ success: true })
//     // })

//     // 팝업 + 컨텐츠를 같은 트리에 붙여서 테스트
//     render(
//       <>
//         <App />
//         <Content />
//       </>,
//     )

//     // 팝업 버튼 클릭
//     const button = await screen.findByTestId('modal-button')
//     fireEvent.click(button)

//     // contentScript 안의 제목 확인
//     expect(await screen.findByText('공주대 LMS 알림을 한번에!')).toBeInTheDocument()
//   })
// })
