// import apiServer from "@/utlis/apis/axiosBackendHelper";
// import { handleApiError } from "@/utlis/apis/errorHandler";
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
// const API_BASE_URL = "get-doctors-list";

//   try {
//     const response = await apiServer.get(API_BASE_URL);

//     return new NextResponse(JSON.stringify(response.data), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return handleApiError(error);
//   }
// }
import apiServer from "@/utlis/apis/axiosBackendHelper";
import { handleApiError } from "@/utlis/apis/errorHandler";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Extract query params from request URL
    const { searchParams } = new URL(req.url);

    const limit = searchParams.get("limit");
    const page = searchParams.get("page");

    const response = await apiServer.get("get-doctors-list", {
      params: {
        limit,
        page,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return handleApiError(error);
  }
}
