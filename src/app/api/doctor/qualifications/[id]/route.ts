import { NextResponse } from "next/server";
import apiServer from "@/utlis/apis/axiosBackendHelper";
import { parseRequestBody } from "@/utlis/apis/requestHandler";
import { handleApiError } from "@/utlis/apis/errorHandler";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: RouteContext) {
  const { id } = await params;
  const BASE_URL = `/doctor/qualifications-add/${id}`;
  try {
    const body = await parseRequestBody(req);
    const response = await apiServer.post(BASE_URL, body);
    return new NextResponse(JSON.stringify(response.data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: RouteContext) {
  const { id } = await params;
  const BASE_URL = `/doctor/qualifications-edit/${id}`;

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
export async function DELETE(_: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const response = await apiServer.delete(
      `/doctor/qualifications-delete/${id}`
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error deleting qualification:", error);
    return handleApiError(error);
  }
}
