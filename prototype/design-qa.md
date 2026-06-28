**비교 대상**

- source visual truth path: `C:\workspace\quest-garden\docs\mockups\assets\selected-storybook-white-persian-cat.png`
- implementation screenshot path: `C:\workspace\quest-garden\prototype\qa-screenshot-834x1194-final.png`
- mobile screenshot path: `C:\workspace\quest-garden\prototype\qa-screenshot-390x844-final3.png`
- viewport: tablet `834x1194`, mobile `390x844`
- state: 아이 모드 `가든` 탭, 모든 미션 미완료 초기 상태
- full-view comparison evidence: `C:\workspace\quest-garden\prototype\qa-comparison-834x1194.png`
- focused region comparison evidence: 태블릿 전체 화면 비교와 모바일 첫 화면 캡처로 상단 바, 정원 장면, 보상 영역, 미션 리스트, 하단 내비게이션을 확인했다.

**Findings**

- P0/P1/P2 없음.

**필수 Fidelity 점검**

- Fonts and typography: 구현은 시스템 한글 폰트 계열을 사용한다. 원본 목업의 둥근 게임 UI 글꼴과 완전히 같지는 않지만, 한글 가독성, 계층, 버튼 텍스트 크기, 줄바꿈은 아이용 UI 기준으로 수용 가능하다.
- Spacing and layout rhythm: 태블릿 기준 상단 바, 정원, 보상, 미션, 하단 내비게이션이 첫 화면에 안정적으로 들어온다. 원본보다 구현의 보상/미션 영역이 조금 더 정돈된 작업형 레이아웃이지만 핵심 구조는 유지된다.
- Colors and visual tokens: 밝은 크림, 초록, 노랑, 하늘색, 코랄 계열을 사용해 원본의 따뜻한 동화 정원 톤을 유지한다. 어두운 색이나 광고성 강조는 없다.
- Image quality and asset fidelity: 하얀색 페르시안 고양이 `솜이`, 정원 장면, 아이스크림 보상은 별도 생성 이미지 자산을 사용했다. 첫 캡처에서 고양이 단독 이미지의 사각 배경이 보였으나, 고양이가 장면에 통합된 정원 이미지로 교체해 해결했다.
- Copy and content: 주요 UI 텍스트는 한글이며 아이가 읽기 쉬운 짧은 문장으로 구성했다. `책 읽기`, `숙제`, `수학`, `양치`, `완료`, `잠김` 등 핵심 단어 중심이다.

**Patches Made Since Previous QA Pass**

- 고양이 단독 오버레이를 제거하고, 하얀색 페르시안 고양이가 자연스럽게 포함된 정원 이미지로 교체했다.
- 태블릿 `834x1194`에서 하단 내비게이션이 보이도록 상단 바, 정원, 보상, 미션 행의 세로 밀도를 조정했다.
- `7일 연속!` 문구가 줄바꿈되지 않도록 상단 바 폭과 폰트 크기를 조정했다.
- 모바일 `390x844`에서 가로 넘침이 생기지 않도록 모바일 앱 폭과 상단 바 구성을 조정했다.

**Open Questions**

- 실제 제품 구현 단계에서는 캐릭터와 보상 이미지를 WebP 또는 AVIF로 최적화할 필요가 있다.
- 원본 목업의 미션 아이콘은 그림형 자산에 가깝고, 구현은 Phosphor 아이콘을 사용한다. 현재는 반응형과 상태 표현을 우선한 의도적 차이로 분류한다.

**Implementation Checklist**

- 태블릿 캡처 확인 완료.
- 모바일 캡처 확인 완료.
- 프로덕션 빌드 통과 완료.
- 상호작용 코드 포함: 미션 제출, 부모 승인, 전체 승인, 되돌림, 피아노 미션 추가, 보상 요청, 탭 전환, 초기화.

**Follow-up Polish**

- P3: 미션 아이콘을 향후 동화풍 이미지 자산으로 교체하면 원본 목업과 더 가까워진다.
- P3: 큰 PNG 자산을 배포 전 WebP/AVIF로 변환하면 첫 로딩 성능이 좋아진다.
- P3: 모바일 정원 장면에서 고양이 위치를 화면 중앙 쪽으로 한 번 더 조정하면 캐릭터 노출이 더 좋아진다.

final result: passed
