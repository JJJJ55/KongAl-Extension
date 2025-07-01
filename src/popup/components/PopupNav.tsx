import { CallIcon, GithubIcon, KongjuIcon } from '@/components/Icons'
import { NavLink } from './NavLink'

export const PopupNav = () => {
  return (
    <nav className="border-knuBlue flex w-full justify-center gap-6">
      <NavLink link="https://github.com/JJJJ55" text="Github">
        <GithubIcon className="h-[20px] w-[20px]" />
      </NavLink>
      <NavLink link="https://github.com/JJJJ55" text="LMS 바로가기">
        <KongjuIcon className="h-[20px] w-[20px]" />
      </NavLink>
      <NavLink link="https://github.com/JJJJ55" text="문의하기">
        <CallIcon className="h-[20px] w-[20px]" />
      </NavLink>
    </nav>
  )
}
