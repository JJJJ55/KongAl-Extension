import { Text } from '@/components'

type NavProps = {
  link: string
  text: string
  children: React.ReactNode
}

export const NavLink = ({ link, text, children }: NavProps) => {
  return (
    <a className="flex items-center" href={link} target="_blank">
      {children}
      <Text className="ml-2 text-[11px]">{text}</Text>
    </a>
  )
}
