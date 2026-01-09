import apiServer from "@/utlis/apis/axiosBackendHelper";
import { handleApiError } from "@/utlis/apis/errorHandler";
import { parseRequestBody } from "@/utlis/apis/requestHandler";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const API_BASE_URL = "/get-appointments-patient";
  try {
    const body = await parseRequestBody(req);
    const response = await apiServer.post(API_BASE_URL, body);

    return new NextResponse(JSON.stringify(response.data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
