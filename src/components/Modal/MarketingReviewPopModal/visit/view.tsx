import React, { useMemo } from "react";
import { BaseTable } from "../../../BaseComponents";
import Filter from "../../../Filter";
import ModalToastContainer from "../../../Toast/ModalToastContainer";
import ReviewRejectModal from "../../ReviewRejectPopModal";
import ReviewRejectDetailPopModal from "../../ReviewRejectDetailPopModal";
import { getVisitColumns } from "./columns";
import type { VisitFilterKey } from "./service";
import useMarketingReviewVisitModalService from "./service";

type ServiceReturn = ReturnType<typeof useMarketingReviewVisitModalService>;

interface Props {
  title:      ServiceReturn["title"];
  status:     ServiceReturn["status"];
  periodText: ServiceReturn["periodText"];
  applicants: ServiceReturn["applicants"];
  filterItems: ServiceReturn["filterItems"];
  activeFilter: ServiceReturn["activeFilter"];
  onChangeFilter: (key: VisitFilterKey) => void;
  onClose: () => void;

  rejectTarget:       ServiceReturn["rejectTarget"];
  openRejectModal:    ServiceReturn["openRejectModal"];
  closeRejectModal:   ServiceReturn["closeRejectModal"];
  handleRejectSubmit: ServiceReturn["handleRejectSubmit"];
  handleApprove:      ServiceReturn["handleApprove"];

  rejectDetailData:          ServiceReturn["rejectDetailData"];
  openRejectDetailModal:     ServiceReturn["openRejectDetailModal"];
  closeRejectDetailModal:    ServiceReturn["closeRejectDetailModal"];
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    "모집중":    { bg: "#dcfce7", color: "#15803d" },
    "진행중":    { bg: "#dbeafe", color: "#1d4ed8" },
    "방문/후기": { bg: "#ffedd5", color: "#c2410c" },
    "종료":      { bg: "#f3f4f6", color: "#6b7280" },
  };
  const s = map[status] ?? map["종료"];
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: s.bg, color: s.color }}>
      {status}
    </span>
  );
}

export default function MarketingReviewVisitModalView({
  title, status, periodText, applicants, filterItems, activeFilter,
  onChangeFilter, onClose,
  rejectTarget, openRejectModal, closeRejectModal, handleRejectSubmit, handleApprove,
  rejectDetailData, openRejectDetailModal, closeRejectDetailModal,
}: Props) {
  const columns = useMemo(
    () => getVisitColumns({
      onClickReject:       openRejectModal,
      onClickApprove:      handleApprove,
      onClickRejectDetail: openRejectDetailModal,
    }),
    [openRejectModal, handleApprove, openRejectDetailModal]
  );

  return (
    <div style={{ padding: "28px 28px 20px" }}>
      <ModalToastContainer />

      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#111", marginBottom: 8 }}>{title}</h2>
        {(status || periodText) && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {status && <StatusBadge status={status} />}
            {periodText && <span style={{ fontSize: 13, color: "#666" }}>{periodText}</span>}
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
        <span style={{ fontSize: 13, color: "#444" }}>선정 {applicants.length}명</span>
        <Filter
          items={filterItems}
          activeKey={activeFilter}
          onChange={(key) => onChangeFilter(key as VisitFilterKey)}
        />
      </div>

      <BaseTable data={applicants} columns={columns} />

      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 14, marginTop: 4, borderTop: "1px solid #f0f0ee" }}>
        <button
          onClick={onClose}
          style={{ padding: "8px 20px", border: "1px solid #ddd", borderRadius: 8, background: "#fff", fontSize: 13, cursor: "pointer" }}
        >
          닫기
        </button>
      </div>

      <ReviewRejectModal
        isOpen={!!rejectTarget}
        reviewer={rejectTarget}
        onClose={closeRejectModal}
        onSubmit={handleRejectSubmit}
      />
      <ReviewRejectDetailPopModal
        isOpen={!!rejectDetailData}
        data={rejectDetailData}
        onClose={closeRejectDetailModal}
      />
    </div>
  );
}
