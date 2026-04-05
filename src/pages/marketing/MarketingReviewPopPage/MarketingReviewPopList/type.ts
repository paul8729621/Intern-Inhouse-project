import type { MarketingStatus } from "../../../../components/Modal/MarketingReviewPopModal/type";

export type MarketingReviewPageFilterKey = "ALL" | MarketingStatus;

export interface MarketingReviewPageFilterItem {
  key: MarketingReviewPageFilterKey;
  label: string;
  count: number;
}
