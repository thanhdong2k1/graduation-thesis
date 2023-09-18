import axios from "axios";
import jwt_decode from "jwt-decode";
import { logginSuccess } from "../redux/authSlice";

const refreshToken = async () => {
    try {
        const res = await axios.post("/api/auth/refresh", {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
export const createAxios = (user, dispatch, stateSuccess) => {
    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(
        async (config) => {
            const decodedToken = jwt_decode(user.accessToken);
            if (decodedToken.exp < new Date().getTime() / 1000) {
                console.log("Đã kiểm tra token")
                const data = await refreshToken();
                const refreshUser = {
                    ...user.user,
                    accessToken: data.accessToken,
                };
                console.log("refreshUser", refreshUser);
                dispatch(stateSuccess(refreshUser));
                config.headers["token"] = "Bearer " + data.accessToken;
            }
            console.log("Chưa kiểm tra token")
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return axiosJWT;
};
