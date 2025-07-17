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
    fetch(
      `${import.meta.env.VITE_SITETOKEN_URL}/planner/items?context_codes[]=course_40378&start_date=2025-07-10T15:00:00.000Z&per_page=100`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${message.token}`,
        },
      },
    )
      .then(response => response.json())
      .then(res => sendResponse({ success: true, data: res }))
      .catch(error => sendResponse({ success: false, data: error.message }))

    return true
  }
})
