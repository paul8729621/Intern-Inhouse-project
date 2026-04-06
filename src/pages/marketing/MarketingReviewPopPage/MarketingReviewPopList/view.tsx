import { useMemo, useState } from "react";
import { BaseTable, BaseButton, BaseListHeader, Pagination } from "../../../../components/BaseComponents";
import Filter from "../../../../components/Filter";
import type { IMarketingReviewPopViewProps, ISearchParams } from "../type";
import type { MarketingStatus } from "../../../../components/Modal/MarketingReviewPopModal/type";
import { getMarketingReviewerColumns } from "./columns";
import type { MarketingReviewPageFilterItem, MarketingReviewPageFilterKey } from "./type";

const ROWS_PER_PAGE = 3;

export default function MarketingReviewersListView({
  selectedIds, params, items, totalCount, isLoading,
  onSelect, onSubmit, onCreate, onOpenDetail,
}: IMarketingReviewPopViewProps) {
  const [pageIndex, setPageIndex] = useState(0);

  const columns = useMemo(
    () => getMarketingReviewerColumns({ onOpenDetail }),
    [onOpenDetail]
  );

  const filterItems = useMemo<MarketingReviewPageFilterItem[]>(() => {
    const countByStatus = (s: MarketingStatus) => items.filter((v) => v.status === s).length;
    return [
      { key: "ALL",      label: "전체",     count: items.length },
      { key: "모집중",    label: "모집중",    count: countByStatus("모집중") },
      { key: "진행중",    label: "선정중",    count: countByStatus("진행중") },
      { key: "방문/후기", label: "방문/후기", count: countByStatus("방문/후기") },
      { key: "종료",      label: "종료",      count: countByStatus("종료") },
    ];
  }, [items]);

  const pagedItems = useMemo(() => {
    const start = pageIndex * ROWS_PER_PAGE;
    return items.slice(start, start + ROWS_PER_PAGE);
  }, [items, pageIndex]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 24px 0" }}>
        <BaseButton variant="primary" onClick={onCreate}>+ 체험단 생성</BaseButton>
      </div>

      <BaseListHeader<ISearchParams>
        hasSearch
        hasDateRange={false}
        params={params}
        totalCount={totalCount}
        onSubmit={onSubmit}
        placeholder="스팟명으로 검색"
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px 12px", flexWrap: "wrap", gap: 10 }}>
        <Filter
          items={filterItems}
          activeKey={(params.status ?? "ALL") as MarketingReviewPageFilterKey}
          onChange={(key) => {
            const nextStatus = key === "ALL" ? undefined : (key as MarketingStatus);
            onSubmit({ status: nextStatus, page: 1 });
            setPageIndex(0);
          }}
        />
        <Pagination
          currentPageIndex={pageIndex}
          rowsPerPage={ROWS_PER_PAGE}
          totalLength={items.length}
          paginationSize={5}
          onPageChange={setPageIndex}
        />
      </div>

      <div style={{ padding: "0 24px 24px" }}>
        <BaseTable
          name="marketing-reviewers"
          columns={columns}
          data={pagedItems}
          totalCount={totalCount}
          checked={selectedIds}
          onChecked={onSelect}
          isLoading={isLoading}
          hasCheckbox
        />
      </div>
    </>
  );
}
