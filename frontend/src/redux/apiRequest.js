import axios from "axios";
import {
    logginFailed,
    logginStart,
    logginSuccess,
    logoutFailed,
    logoutSuccess,
} from "./authSlice";
import {
    getCouncilsFailed,
    getCouncilsStart,
    getCouncilsSuccess,
    getDepartmentsFailed,
    getDepartmentsStart,
    getDepartmentsSuccess,
    getTopicsFailed,
    getTopicsStart,
    getTopicsSuccess,
} from "./userSlice";
import {
    getGenderFailed,
    getGenderStart,
    getGenderSuccess,
    getInformationSuccess,
} from "./adminSlice";

export const apiAuth = {
    logginUser: async ({data, dispatch, navigate}) => {
        try {
            dispatch(logginStart());
            const res = await axios.post("/api/auth/login", {
                email: data?.email,
                password: data?.password,
            });
            // console.log(res);
            if (res?.data?.errCode == 0) {
                // setShowMessage(res.data.errMessage);
                dispatch(logginSuccess(res?.data?.user));
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
    },
    logoutUser: async (user, dispatch, navigate, axiosJWT) => {
        try {
            // console.log(user.accessToken);
            const res = await axiosJWT.post(
                "/api/auth/logout",
                {},
                {
                    headers: {
                        token: "Bearer " + user?.accessToken,
                    },
                }
            );
            dispatch(logoutSuccess(res?.data?.user));
            navigate("/login");
        } catch (error) {
            dispatch(logoutFailed());
        }
    },
};

export const apiUser = {
    getAllTopics: async ({
        departmentId,
        inputSearch,
        filterSearch,
        dispatch,
    }) => {
        try {
            dispatch(getTopicsStart());
            // console.log("data api getalltopic", departmentId, offset, limit);
            const res = await axios.post("/api/user/topics", {
                departmentId: departmentId,
                inputSearch: inputSearch,
                filterSearch: filterSearch,
            });
            dispatch(getTopicsSuccess(res?.data));
        } catch (error) {
            console.log(error);
            dispatch(getTopicsFailed());
        }
    },
    getAllCouncils: async ({ inputSearch, filterSearch, dispatch }) => {
        try {
            dispatch(getCouncilsStart());
            // console.log("data api getalltopic", offset, limit);
            const res = await axios.post("/api/user/councils", {
                inputSearch: inputSearch,
                filterSearch: filterSearch,
            });
            dispatch(getCouncilsSuccess(res?.data));
        } catch (error) {
            console.log(error);
            dispatch(getCouncilsFailed());
        }
    },

    getAllDepartments: async (dispatch) => {
        try {
            dispatch(getDepartmentsStart());
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
            dispatch(getDepartmentsFailed());
        }
    },
};

export const apiAdmin = {
    apiChangePassword: async (user, oldPassword, newPassword) => {
        try {
            const res = await axios.post(
                "/api/admin/change-password",
                {
                    email: user?.email,
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                },
                {
                    headers: {
                        token: "Bearer " + user?.accessToken,
                    },
                }
            );
            return res?.data;
        } catch (error) {
            console.log(error);
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiChangeInformation: async (user, data) => {
        try {
            const res = await axios.post(
                "/api/admin/change-information",
                {
                    email: user?.email,
                    fullName: data?.fullName,
                    numberPhone: data?.numberPhone,
                    birthday: data?.birthday,
                    address: data?.address,
                    genderId: data?.gender?.value,
                    image: data?.image,
                },
                {
                    headers: {
                        token: "Bearer " + user?.accessToken,
                    },
                }
            );
            return res?.data;
        } catch (error) {
            console.log(error);
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },

    apiGetInformation: async (user, dispatch) => {
        try {
            const res = await axios.post(
                "/api/admin/get-information",
                {
                    email: user?.email,
                },
                {
                    headers: {
                        token: "Bearer " + user?.accessToken,
                    },
                }
            );
            // console.log(res);
            dispatch(getInformationSuccess(res?.data));
        } catch (error) {
            console.log(error);
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetGender: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getGenderStart());
            let code = [];
            const res = await axios.post(
                "/api/admin/get-allcode",
                {
                    type: "gender",
                },
                {
                    headers: {
                        token: "Bearer " + user?.accessToken,
                    },
                }
            );
            code = res?.data?.code.map((v) => {
                return { value: v.code, label: v.valueVi };
            });
            // console.log(res);
            dispatch(getGenderSuccess({ code }));
        } catch (error) {
            console.log(error);
            getGenderFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetHandle: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getGenderStart());
            let code = [];
            const res = await axios.post(
                "/api/admin/get-allcode",
                {
                    type: "handle",
                },
                {
                    headers: {
                        token: "Bearer " + user?.accessToken,
                    },
                }
            );
            code = res?.data?.code.map((v) => {
                return { value: v.code, label: v.valueVi };
            });
            // console.log(res);
            dispatch(getGenderSuccess({ code }));
        } catch (error) {
            console.log(error);
            getGenderFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetPosition: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getGenderStart());
            let code = [];
            const res = await axios.post(
                "/api/admin/get-allcode",
                {
                    type: "position",
                },
                {
                    headers: {
                        token: "Bearer " + user?.accessToken,
                    },
                }
            );
            code = res?.data?.code.map((v) => {
                return { value: v.code, label: v.valueVi };
            });
            // console.log(res);
            dispatch(getGenderSuccess({ code }));
        } catch (error) {
            console.log(error);
            getGenderFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetResult: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getGenderStart());
            let code = [];
            const res = await axios.post(
                "/api/admin/get-allcode",
                {
                    type: "result",
                },
                {
                    headers: {
                        token: "Bearer " + user?.accessToken,
                    },
                }
            );
            code = res?.data?.code.map((v) => {
                return { value: v.code, label: v.valueVi };
            });
            // console.log(res);
            dispatch(getGenderSuccess({ code }));
        } catch (error) {
            console.log(error);
            getGenderFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetRole: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getGenderStart());
            let code = [];
            const res = await axios.post(
                "/api/admin/get-allcode",
                {
                    type: "role",
                },
                {
                    headers: {
                        token: "Bearer " + user?.accessToken,
                    },
                }
            );
            code = res?.data?.code.map((v) => {
                return { value: v.code, label: v.valueVi };
            });
            // console.log(res);
            dispatch(getGenderSuccess({ code }));
        } catch (error) {
            console.log(error);
            getGenderFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetStatus: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getGenderStart());
            let code = [];
            const res = await axios.post(
                "/api/admin/get-allcode",
                {
                    type: "status",
                },
                {
                    headers: {
                        token: "Bearer " + user?.accessToken,
                    },
                }
            );
            code = res?.data?.code.map((v) => {
                return { value: v.code, label: v.valueVi };
            });
            // console.log(res);
            dispatch(getGenderSuccess({ code }));
        } catch (error) {
            console.log(error);
            getGenderFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    getAllCouncils: async ({ inputSearch, filterSearch, dispatch }) => {
        try {
            dispatch(getCouncilsStart());
            // console.log("data api getalltopic", offset, limit);
            const res = await axios.post("/api/admin/councils", {
                inputSearch: inputSearch,
                filterSearch: filterSearch,
            });
            dispatch(getCouncilsSuccess(res?.data));
        } catch (error) {
            console.log(error);
            dispatch(getCouncilsFailed());
        }
    },
};
