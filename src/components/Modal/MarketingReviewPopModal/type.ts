export type GetCampaignById = (id: number) => IMarketingReviewPop | null;

export interface IMarketingReviewPopModalServiceParams {
  campaignId: number | null;
  getCampaignById: GetCampaignById;
}

export interface MarketingPeriod {
  recruit: string;
  select: string;
  visit: string;
}

export type MarketingStatus = "모집중" | "진행중" | "방문/후기" | "종료";

export interface IMarketingReviewPop {
  id: number;
  status: MarketingStatus;
  title: string;
  spot: string;
  region: string;
  benefit: string;
  period: MarketingPeriod;
  created: string;
  apply_count: number;
  recruit_count: number;
  review_done_count: number;
  selected_count: number;
  home_visible: boolean;
}

export interface Applicant {
  id: number;
  name: string;
  phone: string;
  blogUrl?: string;
  content: string;
  selected: boolean;
  isReviewDone: boolean;
}

export interface IMarketingReviewPopModalViewProps {
  title: string;
  subtitle?: string;
  status?: MarketingStatus;
  period?: MarketingPeriod;
  periodText?: string;
  applicants: Applicant[];
  selectedCount: number;
  maxCount: number;
  onSelect: (id: number) => void;
  onCancelSelect: (id: number) => void;
  onClose: () => void;
}

export interface IMarketingReviewPopModalProps {
  isOpen: boolean;
  campaignId: number | null;
  minWidth?: number;
  maxWidth?: number;
  getCampaignById: GetCampaignById;
  onClose: () => void;
}
