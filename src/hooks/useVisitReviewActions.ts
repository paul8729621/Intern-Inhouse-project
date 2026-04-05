import { useCallback } from "react";
import type { VisitApplicant } from "../components/Modal/MarketingReviewPopModal/visit/service";
import type { ReviewRejectPayload } from "../components/Modal/ReviewRejectPopModal/type";
import { submitReviewCorrection } from "../components/Modal/ReviewRejectPopModal/service";
import { useToastStore } from "../stores/toast";
import { formatDateToYYMMDD } from "../utils/date";

interface UseVisitReviewActionsParams {
  setApplicants: React.Dispatch<React.SetStateAction<VisitApplicant[]>>;
  setRejectTarget: (target: VisitApplicant | null) => void;
}

export function useVisitReviewActions({
  setApplicants,
  setRejectTarget,
}: UseVisitReviewActionsParams) {
  const { showToast } = useToastStore();

  const rejectReview = useCallback(
    async (payload: ReviewRejectPayload) => {
      try {
        await submitReviewCorrection(payload);

        setApplicants((prev) =>
          prev.map((app) => {
            if (app.id !== Number(payload.reviewerId)) return app;
            if (app.rejectImageUrl?.startsWith("blob:")) {
              URL.revokeObjectURL(app.rejectImageUrl);
            }
            return {
              ...app,
              visitStatus: "후기 등록" as const,
              reviewStatus: "반려" as const,
              rejectedDate: formatDateToYYMMDD(),
              rejectReason: payload.reason,
              rejectNotice: payload.notice,
              rejectImageUrl: payload.image
                ? URL.createObjectURL(payload.image)
                : undefined,
            };
          })
        );

        setRejectTarget(null);
        showToast("반려 사유가 등록되었습니다!", "success");
      } catch {
        showToast("반려 사유 등록에 실패했습니다.", "error");
      }
    },
    [setApplicants, setRejectTarget, showToast]
  );

  const approveReview = useCallback(
    (applicantId: number) => {
      setApplicants((prev) =>
        prev.map((app) =>
          app.id === applicantId
            ? {
                ...app,
                visitStatus: "후기 등록" as const,
                reviewStatus: "검수 완료" as const,
                rejectedDate: undefined,
              }
            : app
        )
      );
      showToast("후기 검수가 완료되었습니다.", "success");
    },
    [setApplicants, showToast]
  );

  return { rejectReview, approveReview };
}
