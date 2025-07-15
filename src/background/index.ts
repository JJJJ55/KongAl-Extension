chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'USER_INFO') {
    // chrome.storage.local.get('settings', data => {
    //   const token = data.settings?.siteToken

    // })
    fetch('', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer yYxU4q4DpycV6GAOgZD0MtVO609dZLWnoKFH9OXFIFXEE46VVc6AjtSrUbSoEtp3`,
      },
    })
      .then(response => sendResponse(response))
      .catch(error => sendResponse({ success: true, data: error.message }))

    return true
  }
})
