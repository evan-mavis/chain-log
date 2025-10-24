import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Spinner />
      <p>Loading...</p>
    </div>
  );
}
