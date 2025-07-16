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
  }
})
