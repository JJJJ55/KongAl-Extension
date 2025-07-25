import { chromeStorage } from '@/store/chromeStorage'

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.alarms.create('TEST', {
//     periodInMinutes: 1,
//   })
// })

// chrome.alarms.onAlarm.addListener(async alarm => {
//   const siteToken = (await chromeStorage.getDataByKey('settings')).siteToken

//   console.log('알람 토큰', siteToken)

//   if (alarm.name === 'TEST') {
//     try {
//       const res = await fetch(import.meta.env.VITE_USER_INFO, {
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//           Authorization: `Bearer ${siteToken}`,
//         },
//       })

//       const data = await res.json()

//       const tabs = await chrome.tabs.query({})
//       for (const tab of tabs) {
//         if (tab.id) {
//           chrome.tabs.sendMessage(tab.id, { type: 'AL_TEST', data })
//         }
//       }
//     } catch (error) {
//       console.log('알람 fetch 실패 : ', error)
//     }
//   }
// })

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
    fetch(`${import.meta.env.VITE_SITETOKEN_URL}users/self/favorites/courses?include[]=teachers`, {
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
  } else if (message.type === 'USER_ISSUE') {
    const { token, ids } = message

    // const url = new URL(
    //   `${import.meta.env.VITE_SITETOKEN_URL}/planner/items?start_date=2025-03-10T15:00:00.000Z&per_page=100`,
    // )
    // ids.forEach(id => url.searchParams.append('context_codes[]', `course_${id}`))
    // fetch(url.toString(), {
    //   method: 'GET',
    //   credentials: 'include',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then(response => response.json())
    //   .then(res => sendResponse({ success: true, data: res }))
    //   .catch(error => sendResponse({ success: false, data: error.message }))
    const url = new URL(
      `${import.meta.env.VITE_SITETOKEN_URL}/planner/items?start_date=2025-03-10T15:00:00.000Z&per_page=10`,
    )
    ids.forEach(id => url.searchParams.append('context_codes[]', `course_${id}`))

    sendPlannerItemsToTabs(token, ids)

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
  }
})

const sendPlannerItemsToTabs = async (token: string, contextCodes: string[]) => {
  const data = await fetchAllPlannerItems(token, contextCodes)

  const tabs = await chrome.tabs.query({}) // 열려 있는 모든 탭
  for (const tab of tabs) {
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, {
        type: 'PLANNER_ITEMS',
        data,
      })
    }
  }
}

const fetchAllPlannerItems = async (token: string, contextCodes: string[]) => {
  const allItems: any[] = []
  let url = new URL(`${import.meta.env.VITE_SITETOKEN_URL}/planner/items`)
  url.searchParams.set('per_page', '10')

  contextCodes.forEach(code => {
    url.searchParams.append('context_codes[]', `course_${code}`)
  })

  while (url) {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })

    if (!res.ok) throw new Error('API 요청 실패')

    const data = await res.json()
    allItems.push(...data)

    // Link 헤더에서 next URL 추출
    const linkHeader = res.headers.get('Link')
    if (linkHeader) {
      const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/)
      if (nextMatch) {
        url = new URL(nextMatch[1])
      } else {
        url = null // 다음 페이지 없음
      }
    } else {
      url = null
    }
  }

  return allItems
}
