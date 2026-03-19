import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="w-full min-h-screen grid place-content-center">
      <div className="flex gap-2 items-center">
        <Spinner />
        <p>Loading Project....</p>
      </div>
    </div>
  );
}
