import { cookies } from "next/headers";
import authApi from "@/apis/auth.api";
import { FormAuthSchema } from "@/utils/rules";
import { HttpError } from "@/utils/http";

export async function POST(request: Request) {
  const body = (await request.json()) as FormAuthSchema;
  const cookieStore = cookies();
  try {
    const data = await authApi.login(body);
    const { access_token: accessToken, refresh_token: refreshToken, expires_refresh_token: decodeRefreshToken, expires: decodeAccessToken } = data.data.data;
    cookieStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: decodeAccessToken,
    });
    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: decodeRefreshToken,
    });
    return Response.json(data.data);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json({
        message: "Có lỗi xảy ra",
        status: 500,
      });
    }
  }
}
