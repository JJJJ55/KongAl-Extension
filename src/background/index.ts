import type { NotificationItem } from '@/types'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'USER_INFO') {
    fetch(import.meta.env.VITE_USER_INFO, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${message.token}`,
      },
    })
      .then(response => response.json())
      .then(res => sendResponse({ success: true, data: res }))
      .catch(error => sendResponse({ success: false, data: error.message }))

    return true
  } else if (message.type === 'USER_SUBJECT') {
    getSubject(message.token).then(result => sendResponse(result))

    return true
  } else if (message.type === 'USER_ISSUE') {
    const { token, ids } = message
    getSubjectIssue(token, ids).then(result => sendResponse(result))

    return true
  } else if (message.type === 'SUBJECT_LIST') {
    fetch(`${import.meta.env.VITE_XTOKEN_URL}courses/${message.id}/modules?include_detail=true`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TEST_TOKEN}`,
      },
    })
      .then(response => response.json())
      .then(res => sendResponse({ success: true, data: res }))
      .catch(error => sendResponse({ success: false, data: error.message }))

    return true
  } else if (message.type === 'NOTI') {
    console.log('받은 알림 목록', message.notification)
    message.notification.forEach(({ title, message }: NotificationItem) => {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: chrome.runtime.getURL('kongal_Logo.png'), // public 폴더에 icon.png 넣어두세요
        title,
        message,
        priority: 2,
      })
    })

    // 알림 테스트
    // const items = [
    //   { title: '새로운 공지', message: '' },
    //   { title: '공지 2', message: '탄소시장과에너지저장장치 01분반' },
    //   { title: '공지 3', message: '시험 일정 업데이트1' },
    //   { title: '공지 4', message: '시험 일정 업데이트2' },
    //   { title: '학습 1', message: '새로운 학습1' },
    //   { title: '학습 2', message: '새로운 학습2' },
    //   { title: '학습 3', message: '새로운 학습3' },
    //   { title: '학습 4', message: '새로운 학습4' },
    //   { title: '과제 1', message: '오늘 마감 과제1' },
    //   { title: '과제 2', message: '오늘 마감 과제2' },
    // ]

    // for (let i = 0; i < items.length; i += 4) {
    //   const item = items.slice(i, i + 4)

    //   chrome.notifications.create({
    //     type: 'list',
    //     iconUrl: chrome.runtime.getURL('kongal_Logo.png'), // public 폴더에 icon.png 넣어두세요
    //     title: `공주대 LMS 알리미 - 콩알`,
    //     message: `${message.content}`,
    //     contextMessage: '아아',
    //     priority: 2,
    //     items: item,
    //   })
    // }
  }
})

const getSubject = async (token: string) => {
  // return { success: true, data: '성공' }
  return await fetch(`${import.meta.env.VITE_SITETOKEN_URL}users/self/favorites/courses?include[]=teachers`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(result => {
      return { success: true, data: result }
    })
    .catch(error => {
      return { success: false, data: error.message }
    })
}

const getSubjectIssue = async (token: string, ids: string[]) => {
  const IssueItems = []

  let url = new URL(`${import.meta.env.VITE_SITETOKEN_URL}/planner/items`)
  url.searchParams.set('per_page', '100')
  ids.forEach(id => url.searchParams.append('context_codes[]', `course_${id}`))

  while (url) {
    const res = await fetch(url.toString(), {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) throw new Error('API 요청 실패')

    const data = await res.json()
    IssueItems.push(...data)

    const linkHeader = res.headers.get('Link')
    if (linkHeader) {
      const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/)
      if (nextMatch) {
        url = new URL(nextMatch[1])
      } else {
        break
      }
    } else {
      break
    }
  }
  return { success: true, data: IssueItems }
}
