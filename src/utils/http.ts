import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { clearLS, clearLSNoRedirect, setAccessTokenToLS, setRefreshTokenToLS } from './storage';
import { AuthResponse, RefreshTokenResponse } from '@/types/auth.type';
import { handleSplitAccessToken } from '@/lib/utils';
import { toast } from 'react-toastify';
import envConfig from '@/config';

export class Http {
    instance: AxiosInstance;
    private accessToken?: string;
    private refreshTokenRequest: Promise<string> | null;

    constructor() {
        this.refreshTokenRequest = null;
        if (typeof window !== 'undefined') {
            this.accessToken = localStorage.getItem('access_token') || undefined;
        }
        this.instance = axios.create({
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'expire-access-token': 15,
                'expire-refresh-token': 60 * 60,
            },
        });

        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken && config.headers) {
                    config.headers.authorization = `Bearer ${this.accessToken}`;
                    return config;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        // Thêm Interceptor cho Response
        this.instance.interceptors.response.use(
            (response) => {
                if (typeof window !== 'undefined') {
                    const { url } = response.config;
                    if (url === '/api/auth/login' || url === '/api/auth/register') {
                        const data = response.data as AuthResponse;
                        const accessToken = handleSplitAccessToken(data.data.access_token);
                        this.accessToken = accessToken;
                        setAccessTokenToLS(accessToken);
                        setRefreshTokenToLS(data.data.refresh_token);
                    } else if (url === '/api/auth/logout') {
                        this.accessToken = '';
                        clearLSNoRedirect();
                    }
                }
                return response;
            },
            async (error: AxiosError) => {
                // Nếu có lỗi khi nhận response, bạn có thể xử lý ở đây
                if (typeof window !== 'undefined') {
                    if ((error.response?.status as number) !== 422 && (error.response?.status as number) !== 401) {
                        // console.log(error);
                        const data: any | undefined = error.response?.data;
                        console.log(data, error);
                        const message = data?.message || error.message;
                        toast.error(message);
                    }
                    if (error.response) {
                        // Thí dụ xử lý lỗi 401 (Unauthorized)
                        if (error.response.status === 401) {
                            const config =
                                error.response?.config || ({ headers: {}, url: '' } as InternalAxiosRequestConfig);
                            const { url } = config;
                            if (
                                (error.response as any)?.data?.data?.name === 'EXPIRED_TOKEN' &&
                                url !== '/refresh-access-token'
                            ) {
                                this.refreshTokenRequest = this.refreshTokenRequest
                                    ? this.refreshTokenRequest
                                    : this.handleRefreshToken().finally(() => {
                                          setTimeout(() => {
                                              this.refreshTokenRequest = null;
                                          }, 10000);
                                      });
                                return this.refreshTokenRequest.then((accessToken) => {
                                    return this.instance({
                                        ...config,
                                        headers: { ...config.headers, authorization: `Bearer ${accessToken}` },
                                    });
                                });
                            }
                            if (typeof window !== 'undefined') {
                                return this.instance.post('/api/auth/logout', this.accessToken || '').then(() => {
                                    clearLS();
                                });
                            }
                        }
                    }
                }
                return Promise.reject(error);
            },
        );
    }

    async post<ResponseType>(url: string, params?: any, options: { baseUrl?: string; headers?: any } = {}) {
        const baseURL = options?.baseUrl === undefined ? `${envConfig.NEXT_PUBLIC_API_ENDPOINT}` : options.baseUrl;
        const configHeader = {
            headers: {
                ...options?.headers,
            },
        };
        return await this.instance.post<ResponseType>(`${baseURL}${url}`, params || undefined, configHeader);
    }
    async get<ResponseType>(url: string, params?: any, options: { baseUrl?: string; headers?: any } = {}) {
        const baseURL = options?.baseUrl === undefined ? `${envConfig.NEXT_PUBLIC_API_ENDPOINT}` : options.baseUrl;
        const configHeader = {
            headers: {
                ...options?.headers,
            },
        };
        return await this.instance.get<ResponseType>(`${baseURL}${url}`, { params, ...configHeader });
    }
    async put<ResponseType>(url: string, params?: any, options: { baseUrl?: string; headers?: any } = {}) {
        const baseURL = options?.baseUrl === undefined ? `${envConfig.NEXT_PUBLIC_API_ENDPOINT}` : options.baseUrl;
        const configHeader = {
            headers: {
                ...options?.headers,
            },
        };
        return await this.instance.put<ResponseType>(`${baseURL}${url}`, params || undefined, configHeader);
    }
    async delete<ResponseType>(url: string, params?: any, options: { baseUrl?: string; headers?: any } = {}) {
        const baseURL = options?.baseUrl === undefined ? `${envConfig.NEXT_PUBLIC_API_ENDPOINT}` : options.baseUrl;
        const configHeader = {
            headers: {
                ...options?.headers,
            },
        };
        return await this.instance.delete<ResponseType>(`${baseURL}${url}`, { ...params, ...configHeader });
    }

    private async handleRefreshToken() {
        return this.instance.post<RefreshTokenResponse>('/api/auth/refresh-token').then((res) => {
            const { access_token } = res.data.data;
            const accessToken = handleSplitAccessToken(access_token);
            setAccessTokenToLS(accessToken);
            this.accessToken = accessToken;
            return accessToken;
        });
    }
}

const http = new Http();

export default http;
