"use client";

import * as React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Cloudflare Pages Functions logs should capture this.
    console.error("Global app error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", padding: 24 }}>
        <h1 style={{ fontSize: 20, margin: 0 }}>Something went wrong</h1>
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
      </body>
    </html>
  );
}
