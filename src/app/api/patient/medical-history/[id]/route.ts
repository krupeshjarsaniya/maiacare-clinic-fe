import { NextResponse } from "next/server";
import apiServer from "@/utlis/apis/axiosBackendHelper";
import { handleApiError } from "@/utlis/apis/errorHandler";

// get medical history
export async function GET(req: Request, context: any) {
  const API_BASE_URL = "/patient/medical-history";
  const { id } = context.params;
  try {
    const response = await apiServer.get(`${API_BASE_URL}/${id}`);

    return new NextResponse(JSON.stringify(response.data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
