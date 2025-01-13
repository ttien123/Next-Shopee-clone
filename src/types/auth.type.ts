import { user } from './user.type';

export type AuthResponse = {
    message: string;
    data: {
        access_token: string;
        refresh_token: string;
        expires_refresh_token: number;
        expires: number;
        user: user;
    }
}

export type RefreshTokenResponse = {
    message: string;
    data: {
        access_token: string;
    }
};
