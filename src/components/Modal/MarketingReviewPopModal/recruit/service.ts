import { useCallback, useEffect, useMemo, useState } from "react";
import { getPeriodText } from "../../../../utils/popModal";
import type { Applicant, IMarketingReviewPopModalServiceParams } from "../type";

export default function useMarketingReviewPopModalService({
  campaignId,
  getCampaignById,
}: IMarketingReviewPopModalServiceParams) {
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  const campaign = useMemo(() => {
    if (!campaignId) return null;
    return getCampaignById(campaignId);
  }, [campaignId, getCampaignById]);

  useEffect(() => {
    if (!campaign) { setApplicants([]); return; }
    setApplicants(
      Array.from({ length: campaign.apply_count }, (_, idx) => ({
        id:          idx + 1,
        name:        `신청자${idx + 1}`,
        phone:       "010-0000-0000",
        blogUrl:     idx % 2 === 0 ? "https://blog.naver.com/test" : undefined,
        content:     "신청합니다.",
        selected:    idx < campaign.selected_count,
        isReviewDone: false,
      }))
    );
  }, [campaign]);

  const selectedCount = useMemo(
    () => applicants.filter((v) => v.selected).length,
    [applicants]
  );

  const onSelect = useCallback(
    (id: number) => {
      setApplicants((prev) => {
        const target = prev.find((v) => v.id === id);
        if (!target || target.selected) return prev;
        const selectedCount = prev.filter((v) => v.selected).length;
        const maxCount = campaign?.recruit_count ?? 0;
        if (selectedCount >= maxCount) return prev;
        return prev.map((v) => (v.id === id ? { ...v, selected: true } : v));
      });
    },
    [campaign]
  );

  const onCancelSelect = useCallback((id: number) => {
    setApplicants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, selected: false } : v))
    );
  }, []);

  return {
    isActive:   Boolean(campaign),
    title:      campaign?.title ?? "",
    status:     campaign?.status,
    period:     campaign?.period,
    periodText: getPeriodText(campaign?.status, campaign?.period),
    maxCount:   campaign?.recruit_count ?? 0,
    applicants,
    selectedCount,
    onSelect,
    onCancelSelect,
  };
}
