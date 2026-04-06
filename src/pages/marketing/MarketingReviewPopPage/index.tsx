import { useCallback, useState } from "react";
import PageView from "./view";
import useMarketingReviewPopService, { getCampaignById } from "./service";
import MarketingReviewPopModal from "../../../components/Modal/MarketingReviewPopModal";

export default function MarketingReviewPopPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const {
    params, items, totalCount, isLoading,
    detailTarget, openDetail, closeDetail, onSubmit,
  } = useMarketingReviewPopService({});

  const onCreate = useCallback(() => { alert("체험단 생성"); }, []);

  return (
    <>
      <PageView
        selectedIds={selectedIds}
        params={params}
        items={items}
        totalCount={totalCount}
        isLoading={isLoading}
        onSelect={(ids) => setSelectedIds(ids as number[])}
        onSubmit={onSubmit}
        onCreate={onCreate}
        onOpenDetail={openDetail}
      />

      {detailTarget && (
        <MarketingReviewPopModal
          isOpen
          campaignId={detailTarget.id}
          onClose={closeDetail}
          minWidth={900}
          maxWidth={1200}
          getCampaignById={getCampaignById}
        />
      )}
    </>
  );
}
