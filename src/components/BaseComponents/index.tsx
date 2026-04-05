import React, { useEffect, useRef, useState } from "react";

// ─── BaseModal ────────────────────────────────────────────────────────────────
interface BaseModalProps {
  isOpen: boolean;
  onHide: () => void;
  minWidth?: number;
  maxWidth?: number;
  children: React.ReactNode;
}

export function BaseModal({ isOpen, onHide, minWidth = 400, maxWidth = 600, children }: BaseModalProps) {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        zIndex: 100, display: "flex", alignItems: "center",
        justifyContent: "center", padding: 24,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onHide(); }}
    >
      <div
        style={{
          background: "#fff", borderRadius: 12, overflow: "auto",
          maxHeight: "90vh", boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          minWidth, maxWidth, width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── BaseChip ─────────────────────────────────────────────────────────────────
interface BaseChipProps {
  label: string;
  size?: "small" | "medium";
  color: string;
  background: string;
}

export function BaseChip({ label, size = "medium", color, background }: BaseChipProps) {
  const fontSize = size === "small" ? 12 : 13;
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center",
        padding: size === "small" ? "2px 8px" : "4px 10px",
        borderRadius: 99, fontSize, fontWeight: 500, color, background,
      }}
    >
      {label}
    </span>
  );
}

// ─── BaseTable ────────────────────────────────────────────────────────────────
// getValue를 any로 선언해야 각 columns 파일의 CellInfo<T> 제네릭과 호환됩니다.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ColumnDef<T> {
  key: string;
  header: string;
  size?: number;
  cell?: (info: { getValue: () => any; row: { original: T } }) => React.ReactNode;
}

interface BaseTableProps<T extends { id: number }> {
  data: T[];
  columns: ColumnDef<T>[];
  hasCheckbox?: boolean;
  checked?: number[];
  onChecked?: (ids: number[]) => void;
  isLoading?: boolean;
  totalCount?: number;
  name?: string;
}

export function BaseTable<T extends { id: number }>({
  data, columns, hasCheckbox, checked = [], onChecked, isLoading,
}: BaseTableProps<T>) {
  const allIds = data.map((r) => r.id);
  const allChecked = allIds.length > 0 && allIds.every((id) => checked.includes(id));
  const toggleAll = () => onChecked?.(allChecked ? [] : allIds);
  const toggleOne = (id: number) =>
    onChecked?.(checked.includes(id) ? checked.filter((x) => x !== id) : [...checked, id]);

  if (isLoading)
    return <div style={{ padding: 32, textAlign: "center", color: "#aaa" }}>불러오는 중...</div>;
  if (!data.length)
    return <div style={{ padding: 32, textAlign: "center", color: "#bbb" }}>데이터가 없습니다.</div>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {hasCheckbox && (
              <th style={thStyle}>
                <input type="checkbox" checked={allChecked} onChange={toggleAll} />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key} style={{ ...thStyle, width: col.size }}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} style={{ borderBottom: "1px solid #f0f0ee" }}>
              {hasCheckbox && (
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={checked.includes(row.id)}
                    onChange={() => toggleOne(row.id)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} style={{ ...tdStyle, width: col.size }}>
                  {col.cell
                    ? col.cell({ getValue: () => (row as Record<string, unknown>)[col.key], row: { original: row } })
                    : String((row as Record<string, unknown>)[col.key] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  background: "#f8f8f6", padding: "10px 12px", textAlign: "left",
  fontWeight: 500, color: "#666", borderBottom: "1px solid #e5e5e2", whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 12px", verticalAlign: "middle",
};

// ─── BaseButton ───────────────────────────────────────────────────────────────
interface BaseButtonProps {
  variant?: "primary" | "outline";
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
}

export function BaseButton({ variant = "outline", onClick, children, type = "button" }: BaseButtonProps) {
  const isPrimary = variant === "primary";
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500,
        cursor: "pointer", border: "1px solid",
        background: isPrimary ? "#111" : "#fff",
        color: isPrimary ? "#fff" : "#111",
        borderColor: isPrimary ? "#111" : "#ddd",
      }}
    >
      {children}
    </button>
  );
}

// ─── BaseMenu ─────────────────────────────────────────────────────────────────
interface BaseMenuItem {
  id: string;
  label: string;
  type?: "danger";
  onClick: () => void;
}

export function BaseMenu({ items }: { items: BaseMenuItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          background: "none", border: "1px solid #e0e0dd", borderRadius: 6,
          padding: "4px 10px", fontSize: 18, color: "#888", cursor: "pointer", lineHeight: 1,
        }}
      >
        ⋯
      </button>
      {open && (
        <div
          style={{
            position: "absolute", right: 0, top: "110%", background: "#fff",
            border: "1px solid #e5e5e2", borderRadius: 8,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 200,
            minWidth: 160, overflow: "hidden",
          }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "9px 14px", background: "none", border: "none",
                fontSize: 13, color: item.type === "danger" ? "#dc2626" : "#222", cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f3")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              onClick={() => { item.onClick(); setOpen(false); }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── BaseListHeader ───────────────────────────────────────────────────────────
interface BaseListHeaderProps<P> {
  params: P;
  totalCount: number;
  onSubmit: (params: Partial<P> & { search?: string }) => void;
  hasSearch?: boolean;
  hasDateRange?: boolean;
  placeholder?: string;
}

export function BaseListHeader<P extends { keyword?: string }>({
  totalCount, onSubmit, hasSearch, placeholder,
}: BaseListHeaderProps<P>) {
  const [input, setInput] = useState("");

  const submit = () => onSubmit({ search: input } as Partial<P> & { search: string });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 24px", flexWrap: "wrap" }}>
      <span style={{ fontSize: 13, color: "#888" }}>총 {totalCount}건</span>
      {hasSearch && (
        <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
          <input
            style={{
              border: "1px solid #ddd", borderRadius: 8, padding: "7px 12px",
              fontSize: 13, width: 220, outline: "none",
            }}
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          />
          <BaseButton variant="outline" onClick={submit}>검색</BaseButton>
        </div>
      )}
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
interface PaginationProps {
  currentPageIndex: number;
  rowsPerPage: number;
  totalLength: number;
  paginationSize?: number;
  onPageChange: (index: number) => void;
}

export function Pagination({ currentPageIndex, rowsPerPage, totalLength, onPageChange }: PaginationProps) {
  const total = Math.ceil(totalLength / rowsPerPage) || 1;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <PageBtn disabled={currentPageIndex === 0} onClick={() => onPageChange(currentPageIndex - 1)}>‹</PageBtn>
      {Array.from({ length: total }, (_, i) => (
        <PageBtn key={i} active={currentPageIndex === i} onClick={() => onPageChange(i)}>{i + 1}</PageBtn>
      ))}
      <PageBtn disabled={currentPageIndex >= total - 1} onClick={() => onPageChange(currentPageIndex + 1)}>›</PageBtn>
    </div>
  );
}

function PageBtn({ children, active, disabled, onClick }: {
  children: React.ReactNode; active?: boolean; disabled?: boolean; onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        width: 30, height: 30, border: "1px solid", borderRadius: 6, fontSize: 13,
        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        background: active ? "#111" : "#fff",
        color: active ? "#fff" : "#111",
        borderColor: active ? "#111" : "#e5e5e2",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {children}
    </button>
  );
}
