export const SHADOW_HOST_ID = 'kong-al-shadow-host'

export const Guide = {
  noToken: {
    img: chrome.runtime.getURL('popup_notToken.png'),
    bigText: '서비스 이용을 위해 토큰 생성을 해주세요!',
    smallText: 'LMS 접근 권한을 위해 토큰 생성은 필수입니다.',
  },
  getToken: {
    img: chrome.runtime.getURL('popup_getToken.png'),
    bigText: 'LMS 토큰을 가지고 있어요!',
    smallText: `계졍 변경 등 토큰 삭제를 원할 경우 \n브라우저 오른쪽 하단에서 설정창을 확인해주세요.`,
  },
  notification: {
    img: chrome.runtime.getURL('popup_notification.png'),
    bigText: '서비스 알림이 존재해요!',
    smallText: '브라우저 오른쪽 하단을 통해 알림을 확인해주세요.',
  },
}
