import React from "react";
import MarketingReviewPopList from "./MarketingReviewPopList";
import type { IMarketingReviewPopViewProps } from "./type";

export default function MarketingReviewPopPageView(props: IMarketingReviewPopViewProps) {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f3" }}>
      <div style={{ padding: "20px 24px 0" }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: "#111" }}>체험단</h1>
      </div>
      <MarketingReviewPopList {...props} />
    </div>
  );
}
