import type { IMarketingReviewPop } from "../../../../components/Modal/MarketingReviewPopModal/type";

export const MARKETING_REVIEWERS_MOCK: IMarketingReviewPop[] = [
  {
    id: 1,
    status: "모집중",
    title: "강남 파스타 맛집 체험단",
    spot: "라비올리하우스",
    region: "서울 강남",
    benefit: "식사권 5만원",
    period: {
      recruit: "25.01.01 ~ 25.01.10",
      select: "25.01.10 ~ 25.01.20",
      visit: "25.01.21 ~ 25.01.22",
    },
    created: "24-12-20",
    apply_count: 12,
    recruit_count: 30,
    review_done_count: 0,
    selected_count: 12,
    home_visible: true,
  },
  {
    id: 2,
    status: "진행중",
    title: "홍대 카페 신메뉴 리뷰",
    spot: "카페 무드",
    region: "서울 마포",
    benefit: "음료 무료",
    period: {
      recruit: "25.01.01 ~ 25.01.10",
      select: "25.01.10 ~ 25.01.20",
      visit: "25.01.21 ~ 25.01.22",
    },
    created: "24-12-21",
    apply_count: 75,
    recruit_count: 25,
    review_done_count: 0,
    selected_count: 18,
    home_visible: true,
  },
  {
    id: 3,
    status: "종료",
    title: "부산 오션뷰 숙소 체험",
    spot: "오션스테이",
    region: "부산",
    benefit: "1박 숙박권",
    period: {
      recruit: "25.01.01 ~ 25.01.10",
      select: "25.01.10 ~ 25.01.20",
      visit: "25.01.21 ~ 25.01.22",
    },
    created: "24-11-20",
    apply_count: 25,
    recruit_count: 18,
    review_done_count: 18,
    selected_count: 18,
    home_visible: true,
  },
  {
    id: 4,
    status: "방문/후기",
    title: "여의도 인턴 체험",
    spot: "여의도",
    region: "서울",
    benefit: "인턴 생활",
    period: {
      recruit: "25.01.01 ~ 25.01.10",
      select: "25.01.10 ~ 25.01.20",
      visit: "25.01.21 ~ 25.01.22",
    },
    created: "25-12-26",
    apply_count: 4,
    recruit_count: 4,
    selected_count: 4,
    review_done_count: 0,
    home_visible: true,
  },
];

export interface MarketingVisitReviewerMock {
  id: number;
  name: string;
  phone: string;
  visitDate?: string;
  visitStatus: "방문 전" | "방문 완료" | "후기 등록" | "취소됨";
  reviewStatus?: "검수 완료" | "반려" | "재작성 대기";
}

export const MARKETING_REVIEW_VISIT_APPLICANTS_MOCK = [
  { visitStatus: "방문 전" as const },
  { visitStatus: "방문 완료" as const },
  { visitStatus: "후기 등록" as const, reviewStatus: "검수 완료" as const },
  { visitStatus: "후기 등록" as const, reviewStatus: "반려" as const },
  { visitStatus: "후기 등록" as const },
  { visitStatus: "취소됨" as const },
] as const;

export type MarketingReviewVisitApplicantMock =
  (typeof MARKETING_REVIEW_VISIT_APPLICANTS_MOCK)[number];
