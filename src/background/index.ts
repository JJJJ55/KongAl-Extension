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
  }
})

const getSubject = async (token: string) => {
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
