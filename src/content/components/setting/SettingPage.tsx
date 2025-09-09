import { BasicButton, Text } from '@/components'
import { useStoragestore } from '@/store/useStorageStore'
import { SettingBottomNav } from './SettingBottomNav'
import { SettingItem } from './SettingItem'
import { SettingTopNav } from './SettingTopNav'

export const SettingPage = () => {
  const { system, settings, info, updateData, resetStore } = useStoragestore()
  const ua = navigator.userAgent.toLowerCase().includes('whale') ? true : false

  const handleSettingItem = (type: string, value: string) => {
    if (type === 'theme') updateData('system', prev => ({ ...prev, theme: value }))
    else updateData('system', prev => ({ ...prev, notiBeep: value === 'Y' ? false : true }))
  }

  return (
    <div className="scrollbar-hidden relative flex flex-1 flex-col items-center gap-3 overflow-auto pt-6">
      <SettingTopNav image={settings.image} userName={info.username} userId={info.userId} updateData={updateData} />
      <div className="flex h-[103px] flex-col justify-between text-[15px] font-bold">
        <SettingItem
          type="theme"
          title="화면 테마"
          value={system.theme}
          items={['sys', 'light', 'dark']}
          itemsName={['시스템 설정', '라이트', '다크']}
          onFunc={handleSettingItem}
        />
        {!ua ? (
          <SettingItem
            type="beep"
            title="알림음 여부"
            value={system.notiBeep ? 'N' : 'Y'}
            items={['Y', 'N']}
            itemsName={['설 정', '해 제']}
            onFunc={handleSettingItem}
          />
        ) : (
          <div>
            <Text>알림음 여부</Text>
            <div className="text-gray4 mt-1 flex w-[300px] justify-center px-4 text-center text-[13px] font-medium">
              <span className="font-pretendard font-medium">웨일 브라우저는 알림음을 지원하지 않아요.</span>
            </div>
          </div>
        )}
      </div>
      <div className="text-[15px] font-bold">
        <Text>토큰 정보</Text>
        <div className="dark:bg-dark5 bg-gray2 text-gray4 mt-1 h-[40px] w-[300px] truncate rounded-xl px-4 leading-[40px] transition-colors duration-500">
          {settings.siteToken ? settings.siteToken : '토큰이 존재하지 않습니다.'}
        </div>
      </div>
      <div className="flex w-[300px] items-center justify-between">
        <BasicButton className="w-[145px]" onClick={() => window.open(`${import.meta.env.VITE_OPENCHAT}`, '_blank')}>
          문의 & 버그 제보
        </BasicButton>
        <BasicButton className="w-[145px]" onClick={() => window.open(`${import.meta.env.VITE_GUIDE}`, '_blank')}>
          서비스 가이드
        </BasicButton>
      </div>
      <BasicButton className="w-[300px]" onClick={async () => await resetStore()}>
        서비스 로그아웃
      </BasicButton>
      <SettingBottomNav version={settings.version} />
    </div>
  )
}
