import type { LMSWebInfoProps, SendMessageProps } from '@/types'

export const sendMessageAsync = (message: any): Promise<SendMessageProps> => {
  return new Promise<SendMessageProps>(resolve => {
    chrome.runtime.sendMessage(message, resolve)
  })
}

export const getLmsWebInfo = (userName: string): Promise<LMSWebInfoProps> => {
  return new Promise<LMSWebInfoProps>(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_LMS', userName }, resolve)
      }
    })
  })
}
