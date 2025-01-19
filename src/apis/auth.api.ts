import { AuthResponse, RefreshTokenResponse } from "@/types/auth.type";
import http from "@/utils/http";

export const URL_LOGIN = '/login';
export const URL_REGISTER = '/register';
export const URL_LOGOUT = '/logout';
export const URL_REFRESH_TOKEN = '/refresh-access-token';

type FormAuth = { email: string; password: string }

const authApi = {
    register(body: FormAuth) {
        return http.post<AuthResponse>(URL_REGISTER, body);
    },
    svRegister(body: FormAuth) {
        return http.post<AuthResponse>('/api/auth/register', body, {
            baseUrl: ''
        });
    },
    login(body: FormAuth) {
        return http.post<AuthResponse>(URL_LOGIN, body);
    },
    svLogin(body: FormAuth) {
        return http.post<AuthResponse>('/api/auth/login', body, {
            baseUrl: ''
        });
    },
    svRefreshToken() {
        return http.post<AuthResponse>('/api/auth/refresh-token', {
            baseUrl: ''
        });
    },
    refreshToken(body: { refresh_token: string }) {
        return http.post<RefreshTokenResponse>('/refresh-access-token', body);
    },
    svLogout(accessToken: string) {
        return http.post<AuthResponse>('/api/auth/logout', accessToken, {
            baseUrl: '',
        });
    },
    logout(accessToken: string) {
        return http.post(URL_LOGOUT, null, { headers: {
            authorization: `Bearer ${accessToken}`
        } });
    },
    getProductDetail() {
        return http.get(`/purchases?status=0`);
    },
    // logout() {
    //     return http.post(URL_LOGOUT);
    // },
};

export default authApi;
