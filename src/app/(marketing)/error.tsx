"use client";

import * as React from "react";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Marketing route error:", error);
  }, [error]);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1 style={{ fontSize: 20, margin: 0 }}>Marketing page error</h1>
      <p style={{ opacity: 0.8 }}>
        {error?.message || "Unknown error"}
        {error?.digest ? ` (digest: ${error.digest})` : ""}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
