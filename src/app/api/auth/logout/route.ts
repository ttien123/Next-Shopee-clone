import authApi from "@/apis/auth.api";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = (await request.json()) as string;
  
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  if (!refreshToken) {
    return Response.json(
      {
        message: "Không nhận được access token hoặc refresh token",
      },
      {
        status: 200,
      }
    );
  }
  try {
    const result = await authApi.logout(body);

    return Response.json(result.data);
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "Lỗi khi gọi API đến server backend",
      status: 200,
    });
  }
}
