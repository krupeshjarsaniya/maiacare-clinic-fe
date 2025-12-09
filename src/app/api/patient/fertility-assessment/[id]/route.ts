import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import apiServer from "@/utlis/apis/axiosBackendHelper";
import { handleApiError } from "@/utlis/apis/errorHandler";

export async function GET(req: NextRequest, context: any) {
  const id = context.params.id;
  try {
    const response = await apiServer.get(`/patient/fertility-assessment/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}
