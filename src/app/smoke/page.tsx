export const runtime = "edge";

export default function SmokePage() {
  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1 style={{ margin: 0, fontSize: 18 }}>Smoke OK</h1>
      <p style={{ opacity: 0.8, marginTop: 8 }}>
        If this renders but / fails, the crash is route-specific.
      </p>
    </main>
  );
}
