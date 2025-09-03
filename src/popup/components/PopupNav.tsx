import { CallIcon, GithubIcon, BuymecoffeeIcon } from '@/components/Icons'
import { NavLink } from './NavLink'

export const PopupNav = () => {
  return (
    <nav className="border-knuBlue flex w-full justify-center gap-6">
      <NavLink link="https://github.com/JJJJ55" text="Github">
        <GithubIcon className="h-[20px] w-[20px]" />
      </NavLink>
      <NavLink link="https://github.com/JJJJ55" text="문의하기">
        <CallIcon className="h-[20px] w-[20px]" />
      </NavLink>
      <NavLink link="https://github.com/JJJJ55" text="개발자 후원">
        <BuymecoffeeIcon className="h-[20px] w-[20px]" />
      </NavLink>
    </nav>
  )
}
