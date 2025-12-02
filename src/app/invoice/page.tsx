"use client";
import Invoice from "@/components/Invoice";

import React, { Suspense, useEffect } from "react";

export default function page() {
  return (
    <>
      <Suspense fallback={<div>Loading invoice...</div>}>
        <Invoice />
      </Suspense>
    </>
  );
}
