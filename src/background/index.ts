import type { NotificationItem } from '@/types'

chrome.runtime.onInstalled.addListener(async () => {
  for (const c of chrome.runtime.getManifest().content_scripts ?? []) {
    for (const t of await chrome.tabs.query({ url: c.matches ?? [] })) {
      chrome.scripting.executeScript({
        target: { tabId: t.id ?? 0 },
        files: c.js ?? [],
      })
      c.css?.forEach(css => {
        chrome.scripting.insertCSS({
          target: { tabId: t.id ?? 0 },
          files: [css],
        })
      })
    }
  }
})

chrome.runtime.onUpdateAvailable.addListener(() => {
  chrome.runtime.reload()
})

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'USER_INFO') {
    getUserInfo(message.token).then(result => sendResponse(result))

    return true
  } else if (message.type === 'USER_SUBJECT') {
    getSubject(message.token).then(result => sendResponse(result))

    return true
  } else if (message.type === 'USER_ISSUE') {
    const { token, ids } = message
    getSubjectIssue(token, ids).then(result => sendResponse(result))

    return true
  } else if (message.type === 'SUBJECT_LIST') {
    const { token, id } = message
    getPlayList(id, token).then(result => sendResponse(result))

    return true
  } else if (message.type === 'NOTI') {
    const ua = navigator.userAgent.toLowerCase().includes('whale') ? true : false
    message.notification.forEach(({ title, msg }: NotificationItem) => {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: chrome.runtime.getURL('kongal_Logo.png'), // public 폴더에 icon.png 넣어두세요
        title,
        message: msg,
        priority: 2,
        silent: ua ? true : message.beep,
      })
    })
    chrome.action.setBadgeText({ text: '!' })
    chrome.action.setBadgeBackgroundColor({ color: '#FF0000' })
  } else if (message.type === 'CLEAN_BADGE') {
    chrome.action.setBadgeText({ text: '' })
  }
})

const getCsrfToken = (): Promise<string | null> => {
  return new Promise(resolve => {
    chrome.cookies.getAll({ domain: `${import.meta.env.VITE_TOKEN_URL}`, name: '_csrf_token' }, cookies => {
      if (cookies.length > 0) resolve(cookies[0].value)
      else resolve(null)
    })
  })
}

const getUserInfo = async (token: string) => {
  const value = await getCsrfToken()
  return await fetch(import.meta.env.VITE_USER_INFO, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-csrf-token': decodeURIComponent(value || ''),
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

const getSubject = async (token: string) => {
  const value = await getCsrfToken()
  return await fetch(`${import.meta.env.VITE_USER_SUBJECT}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-csrf-token': decodeURIComponent(value || ''),
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
  const value = await getCsrfToken()
  let url = new URL(`${import.meta.env.VITE_USER_ISSUE}`)
  url.searchParams.set('per_page', '100')
  ids.forEach(id => url.searchParams.append('context_codes[]', `course_${id}`))

  while (url) {
    const res = await fetch(url.toString(), {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'x-csrf-token': decodeURIComponent(value || ''),
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

const getPlayList = async (id: string, token: string) => {
  return await fetch(`${import.meta.env.VITE_XTOKEN_URL}${id}${import.meta.env.VITE_PLAYSTRING}`, {
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
