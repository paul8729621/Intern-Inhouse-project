인턴 생활을 하면서 제작한 내용을 사내 시스템 코드를 제외하고 리펙토링하여 구동할 수 있도록 수정한 코드

## A) 구조 
```
src/
├── App.tsx                          ← ToastProvider + 앱 진입점
├── stores/toast.ts                  ← Context 기반 Toast 상태 (Zustand 대체)
├── hooks/useVisitReviewActions.ts   ← 검수완료 / 반려 액션
├── utils/date.ts
├── utils/popModal.ts
├── components/
│   ├── BaseComponents/index.tsx     ← BaseModal, BaseTable, BaseButton,
│   │                                   BaseMenu, BaseListHeader, Pagination
│   ├── Filter/
│   ├── Toast/
│   └── Modal/
│       ├── MarketingReviewPopModal/ ← index, type, classNames, style
│       │   ├── recruit/             ← service, columns, view
│       │   └── visit/               ← service, columns, view
│       ├── ReviewRejectPopModal/
│       └── ReviewRejectDetailPopModal/
└── pages/marketing/MarketingReviewPopPage/
    ├── index, service, type, view
    ├── mock/mock.ts
    └── MarketingReviewPopList/
        ← index, columns, view, StatusChip, type
```
기본적인 구조는 회사 내 이미 제작되어있던 다른 페이지를 참고, 활용하여 최대한 시스템에 맞춰 제작.

## B) 상태 초기화 문제
Mock 데이터를 이용 중인 상황이고 원래 제작, 컨펌을 받은 코드를 사내 시스템 코드(BaseTable, BaseButton, pagenation 등)을 직접 새로 제작하다 보니, 원래
정상적으로 작동했던 일부 동작이 동작을 실행 후 다시 접속하면 상태가 초기화 되어있는 문제 존재.

## C) 일부 UI 변경
원래 사용하던 UI 코드들은 전부 사내 코드였기에 일부 UI의 코드 변경 및 문제가 생길 수 있음. 추후 리펙토링하며 수정이 필요.
