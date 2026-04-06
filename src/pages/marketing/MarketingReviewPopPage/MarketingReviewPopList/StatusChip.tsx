import type { MarketingStatus } from "../../../../components/Modal/MarketingReviewPopModal/type";

const STATUS_STYLE_MAP: Record<MarketingStatus, { color: string; background: string }> = {
  "모집중":    { color: "#15803d", background: "#dcfce7" },
  "진행중":    { color: "#1d4ed8", background: "#dbeafe" },
  "방문/후기": { color: "#c2410c", background: "#ffedd5" },
  "종료":      { color: "#6b7280", background: "#f3f4f6" },
};

export default function StatusChip({ status }: { status: MarketingStatus }) {
  const s = STATUS_STYLE_MAP[status];
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center",
        padding: "2px 8px", borderRadius: 99,
        fontSize: 12, fontWeight: 500,
        color: s.color, background: s.background,
      }}
    >
      {status}
    </span>
  );
}
