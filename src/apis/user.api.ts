import { user } from "@/types/user.type";
import http from "@/utils/http";

type ResponseUserInfo = {
    message: string;
    data: user
};
const userApi = {
    getProfile() {
        return http.get<ResponseUserInfo>('/me');
    },
};

export default userApi;
