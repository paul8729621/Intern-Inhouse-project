import React from "react";
import type { VisitApplicant } from "./service";

type CellInfo<T> = { getValue: () => T; row: { original: VisitApplicant } };

interface VisitColumnsParams {
  onClickReject: (applicant: VisitApplicant) => void;
  onClickApprove: (applicantId: number) => void;
  onClickRejectDetail: (applicant: VisitApplicant) => void;
}

const borderBtn = (extra?: string): React.CSSProperties => ({
  padding: "4px 10px", borderRadius: 6, border: "1px solid",
  background: "#fff", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" as const,
  ...(extra === "primary" ? { borderColor: "#2563eb", color: "#2563eb" } : {}),
  ...(extra === "danger"  ? { borderColor: "#dc2626", color: "#dc2626" } : {}),
  ...(extra === "none"    ? { borderColor: "#ddd",    color: "#666"    } : {}),
});

export function getVisitColumns({
  onClickReject,
  onClickApprove,
  onClickRejectDetail,
}: Partial<VisitColumnsParams> = {}) {
  return [
    { key: "name",  header: "신청자",  size: 90 },
    { key: "phone", header: "전화번호", size: 120 },
    {
      key: "visitDate",
      header: "방문일",
      size: 100,
      cell: ({ getValue }: CellInfo<string | undefined>) => getValue() ?? "-",
    },
    {
      key: "visitStatus",
      header: "체험 상태",
      size: 110,
      cell: ({ getValue }: CellInfo<VisitApplicant["visitStatus"]>) => (
        <span>{getValue()}</span>
      ),
    },
    {
      key: "writtenReview",
      header: "작성 후기",
      size: 130,
      cell: ({ row }: CellInfo<unknown>) =>
        row.original.visitStatus !== "후기 등록" ? (
          <span>-</span>
        ) : (
          <button style={borderBtn("none")}>작성한 체험 후기</button>
        ),
    },
    {
      key: "reviewStatus",
      header: "후기 상태",
      size: 160,
      cell: ({ row }: CellInfo<unknown>) => {
        const { visitStatus, reviewStatus, rejectedDate, id } = row.original;

        if (reviewStatus === "반려") {
          return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 0" }}>
              <button
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textDecoration: "underline", fontSize: 13, fontWeight: 500 }}
                onClick={() => onClickRejectDetail?.(row.original)}
              >
                반려 - 재작성 대기
              </button>
              <span style={{ color: "#aaa", fontSize: 12 }}>
                {rejectedDate ? `${rejectedDate} 반려` : "반려일 미상"}
              </span>
            </div>
          );
        }

        if (reviewStatus === "검수 완료") {
          return (
            <span style={{ color: "#2563eb", fontWeight: 500, fontSize: 13 }}>
              검수 완료
            </span>
          );
        }

        if (visitStatus !== "후기 등록") return <span>-</span>;

        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
            <button style={borderBtn("primary")} onClick={() => onClickApprove?.(id)}>
              검수 완료
            </button>
            <button style={borderBtn("danger")} onClick={() => onClickReject?.(row.original)}>
              반려
            </button>
          </div>
        );
      },
    },
  ];
}
