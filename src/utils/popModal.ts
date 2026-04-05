import type { MarketingStatus, MarketingPeriod } from "../components/Modal/MarketingReviewPopModal/type";

export function getPeriodText(
  status: MarketingStatus | undefined,
  period?: MarketingPeriod,
): string | undefined {
  if (!period) return undefined;
  switch (status) {
    case "모집중":    return `모집 ${period.recruit}`;
    case "진행중":    return `선정 ${period.select}`;
    case "방문/후기": return `방문/후기 ${period.visit}`;
    case "종료":      return undefined;
    default:          return undefined;
  }
}
