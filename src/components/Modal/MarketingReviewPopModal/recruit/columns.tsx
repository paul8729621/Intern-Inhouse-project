import type { Applicant } from "../type";

type CellInfo<T> = { getValue: () => T; row: { original: Applicant } };

export function getApplicantColumns({
  onSelect,
  onCancelSelect,
}: {
  onSelect(id: number): void;
  onCancelSelect(id: number): void;
}) {
  return [
    { key: "name",  header: "신청자",  size: 120 },
    {
      key: "blogUrl",
      header: "블로그",
      size: 120,
      cell: ({ getValue }: CellInfo<string | undefined>) =>
        getValue() ? (
          <a href={getValue()} target="_blank" rel="noopener noreferrer">블로그 보기</a>
        ) : "-",
    },
    { key: "phone",   header: "전화번호", size: 140 },
    { key: "content", header: "신청글",   size: 240 },
    {
      key: "selected",
      header: "상태",
      size: 100,
      cell: ({ row }: CellInfo<boolean>) =>
        row.original.selected ? (
          <button
            style={{ padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer", border: "1px solid #dc2626", color: "#dc2626", background: "#fef2f2" }}
            onClick={() => onCancelSelect(row.original.id)}
          >
            선정취소
          </button>
        ) : (
          <button
            style={{ padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer", border: "1px solid #2563eb", color: "#2563eb", background: "#eff6ff" }}
            onClick={() => onSelect(row.original.id)}
          >
            선정
          </button>
        ),
    },
  ];
}
