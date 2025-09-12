# 🥜 콩알 [Kong_Al]
> 국립공주대학교 LMS 정보 알리미 확장 프로그램
<div align='center'>
  <div>
    <img src="https://github.com/user-attachments/assets/7c580f9b-8d19-4f81-b089-0930ac9319dd" alt="화면"/>
  </div>
  <div>
    <h3>개발 기간</h3>
    <b>📅 2025. 05. 28 ~ Ing</b>
  </div>
  <br/>
<!--   <img src="https://img.shields.io/chrome-web-store/v/hannhecbnjnnbbafffmogdlnajpcomek?style=for-the-badge&label=version&color=blue" alt="서비스 버전" /> -->
  <br />
  <br />
  <div style="display: flex; justify-content: center">
    <a href="">
      <img src="https://github.com/user-attachments/assets/c371a3c8-8cdb-4acf-aba0-9394b586146d" alt="Chrome 웹 스토어에서 다운로드" />
    </a>
    <a href="">
      <img src="https://github.com/user-attachments/assets/0213f46d-b7b1-4a5e-ac3c-4b70262ec247" alt="Whale 스토어에서 다운로드" />
    </a>
  </div>
  <br/>
  <div style="display: flex; justify-content: center">
    <a href="">
      <img width="200" height="50" alt="Image" src="https://github.com/user-attachments/assets/21b3b498-dfe1-4a3d-868f-0873fa32248f" alt="사용자 가이드" />
    </a>
    <a href="https://buymeacoffee.com/dhwlsdud62z">
      <img width="200" height="50" alt="Image" src="https://github.com/user-attachments/assets/6cc2698e-f5fb-4a7a-b3fc-a680a7024c9c" alt="개발자 후원하기" />
    </a>
    <a href="https://open.kakao.com/o/s9tYshQh">
      <img width="200" height="50" alt="Image" src="https://github.com/user-attachments/assets/238206ae-3bc8-4d0c-9ef8-4cc9bea6877d" alt="서비스 문의 & 오류  제보" />
    </a>
  </div> 
</div>

## 프로젝트 소개
> ✔ 콩알은 **여러분의 LMS있는 정보들을 종합해서 간편하게 제공해주는 확장 프로그램**입니다.
> 
> ✔ 주요 과목들의 **주차 학습, 공지사항, 과제**들을 한눈에 확인해보세요!
> 
> ✔ 또한 **놓친 LMS 학습, 새 공지, 미 제출 과제가 있다면 알림**으로 알려주니 학점 챙기기에도 편해요!


#### &ensp; 🛠️ 기술 스택
&ensp; [![Skills](https://go-skill-icons.vercel.app/api/icons?i=react,typescript,vite,zustand,tailwindcss,vitest,chrome)](https://github.com/JJJJ55/KongAl-Extension)

> ## 서비스 소개

> #### 메인 화면

|과목 탭|설정 탭|
|--|--|
|<img width="358" height="608" alt="Image" src="https://github.com/user-attachments/assets/bcb07341-1dd1-4868-b4db-4886c95bee94" alt="과목 탭"/>|<img width="358" height="608" alt="Image" src="https://github.com/user-attachments/assets/2308a6c6-74b0-46ef-9e79-393474f7e5bc" alt="설정 탭"/>|
- 과목 탭에서는 주요 과목과 이슈 태그를 한눈에 볼 수 있습니다
- 설정 탭에서 사용자 정보 및 테마, 알림음 여부를 설정할 수 있습니다

> #### 과목 상세 화면
|과목 내 학습|과목 내 공지|과목 내 과제|
|--|--|--|
|<img width="358" height="608" alt="Image" src="https://github.com/user-attachments/assets/3a761a9d-d2e8-4df2-82f3-9b107a484816" alt="과목 내 학습"/>|<img width="358" height="608" alt="Image" src="https://github.com/user-attachments/assets/00bd2952-d267-4b87-a34f-59450af1d54a" alt="과목 내 공지"/>|<img width="358" height="608" alt="Image" src="https://github.com/user-attachments/assets/d906437b-3bf4-409d-9f51-2f5107231bee" alt="과목 내 과제"/>
- 과목의 주차학습 (LMS 학습) 정보를 볼 수 있습니다.
- 공지 리스트를 한눈에 볼 수 있습니다.
- 과제 내역이 제공되며, 미제출 과제는 임의로 상태 변경이 가능합니다.

> ## 📁 프로젝트 구조

```bash
src/
├── assets                    # Servuce assets
├── background                # Extension background
├── components                # Common components
├── constants                 # Service constants
├── content                   # Extension content script
│   ├── components            # Content script components
│   │   ├── setting           # Setting tab components
│   │   └── subject           # Subject tab components
│   │       └── detail        # Detail components in Subjects
│   └── views                 # Content script App
├── hooks                     # Custom hooks
├── popup                     # Extension Popup
│   └── components            # Popup components
├── store                     # Service store
├── styles                    # Service style
├── test                      # Test code
├── types                     # Service types
└── utils                     # Service utils func
```

> ## ✅ 서비스 컨벤션

```
#   feat        : 기능 (새로운 기능)
#   fix         : 버그 (버그 수정)
#   refactor    : 리팩토링
#   design      : CSS 등 사용자 UI 디자인 변경
#   comment     : 필요한 주석 추가 및 변경
#   style       : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)
#   docs        : 문서 수정 (문서 추가, 수정, 삭제, README)
#   test        : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)
#   chore       : 기타 변경사항 (빌드 스크립트 수정, assets, 패키지 매니저 등)
#   init        : 초기 생성
#   rename      : 파일 혹은 폴더명을 수정하거나 옮기는 작업만 한 경우
#   remove      : 파일을 삭제하는 작업만 수행한 경우
```
