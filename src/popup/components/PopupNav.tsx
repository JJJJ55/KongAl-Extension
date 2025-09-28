import { NavLink } from './NavLink'
import { CallIcon, GithubIcon, BuymecoffeeIcon } from '@/components/Icons'

export const PopupNav = () => {
  return (
    <nav className="flex w-full justify-center gap-4">
      <NavLink link={import.meta.env.VITE_GITHUB} text="Github">
        <GithubIcon className="h-[20px] w-[20px]" />
      </NavLink>
      <NavLink link={import.meta.env.VITE_GUIDE} text="이용가이드 (필독)">
        <CallIcon className="h-[20px] w-[20px]" />
      </NavLink>
      <NavLink link={import.meta.env.VITE_DONATION} text="개발자 후원">
        <BuymecoffeeIcon className="h-[20px] w-[20px]" />
      </NavLink>
    </nav>
  )
}
