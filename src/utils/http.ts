import axios, { AxiosInstance } from 'axios';

export class HttpError extends Error {
    status: number
    payload: {
      message: string
      [key: string]: any
    }
    constructor({ status, payload, message = 'Lỗi HTTP' }: { status: number; payload: any, message?: string }) {
      super(message)
      this.status = status
      this.payload = payload
    }
}

export class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'expire-access-token': 5,
                'expire-refresh-token': 60 * 60,
            },
        });
    }

    async post<ResponseType>(url: string, params?: any, options: { baseUrl?: string } = {}) {
        const baseURL = options?.baseUrl === undefined ? 'https://api-ecom.duthanhduoc.com' : options.baseUrl;
        return await this.instance.post<ResponseType>(`${baseURL}${url}`, params);
    }
}

const http = new Http();

export default http;

