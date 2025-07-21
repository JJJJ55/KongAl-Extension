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

    const url = new URL(
      `${import.meta.env.VITE_SITETOKEN_URL}/planner/items?start_date=2025-03-10T15:00:00.000Z&per_page=100`,
    )
    ids.forEach(id => url.searchParams.append('context_codes[]', `course_${id}`))
    fetch(url.toString(), {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(res => sendResponse({ success: true, data: res }))
      .catch(error => sendResponse({ success: false, data: error.message }))

    return true
  }
})
