import { Text } from '@/components'

type NavProps = {
  link: string
  text: string
  children: React.ReactNode
}

export const NavLink = ({ link, text, children }: NavProps) => {
  return (
    <a className="bg-gray1 dark:bg-dark12 flex items-center rounded-xl px-2 py-1" href={link} target="_blank">
      {children}
      <Text className="ml-1 text-[11px]">{text}</Text>
    </a>
  )
}
