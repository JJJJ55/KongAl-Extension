import { createRoot } from 'react-dom/client'
import toastStyles from 'react-toastify/dist/ReactToastify.css?inline'
import App from './App.tsx'
import { CommonContainer } from '@/components/CommonContainer.tsx'
import styles from '@/styles/index.css?inline'

function createShadowRoot(styles: string[]): ShadowRoot {
  const host = document.createElement('div')
  host.setAttribute('id', 'kong-al-shadow-host')
  const shadowRoot = host.attachShadow({ mode: 'open' })

  const globalStyleSheet = new CSSStyleSheet()
  globalStyleSheet.replaceSync(styles.join('\n'))

  shadowRoot.adoptedStyleSheets = [globalStyleSheet]

  document.body.appendChild(host)

  return shadowRoot
}

const shadowRoot = createShadowRoot([styles, toastStyles])

createRoot(shadowRoot).render(
  <CommonContainer>
    <App />
  </CommonContainer>,
)
