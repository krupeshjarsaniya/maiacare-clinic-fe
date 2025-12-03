"use client";
import EditDoctor from "@/components/EditDoctor";

import React, { Suspense } from "react";


export default function page() {

  return (
    <div>
      <Suspense fallback={<div>Loading edit doctor...</div>}>
        <EditDoctor />
      </Suspense>
    </div>
  );
}
