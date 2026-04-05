import styles from "./style.module.scss";
import type { MarketingStatus } from "./type";

export const modalClassNames = {
  root:       styles.MarketingReviewPopModal,
  header:     styles.MarketingReviewPopModal__Header,
  subtitle:   styles.MarketingReviewPopModal__Subtitle,
  meta:       styles.MarketingReviewPopModal__Meta,
  status:     styles.MarketingReviewPopModal__Status,
  period:     styles.MarketingReviewPopModal__Period,
  count:      styles.MarketingReviewPopModal__Count,
  table:      styles.MarketingReviewPopModal__Table,
  content:    styles.MarketingReviewPopModal__Content,
  footer:     styles.MarketingReviewPopModal__Footer,
  notice:     styles.MarketingReviewPopModal__Notice,
  textPrimary: styles.MarketingReviewPopModal__textPrimary,

  summaryRow:      styles.MarketingReviewPopModal__SummaryRow,
  summarylocation: styles.MarketingReviewPopModal__Summarylocation,

  borderButton:        styles.MarketingReviewPopModal__BorderButton,
  borderButtonPrimary: styles["MarketingReviewPopModal__BorderButton--Primary"],
  borderButtonDanger:  styles["MarketingReviewPopModal__BorderButton--Danger"],
};

export const statusClassNames: Record<MarketingStatus, string> = {
  "모집중":    styles["MarketingReviewPopModal__Status--Recruiting"],
  "진행중":    styles["MarketingReviewPopModal__Status--Progress"],
  "방문/후기": styles["MarketingReviewPopModal__Status--Review"],
  "종료":      styles["MarketingReviewPopModal__Status--Closed"],
};

export function getStatusClassName(status: MarketingStatus) {
  return `${modalClassNames.status} ${statusClassNames[status]}`;
}
