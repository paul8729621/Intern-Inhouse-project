import React from "react";
import type { IMarketingReviewPop, MarketingStatus } from "../../../../components/Modal/MarketingReviewPopModal/type";
import StatusChip from "./StatusChip";
import { BaseMenu } from "../../../../components/BaseComponents";

type CellInfo<T> = { getValue: () => T; row: { original: IMarketingReviewPop } };

const periodLabelStyle: React.CSSProperties = { color: "#aaa", minWidth: 44, fontSize: 12 };

function getPeriodRowStyle(row: IMarketingReviewPop, target: "recruit" | "select" | "visit"): React.CSSProperties {
  const { status } = row;
  const isActive =
    (status === "모집중"    && target === "recruit") ||
    (status === "진행중"    && target === "select")  ||
    (status === "방문/후기" && target === "visit");
  return {
    display: "flex", gap: 6, fontSize: 12,
    color:      status === "종료" ? "#bbb" : isActive ? "#111" : "#bbb",
    fontWeight: isActive ? 500 : 400,
  };
}

export function getMarketingReviewerColumns({
  onOpenDetail,
}: {
  onOpenDetail(row: IMarketingReviewPop): void;
}) {
  return [
    { key: "id",     header: "ID",       size: 50 },
    {
      key: "status",
      header: "상태",
      size: 90,
      cell: ({ getValue }: CellInfo<MarketingStatus>) => <StatusChip status={getValue()} />,
    },
    {
      key: "title",
      header: "커버 타이틀",
      size: 200,
      cell: ({ getValue, row }: CellInfo<string>) => (
        <span
          style={{ color: "#2563eb", cursor: "pointer", fontWeight: 500 }}
          onClick={() => onOpenDetail(row.original)}
        >
          {getValue()}
        </span>
      ),
    },
    { key: "spot",    header: "스팟", size: 110 },
    { key: "region",  header: "지역", size: 100 },
    { key: "benefit", header: "혜택", size: 90  },
    {
      key: "period",
      header: "기간",
      size: 200,
      cell: ({ getValue, row }: CellInfo<IMarketingReviewPop["period"]>) => {
        const p = getValue();
        if (!p) return null;
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={getPeriodRowStyle(row.original, "recruit")}><span style={periodLabelStyle}>모집</span><span>{p.recruit}</span></div>
            <div style={getPeriodRowStyle(row.original, "select")}> <span style={periodLabelStyle}>선정</span><span>{p.select}</span></div>
            <div style={getPeriodRowStyle(row.original, "visit")}>  <span style={periodLabelStyle}>방문/후기</span><span>{p.visit}</span></div>
          </div>
        );
      },
    },
    {
      key: "apply_count",
      header: "신청/모집",
      size: 100,
      cell: ({ row }: CellInfo<number>) => (
        <span>{row.original.apply_count} / {row.original.recruit_count}</span>
      ),
    },
    {
      key: "review_done_count",
      header: "후기 완료",
      size: 100,
      cell: ({ row }: CellInfo<number>) => {
        const { review_done_count: d, recruit_count: r } = row.original;
        return (
          <span style={{ color: d === r ? "#22c55e" : "#f59e0b", fontWeight: 500 }}>
            {d} / {r}
          </span>
        );
      },
    },
    { key: "created", header: "생성일", size: 90 },
    {
      key: "home_visible",
      header: "홈 노출",
      size: 70,
      cell: ({ getValue }: CellInfo<boolean>) =>
        getValue() ? <span style={{ color: "#22c55e", fontWeight: 700 }}>✔</span> : null,
    },
    {
      key: "action",
      header: "",
      size: 60,
      cell: ({ row }: CellInfo<unknown>) => (
        <BaseMenu items={[
          { id: "edit",      label: "수정",            onClick: () => alert(`수정: ${row.original.id}`) },
          { id: "invisible", label: "홈 비노출",        onClick: () => alert(`홈 비노출: ${row.original.id}`) },
          { id: "copy",      label: "복사해서 새 체험 생성", onClick: () => alert(`체험 생성: ${row.original.id}`) },
          { id: "delete",    label: "삭제", type: "danger", onClick: () => alert(`삭제: ${row.original.id}`) },
        ]} />
      ),
    },
  ];
}
