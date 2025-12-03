import Doctor from "@/components/Doctor";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading doctors...</div>}>
        <Doctor />
      </Suspense>
    </div>
  );
}
