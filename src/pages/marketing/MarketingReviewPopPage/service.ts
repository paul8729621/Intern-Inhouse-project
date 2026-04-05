import { useCallback, useMemo, useState } from "react";
import { MARKETING_REVIEWERS_MOCK } from "./mock/mock";
import type { IMarketingReviewPopServiceProps, ISearchParams } from "./type";
import type { IMarketingReviewPop } from "../../../components/Modal/MarketingReviewPopModal/type";

const DEFAULT_PARAMS: ISearchParams = { page: 1, pageSize: 20, keyword: "" };

export function getCampaignById(id: number): IMarketingReviewPop | null {
  return MARKETING_REVIEWERS_MOCK.find((v) => v.id === id) ?? null;
}

export default function useMarketingReviewPopService(
  _props: IMarketingReviewPopServiceProps = {}
) {
  const [params, setParams] = useState<ISearchParams>(DEFAULT_PARAMS);
  const [detailTarget, setDetailTarget] = useState<IMarketingReviewPop | null>(null);

  const items = useMemo(() =>
    MARKETING_REVIEWERS_MOCK.filter((item) => {
      if (params.status && item.status !== params.status) return false;
      if (params.keyword && !item.spot?.includes(params.keyword)) return false;
      return true;
    }),
    [params.status, params.keyword]
  );

  const openDetail  = useCallback((row: IMarketingReviewPop) => setDetailTarget(row), []);
  const closeDetail = useCallback(() => setDetailTarget(null), []);

  const onSubmit = useCallback(
    (nextParams: Partial<ISearchParams> & { search?: string }) => {
      setParams((prev) => ({
        ...prev,
        ...nextParams,
        keyword:
          nextParams.search !== undefined ? nextParams.search : prev.keyword,
        page: 1,
      }));
    },
    []
  );

  return {
    params, items,
    totalCount: items.length,
    isLoading: false,
    detailTarget,
    openDetail, closeDetail, onSubmit,
  };
}
