import apiServer from "@/utlis/apis/axiosBackendHelper";
import { handleApiError } from "@/utlis/apis/errorHandler";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
const API_BASE_URL = "/doctor/get-leaves";
  try {
    const response = await apiServer.post(API_BASE_URL);

    return new NextResponse(JSON.stringify(response.data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleApiError(error);
  }
}