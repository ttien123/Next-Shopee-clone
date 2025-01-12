import { cookies } from "next/headers";
import authApi from "@/apis/auth.api";
import { isAxiosError } from "axios";
import { handleSplitAccessToken } from "@/lib/utils";

export async function POST(request: Request) {
  const body = (await request.json()) as { email: string; password: string;};
  const cookieStore = cookies();
  try {
    const data = await authApi.login(body);
    const { access_token: accessToken, refresh_token: refreshToken, expires_refresh_token, expires } = data.data.data;
    const getRealAccessToken = handleSplitAccessToken(accessToken)
    cookieStore.set("accessToken", getRealAccessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: expires,
    });
    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: expires_refresh_token,
    });
    return Response.json(data.data);
  } catch (error) {
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
