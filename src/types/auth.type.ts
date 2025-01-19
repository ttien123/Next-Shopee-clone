import { User } from './user.type';

export type AuthResponse = {
    message: string;
    data: {
        access_token: string;
        refresh_token: string;
        expires_refresh_token: number;
        expires: number;
        user: User;
    }
}

export type RefreshTokenResponse = {
    message: string;
    data: {
        access_token: string;
    }
};
