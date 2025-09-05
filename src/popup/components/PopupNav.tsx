import { CallIcon, GithubIcon, BuymecoffeeIcon } from '@/components/Icons'
import { NavLink } from './NavLink'

export const PopupNav = () => {
  return (
    <nav className="border-knuBlue flex w-full justify-center gap-6">
      <NavLink link="https://github.com/JJJJ55/KongAl-Extension" text="Github">
        <GithubIcon className="h-[20px] w-[20px]" />
      </NavLink>
      <NavLink link="https://open.kakao.com/o/s9tYshQh" text="문의 & 오류접수">
        <CallIcon className="h-[20px] w-[20px]" />
      </NavLink>
      <NavLink link="https://buymeacoffee.com/dhwlsdud62z" text="개발자 후원">
        <BuymecoffeeIcon className="h-[20px] w-[20px]" />
      </NavLink>
    </nav>
  )
}
