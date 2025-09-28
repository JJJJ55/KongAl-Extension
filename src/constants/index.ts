export const SHADOW_HOST_ID = 'kong-al-shadow-host'

export const Guide = {
  noToken: {
    img: chrome.runtime.getURL('popup_notToken.png'),
    bigText: 'LMS 접근 권한을 위해 토큰을 등록해주세요!',
    smallText: '토큰 관련 내용은 이용 가이드의 필독 사항을 꼭 확인해주세요!',
  },
  getToken: {
    img: chrome.runtime.getURL('popup_getToken.png'),
    bigText: 'LMS 토큰을 가지고 있어요!',
    smallText: `오늘도 즐거운 하루 보내세요!`,
  },
  notification: {
    img: chrome.runtime.getURL('popup_notification.png'),
    bigText: '서비스 알림이 존재해요!',
    smallText: '콩알에서 알림을 확인해주세요.',
  },
}
