import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getPeriodText } from "../../../../utils/popModal";
import { formatDateToYYMMDD } from "../../../../utils/date";
import {
  MARKETING_REVIEW_VISIT_APPLICANTS_MOCK,
  type MarketingReviewVisitApplicantMock,
} from "../../../../pages/marketing/MarketingReviewPopPage/mock/mock";
import { useVisitReviewActions } from "../../../../hooks/useVisitReviewActions";
import type { IMarketingReviewPopModalServiceParams } from "../type";
import type { ReviewRejectDetailData } from "../../ReviewRejectDetailPopModal/type";

export type VisitFilterKey = "ALL" | "BEFORE" | "DONE" | "REVIEW";

export interface VisitFilterItem {
  key: VisitFilterKey;
  label: string;
  count: number;
}

export interface VisitApplicant {
  id: number;
  name: string;
  phone: string;
  visitDate?: string;
  visitStatus: "방문 전" | "방문 완료" | "후기 등록" | "취소됨";
  reviewStatus?: "검수 완료" | "반려" | "재작성 대기";
  rejectedDate?: string;
  rejectReason?: string;
  rejectNotice?: string;
  rejectImageUrl?: string;
}

export default function useMarketingReviewVisitModalService({
  campaignId,
  getCampaignById,
}: IMarketingReviewPopModalServiceParams) {
  const [applicants, setApplicants] = useState<VisitApplicant[]>([]);
  const [activeFilter, setActiveFilter] = useState<VisitFilterKey>("ALL");
  const [rejectTarget, setRejectTarget] = useState<VisitApplicant | null>(null);
  const [rejectDetailData, setRejectDetailData] = useState<ReviewRejectDetailData | null>(null);
  const applicantsRef = useRef<VisitApplicant[]>([]);

  const { rejectReview, approveReview } = useVisitReviewActions({
    setApplicants,
    setRejectTarget,
  });

  const campaign = useMemo(
    () => (campaignId ? getCampaignById(campaignId) : null),
    [campaignId, getCampaignById]
  );

  useEffect(() => {
    applicantsRef.current = applicants;
  }, [applicants]);

  useEffect(() => {
    if (!campaign) {
      setApplicants([]);
      return;
    }

    const nextApplicants: VisitApplicant[] = Array.from(
      { length: campaign.selected_count },
      (_, idx) => {
        const id = idx + 1;
        const template: MarketingReviewVisitApplicantMock =
          MARKETING_REVIEW_VISIT_APPLICANTS_MOCK[
            idx % MARKETING_REVIEW_VISIT_APPLICANTS_MOCK.length
          ];

        const reviewStatus =
          template.visitStatus === "후기 등록" && "reviewStatus" in template
            ? template.reviewStatus
            : undefined;

        return {
          id,
          name: `체험자${id}`,
          phone: "010-0000-0000",
          visitDate: formatDateToYYMMDD(new Date("2025-08-21")),
          visitStatus: template.visitStatus,
          reviewStatus,
          rejectedDate:
            reviewStatus === "반려"
              ? formatDateToYYMMDD(new Date("2025-01-08"))
              : undefined,
        };
      }
    );

    setApplicants(nextApplicants);

    return () => {
      applicantsRef.current.forEach((app) => {
        if (app.rejectImageUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(app.rejectImageUrl);
        }
      });
    };
  }, [campaign]);

  const filterItems = useMemo<VisitFilterItem[]>(() => {
    const count = (status: VisitApplicant["visitStatus"]) =>
      applicants.filter((v) => v.visitStatus === status).length;
    return [
      { key: "ALL",    label: "전체",     count: applicants.length },
      { key: "BEFORE", label: "방문 전",  count: count("방문 전") },
      { key: "DONE",   label: "방문 완료", count: count("방문 완료") },
      { key: "REVIEW", label: "후기 등록", count: count("후기 등록") },
    ];
  }, [applicants]);

  const filteredApplicants = useMemo(() => {
    if (activeFilter === "ALL") return applicants;
    const map: Record<VisitFilterKey, VisitApplicant["visitStatus"]> = {
      ALL:    "방문 전",
      BEFORE: "방문 전",
      DONE:   "방문 완료",
      REVIEW: "후기 등록",
    };
    return applicants.filter((v) => v.visitStatus === map[activeFilter]);
  }, [applicants, activeFilter]);

  return {
    title:      campaign?.title ?? "",
    status:     campaign?.status,
    periodText: getPeriodText(campaign?.status, campaign?.period),

    filterItems,
    activeFilter,
    setActiveFilter,
    applicants: filteredApplicants,

    rejectTarget,
    openRejectModal:  useCallback((app: VisitApplicant) => setRejectTarget(app), []),
    closeRejectModal: useCallback(() => setRejectTarget(null), []),
    handleRejectSubmit: rejectReview,
    handleApprove:      approveReview,

    rejectDetailData,
    openRejectDetailModal: useCallback(
      (app: VisitApplicant) =>
        setRejectDetailData({
          rejectedAt: app.rejectedDate ?? "",
          reason:     app.rejectReason ?? "",
          notice:     app.rejectNotice,
          imageUrl:   app.rejectImageUrl,
        }),
      []
    ),
    closeRejectDetailModal: useCallback(() => setRejectDetailData(null), []),
  };
}
