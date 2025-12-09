import { NextResponse } from "next/server";
import apiServer from "@/utlis/apis/axiosBackendHelper";
import { parseRequestBody } from "@/utlis/apis/requestHandler";
import { handleApiError } from "@/utlis/apis/errorHandler";

export async function PUT(req: Request) {
  const BASE_URL = "/update-doctor";

  try {
    // ✅ Parse the body once (let parseRequestBody handle it)
    const body = await parseRequestBody(req);
    console.log("body", body);  
    const response = await apiServer.put(BASE_URL, body);
    return new NextResponse(JSON.stringify(response.data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error parsing or updating profile:", error);
    return handleApiError(error);
  }
}