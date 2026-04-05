import type { IMarketingReviewPop, MarketingStatus } from "../../../components/Modal/MarketingReviewPopModal/type";

export interface ISearchParams {
  page: number;
  pageSize: number;
  status?: MarketingStatus;
  keyword?: string;
}

export interface IMarketingReviewPopServiceProps {
  initialParams?: Partial<ISearchParams>;
}

export interface IMarketingReviewPopViewProps {
  params: ISearchParams;
  items: IMarketingReviewPop[];
  totalCount: number;
  isLoading: boolean;
  selectedIds: number[];
  onSelect(ids: number[]): void;
  onSubmit: (params: Partial<ISearchParams> & { search?: string }) => void;
  onCreate(): void;
  onOpenDetail(row: IMarketingReviewPop): void;
}
