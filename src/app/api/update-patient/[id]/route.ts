// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import apiServer from "@/utlis/apis/axiosBackendHelper";
// import { handleApiError } from "@/utlis/apis/errorHandler";

// type RouteContext = { params: Promise<{ id: string }> };

// export async function PUT(_: NextRequest, { params }: RouteContext) {
//   const { id } = await params;
//   try {
//     const response = await apiServer.put(`/update-patient/${id}`);
//     return NextResponse.json(response.data);
//   } catch (error) {
//     return handleApiError(error);
//   }
// }

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import apiServer from "@/utlis/apis/axiosBackendHelper";
import { handleApiError } from "@/utlis/apis/errorHandler";

type RouteContext = { params: { id: string } };

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { id } = params;

  try {
    const body = await req.json();

    const response = await apiServer.put(`/update-patient/${id}`, body);

    return NextResponse.json(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}
