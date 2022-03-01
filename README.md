[![Build Status](https://img.shields.io/badge/status-developing-orange)](https://github.com/dnd-side-project/dnd-6th-7-worry-record-service)
![License](https://img.shields.io/apm/l/vim-mode?color=yellowgreen)

<br>

<br>

<p align="center">
  <img width="350" height="350" src="https://user-images.githubusercontent.com/84304802/155870606-95bd66c5-a38d-4c29-932c-4b2b6f4dc5dd.png" alt="이미지 준비중">
</p>




# '🔮흐릿 - 걱정 기록 서비스'

<br>

### "💁‍♂️오늘도 걱정하셨나요?"

걱정의 대부분은 **괜히 하는 걱정**이라고 합니다. 그러나 우리는 이 사실을 알면서도 대부분의 걱정에 감정을 소모하고, 지쳐합니다. 하지만 이 걱정을 의미있게 기록해보면 어떨까요? 물론 스스로가 기억하기엔 부정적인 감정이 크니, 기억하는건 남에게 미뤄두고요.

이걸 가능하게 해주는 걱정을 기록하고 검증하는 서비스, 흐릿을 소개합니다.

걱정의 대부분은 생산성이 없고 소모적입니다. 그렇다고 그냥 내버려 두기에는 우리에게 부정적인 영향을 많이 끼치죠. <br>
**흐릿**은 걱정을 기록하여 보관하고 실제로 걱정이 얼마나 벌어졌는지 퍼센트 형태로 시각화하여 사용자들에게 보여줍니다. 또한 걱정에 대한 후기를 기록할 수 있도록 하여 이를 나중에 다시 돌아보면서 내 걱정이 별 것 아니었다고 깨닫는 경험을 통해 사용자가 걱정에 대한 부담을 줄일 수 있는 해결책을 제시합니다.

<br>

## 아키텍쳐

![dnd-6-7-fe drawio](https://user-images.githubusercontent.com/42944883/149341687-ad3f8df0-40ae-4be6-99e5-24d49273ff16.png)

## 기술 스택

- React Native
- typescript
- React-navigation
- Styled Component
- React Native Element
- Axios
- React-query (사용가능한지 확인)

## 디자인 패턴

- Presentational and Container Component Pattern ([참고](https://velog.io/@holim0/React-Design-Pattern))
  - 위 디자인 패턴에서 Present 생략 

## 코딩 컨벤션
- functional component로 개발 예정
- 기타 컨벤션은 eslint 룰로 지정

## 포팅
- eslint
- Prettier
- lint-staged
- husky

### # 브랜치 관리 전략

**⚙️ git-flow**

<p align="center">
  <img src="https://user-images.githubusercontent.com/84304802/148559145-64a8029e-d220-4b80-b02f-eb45a0e07c05.png" alt="git-flow">
</p>

<br>


| 브랜치 종류  | 설명                                                         |
| ------------ | ------------------------------------------------------------ |
| Master(main) | 테스트 서버에서 테스트가 끝나고 운영서버로 배포 할 수 있는 브랜치 |
| development      | 개발을 위한 브랜치                                           |
| feature      | 하나의 기능을 개발하기 위한 브랜치                           |
| hotfix       | 운영중인 버전에서 발생한 버그를 수정 하는 브랜치             |

- `feature` 브랜치는 하나의 기능을 개발하기 위한 브랜치입니다. 부모는 `develop`이며, 개발이 완료되면 `develop`에 merge합니다. 브랜치 이름은 보통 `feature/*`이 됩니다.
- `develop` 브랜치는 개발을 위한 브랜치입니다. 여러 `feature`들이 merge되는 장소이며, 아직 release되지 않은 기능들이 모여 있게 됩니다.
- `master` 브랜치는 실제 운영 중인 서비스의 브랜치입니다. 
- `hotfix` 브랜치는 서비스에 문제가 발생했을 때 핫픽스에 해당하는 브랜치입니다. 기능 개발(`feature`) 등과 달리 빠르게 대처해야 할 필요가 있기 때문에, `master` 브랜치에 직접 merge하는 전략을 취합니다.  `develop`과의 차이가 발생하기 때문에, 나중에 차이를 merge할 필요가 있습니다.

<br>

<br>

### # 브랜치 네이밍

**⚙️ 네이밍 패턴**

```
브랜치 종류/이슈번호-간단한 설명	
```

**Ex)** 이슈번호가 67인 '로그인 기능' 이슈를 구현하는 브랜치를 생성하는 경우, 브랜치 이름을<br> 	`feature/67-login` 로 작성한다.

<br>

<br>

### # 커밋 메시지

**⚙️ 메시지 구조**

```
Type : 제목 #이슈번호

본문
```

**Ex)** 이슈번호가 67인 이슈의 기능을 구현한 뒤 커밋을 하는 상황이라면 커밋 메시지의 제목을<br>	`feat : A기능 구현 #67` 으로 작성한다.

<br>

**⚙️ Type**

| 타입 종류 | 설명                                 |
| --------- | ------------------------------------ |
| feat      | 새로운 기능에 대한 커밋              |
| fix       | 수정에 대한 커밋                     |
| bug       | 버그에 대한 커밋                     |
| build     | 빌드 관련 파일 수정에 대한 커밋      |
| ci/cd     | 배포 커밋                            |
| docs      | 문서 수정에 대한 커밋                |
| style     | 코드 스타일 혹은 포맷 등에 관한 커밋 |
| refactor  | 코드 리팩토링에 대한 커밋            |
| test      | 테스트 코드 수정에 대한 커밋         |

<br>

<br>

## 포맷팅

---

- eslint + prettier 사용
- husky + lint-staged 사용

## 파트 및 개발 계획

---

#### 🖥️ 프론트엔드 

- 김상초 [Github](https://github.com/SangchoKim)
- 신유림 [Github](https://github.com/NONE-31D)

#### 🗄️ 백엔드 

- 강준호 [Github](https://github.com/JunHo-YH)
- 최승준 [Github](https://github.com/PgmJun)

#### 🎨 디자인

- 윤수정
- 조윤서

<br>

**[ 개발 기간 ]** 2022/01 ~ 2022/03
<br>

📑**Notion**: https://www.notion.so/DND-6-7-811f10387f8e458689cedd781c714d86 

<br>

