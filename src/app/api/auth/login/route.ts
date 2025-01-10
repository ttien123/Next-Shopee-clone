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
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    
    // const decodeAccessToken = jwt.decode(accessToken) as { exp: number };
    // const decodeRefreshToken = jwt.decode(refreshToken) as { exp: number };
    cookieStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodeAccessToken * 1000,
    });
    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodeRefreshToken * 1000,
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
