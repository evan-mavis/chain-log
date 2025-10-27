import StatsBar from "./components/StatsBar";

export default async function Stats({ mode }: { mode: "real" | "demo" }) {
  return (
    <>
      {mode === "demo" ? (
        <StatsBar
          className="h-full"
          data={(await import("@/app/dashboard-preview/mock-data")).demoStats}
        />
      ) : (
        <StatsBar className="h-full" />
      )}
    </>
  );
}
