"use client";
import DoctorListing from "@/components/DoctorListing";
import { Suspense } from "react";

function Page() {
  return (
    <div>
      {/* <h1>Appointments</h1></div> */}
      <Suspense fallback={<div>Loading...</div>}>
        <DoctorListing />
      </Suspense>
    </div>
  );
}

export default Page;
