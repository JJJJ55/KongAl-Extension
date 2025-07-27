import { createRoot } from 'react-dom/client'
import App from './views/App.tsx'
import styles from '@/styles/index.css?inline'
import cropperStyles from 'react-easy-crop/react-easy-crop.css?inline'
import toastStyles from 'react-toastify/dist/ReactToastify.css?inline'

import { SHADOW_HOST_ID } from '@/constants'

function createShadowRoot(styles: string[]): ShadowRoot {
  const host = document.createElement('div')
  host.setAttribute('id', SHADOW_HOST_ID)
  const shadowRoot = host.attachShadow({ mode: 'open' })

  const globalStyleSheet = new CSSStyleSheet()
  globalStyleSheet.replaceSync(styles.join('\n'))

  shadowRoot.adoptedStyleSheets = [globalStyleSheet]

  document.body.appendChild(host)

  return shadowRoot
}

function initApp() {
  const shadowRoot = createShadowRoot([styles, cropperStyles, toastStyles])
  createRoot(shadowRoot).render(<App />)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}
