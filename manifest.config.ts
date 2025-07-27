import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
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
      matches: ['https://kncu.kongju.ac.kr/*', 'https://knulms.kongju.ac.kr/*', 'https://www.naver.com/'],
    },
  ],
  host_permissions: ['https://kncu.kongju.ac.kr/*', 'https://knulms.kongju.ac.kr/*', 'https://www.naver.com/'],
  permissions: ['storage', 'unlimitedStorage', 'tabs', 'scripting', 'alarms'],
})
