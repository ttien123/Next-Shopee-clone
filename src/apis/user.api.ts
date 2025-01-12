import { user } from "@/types/user.type";
import http from "@/utils/http";


const userApi = {
    getProfile() {
        return http.get<user>('/me');
    },
};

export default userApi;
