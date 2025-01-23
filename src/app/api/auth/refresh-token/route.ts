import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import authApi from "@/apis/auth.api";
import { handleSplitAccessToken } from "@/lib/utils";
import { isAxiosError } from "axios";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    return Response.json({
      message: "Không nhận được refresh token",
      status: 401,    
    }, {
      status: 401
    });
  }
  try {
    const { data } = await authApi.refreshToken({ refresh_token: refreshToken });
    const accessToken = handleSplitAccessToken(data.data.access_token)
    const decodeAccessToken = jwt.decode(accessToken) as { exp: number };
    cookieStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodeAccessToken.exp * 1000,
    });
   
    return Response.json(data);
  } catch (error: any) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    if (isAxiosError(error)) {
      return Response.json({
        status: error?.status,
        data: error?.response?.data
      }, {
        status: error?.status
      })
    } else {
      return Response.json({
        message: "Có lỗi xảy ra",
        status: 500,
      });
    }
  }
}
