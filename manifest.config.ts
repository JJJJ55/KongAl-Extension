import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

const isDev = process.env.NODE_ENV === 'development'

export default defineManifest({
  manifest_version: 3,
  name: isDev
    ? '[DEV] 콩알[Kong_Al] - 국립공주대학교 LMS 정보 알리미'
    : '콩알[Kong_Al] - 국립공주대학교 LMS 정보 알리미',
  description: pkg.description,
  version: pkg.version,
  icons: {
    48: 'public/kongal_Logo.png',
  },
  action: {
    default_icon: {
      48: 'public/kongal_Logo.png',
    },
    default_popup: 'src/popup/index.html',
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      js: ['src/content/main.tsx'],
      matches: [
        'https://*.google.com/*',
        'https://*.naver.com/*',
        'https://*.www.youtube.com/*',
        'https://knulms.kongju.ac.kr/*',
        'https://*.kongju.ac.kr/*',
        'https://*.kncu.kongju.ac.kr/*',
      ],
    },
  ],
  host_permissions: [
    'https://*.google.com/*',
    'https://*.naver.com/*',
    'https://*.www.youtube.com/*',
    'https://knulms.kongju.ac.kr/*',
    'https://*.kongju.ac.kr/*',
    'https://*.kncu.kongju.ac.kr/*',
  ],
  permissions: ['storage', 'unlimitedStorage', 'activeTab', 'scripting', 'notifications', 'cookies'],
})
