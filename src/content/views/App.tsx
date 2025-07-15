import { CommonContainer } from '@/components'
import { Content } from '../components/Content'
import { useStoragestore } from '@/store/useStorageStore'

function App() {
  const { settings } = useStoragestore()
  return <CommonContainer>{settings.siteToken && settings.siteToken!.length === 64 && <Content />}</CommonContainer>
}

export default App
