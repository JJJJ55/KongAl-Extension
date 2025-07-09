import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import styles from '@/styles/index.css?inline'
import { CommonContainer } from '@/components/CommonContainer.tsx'

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

const shadowRoot = createShadowRoot([styles])

createRoot(shadowRoot).render(
  <CommonContainer>
    <App />
  </CommonContainer>,
)
