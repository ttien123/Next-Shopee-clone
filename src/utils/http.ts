import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS } from './storage';
import { AuthResponse } from '@/types/auth.type';
import { handleSplitAccessToken } from '@/lib/utils';

export class Http {
    instance: AxiosInstance;
    private accessToken?: string;
    private refreshToken?: string;
    private refreshTokenRequest = null;

    constructor() {
        this.refreshTokenRequest = null;

        if (typeof window !== 'undefined') {
            this.accessToken = localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : undefined;
            this.refreshToken = localStorage.getItem('refresh_token') || undefined;
        }
        this.instance = axios.create({
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'expire-access-token': 5,
                'expire-refresh-token': 60 * 60,
            },
        });

        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken && config.headers) {
                    config.headers.authorization = this.accessToken;
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
                    if (url === "/api/auth/login" || url === "/api/auth/register") {
                        const data = response.data as AuthResponse;
                        this.accessToken = handleSplitAccessToken(data.data.access_token);
                        this.refreshToken = data.data.refresh_token;
                        setAccessTokenToLS(this.accessToken);
                        setRefreshTokenToLS(this.refreshToken);
                    } else if (url === '/api/auth/logout') {
                        this.accessToken = '';
                        this.refreshToken = '';
                        clearLS();
                    }
                }
                return response;
            },
            (error: AxiosError) => {
                // Nếu có lỗi khi nhận response, bạn có thể xử lý ở đây
                if ( error.response?.status as number !== 422 && error.response?.status as number !== 401) {
                    // console.log(error);
                    const data: any | undefined = error.response?.data;
                    console.log(data, error);
                    // const message = data?.message || error.message;
                    // toast.error(message);
                }
                if (error.response) {
                    // Thí dụ xử lý lỗi 401 (Unauthorized)
                    if (error.response.status === 401) {
                        const config = error.response?.config || ({ headers: {}, url: '' } as InternalAxiosRequestConfig);
                        const { url } = config;
                        console.log('error', error);
                        
                        if ((error.response as any)?.data?.data?.name === 'EXPIRED_TOKEN' && url !== 'refresh-access-token') {
                            
                        }
                        console.error('Unauthorized, please log in again');
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    async post<ResponseType>(url: string, params?: any, options: { baseUrl?: string } = {}) {
        const baseURL = options?.baseUrl === undefined ? 'https://api-ecom.duthanhduoc.com' : options.baseUrl;
        return await this.instance.post<ResponseType>(`${baseURL}${url}`, params);
    }
    async get<ResponseType>(url: string, params?: any, options: { baseUrl?: string } = {}) {
        const baseURL = options?.baseUrl === undefined ? 'https://api-ecom.duthanhduoc.com' : options.baseUrl;
        return await this.instance.get<ResponseType>(`${baseURL}${url}`, { params });
    }
}

const http = new Http();

export default http;

