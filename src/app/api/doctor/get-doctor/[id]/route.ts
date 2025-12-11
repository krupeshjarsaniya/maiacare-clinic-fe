import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import apiServer from "@/utlis/apis/axiosBackendHelper";
import { handleApiError } from "@/utlis/apis/errorHandler";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  try {
    const response = await apiServer.get(`/get-doctor/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}
