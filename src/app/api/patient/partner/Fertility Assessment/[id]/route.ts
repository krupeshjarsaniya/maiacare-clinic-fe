import { NextResponse } from "next/server";
import apiServer from "@/utlis/apis/axiosBackendHelper";
// import { parseRequestBody } from "@/utils/apis/requestHandler";
import { handleApiError } from "@/utlis/apis/errorHandler";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: RouteContext) {
  const API_BASE_URL = "/patient/partner/fertilityAssessment";
  const { id } = await params;
  try {
    // const response = await apiServer.get(`API_BASE_URL,`);
    const response = await apiServer.get(`${API_BASE_URL}/${id}`);

    return new NextResponse(JSON.stringify(response.data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
