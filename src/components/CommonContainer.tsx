import { type PropsWithChildren } from 'react'

export const CommonContainer = ({ children }: PropsWithChildren) => {
  return <div id="kong-app">{children}</div>
}
