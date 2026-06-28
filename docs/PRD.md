# Quest Garden PRD

문서 버전: 1.0  
작성일: 2026-06-27  
대상 플랫폼: 웹, 태블릿, 모바일, PWA 확장 가능  
권장 기술 스택: Next.js, React, TypeScript, TailwindCSS, Supabase, Framer Motion, Lottie, Recharts, Lucide

## 1. Product Overview

### 1.1 제품 개요

Quest Garden은 초등학교 1학년 아이가 숙제, 독서, 생활 습관, 자기주도 학습을 즐겁게 수행하도록 돕는 게임형 웹 애플리케이션이다. 부모는 매일 1분 이내로 미션을 만들고 관리하며, 아이는 글을 많이 읽지 않아도 오늘 해야 할 일을 즉시 이해하고 완료할 수 있어야 한다.

제품의 핵심은 "체크리스트를 게임처럼 느끼게 만드는 것"이다. 미션을 완료할 때마다 정원, 나무, 꽃, 별, 무지개, 아바타, 스티커, 보상 상태가 즉시 변화해야 하며, 아이는 작은 행동이 눈에 보이는 성장으로 이어진다고 느껴야 한다.

### 1.2 제품 비전

아이에게는 숙제와 독서를 "해야 하는 일"이 아니라 "내 정원을 키우는 모험"으로 경험하게 한다. 부모에게는 매일 반복되는 학습 관리 부담을 줄이고, 처벌 없이 긍정적인 강화로 아이를 격려할 수 있는 도구를 제공한다.

### 1.3 해결하려는 문제

- 초등 저학년 아이는 긴 텍스트 기반 할 일 목록을 스스로 이해하기 어렵다.
- 부모는 매일 숙제, 독서, 생활 습관을 확인하고 보상하는 데 반복적인 시간이 든다.
- 기존 체크리스트 앱은 아이에게 재미가 부족하고, 학습 동기보다는 관리 기능에 치우쳐 있다.
- 보상이 즉각적이지 않으면 아이가 자신의 노력이 쌓이는 느낌을 받기 어렵다.

### 1.4 제품 목표

- 아이가 오늘의 미션을 5초 안에 이해할 수 있게 한다.
- 아이가 미션 완료 후 즉각적인 시각적 보상을 받게 한다.
- 부모가 매일 미션 확인과 수정, 승인 작업을 1분 이내로 완료할 수 있게 한다.
- 독서, 숙제, 습관, 자기학습을 포인트, 별, 성장, 아바타, 스티커, 업적과 연결한다.
- 처벌, 경고, 광고, 경쟁 압박 없이 긍정적인 경험을 제공한다.

### 1.5 핵심 성공 지표

- 아이의 주간 미션 완료율 70% 이상
- 부모의 일일 관리 소요 시간 60초 이하
- 주 5일 이상 앱 사용 비율 60% 이상
- 첫 사용 후 7일차 재방문율 50% 이상
- 등록된 보상 중 최소 1개 이상 해금한 아이 비율 40% 이상
- 독서 기록 주간 3권 이상 달성 가구 비율 50% 이상

### 1.6 MVP 범위

MVP에 반드시 포함한다.

- 부모 로그인
- 아이 프로필 생성
- 아이 모드와 부모 모드 분리
- 오늘의 미션 보기
- 부모의 미션 생성, 수정, 비활성화
- 아이의 미션 완료 제출
- 부모의 완료 승인
- 포인트, 별, XP, 레벨
- 일일 스트릭
- 정원형 시각 진행 화면
- 보상 생성 및 해금
- 독서 기록
- 숙제 체크리스트
- 주간 진행 보기
- 월간 달력 보기
- 기본 업적
- 기본 아바타 선택
- 반응형 UI

MVP에서 제외하거나 단순화한다.

- 결제 기능
- 광고
- 공개 커뮤니티
- 아이 계정 로그인
- 실시간 멀티플레이
- 복잡한 AI 튜터링
- 외부 학교 시스템 연동

### 1.7 제품 원칙

- 아이 화면은 텍스트보다 아이콘, 색상, 애니메이션을 우선한다.
- 부모 화면은 빠른 입력, 반복 설정, 승인 중심으로 설계한다.
- 완료 경험은 항상 즉시 보이고 기분 좋아야 한다.
- 경쟁보다 개인 성장, 가족 격려, 꾸준함을 강조한다.
- 어두운 색, 과도한 알림, 광고, 방해 요소를 사용하지 않는다.

## 2. User Personas

### 2.1 Primary Persona: 초등학교 1학년 아이

이름 예시: 지우  
나이: 6~8세  
기기: 부모의 태블릿, 가정용 스마트폰  
읽기 능력: 짧은 단어와 쉬운 문장은 가능하지만 긴 설명은 부담  
주요 행동: 그림을 보고 누르기, 보상 확인하기, 아바타 꾸미기, 별 모으기

필요한 것:

- 오늘 해야 할 일을 한눈에 이해하고 싶다.
- 완료하면 바로 꽃이 피거나 별이 생기는 변화를 보고 싶다.
- 내가 얼마나 잘하고 있는지 칭찬받고 싶다.
- 보상까지 얼마나 남았는지 쉽게 알고 싶다.

불편한 것:

- 글이 많은 화면
- 작은 버튼
- 실패, 경고, 빨간색 중심의 표현
- 설정 화면이나 복잡한 메뉴

성공 경험:

- 미션 하나를 완료하면 정원에 꽃이 피고 아바타가 기뻐한다.
- 오늘의 미션을 모두 끝내면 트로피와 축하 애니메이션이 나온다.
- 읽은 책이 책장에 예쁜 표지로 쌓인다.

### 2.2 Secondary Persona: 부모

이름 예시: 민지 부모  
나이: 30~45세  
기기: 스마트폰, 태블릿, 노트북  
주요 행동: 미션 만들기, 반복 일정 설정, 완료 승인, 보상 설정, 진행 확인

필요한 것:

- 매일 반복되는 숙제와 습관 관리를 빠르게 처리하고 싶다.
- 아이가 스스로 하도록 긍정적인 동기를 주고 싶다.
- 어떤 활동을 얼마나 했는지 주간, 월간으로 보고 싶다.
- 보상을 쉽게 만들고 필요한 별이나 포인트를 설정하고 싶다.

불편한 것:

- 매일 같은 항목을 다시 입력해야 하는 것
- 부모 화면에서 너무 많은 게임 요소 때문에 관리가 느려지는 것
- 아이가 설정이나 보상 값을 마음대로 바꾸는 것

성공 경험:

- 아침에 30초 안에 오늘의 미션을 확인하고 수정한다.
- 저녁에 완료 요청을 한 번에 승인한다.
- 주말에 주간 진행을 보고 가족 보상을 정한다.

## 3. User Stories

### 3.1 아이 사용자 스토리

- 아이로서, 오늘 해야 할 미션을 큰 그림과 버튼으로 보고 싶다. 그래야 혼자서도 무엇을 해야 하는지 알 수 있다.
- 아이로서, 미션을 완료하면 바로 화면이 변했으면 좋겠다. 그래야 내가 해냈다는 느낌을 받을 수 있다.
- 아이로서, 읽은 책을 예쁜 책장에 꽂고 싶다. 그래야 책을 더 읽고 싶어진다.
- 아이로서, 별을 모아서 아이스크림이나 장난감 같은 보상을 받고 싶다.
- 아이로서, 내 아바타가 점점 멋져졌으면 좋겠다.
- 아이로서, 오늘을 모두 끝내면 큰 축하를 받고 싶다.
- 아이로서, 어려운 글을 읽지 않아도 아이콘과 색으로 알 수 있었으면 좋겠다.

### 3.2 부모 사용자 스토리

- 부모로서, 매일 반복되는 미션을 한 번 만들어 자동으로 나타나게 하고 싶다.
- 부모로서, 오늘만 특별히 미션을 추가하거나 빼고 싶다.
- 부모로서, 아이가 완료했다고 누른 미션을 승인하거나 되돌리고 싶다.
- 부모로서, 보상과 필요한 포인트, 별 개수를 설정하고 싶다.
- 부모로서, 아이의 독서량과 숙제 완료 흐름을 주간, 월간으로 보고 싶다.
- 부모로서, 아이 화면에서는 설정이 보이지 않게 하고 싶다.
- 부모로서, 아이가 보상 조건을 달성하면 가족이 함께 축하할 수 있게 하고 싶다.
- 부모로서, 앱을 매일 쓰더라도 관리 시간이 1분을 넘지 않았으면 좋겠다.

### 3.3 관리자 및 시스템 관점 스토리

- 시스템으로서, 반복 미션을 매일 자동으로 오늘의 미션 인스턴스로 생성해야 한다.
- 시스템으로서, 부모 승인 후에만 포인트, 별, XP를 확정 지급해야 한다.
- 시스템으로서, 일일 완료율을 계산해 달력의 금색 별과 트로피 상태를 갱신해야 한다.
- 시스템으로서, 업적 조건을 완료 이벤트마다 검사해야 한다.
- 시스템으로서, 네트워크가 불안정해도 아이의 탭 입력이 사라지지 않게 로컬 임시 저장을 지원해야 한다.

## 4. Functional Requirements

### 4.1 인증과 권한

FR-001 부모 로그인

- Supabase Auth를 사용해 이메일, 비밀번호 기반 부모 로그인을 제공한다.
- 소셜 로그인은 MVP 이후 선택 사항이다.
- 아이는 별도의 계정으로 로그인하지 않는다.
- 로그인한 부모는 자신의 아이 프로필과 관련 데이터만 접근할 수 있다.

FR-002 모드 분리

- 부모 모드와 아이 모드를 명확히 분리한다.
- 아이 모드에는 설정, 포인트 설정, 보상 편집, 미션 편집 메뉴가 노출되지 않는다.
- 아이 모드에서 부모 모드로 돌아갈 때는 부모 로그인 세션이 필요하다.
- 선택 기능으로 간단한 부모 확인 문제 또는 PIN을 둘 수 있다. 예: "7 + 5는?"

FR-003 다중 아이 프로필

- 한 부모 계정은 여러 아이 프로필을 만들 수 있다.
- MVP에서는 한 명 사용을 기본 흐름으로 최적화하되, 데이터 구조는 다중 아이를 지원한다.
- 부모 대시보드 상단에서 아이를 전환할 수 있다.

### 4.2 온보딩

FR-010 첫 실행 온보딩

- 부모가 처음 로그인하면 아이 이름, 학년, 아바타 유형, 기본 테마를 설정한다.
- 기본 추천 미션 세트를 제공한다.
- 예: 책 읽기, 학교 숙제, 수학 문제집, 책상 정리, 양치하기.
- 부모는 추천 미션을 선택하고 포인트 값을 빠르게 조정할 수 있다.

FR-011 기본 보상 템플릿

- 첫 실행 시 보상 예시를 제안한다.
- 예: 아이스크림 30별, 영화 보기 80별, 장난감 150별.
- 부모는 템플릿을 그대로 추가하거나 삭제할 수 있다.

### 4.3 일일 미션

FR-020 미션 생성

- 부모는 미션을 생성할 수 있다.
- 필수 필드: 제목, 아이콘, 포인트, 별, 반복 일정.
- 선택 필드: 이모지, 카테고리, 설명, XP, 부모 승인 필요 여부.
- 카테고리 기본값: 독서, 숙제, 생활습관, 운동, 예술, 자기학습, 기타.

FR-021 미션 편집

- 부모는 미션 제목, 아이콘, 포인트, 별, 카테고리, 반복 일정을 수정할 수 있다.
- 이미 완료된 과거 기록은 변경하지 않는다.
- 수정 후 생성되는 새 미션 인스턴스에만 변경된 값이 적용된다.

FR-022 반복 일정

- 반복 유형을 지원한다.
- 매일
- 평일
- 주말
- 특정 요일
- 한 번만
- 시작일과 종료일을 선택할 수 있다.

FR-023 오늘의 미션 생성

- 시스템은 매일 아이별 오늘의 미션 인스턴스를 생성한다.
- 사용자가 오늘 화면에 진입할 때도 누락된 인스턴스를 보정 생성한다.
- 같은 미션과 날짜 조합은 중복 생성되지 않는다.

FR-024 아이의 완료 제출

- 아이는 미션 카드의 큰 완료 버튼을 누를 수 있다.
- 상태는 `pending`에서 `submitted`로 변경된다.
- 부모 승인 없이 자동 완료로 설정된 미션은 즉시 `approved`가 될 수 있다.
- 제출 직후에는 작은 축하 애니메이션을 보여준다.

FR-025 부모 승인

- 부모는 제출된 미션을 승인하거나 되돌릴 수 있다.
- 승인 시 포인트, 별, XP가 확정 지급된다.
- 되돌림 시 아이 화면에는 "다시 해보자"처럼 부드러운 표현을 사용하고 처벌성 메시지는 사용하지 않는다.

FR-026 오늘 완료 상태

- 오늘 미션이 모두 승인되면 완벽한 하루 상태가 된다.
- 완벽한 하루는 달력에 트로피로 표시된다.
- 일부 완료일은 금색 별로 표시된다.

### 4.4 시각적 진행

FR-030 정원 성장 화면

- 아이 홈 화면은 정원 또는 판타지 공간을 중심으로 구성한다.
- 미션 완료 수, 별, XP, 연속일에 따라 시각 요소가 추가된다.
- 예: 씨앗, 새싹, 꽃, 나무, 별, 무지개, 작은 성, 반짝임.

FR-031 완료 즉시 변화

- 미션 하나가 승인되거나 자동 완료되면 화면에 즉시 변화가 있어야 한다.
- 변화는 최소 1개 이상이다.
- 예: 꽃이 피기, 별이 하늘에 추가되기, 아바타가 점프하기, 스티커가 나타나기.

FR-032 일일 성장 단계

- 오늘의 완료율에 따라 정원 단계를 계산한다.
- 0%: 씨앗 또는 빈 정원
- 1~33%: 새싹
- 34~66%: 꽃 몇 송이
- 67~99%: 나무와 별
- 100%: 무지개와 트로피

FR-033 월간 성장 기록

- 월간 달력에서 각 날짜의 성장 결과를 다시 볼 수 있다.
- 날짜를 누르면 그날 완료한 미션과 획득 보상을 간단히 보여준다.

### 4.5 보상 시스템

FR-040 보상 생성

- 부모는 보상을 생성할 수 있다.
- 필수 필드: 제목, 필요 별 또는 필요 포인트 중 하나 이상.
- 선택 필드: 이미지, 설명, 반복 사용 가능 여부, 정렬 순서.
- 보상 예시: 아이스크림, LEGO, 장난감, 영화, 가족 여행, 30분 게임, 저녁 메뉴 고르기.

FR-041 보상 해금

- 아이가 필요한 별 또는 포인트 조건을 만족하면 보상이 해금 상태가 된다.
- 해금 시 축하 애니메이션, 컨페티, 효과음을 재생한다.
- 효과음은 기본적으로 켜져 있지만 화면에서 끌 수 있어야 한다.

FR-042 보상 요청

- 아이는 해금된 보상을 "받고 싶어요" 버튼으로 요청할 수 있다.
- 부모는 요청된 보상을 확인하고 지급 완료 처리할 수 있다.
- 지급 완료 후 반복 가능하지 않은 보상은 완료 목록으로 이동한다.

FR-043 보상 진행 표시

- 아이 화면에서 각 보상까지 남은 별 또는 포인트를 시각적으로 보여준다.
- 숫자만 표시하지 않고 진행 바, 별 슬롯, 잠금 아이콘을 사용한다.

### 4.6 독서 트래커

FR-050 독서 기록 추가

- 아이 또는 부모가 오늘 읽은 책을 기록할 수 있다.
- 최소 입력은 책 제목 또는 "책 1권"이다.
- 아이 모드에서는 큰 책 추가 버튼과 색상 선택 중심으로 제공한다.
- 부모 모드에서는 제목, 권수, 날짜를 수정할 수 있다.

FR-051 독서 시각화

- 오늘의 책은 책 더미로 표시한다.
- 주간 책은 책장 한 줄로 표시한다.
- 월간 책은 책장 또는 컬렉션으로 표시한다.
- 각 책은 색상 있는 표지 카드로 표현한다.

FR-052 독서 집계

- 오늘 읽은 책 수, 이번 주 읽은 책 수, 이번 달 읽은 책 수를 계산한다.
- 독서 관련 업적 조건을 검사한다.
- 예: 10권 읽기, 30권 읽기, 100권 읽기.

### 4.7 숙제 트래커

FR-060 숙제 체크리스트

- 숙제 항목은 간단한 체크리스트로 제공한다.
- 기본 예시: 학교 숙제, 받아쓰기, 문제집.
- 아이 모드에서는 체크 항목을 큰 터치 영역으로 표시한다.

FR-061 숙제 미션 연동

- 숙제 체크리스트의 모든 항목이 완료되면 연결된 숙제 미션을 제출 상태로 변경할 수 있다.
- 부모는 숙제 체크 항목을 오늘만 수정할 수 있다.

### 4.8 주간 진행

FR-070 주간 보기

- 월요일부터 일요일까지 7일을 표시한다.
- 표 형태 대신 별, 스티커, 웃는 얼굴을 사용한다.
- 각 날짜는 완료율에 따라 다른 표현을 가진다.
- 예: 빈 원, 은색 별, 금색 별, 트로피.

FR-071 주간 스트릭

- 한 주 동안 목표 기준을 충족한 날이 일정 수 이상이면 주간 스트릭을 증가시킨다.
- 기본 기준: 주 5일 이상 완료율 70% 달성.
- 부모 설정에서 기준을 바꿀 수 있다.

### 4.9 월간 달력

FR-080 월간 달력

- 한 달 달력을 시각적으로 표시한다.
- 완료한 날은 금색 별로 표시한다.
- 완벽한 날은 트로피로 표시한다.
- 오늘은 따뜻한 테두리와 작은 반짝임으로 표시한다.

FR-081 날짜 상세

- 부모 모드에서 날짜를 누르면 해당 날짜의 미션, 독서, 포인트, 별, 승인 상태를 볼 수 있다.
- 아이 모드에서는 간단한 축하 회고 카드만 보여준다.

### 4.10 XP, 레벨, 스트릭

FR-090 XP 지급

- 승인된 미션마다 XP를 지급한다.
- 기본 XP는 포인트와 동일하게 설정하되 부모가 조정할 수 있다.
- 독서 기록과 업적 해금도 XP를 지급할 수 있다.

FR-091 레벨 계산

- 레벨은 누적 XP 기반으로 계산한다.
- 기본 공식: 다음 레벨 필요 XP = `100 + (현재 레벨 - 1) * 50`.
- 레벨업 시 축하 애니메이션과 새 장식 또는 아바타 업그레이드 후보를 제공한다.

FR-092 일일 스트릭

- 하루 목표를 달성하면 일일 스트릭이 증가한다.
- 기본 하루 목표: 승인된 미션 완료율 70% 이상.
- 완벽한 하루는 별도 트로피로 기록한다.

FR-093 월간 스트릭

- 한 달 기준 목표 달성 주가 3주 이상이면 월간 스트릭을 증가시킨다.
- 정확한 기준은 부모 설정에서 바꿀 수 있도록 데이터 구조를 열어둔다.

### 4.11 업적

FR-100 기본 업적

- 기본 업적을 제공한다.
- 독서 10권
- 독서 30권
- 독서 100권
- Homework Hero: 숙제 미션 10회 완료
- Super Reader: 한 주에 책 7권 읽기
- 7-day streak
- 30-day streak
- 첫 보상 해금
- 첫 완벽한 하루

FR-101 업적 해금

- 미션 승인, 독서 추가, 보상 해금, 일일 요약 갱신 시 업적 조건을 검사한다.
- 이미 해금된 업적은 중복 지급하지 않는다.
- 업적 해금 시 스티커, 별, XP 보상을 줄 수 있다.

### 4.12 아바타

FR-110 아바타 선택

- 아이는 동물, 로봇, 마법사, 공주, 탐험가 중 하나를 선택할 수 있다.
- MVP 기본 아바타는 하얀색 페르시안 고양이 `솜이`로 제공한다.
- `솜이`는 동화 정원 테마의 대표 캐릭터이며, 상단 프로필과 정원 장면에 함께 표시된다.
- MVP에서는 2D 일러스트 또는 Lottie 기반 기본 애니메이션을 사용한다.

FR-111 아바타 성장

- 레벨 또는 업적에 따라 아바타 장식이 해금된다.
- 예: 모자, 망토, 별 배지, 책가방, 반짝이 효과.
- 아바타 성장은 아이 화면의 상단 또는 정원 중앙에 항상 보인다.

### 4.13 스티커 컬렉션

FR-120 스티커 지급

- 업적, 완벽한 하루, 주간 목표 달성, 보상 해금 시 스티커를 지급할 수 있다.
- 스티커는 컬렉션 화면에 모인다.

FR-121 스티커 보기

- 아이는 스티커북에서 모은 스티커를 볼 수 있다.
- 잠긴 스티커는 흐리게 표시하되 조급함을 유발하지 않는 문구를 사용한다.

### 4.14 축하와 사운드

FR-130 축하 애니메이션

- 미션 제출: 작은 반짝임
- 미션 승인: 꽃 피기 또는 별 추가
- 오늘 완료: 큰 컨페티, 트로피, 아바타 점프
- 보상 해금: 큰 컨페티, 보상 카드 흔들림
- 레벨업: 빛나는 원형 애니메이션

FR-131 사운드

- 완료, 레벨업, 보상 해금에 짧은 효과음을 제공한다.
- 배경 음악은 Nice-to-have로 분리한다.
- 음소거 토글을 항상 아이 화면에 작은 아이콘으로 제공한다.

### 4.15 부모 대시보드

FR-140 오늘 관리

- 부모 대시보드 첫 화면은 오늘 상태를 보여준다.
- 완료 대기, 승인 대기, 완벽한 하루까지 남은 항목을 표시한다.
- 승인 대기 미션을 한 번에 승인할 수 있다.

FR-141 미션 관리

- 미션 목록, 생성, 수정, 비활성화 기능을 제공한다.
- 추천 미션 템플릿을 제공한다.
- 포인트와 별 값을 빠르게 조정할 수 있는 스테퍼를 제공한다.

FR-142 보상 관리

- 보상 목록, 생성, 수정, 비활성화, 지급 완료 처리를 제공한다.
- 해금된 보상과 요청된 보상을 별도 표시한다.

FR-143 진행 리포트

- 주간 진행, 월간 달력, 독서량, 숙제 완료율을 볼 수 있다.
- 복잡한 표보다 카드, 그래프, 캘린더를 사용한다.

### 4.16 설정

FR-150 포인트 설정

- 부모는 기본 미션 포인트, 별, XP 추천 값을 바꿀 수 있다.
- 카테고리별 기본값을 설정할 수 있다.

FR-151 접근성 설정

- 큰 글자 모드
- 애니메이션 줄이기
- 효과음 끄기
- 고대비 색상 보정

FR-152 데이터 관리

- 부모는 아이 프로필을 수정할 수 있다.
- MVP에서는 데이터 삭제 기능을 제공하되 실수 방지를 위해 확인 절차를 둔다.

## 5. Non-functional Requirements

### 5.1 성능

- 첫 화면의 Largest Contentful Paint는 일반 가정용 모바일 네트워크 기준 2.5초 이하를 목표로 한다.
- 아이 홈 화면 상호작용은 입력 후 100ms 이내 시각 피드백을 제공한다.
- 애니메이션은 60fps를 목표로 하며 저사양 기기에서는 자동으로 축소한다.
- 이미지 자산은 Next.js Image 또는 Supabase Storage 변환을 사용해 최적화한다.

### 5.2 반응형 지원

- 최소 지원 너비: 360px
- 주요 최적화 기기: 스마트폰 세로, 태블릿 가로, 태블릿 세로, 노트북
- 아이 모드의 주요 버튼 터치 영역은 최소 48x48px 이상이어야 한다.
- 카드와 버튼 텍스트는 작은 화면에서도 줄바꿈 또는 축약으로 겹치지 않아야 한다.

### 5.3 접근성

- 초등 저학년이 읽을 수 있는 짧고 쉬운 문장을 사용한다.
- 아이 화면의 주요 텍스트는 18px 이상을 기본으로 한다.
- 부모 화면의 본문 텍스트는 14px 이상을 기본으로 한다.
- 색상만으로 상태를 구분하지 않고 아이콘, 라벨, 모양을 함께 사용한다.
- 애니메이션 줄이기 설정을 지원한다.
- 모든 인터랙티브 요소는 키보드 포커스가 가능해야 한다.

### 5.4 보안과 개인정보

- 아이의 개인정보는 최소한으로 수집한다.
- 필수 정보: 이름 또는 별명, 학년 또는 나이대, 아바타 선택.
- 학교명, 정확한 생년월일, 주소는 MVP에서 수집하지 않는다.
- Supabase Row Level Security를 활성화한다.
- 부모 계정은 자신의 아이 데이터만 조회, 수정할 수 있다.
- 이미지 업로드는 파일 크기와 MIME 타입을 제한한다.

### 5.5 안정성

- 네트워크 오류 시 미션 제출이 사라지지 않도록 로컬 큐에 저장한다.
- 중복 제출을 방지하기 위해 미션 인스턴스와 날짜 조합에 유니크 제약을 둔다.
- 포인트, 별, XP 지급은 서버에서 원자적으로 처리한다.

### 5.6 확장성

- 테마, 아바타, 업적, 스티커는 하드코딩하지 않고 데이터 기반으로 확장 가능하게 설계한다.
- 미션 반복 규칙은 단순 요일 반복에서 시작하되, 향후 RRULE 확장 가능성을 고려한다.

### 5.7 사용성

- 부모가 새 미션을 만드는 데 필요한 기본 단계는 3단계 이하여야 한다.
- 아이가 미션 완료를 제출하는 데 필요한 탭은 1회여야 한다.
- 오늘 화면에서 보상, 진행, 미션은 스크롤 없이 핵심 상태를 파악할 수 있어야 한다.

### 5.8 콘텐츠 정책

- 광고를 넣지 않는다.
- 아이에게 압박을 주는 표현을 피한다.
- 실패 대신 "다음에 다시 해보자", "조금만 더 하면 돼"처럼 부드럽게 표현한다.
- 가족 내 경쟁 기능은 기본 비활성화한다.

## 6. UX Flow

### 6.1 첫 사용 흐름

1. 부모가 회원가입 또는 로그인을 한다.
2. 아이 프로필을 만든다.
3. 아이가 좋아하는 아바타를 선택한다.
4. 부모가 추천 미션 중 사용할 항목을 선택한다.
5. 부모가 기본 보상을 선택하거나 만든다.
6. 앱이 오늘의 미션을 생성한다.
7. 아이 모드로 전환되어 오늘의 정원 화면을 보여준다.

### 6.2 아이의 일일 사용 흐름

1. 아이가 앱을 열면 오늘의 정원과 미션 카드가 보인다.
2. 아이가 미션 아이콘을 보고 해야 할 일을 이해한다.
3. 미션을 완료한 뒤 큰 완료 버튼을 누른다.
4. 카드가 제출 상태로 바뀌고 작은 애니메이션이 재생된다.
5. 자동 승인 미션이면 정원이 즉시 성장한다.
6. 부모 승인 미션이면 "부모님 확인을 기다려요" 상태로 표시된다.
7. 모든 미션이 승인되면 오늘 완료 축하 화면이 나온다.
8. 아이는 보상과 스티커북을 확인한다.

### 6.3 부모의 일일 관리 흐름

1. 부모가 대시보드를 연다.
2. 오늘 승인 대기 미션을 확인한다.
3. 문제가 없으면 전체 승인 버튼을 누른다.
4. 필요하면 오늘만 미션을 추가, 제거, 수정한다.
5. 보상 요청이 있으면 지급 여부를 확인한다.
6. 주간 또는 월간 진행을 짧게 확인한다.

목표 시간은 60초 이내다.

### 6.4 보상 해금 흐름

1. 아이가 미션을 완료하고 별 또는 포인트를 모은다.
2. 시스템이 보상 조건을 검사한다.
3. 조건을 만족하면 보상 카드의 잠금이 열린다.
4. 컨페티와 효과음이 재생된다.
5. 아이가 보상 요청 버튼을 누른다.
6. 부모가 부모 모드에서 지급 완료 처리한다.

### 6.5 독서 기록 흐름

1. 아이가 책 읽기 미션을 완료하거나 독서 화면을 연다.
2. 큰 책 추가 버튼을 누른다.
3. 책 제목을 입력하거나 "제목 없이 1권 추가"를 선택한다.
4. 책 표지가 책장에 추가된다.
5. 오늘, 이번 주, 이번 달 권수가 갱신된다.
6. 독서 업적 조건을 검사한다.

### 6.6 오프라인 흐름

1. 네트워크가 끊긴 상태에서 아이가 미션 완료를 누른다.
2. 앱은 로컬 큐에 제출 이벤트를 저장한다.
3. 화면에는 "저장했어요" 상태를 보여준다.
4. 네트워크가 복구되면 서버에 순서대로 동기화한다.
5. 충돌이 발생하면 서버 상태를 우선하고 부모에게 알림을 표시한다.

## 7. Screen List

### 7.1 인증 및 온보딩

- `/login`: 부모 로그인
- `/signup`: 부모 회원가입
- `/onboarding/child`: 아이 프로필 생성
- `/onboarding/avatar`: 아바타 선택
- `/onboarding/missions`: 추천 미션 선택
- `/onboarding/rewards`: 기본 보상 선택

### 7.2 아이 모드

- `/child/:childId/today`: 오늘의 정원과 미션
- `/child/:childId/rewards`: 보상 선반
- `/child/:childId/reading`: 책장과 독서 기록
- `/child/:childId/stickers`: 스티커북
- `/child/:childId/progress`: 주간 진행과 월간 달력
- `/child/:childId/avatar`: 아바타 꾸미기

### 7.3 부모 모드

- `/parent`: 부모 대시보드
- `/parent/missions`: 미션 관리
- `/parent/missions/new`: 미션 생성
- `/parent/missions/:missionId/edit`: 미션 수정
- `/parent/approvals`: 완료 승인
- `/parent/rewards`: 보상 관리
- `/parent/rewards/new`: 보상 생성
- `/parent/progress`: 진행 리포트
- `/parent/reading`: 독서 기록 관리
- `/parent/settings`: 설정

### 7.4 공통 상태 화면

- 로딩 화면
- 네트워크 오류 화면
- 빈 상태 화면
- 권한 없음 화면
- 축하 모달
- 보상 해금 모달
- 레벨업 모달

## 8. Wireframe descriptions

### 8.1 아이 오늘 화면

목적: 아이가 오늘 해야 할 일을 즉시 이해하고, 완료할 때마다 정원이 성장하는 것을 본다.

구성:

- 상단: 아바타, 레벨, 별 개수, 사운드 토글
- 중앙: 큰 정원 장면
- 중앙 장면 안: 꽃, 나무, 별, 무지개, 트로피 등 진행 상태
- 하단: 오늘의 미션 카드 리스트
- 미션 카드: 큰 아이콘, 짧은 제목, 별/포인트 뱃지, 큰 완료 버튼
- 하단 고정 내비게이션: 오늘, 보상, 책장, 스티커

상호작용:

- 완료 버튼을 누르면 카드가 살짝 커지고 반짝임이 나온다.
- 승인 완료 시 정원에 새 요소가 나타난다.
- 오늘 완료 시 전체 화면 축하 모달이 나온다.

### 8.2 아이 보상 화면

목적: 아이가 받을 수 있는 보상과 목표까지 남은 정도를 이해한다.

구성:

- 상단: 현재 별, 포인트, 아바타 응원
- 중앙: 보상 카드 그리드
- 보상 카드: 이미지, 제목, 별 슬롯 진행도, 잠금 또는 해금 상태
- 해금 보상: 밝은 테두리와 요청 버튼
- 잠긴 보상: 부드러운 잠금 아이콘과 남은 별 수

상호작용:

- 해금 보상 카드를 누르면 상세 모달이 열린다.
- 요청 버튼을 누르면 부모 확인 대기 상태가 된다.

### 8.3 아이 독서 화면

목적: 읽은 책을 시각적으로 쌓이게 보여준다.

구성:

- 상단: 오늘 읽은 책 수, 이번 주 책 수
- 중앙: 책장 또는 책 더미
- 하단: 큰 책 추가 버튼
- 책 추가 모달: 제목 입력, 색상 선택, "제목 없이 1권 추가" 버튼

상호작용:

- 책을 추가하면 책 표지가 책장에 꽂히는 애니메이션을 재생한다.
- 독서 업적 해금 시 스티커를 보여준다.

### 8.4 아이 스티커북 화면

목적: 업적과 꾸준함의 결과를 수집품으로 보여준다.

구성:

- 상단: 스티커 수집률
- 중앙: 스티커 그리드
- 스티커 상태: 획득, 잠김
- 하단: 최근 획득 스티커

상호작용:

- 획득 스티커를 누르면 큰 스티커와 짧은 칭찬 문구를 보여준다.

### 8.5 부모 대시보드

목적: 부모가 오늘 상태를 빠르게 확인하고 승인한다.

구성:

- 상단: 아이 선택, 아이 모드 전환 버튼
- 요약 카드: 오늘 완료율, 승인 대기, 독서 수, 스트릭
- 승인 대기 섹션: 미션 제목, 제출 시간, 승인 버튼, 되돌리기 버튼
- 빠른 작업: 미션 추가, 보상 추가, 오늘만 수정
- 하단: 주간 요약 미리보기

상호작용:

- 전체 승인 버튼으로 대기 항목을 한 번에 승인한다.
- 미션 추가 버튼은 빠른 생성 바텀시트 또는 모달을 연다.

### 8.6 부모 미션 관리 화면

목적: 반복 미션을 빠르게 만들고 수정한다.

구성:

- 상단: 새 미션 버튼, 카테고리 필터
- 미션 목록: 아이콘, 제목, 반복 일정, 포인트, 별, 활성 상태
- 미션 편집 폼: 제목, 아이콘 선택, 카테고리, 포인트, 별, XP, 반복 일정, 승인 필요 여부

상호작용:

- 포인트와 별은 스테퍼로 빠르게 조정한다.
- 반복 요일은 요일 칩으로 선택한다.

### 8.7 부모 보상 관리 화면

목적: 보상을 만들고 지급 상태를 관리한다.

구성:

- 상단: 새 보상 버튼
- 보상 목록: 이미지, 제목, 필요 별, 필요 포인트, 요청 상태
- 보상 편집 폼: 제목, 설명, 이미지, 조건, 반복 가능 여부

상호작용:

- 요청된 보상은 상단에 별도 고정 표시한다.
- 지급 완료 버튼을 누르면 아이 화면에서 완료 상태가 된다.

### 8.8 부모 진행 리포트 화면

목적: 주간, 월간 흐름을 부담 없이 확인한다.

구성:

- 상단: 기간 선택
- 주간 진행: 월~일 스티커 스트립
- 월간 달력: 금색 별, 트로피 표시
- 독서 리포트: 오늘, 주간, 월간 권수
- 숙제 리포트: 완료율과 최근 미완료 항목

상호작용:

- 날짜를 누르면 해당 날짜 상세 패널이 열린다.

## 9. Database Schema

### 9.1 설계 원칙

- Supabase PostgreSQL을 사용한다.
- 모든 아이 관련 데이터는 `child_id`를 가진다.
- 부모 접근 권한은 `parent_id = auth.uid()` 관계로 제한한다.
- 포인트, 별, XP 지급은 `mission_instances` 승인과 `point_transactions` 기록을 함께 남긴다.
- 집계는 조회 시 계산할 수 있지만, 달력과 성능을 위해 `daily_summaries`를 저장한다.

### 9.2 주요 Enum

```sql
create type mission_status as enum ('pending', 'submitted', 'approved', 'rejected', 'skipped');
create type repeat_type as enum ('once', 'daily', 'weekdays', 'weekends', 'custom_weekdays');
create type reward_redemption_status as enum ('unlocked', 'requested', 'approved', 'redeemed', 'cancelled');
create type transaction_type as enum ('mission', 'reading', 'achievement', 'reward_adjustment', 'manual_adjustment');
create type avatar_type as enum ('animal', 'robot', 'wizard', 'princess', 'explorer');
```

### 9.3 테이블 정의

#### profiles

부모 계정의 앱 프로필이다. Supabase `auth.users`와 1:1 관계다.

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale text not null default 'ko',
  timezone text not null default 'Asia/Seoul',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

#### children

아이 프로필과 누적 성장 상태를 저장한다.

```sql
create table children (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  grade text default '1',
  avatar_type avatar_type not null default 'animal',
  avatar_variant text not null default 'white_persian_cat',
  avatar_name text not null default '솜이',
  avatar_level int not null default 1,
  theme_id text not null default 'garden',
  total_points int not null default 0,
  total_stars int not null default 0,
  total_xp int not null default 0,
  level int not null default 1,
  current_daily_streak int not null default 0,
  longest_daily_streak int not null default 0,
  current_weekly_streak int not null default 0,
  current_monthly_streak int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

#### missions

반복 가능한 미션 템플릿이다.

```sql
create table missions (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  title text not null,
  icon text not null,
  emoji text,
  category text not null default '기타',
  points int not null default 10,
  stars int not null default 1,
  xp int not null default 10,
  description text,
  requires_parent_approval boolean not null default true,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

#### mission_schedules

미션 반복 일정을 저장한다.

```sql
create table mission_schedules (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions(id) on delete cascade,
  repeat_type repeat_type not null default 'daily',
  weekdays int[] not null default '{}',
  start_date date not null default current_date,
  end_date date,
  created_at timestamptz not null default now()
);
```

`weekdays` 값은 월요일 1부터 일요일 7까지 사용한다.

#### mission_instances

특정 날짜에 아이에게 노출되는 실제 미션이다.

```sql
create table mission_instances (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions(id) on delete cascade,
  child_id uuid not null references children(id) on delete cascade,
  scheduled_date date not null,
  title_snapshot text not null,
  icon_snapshot text not null,
  category_snapshot text not null,
  points_snapshot int not null,
  stars_snapshot int not null,
  xp_snapshot int not null,
  requires_parent_approval_snapshot boolean not null,
  status mission_status not null default 'pending',
  submitted_at timestamptz,
  approved_by uuid references profiles(id),
  approved_at timestamptz,
  rejected_at timestamptz,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (mission_id, scheduled_date)
);
```

#### point_transactions

별, 포인트, XP 변경의 원장을 저장한다.

```sql
create table point_transactions (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  type transaction_type not null,
  points_delta int not null default 0,
  stars_delta int not null default 0,
  xp_delta int not null default 0,
  ref_table text,
  ref_id uuid,
  description text,
  created_at timestamptz not null default now()
);
```

#### rewards

부모가 만드는 보상이다.

```sql
create table rewards (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  title text not null,
  description text,
  image_url text,
  required_points int not null default 0,
  required_stars int not null default 0,
  repeatable boolean not null default false,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

#### reward_redemptions

보상 해금, 요청, 지급 상태를 저장한다.

```sql
create table reward_redemptions (
  id uuid primary key default gen_random_uuid(),
  reward_id uuid not null references rewards(id) on delete cascade,
  child_id uuid not null references children(id) on delete cascade,
  status reward_redemption_status not null default 'unlocked',
  requested_at timestamptz,
  approved_at timestamptz,
  redeemed_at timestamptz,
  created_at timestamptz not null default now()
);
```

#### reading_entries

독서 기록이다.

```sql
create table reading_entries (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  title text,
  cover_color text not null default '#F9A8D4',
  cover_image_url text,
  book_count int not null default 1,
  read_date date not null default current_date,
  source text not null default 'manual',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

#### homework_checklists

날짜별 숙제 체크리스트 묶음이다.

```sql
create table homework_checklists (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  checklist_date date not null default current_date,
  title text not null default '오늘의 숙제',
  linked_mission_instance_id uuid references mission_instances(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (child_id, checklist_date)
);
```

#### homework_checklist_items

숙제 체크 항목이다.

```sql
create table homework_checklist_items (
  id uuid primary key default gen_random_uuid(),
  checklist_id uuid not null references homework_checklists(id) on delete cascade,
  label text not null,
  is_done boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

#### achievements

업적 정의다.

```sql
create table achievements (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  description text not null,
  icon text not null,
  criteria_type text not null,
  criteria_value int not null,
  reward_points int not null default 0,
  reward_stars int not null default 0,
  reward_xp int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
```

#### child_achievements

아이별 업적 해금 상태다.

```sql
create table child_achievements (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  achievement_id uuid not null references achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  unique (child_id, achievement_id)
);
```

#### stickers

스티커 정의다.

```sql
create table stickers (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  image_url text not null,
  rarity text not null default 'common',
  unlock_source text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
```

#### child_stickers

아이별 스티커 보유 상태다.

```sql
create table child_stickers (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  sticker_id uuid not null references stickers(id) on delete cascade,
  count int not null default 1,
  unlocked_at timestamptz not null default now(),
  unique (child_id, sticker_id)
);
```

#### daily_summaries

달력과 스트릭 계산을 위한 일일 요약이다.

```sql
create table daily_summaries (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  summary_date date not null,
  total_missions int not null default 0,
  approved_missions int not null default 0,
  submitted_missions int not null default 0,
  earned_points int not null default 0,
  earned_stars int not null default 0,
  earned_xp int not null default 0,
  reading_count int not null default 0,
  completion_rate numeric not null default 0,
  is_goal_day boolean not null default false,
  is_perfect_day boolean not null default false,
  visual_stage int not null default 0,
  updated_at timestamptz not null default now(),
  unique (child_id, summary_date)
);
```

#### app_settings

아이별 설정이다.

```sql
create table app_settings (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null unique references children(id) on delete cascade,
  daily_goal_rate numeric not null default 0.7,
  weekly_goal_days int not null default 5,
  sound_enabled boolean not null default true,
  reduced_motion boolean not null default false,
  large_text boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### 9.4 주요 인덱스

```sql
create index idx_children_parent_id on children(parent_id);
create index idx_missions_child_id on missions(child_id);
create index idx_mission_instances_child_date on mission_instances(child_id, scheduled_date);
create index idx_reading_entries_child_date on reading_entries(child_id, read_date);
create index idx_daily_summaries_child_date on daily_summaries(child_id, summary_date);
create index idx_rewards_child_id on rewards(child_id);
create index idx_reward_redemptions_child_id on reward_redemptions(child_id);
```

### 9.5 RLS 정책 요약

- 모든 테이블에서 RLS를 활성화한다.
- 부모는 `children.parent_id = auth.uid()`인 아이 데이터만 조회, 생성, 수정, 삭제할 수 있다.
- `profiles.id = auth.uid()`인 프로필만 조회, 수정할 수 있다.
- 아이 모드는 별도 인증 주체가 아니므로 같은 부모 세션에서 제한된 UI만 제공한다.
- 서버 라우트는 Supabase service role을 사용할 수 있지만, 클라이언트에 service role key를 절대 노출하지 않는다.

## 10. API Design

### 10.1 API 설계 원칙

- Next.js Route Handler 또는 Server Action을 사용한다.
- 읽기 중심 데이터는 Server Component에서 Supabase로 직접 조회할 수 있다.
- 포인트, 별, XP가 바뀌는 작업은 서버 API에서 트랜잭션으로 처리한다.
- 모든 날짜 API는 `YYYY-MM-DD` 형식을 사용한다.
- 기본 timezone은 부모 프로필의 timezone을 따른다.

### 10.2 인증

#### POST `/api/auth/login`

요청:

```json
{
  "email": "parent@example.com",
  "password": "password"
}
```

응답:

```json
{
  "userId": "uuid",
  "needsOnboarding": false
}
```

#### POST `/api/auth/logout`

응답:

```json
{
  "ok": true
}
```

### 10.3 아이 프로필

#### GET `/api/children`

부모의 아이 프로필 목록을 반환한다.

#### POST `/api/children`

요청:

```json
{
  "name": "지우",
  "grade": "1",
  "avatarType": "animal",
  "avatarVariant": "white_persian_cat",
  "avatarName": "솜이",
  "themeId": "garden"
}
```

#### PATCH `/api/children/:childId`

아이 이름, 아바타, 테마를 수정한다.

### 10.4 오늘 화면

#### GET `/api/children/:childId/today?date=2026-06-27`

오늘의 아이 화면에 필요한 모든 데이터를 반환한다.

응답:

```json
{
  "child": {
    "id": "uuid",
    "name": "지우",
    "avatarType": "animal",
    "avatarVariant": "white_persian_cat",
    "avatarName": "솜이",
    "level": 3,
    "totalStars": 42,
    "totalPoints": 380,
    "currentDailyStreak": 5
  },
  "missions": [
    {
      "id": "uuid",
      "title": "책 3권 읽기",
      "icon": "book-open",
      "emoji": "📚",
      "category": "독서",
      "points": 20,
      "stars": 2,
      "xp": 20,
      "status": "pending"
    }
  ],
  "summary": {
    "completionRate": 0.4,
    "visualStage": 2,
    "isPerfectDay": false
  },
  "rewardsPreview": [
    {
      "id": "uuid",
      "title": "아이스크림",
      "requiredStars": 30,
      "progressRate": 1,
      "unlocked": true
    }
  ]
}
```

### 10.5 미션

#### GET `/api/children/:childId/missions`

반복 미션 템플릿 목록을 반환한다.

#### POST `/api/children/:childId/missions`

요청:

```json
{
  "title": "수학 문제집 2쪽",
  "icon": "calculator",
  "emoji": "🔢",
  "category": "자기학습",
  "points": 15,
  "stars": 1,
  "xp": 15,
  "requiresParentApproval": true,
  "schedule": {
    "repeatType": "weekdays",
    "weekdays": [],
    "startDate": "2026-06-27",
    "endDate": null
  }
}
```

#### PATCH `/api/missions/:missionId`

미션 템플릿을 수정한다.

#### DELETE `/api/missions/:missionId`

물리 삭제 대신 `active=false`로 비활성화한다.

#### POST `/api/mission-instances/:instanceId/submit`

아이의 완료 제출을 처리한다.

응답:

```json
{
  "status": "submitted",
  "celebration": "small_sparkle"
}
```

#### POST `/api/mission-instances/:instanceId/approve`

부모 승인과 보상 지급을 트랜잭션으로 처리한다.

응답:

```json
{
  "status": "approved",
  "earned": {
    "points": 15,
    "stars": 1,
    "xp": 15
  },
  "levelUp": false,
  "unlockedAchievements": [],
  "unlockedRewards": []
}
```

#### POST `/api/mission-instances/:instanceId/reject`

제출 상태를 되돌린다.

### 10.6 보상

#### GET `/api/children/:childId/rewards`

보상 목록과 진행률을 반환한다.

#### POST `/api/children/:childId/rewards`

보상을 생성한다.

#### PATCH `/api/rewards/:rewardId`

보상을 수정한다.

#### DELETE `/api/rewards/:rewardId`

보상을 비활성화한다.

#### POST `/api/rewards/:rewardId/request`

아이의 보상 요청을 생성한다.

#### POST `/api/reward-redemptions/:redemptionId/redeem`

부모가 보상 지급 완료를 처리한다.

### 10.7 독서

#### GET `/api/children/:childId/reading?from=2026-06-01&to=2026-06-30`

독서 기록을 반환한다.

#### POST `/api/children/:childId/reading`

요청:

```json
{
  "title": "무지개 물고기",
  "bookCount": 1,
  "coverColor": "#93C5FD",
  "readDate": "2026-06-27"
}
```

#### PATCH `/api/reading/:entryId`

독서 기록을 수정한다.

#### DELETE `/api/reading/:entryId`

독서 기록을 삭제한다.

### 10.8 숙제

#### GET `/api/children/:childId/homework?date=2026-06-27`

오늘 숙제 체크리스트를 반환한다.

#### PUT `/api/children/:childId/homework?date=2026-06-27`

숙제 체크리스트 전체를 저장한다.

#### PATCH `/api/homework-items/:itemId`

체크 항목 완료 상태를 수정한다.

### 10.9 진행과 달력

#### GET `/api/children/:childId/progress/week?date=2026-06-27`

해당 날짜가 속한 주의 월~일 진행을 반환한다.

#### GET `/api/children/:childId/progress/month?month=2026-06`

월간 달력 데이터를 반환한다.

#### GET `/api/children/:childId/achievements`

업적 목록과 해금 상태를 반환한다.

#### GET `/api/children/:childId/stickers`

스티커북 데이터를 반환한다.

### 10.10 시스템 작업

#### POST `/api/jobs/generate-mission-instances`

오늘 또는 지정 날짜의 미션 인스턴스를 생성한다. Vercel Cron 또는 Supabase Edge Function으로 실행할 수 있다.

#### POST `/api/jobs/recalculate-daily-summary`

특정 아이와 날짜의 요약, 스트릭, 보상 해금, 업적을 재계산한다.

## 11. Component Structure

### 11.1 컴포넌트 설계 원칙

- 아이 모드 컴포넌트는 큰 터치 영역, 적은 텍스트, 즉각적인 애니메이션을 기본으로 한다.
- 부모 모드 컴포넌트는 밀도 높은 정보와 빠른 편집을 우선한다.
- 도메인별 기능은 `features` 폴더로 분리한다.
- 공통 UI는 `components/ui`에 둔다.

### 11.2 아이 모드 컴포넌트

- `ChildShell`: 아이 모드 레이아웃, 하단 내비게이션, 사운드 상태
- `ChildTopBar`: 아바타, 레벨, 별, 스트릭 표시
- `GardenScene`: 정원 성장 장면
- `GardenElement`: 꽃, 나무, 별, 무지개 등 개별 요소
- `TodayMissionList`: 오늘 미션 리스트
- `MissionCard`: 아이용 미션 카드
- `MissionCompleteButton`: 큰 완료 버튼
- `CelebrationLayer`: 컨페티, 반짝임, 레벨업 등 전역 축하 레이어
- `RewardShelf`: 보상 카드 목록
- `RewardCard`: 보상 진행 카드
- `ReadingBookshelf`: 독서 책장
- `BookCover`: 책 표지 카드
- `StickerBook`: 스티커북
- `AvatarDisplay`: 아바타 표시와 업그레이드
- `WeeklyStickerStrip`: 주간 진행 스트립
- `MonthStarCalendar`: 월간 별 달력

### 11.3 부모 모드 컴포넌트

- `ParentShell`: 부모 모드 레이아웃과 내비게이션
- `ParentDashboardSummary`: 오늘 요약 카드
- `ApprovalQueue`: 승인 대기 목록
- `ApprovalActions`: 승인, 되돌리기, 전체 승인
- `MissionManager`: 미션 목록
- `MissionEditor`: 미션 생성 및 수정 폼
- `IconPicker`: Lucide 아이콘과 이모지 선택
- `SchedulePicker`: 반복 일정 선택
- `PointStepper`: 포인트, 별, XP 스테퍼
- `RewardManager`: 보상 목록
- `RewardEditor`: 보상 생성 및 수정 폼
- `ProgressReport`: 주간, 월간 리포트 컨테이너
- `ReadingManager`: 독서 기록 관리
- `SettingsPanel`: 앱 설정

### 11.4 공통 UI 컴포넌트

- `Button`
- `IconButton`
- `Card`
- `Modal`
- `Drawer`
- `Tabs`
- `SegmentedControl`
- `Switch`
- `Stepper`
- `ProgressBar`
- `Toast`
- `EmptyState`
- `LoadingState`
- `ErrorState`
- `ConfirmDialog`

### 11.5 도메인 서비스

- `missionService`: 미션 생성, 인스턴스 생성, 제출, 승인
- `rewardService`: 보상 진행률, 해금, 요청, 지급
- `progressService`: 일일 요약, 주간 진행, 월간 달력
- `achievementService`: 업적 조건 검사
- `readingService`: 독서 집계
- `streakService`: 일일, 주간, 월간 스트릭 계산
- `levelService`: XP와 레벨 계산
- `offlineQueueService`: 오프라인 제출 큐 관리

## 12. State Management

### 12.1 상태 분류

서버 상태:

- 아이 프로필
- 미션 템플릿
- 오늘 미션 인스턴스
- 보상
- 독서 기록
- 숙제 체크리스트
- 주간 및 월간 진행
- 업적과 스티커

클라이언트 UI 상태:

- 현재 모드
- 선택된 아이
- 축하 애니메이션 큐
- 모달 열림 상태
- 사운드 켜짐 여부
- 애니메이션 줄이기 여부
- 오프라인 큐 상태

파생 상태:

- 오늘 완료율
- 정원 성장 단계
- 보상 진행률
- 레벨 진행률
- 스트릭 유지 여부

### 12.2 권장 라이브러리

- 서버 상태: TanStack Query 또는 Next.js Server Components와 Server Actions 조합
- 가벼운 UI 상태: React Context, `useReducer`
- 전역 UI 상태가 늘어날 경우: Zustand
- 폼 상태: React Hook Form, Zod
- 서버 데이터 검증: Zod

### 12.3 상태 갱신 규칙

- 미션 제출은 낙관적 업데이트를 허용한다.
- 포인트, 별, XP는 서버 승인 결과를 기준으로만 확정 표시한다.
- 자동 승인 미션은 서버 응답 후 즉시 정원 성장을 반영한다.
- 승인 API 응답에 포함된 `levelUp`, `unlockedAchievements`, `unlockedRewards`를 축하 큐에 넣는다.
- 오프라인 상태에서는 제출 이벤트를 로컬 큐에 넣고 UI에 저장 상태를 표시한다.

### 12.4 캐시 키 예시

```ts
['children']
['today', childId, date]
['missions', childId]
['rewards', childId]
['reading', childId, from, to]
['homework', childId, date]
['progress-week', childId, date]
['progress-month', childId, month]
['achievements', childId]
['stickers', childId]
```

### 12.5 오프라인 큐

로컬 저장소 키:

- `quest-garden:selected-child-id`
- `quest-garden:sound-enabled`
- `quest-garden:offline-queue`

큐 이벤트 예시:

```json
{
  "id": "local-event-id",
  "type": "mission.submit",
  "payload": {
    "instanceId": "uuid"
  },
  "createdAt": "2026-06-27T09:00:00.000Z"
}
```

## 13. Folder Structure

권장 폴더 구조:

```text
quest-garden/
  docs/
    PRD.md
  public/
    sounds/
    lottie/
    images/
  supabase/
    migrations/
    seed.sql
  src/
    app/
      (auth)/
        login/
          page.tsx
        signup/
          page.tsx
      onboarding/
        child/
          page.tsx
        avatar/
          page.tsx
        missions/
          page.tsx
        rewards/
          page.tsx
      child/
        [childId]/
          today/
            page.tsx
          rewards/
            page.tsx
          reading/
            page.tsx
          stickers/
            page.tsx
          progress/
            page.tsx
          avatar/
            page.tsx
      parent/
        page.tsx
        missions/
          page.tsx
          new/
            page.tsx
          [missionId]/
            edit/
              page.tsx
        approvals/
          page.tsx
        rewards/
          page.tsx
          new/
            page.tsx
        progress/
          page.tsx
        reading/
          page.tsx
        settings/
          page.tsx
      api/
        children/
        missions/
        mission-instances/
        rewards/
        reward-redemptions/
        reading/
        homework/
        jobs/
      layout.tsx
      globals.css
    components/
      ui/
      layout/
      animation/
    features/
      auth/
      child-mode/
      parent-dashboard/
      missions/
      rewards/
      reading/
      homework/
      progress/
      achievements/
      avatar/
      stickers/
      settings/
    lib/
      supabase/
        browser.ts
        server.ts
        middleware.ts
      services/
        missionService.ts
        rewardService.ts
        progressService.ts
        achievementService.ts
        readingService.ts
        streakService.ts
        levelService.ts
        offlineQueueService.ts
      validation/
        missionSchemas.ts
        rewardSchemas.ts
        readingSchemas.ts
      utils/
        dates.ts
        colors.ts
        accessibility.ts
    store/
      childUiStore.ts
      celebrationStore.ts
    types/
      database.ts
      domain.ts
    styles/
      tokens.ts
```

## 14. Milestones

### M0. 프로젝트 기반 설정

기간: 2~3일

범위:

- Next.js, TypeScript, TailwindCSS 설정
- Supabase 프로젝트 연결
- 기본 레이아웃과 디자인 토큰 설정
- ESLint, Prettier, 테스트 환경 설정
- 기본 UI 컴포넌트 구축

완료 기준:

- 로컬 개발 서버가 실행된다.
- Supabase 연결 확인이 가능하다.
- 기본 버튼, 카드, 모달, 토스트가 동작한다.

### M1. 인증, 온보딩, 아이 프로필

기간: 3~5일

범위:

- 부모 회원가입, 로그인, 로그아웃
- 프로필 생성
- 아이 프로필 생성
- 아바타 선택
- 추천 미션과 추천 보상 온보딩

완료 기준:

- 부모가 로그인 후 아이 프로필을 만들 수 있다.
- 온보딩 완료 후 아이 오늘 화면으로 이동한다.
- RLS로 부모별 데이터 접근이 제한된다.

### M2. 미션 엔진과 아이 오늘 화면

기간: 5~7일

범위:

- 미션 템플릿 CRUD
- 반복 일정
- 오늘 미션 인스턴스 생성
- 아이 미션 제출
- 부모 승인
- 포인트, 별, XP 지급
- 오늘 정원 기본 성장 단계

완료 기준:

- 부모가 미션을 만들고 오늘 화면에 표시할 수 있다.
- 아이가 미션을 제출할 수 있다.
- 부모 승인 후 점수와 정원 상태가 갱신된다.

### M3. 보상, 축하, 레벨

기간: 4~6일

범위:

- 보상 CRUD
- 보상 해금과 요청
- 보상 지급 완료
- 컨페티와 효과음
- 레벨업
- 기본 업적 검사

완료 기준:

- 조건을 만족한 보상이 해금된다.
- 보상 해금과 레벨업 시 축하 연출이 나온다.
- 업적이 중복 없이 해금된다.

### M4. 독서, 숙제, 진행 리포트

기간: 5~7일

범위:

- 독서 기록
- 책장 시각화
- 숙제 체크리스트
- 주간 진행
- 월간 달력
- 일일 요약과 스트릭 계산

완료 기준:

- 오늘, 주간, 월간 독서 수가 표시된다.
- 숙제 체크리스트가 미션과 연동된다.
- 월간 달력에 금색 별과 트로피가 표시된다.

### M5. 반응형, 접근성, PWA 기초

기간: 4~6일

범위:

- 모바일, 태블릿 반응형 QA
- 큰 글자, 애니메이션 줄이기, 사운드 토글
- 기본 오프라인 큐
- PWA manifest와 앱 아이콘
- 성능 최적화

완료 기준:

- 360px 모바일과 태블릿에서 UI가 겹치지 않는다.
- 네트워크 끊김 상태에서 미션 제출이 로컬 큐에 저장된다.
- Lighthouse 접근성 점수 90 이상을 목표로 한다.

### M6. 베타 출시 준비

기간: 3~5일

범위:

- 오류 상태 처리
- 빈 상태 문구 정리
- 기본 데이터 seed
- QA 체크리스트
- 배포 환경 구성
- 사용 로그와 핵심 이벤트 추적

완료 기준:

- 부모 1명, 아이 1명 기준 핵심 흐름이 처음부터 끝까지 동작한다.
- 베타 사용자에게 공유 가능한 URL이 있다.
- 핵심 이벤트가 기록된다.

## 15. Future Roadmap

### 15.1 시즌 테마

- 봄 정원, 여름 바다, 가을 숲, 겨울 눈마을
- 명절 또는 방학 테마
- 테마별 한정 스티커

### 15.2 출력 가능한 보상 인증서

- "이번 주 독서왕", "숙제 영웅" 인증서
- PDF 다운로드
- 부모가 문구와 날짜를 수정 가능

### 15.3 음성 격려

- 부모 목소리 녹음
- 기본 음성 칭찬
- 아이가 글을 읽기 전에도 이해할 수 있는 음성 안내

### 15.4 배경 음악

- 잔잔한 정원 음악
- 집중 시간 음악
- 보상 해금 음악
- 항상 음소거와 볼륨 조절을 제공

### 15.5 AI 격려 메시지

- 아이의 오늘 활동을 바탕으로 짧은 칭찬 문구 생성
- 부모가 승인한 문구만 아이에게 표시
- 부정적 비교, 압박, 민감 정보 사용 금지

### 15.6 가족 리더보드

- 형제자매 간 개인 목표 달성률 중심으로 표시
- 순위 경쟁보다 "함께 자란 숲" 형태 권장
- 기본 비활성화

### 15.7 고급 오프라인 모드

- 전체 오늘 화면 오프라인 사용
- 독서 기록 오프라인 추가
- 충돌 해결 UI

### 15.8 학교와 학습 확장

- 과목별 미션
- 방학 계획표
- 받아쓰기 연습 기록
- 수학 문제집 진행률
- 선생님 공유용 주간 리포트

### 15.9 부모 인사이트

- 아이가 가장 잘 수행하는 카테고리
- 어려워하는 요일과 미션
- 보상 효과 분석
- 추천 미션 조정

## 16. 구현 에이전트를 위한 우선순위

### 16.1 반드시 먼저 구현할 핵심 루프

1. 부모 로그인
2. 아이 생성
3. 미션 생성
4. 오늘 미션 표시
5. 아이 완료 제출
6. 부모 승인
7. 별, 포인트, XP 지급
8. 정원 성장 반영
9. 보상 해금

이 루프가 완성되기 전에는 부가 기능을 확장하지 않는다.

### 16.2 디자인 방향

- 최종 시각 방향은 `동화 정원`이다.
- 아이 모드의 기본 캐릭터는 하얀색 페르시안 고양이 `솜이`다.
- 배경은 밝은 크림, 연한 하늘색, 연한 초록을 조합한다.
- 주요 액션은 따뜻한 노랑 또는 산뜻한 초록을 사용한다.
- 경고 색은 강한 빨강보다 부드러운 코랄을 사용한다.
- 카드는 8px 이하의 둥근 모서리를 기본으로 한다.
- 아이 화면은 장식적이되, 부모 화면은 작업 중심으로 정돈한다.
- 버튼에는 가능한 Lucide 아이콘을 함께 사용한다.

### 16.3 테스트 우선순위

- 미션 반복 일정 생성 테스트
- 중복 미션 인스턴스 방지 테스트
- 승인 시 포인트, 별, XP 원장 기록 테스트
- 레벨 계산 테스트
- 보상 해금 조건 테스트
- 업적 중복 해금 방지 테스트
- RLS 접근 제한 테스트
- 모바일 화면 레이아웃 테스트

### 16.4 분석 이벤트

MVP에서 기록할 이벤트:

- `parent_signed_up`
- `child_created`
- `mission_created`
- `mission_submitted`
- `mission_approved`
- `reward_unlocked`
- `reward_requested`
- `reading_entry_created`
- `perfect_day_achieved`
- `level_up`

개인정보를 이벤트 속성에 직접 넣지 않는다.
