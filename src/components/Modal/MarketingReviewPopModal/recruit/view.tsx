import React, { useMemo } from "react";
import { BaseTable } from "../../../BaseComponents";
import { getApplicantColumns } from "./columns";
import type { IMarketingReviewPopModalViewProps } from "../type";

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

export default function MarketingReviewPopModalView({
  title, status, periodText, applicants, selectedCount, maxCount,
  onSelect, onCancelSelect, onClose,
}: IMarketingReviewPopModalViewProps) {
  const columns = useMemo(
    () => getApplicantColumns({ onSelect, onCancelSelect }),
    [onSelect, onCancelSelect]
  );

  return (
    <div style={{ padding: "28px 28px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#111", marginBottom: 8 }}>{title}</h2>
          {(status || periodText) && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              {status && <StatusBadge status={status} />}
              {periodText && <span style={{ fontSize: 13, color: "#666" }}>{periodText}</span>}
            </div>
          )}
          <ul style={{ paddingLeft: 0, listStyle: "none", background: "#fafaf8", borderRadius: 8, borderLeft: "3px solid #e5e5e2", padding: "10px 14px" }}>
            {[
              "모집 기간과 선정 기간 동안 운영자는 자유롭게 선정 및 취소할 수 있습니다.",
              "선정 기간이 종료되면 현재 선정된 명단이 자동으로 확정됩니다.",
              "선정 기간 종료 시점에 자동으로 선정 알림이 발송됩니다.",
              "선정 기간 종료 이후에는 선정 취소가 불가능합니다.",
            ].map((txt, i) => (
              <li key={i} style={{ fontSize: 12, color: "#888", lineHeight: 1.8, paddingLeft: 14, position: "relative" }}>
                <span style={{ position: "absolute", left: 0 }}>·</span>{txt}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ fontSize: 13, color: "#444", whiteSpace: "nowrap", paddingLeft: 16 }}>
          신청 {applicants.length}명&nbsp; 선정 <strong>{selectedCount}</strong>/{maxCount}명
        </div>
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
    </div>
  );
}
