import axios from "axios";
import {
    logginFailed,
    logginSuccess,
    logoutFailed,
    logoutSuccess,
} from "./authSlice";
import { getDepartmentsSuccess, getTopicsSuccess } from "./userSlice";

export const logginUser = async (user, dispatch, navigate) => {
    try {
        // console.log(user);
        const res = await axios.post("/api/auth/login", {
            email: user.email,
            password: user.password,
        });
        // console.log(res);
        if (res.data.errCode == 0) {
            // setShowMessage(res.data.errMessage);
            dispatch(logginSuccess(res.data.user));
            navigate(
                `/${
                    res.data?.user?.roleId == "R1"
                        ? "admin"
                        : res.data?.user?.roleId == "R2"
                        ? "secretary"
                        : res.data?.user?.roleId == "R3"
                        ? "lecturer"
                        : res.data?.user?.roleId == "R4"
                        ? "student"
                        : ""
                }`
            );
        } else {
            // setShowMessage(res?.data?.errMessage);
        }
    } catch (error) {
        dispatch(logginFailed());
        // setShowMessage(res?.res?.data?.errMessage);
    }
};
export const logoutUser = async (user, dispatch, navigate, axiosJWT) => {
    try {
        // console.log(user.accessToken);
        const res = await axiosJWT.post(
            "/api/auth/logout",
            {},
            {
                headers: {
                    token: "Bearer " + user.accessToken,
                },
            }
        );
        dispatch(logoutSuccess(res.data.user));
        navigate("/login");
    } catch (error) {
        dispatch(logoutFailed());
    }
};

export const getAllTopics = async (
    departmentId,
    inputSearch,
    offset,
    limit,
    dispatch
) => {
    try {
        console.log("data api getalltopic", departmentId, offset, limit);
        const res = await axios.post("/api/user/topics", {
            departmentId: departmentId,
            inputSearch: inputSearch,
            offset: offset,
            limit: limit,
        });
        dispatch(getTopicsSuccess(res?.data));
    } catch (error) {
        console.log(error);
    }
};

export const getAllDepartments = async (dispatch) => {
    try {
        let options = [];
        const res = await axios.post("/api/user/departments");
        options = res?.data?.departments.map((v) => {
            return { value: v.id, label: v.name };
        });
        // console.log("option",options)
        dispatch(
            getDepartmentsSuccess({
                errCode: res?.data?.errCode,
                departments: options,
            })
        );
    } catch (error) {
        console.log(error);
    }
};
