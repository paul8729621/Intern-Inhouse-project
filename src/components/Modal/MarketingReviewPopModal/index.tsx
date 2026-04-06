import { BaseModal } from "../../BaseComponents";
import RecruitView from "./recruit/view";
import VisitView from "./visit/view";
import useRecruitService from "./recruit/service";
import useVisitService from "./visit/service";
import type { IMarketingReviewPopModalProps } from "./type";

export default function MarketingReviewPopModal({
  isOpen,
  campaignId,
  onClose,
  getCampaignById,
  minWidth,
  maxWidth,
}: IMarketingReviewPopModalProps) {
  const recruitService = useRecruitService({ campaignId, getCampaignById });
  const visitService   = useVisitService({ campaignId, getCampaignById });

  const isVisitMode =
    recruitService.status === "방문/후기" ||
    recruitService.status === "종료";

  if (!isOpen || !campaignId) return null;

  return (
    <BaseModal isOpen={isOpen} onHide={onClose} minWidth={minWidth} maxWidth={maxWidth}>
      {isVisitMode ? (
        <VisitView
          {...visitService}
          onChangeFilter={visitService.setActiveFilter}
          onClose={onClose}
        />
      ) : (
        <RecruitView {...recruitService} onClose={onClose} />
      )}
    </BaseModal>
  );
}
