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
    getAdminBlocksFailed,
    getAdminBlocksStart,
    getAdminBlocksSuccess,
    getAdminClassesFailed,
    getAdminClassesStart,
    getAdminClassesSuccess,
    getAdminCouncilsFailed,
    getAdminCouncilsStart,
    getAdminCouncilsSuccess,
    getAdminDepartmentsFailed,
    getAdminDepartmentsStart,
    getAdminDepartmentsSuccess,
    getAdminEvaluationMethodsFailed,
    getAdminEvaluationMethodsStart,
    getAdminEvaluationMethodsSuccess,
    getAdminLecturersFailed,
    getAdminLecturersStart,
    getAdminLecturersSuccess,
    getAdminMajorsFailed,
    getAdminMajorsStart,
    getAdminMajorsSuccess,
    getAdminThesisSessionsFailed,
    getAdminThesisSessionsStart,
    getAdminThesisSessionsSuccess,
    getGenderFailed,
    getGenderStart,
    getGenderSuccess,
    getInformationSuccess,
    getPermissionsFailed,
    getPermissionsStart,
    getPermissionsSuccess,
    getRoleFailed,
    getRoleStart,
    getRoleSuccess,
    getStatusFailed,
    getStatusStart,
    getStatusSuccess,
} from "./adminSlice";
import { toast } from "react-toastify";

export const apiAuth = {
    logginUser: async ({ data, dispatch, navigate }) => {
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
                return res?.data;
            } else {
                dispatch(logginFailed());
                return res?.data;
            }
        } catch (error) {
            console.log(error);
            dispatch(logginFailed());
            return error?.response?.data;
            // setShowMessage(res?.res?.data?.errMessage);
        }
    },
    logoutUser: async (user, dispatch, navigate, axiosJWT) => {
        try {
            // console.log(user.accessToken);
            const res = await axiosJWT.post("/api/auth/logout", user, {
                headers: {
                    token: "Bearer " + user?.accessToken,
                },
            });
            dispatch(logoutSuccess(res?.data?.user));
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
    apiChangePassword: async (user, oldPassword, newPassword, axiosJWT) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/change-password",
                {
                    email: user?.email,
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiChangeInformation: async (user, data, axiosJWT) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/change-information",
                {
                    email: user?.email,
                    fullName: data?.fullName,
                    numberPhone: data?.numberPhone,
                    birthday: data?.birthday,
                    address: data?.address,
                    genderId: data?.gender?data?.gender[0]?.value?data?.gender[0]?.value:data?.gender?.value:null,
                    image: data?.image,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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

    apiGetInformation: async (user, dispatch, axiosJWT) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/get-information",
                {
                    email: user?.email,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
            const res = await axiosJWT.post(
                "/api/admin/get-allcode",
                {
                    type: "gender",
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            code = res?.data?.code.map((v) => {
                return { value: v.code, label: `${v.code} | ${v.valueVi}` };
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
            const res = await axiosJWT.post(
                "/api/admin/get-allcode",
                {
                    type: "handle",
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            code = res?.data?.code.map((v) => {
                return { value: v.code, label: `${v.code} | ${v.valueVi}` };
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
            const res = await axiosJWT.post(
                "/api/admin/get-allcode",
                {
                    type: "position",
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            code = res?.data?.code.map((v) => {
                return { value: v.code, label: `${v.code} | ${v.valueVi}` };
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
            const res = await axiosJWT.post(
                "/api/admin/get-allcode",
                {
                    type: "result",
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            code = res?.data?.code.map((v) => {
                return { value: v.code, label: `${v.code} | ${v.valueVi}` };
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
            dispatch(getRoleStart());
            let code = [];
            const res = await axiosJWT.post(
                "/api/admin/get-allcode",
                {
                    type: "role",
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            code = res?.data?.code.map((v) => {
                return { value: v.code, label: `${v.code} | ${v.valueVi}` };
            });
            // console.log(res);
            dispatch(getRoleSuccess({ code }));
        } catch (error) {
            console.log(error);
            getRoleFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetStatus: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getStatusStart());
            let code = [];
            const res = await axiosJWT.post(
                "/api/admin/get-allcode",
                {
                    type: "status",
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            code = res?.data?.code.map((v) => {
                return { value: v.code, label: `${v.code} | ${v.valueVi}` };
            });
            // console.log(res);
            dispatch(getStatusSuccess({ code }));
        } catch (error) {
            console.log(error);
            getStatusFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetPermissions: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getPermissionsStart());
            let code = [];
            const res = await axiosJWT.post(
                "/api/admin/get-allcode",
                {
                    type: "permission",
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            code = res?.data?.code.map((v) => {
                return { value: v.code, label: `${v.valueVi}` };
            });
            // console.log(res);
            dispatch(getPermissionsSuccess({ code }));
        } catch (error) {
            console.log(error);
            getPermissionsFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },

    // Api Council
    getAllCouncils: async ({
        user,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getAdminCouncilsStart());
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/councils",
                {
                    inputSearch: inputSearch,
                    filterSearch: filterSearch,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            dispatch(getAdminCouncilsSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getAdminCouncilsFailed());
        }
    },
    getCouncilById: async ({ user, id, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.get(`/api/admin/council/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    importCouncils: async ({ user, data, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/import-councils",
                {
                    data: data,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            return res?.data;
        } catch (error) {
            console.log(error?.response?.data);
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiAddCouncil: async ({ user, data, axiosJWT }) => {
        try {
            console.log("data Add", {
                name: data?.name,
                description: data?.description,
                statusId: data?.status?data?.status[0]?.value?data?.status[0]?.value:data?.status?.value:null,
                thesisSessionId: data?.thesisSession?data?.thesisSession[0]?.value?data?.thesisSession[0]?.value:data?.thesisSession?.value:null,
            });
            const res = await axiosJWT.post(
                "/api/admin/create-council",
                {
                    name: data?.name,
                    description: data?.description,
                    statusId: data?.status?data?.status[0]?.value?data?.status[0]?.value:data?.status?.value:null,
                    thesisSessionId: data?.thesisSession?data?.thesisSession[0]?.value?data?.thesisSession[0]?.value:data?.thesisSession?.value:null,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiUpdateCouncil: async ({ user, data, axiosJWT }) => {
        try {
            console.log("data Add", {
                name: data?.name,
                description: data?.description,
                statusId: data?.status?data?.status[0]?.value?data?.status[0]?.value:data?.status?.value:null,
                thesisSessionId: data?.thesisSession?data?.thesisSession[0]?.value?data?.thesisSession[0]?.value:data?.thesisSession?.value:null,
            });
            const res = await axiosJWT.put(
                `/api/admin/update-council/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                    statusId: data?.status?data?.status[0]?.value?data?.status[0]?.value:data?.status?.value:null,
                    thesisSessionId: data?.thesisSession?data?.thesisSession[0]?.value?data?.thesisSession[0]?.value:data?.thesisSession?.value:null,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiDeleteCouncil: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.delete(
                `/api/admin/delete-council/${data.id}`,
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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

    // Api Department
    getAllDepartments: async ({
        user,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getAdminDepartmentsStart());
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/departments",
                {
                    inputSearch: inputSearch,
                    filterSearch: filterSearch,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            dispatch(getAdminDepartmentsSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getAdminDepartmentsFailed());
        }
    },
    getDepartmentById: async ({ user, id, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.get(`/api/admin/department/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    importDepartments: async ({ user, data, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/import-departments",
                {
                    data: data,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            return res?.data;
        } catch (error) {
            console.log(error?.response?.data);
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiAddDepartment: async ({ user, data, axiosJWT }) => {
        try {
            console.log("data Add", {
                name: data?.name,
                description: data?.description,
                founding: data?.founding,
                deanId: data?.dean?data?.dean[0]?.value?data?.dean[0]?.value:data?.dean?.value:null,
            });
            const res = await axiosJWT.post(
                "/api/admin/create-department",
                {
                    name: data?.name,
                    description: data?.description,
                    founding: data?.founding,
                    deanId: data?.dean?data?.dean[0]?.value?data?.dean[0]?.value:data?.dean?.value:null,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiUpdateDepartment: async ({ user, data, axiosJWT }) => {
        try {
            console.log("data Add", {
                name: data?.name,
                description: data?.description,
                founding: data?.founding,
                deanId: data?.dean?data?.dean[0]?.value?data?.dean[0]?.value:data?.dean?.value:null,
            });
            const res = await axiosJWT.put(
                `/api/admin/update-department/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                    founding: data?.founding,
                    deanId: data?.dean?data?.dean[0]?.value?data?.dean[0]?.value:data?.dean?.value:null,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiDeleteDepartment: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.delete(
                `/api/admin/delete-department/${data.id}`,
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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

    // Api Lecturer
    getAllLecturers: async ({
        user,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getAdminLecturersStart());
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/lecturers",
                {
                    inputSearch: inputSearch,
                    filterSearch: filterSearch,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            dispatch(getAdminLecturersSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getAdminLecturersFailed());
        }
    },
    getLecturerById: async ({ user, id, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.get(`/api/admin/lecturer/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    importLecturers: async ({ user, data, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/import-lecturers",
                {
                    data: data,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            return res?.data;
        } catch (error) {
            console.log(error?.response?.data);
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiAddLecturer: async ({ user, data, axiosJWT }) => {
        try {
            console.log("data Add", {
                email: data?.email,
                fullName: data?.fullName,
                numberPhone: data?.numberPhone,
                address: data?.address,
                birthday: data?.birthday,
                genderId: data?.gender?data?.gender[0]?.value?data?.gender[0]?.value:data?.gender?.value:null,
                code: data?.code,
                roleId: data?.role?data?.role[0]?.value?data?.role[0]?.value:data?.role?.value:null,
                departmentId: data?.department?data?.department?.value?data?.department[0]?.value:data?.department?.value:null,
                statusId: data?.status?data?.status[0]?.value?data?.status[0]?.value:data?.status?.value:null,
                permissions: data?.permissions,
            });
            const res = await axiosJWT.post(
                "/api/admin/create-lecturer",
                {
                    email: data?.email,
                    fullName: data?.fullName,
                    numberPhone: data?.numberPhone,
                    address: data?.address,
                    birthday: data?.birthday,
                    genderId: data?.gender?data?.gender[0]?.value?data?.gender[0]?.value:data?.gender?.value:null,
                    code: data?.code,
                    roleId: data?.role?data?.role[0]?.value?data?.role[0]?.value:data?.role?.value:null,
                    departmentId: data?.department?data?.department[0]?.value?data?.department[0]?.value:data?.department?.value:null,
                    statusId: data?.status?data?.status[0]?.value?data?.status[0]?.value:data?.status?.value:null,
                    permissions: data?.permissions,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiUpdateLecturer: async ({ user, data, axiosJWT }) => {
        try {
            console.log("data Add", {
                email: data?.email,
                fullName: data?.fullName,
                numberPhone: data?.numberPhone,
                address: data?.address,
                birthday: data?.birthday,
                genderId: data?.gender?data?.gender[0]?.value?data?.gender[0]?.value:data?.gender?.value:null,
                code: data?.code[0],
                roleId: data?.role?data?.role[0]?.value?data?.role[0]?.value:data?.role?.value:null,
                departmentId: data?.department?data?.department[0]?.value?data?.department[0]?.value:data?.department?.value:null,
                statusId: data?.status?data?.status[0]?.value?data?.status[0]?.value:data?.status?.value:null,
                permissions: data?.permissions,
            });
            const res = await axiosJWT.put(
                `/api/admin/update-lecturer/${data.id}`,
                {
                    email: data?.email,
                    fullName: data?.fullName,
                    numberPhone: data?.numberPhone,
                    address: data?.address,
                    birthday: data?.birthday,
                    genderId: data?.gender?data?.gender[0]?.value?data?.gender[0]?.value:data?.gender?.value:null,
                    code: data?.code[0],
                    roleId: data?.role?data?.role[0]?.value?data?.role[0]?.value:data?.role?.value:null,
                    departmentId: data?.department?data?.department[0]?.value?data?.department[0]?.value:data?.department?.value:null,
                    statusId: data?.status?data?.status[0]?.value?data?.status[0]?.value:data?.status?.value:null,
                    permissions: data?.permissions,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiDeleteLecturer: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.delete(
                `/api/admin/delete-lecturer/${data.id}`,
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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

    // Api Block
    getAllBlocks: async ({
        user,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getAdminBlocksStart());
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/blocks",
                {
                    inputSearch: inputSearch,
                    filterSearch: filterSearch,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            dispatch(getAdminBlocksSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getAdminBlocksFailed());
        }
    },
    getBlockById: async ({ user, id, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.get(`/api/admin/block/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    importBlocks: async ({ user, data, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/import-blocks",
                {
                    data: data,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            return res?.data;
        } catch (error) {
            console.log(error?.response?.data);
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiAddBlock: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/create-block",
                {
                    name: data?.name,
                    description: data?.description,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiUpdateBlock: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.put(
                `/api/admin/update-block/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiDeleteBlock: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.delete(
                `/api/admin/delete-block/${data.id}`,
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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

    // Api EvaluationMethod
    getAllEvaluationMethods: async ({
        user,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getAdminEvaluationMethodsStart());
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/evaluation-methods",
                {
                    inputSearch: inputSearch,
                    filterSearch: filterSearch,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            dispatch(getAdminEvaluationMethodsSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getAdminEvaluationMethodsFailed());
        }
    },
    getEvaluationMethodById: async ({ user, id, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.get(
                `/api/admin/evaluation-method/${id}`,
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    importEvaluationMethods: async ({ user, data, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/import-evaluation-methods",
                {
                    data: data,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            return res?.data;
        } catch (error) {
            console.log(error?.response?.data);
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiAddEvaluationMethod: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/create-evaluation-method",
                {
                    name: data?.name,
                    description: data?.description,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiUpdateEvaluationMethod: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.put(
                `/api/admin/update-evaluation-method/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiDeleteEvaluationMethod: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.delete(
                `/api/admin/delete-evaluation-method/${data.id}`,
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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

    // Api Major
    getAllMajors: async ({
        user,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getAdminMajorsStart());
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/majors",
                {
                    inputSearch: inputSearch,
                    filterSearch: filterSearch,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            dispatch(getAdminMajorsSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getAdminMajorsFailed());
        }
    },
    getMajorById: async ({ user, id, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.get(`/api/admin/major/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    importMajors: async ({ user, data, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/import-majors",
                {
                    data: data,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            return res?.data;
        } catch (error) {
            console.log(error?.response?.data);
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiAddMajor: async ({ user, data, axiosJWT }) => {
        try {
            console.log("data Add", {
                name: data?.name,
                description: data?.description,
                departmentId: data?.department?data?.department[0]?.value?data?.department[0]?.value:data?.department?.value:null,
            });
            const res = await axiosJWT.post(
                "/api/admin/create-major",
                {
                    name: data?.name,
                    description: data?.description,
                    departmentId: data?.department?data?.department[0]?.value?data?.department[0]?.value:data?.department?.value:null,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiUpdateMajor: async ({ user, data, axiosJWT }) => {
        try {
            console.log("data Add", {
                name: data?.name,
                description: data?.description,
                founding: data?.founding,
                departmentId: data?.department?data?.department[0]?.value?data?.department[0]?.value:data?.department?.value:null,
            });
            const res = await axiosJWT.put(
                `/api/admin/update-major/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                    departmentId: data?.department?data?.department[0]?.value?data?.department[0]?.value:data?.department?.value:null,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiDeleteMajor: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.delete(
                `/api/admin/delete-major/${data.id}`,
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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

    // Api Class
    getAllClasses: async ({
        user,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getAdminClassesStart());
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/classes",
                {
                    inputSearch: inputSearch,
                    filterSearch: filterSearch,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            dispatch(getAdminClassesSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getAdminClassesFailed());
        }
    },
    getClassById: async ({ user, id, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.get(`/api/admin/class/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    importClasses: async ({ user, data, axiosJWT }) => {
        try {
            // console.log("data api getalltopic", offset, limit);
            const res = await axiosJWT.post(
                "/api/admin/import-classes",
                {
                    data: data,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            return res?.data;
        } catch (error) {
            console.log(error?.response?.data);
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiAddClass: async ({ user, data, axiosJWT }) => {
        try {
            console.log("data Add", {
                name: data?.name,
                description: data?.description,
                majorId: data?.major?data?.major[0]?.value?data?.major[0]?.value:data?.major?.value:null,
                blockId: data?.block?data?.block[0]?.value?data?.block[0]?.value:data?.block?.value:null,
            });
            const res = await axiosJWT.post(
                "/api/admin/create-class",
                {
                    name: data?.name,
                    description: data?.description,
                    majorId: data?.major?data?.major[0]?.value?data?.major[0]?.value:data?.major?.value:null,
                    blockId: data?.block?data?.block[0]?.value?data?.block[0]?.value:data?.block?.value:null,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiUpdateClass: async ({ user, data, axiosJWT }) => {
        try {
            console.log("data Add", {
                name: data?.name,
                description: data?.description,
                founding: data?.founding,
                majorId: data?.major?data?.major[0]?.value?data?.major[0]?.value:data?.major?.value:null,
                blockId: data?.block?data?.block[0]?.value?data?.block[0]?.value:data?.block?.value:null,
            });
            const res = await axiosJWT.put(
                `/api/admin/update-class/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                    majorId: data?.major?data?.major[0]?.value?data?.major[0]?.value:data?.major?.value:null,
                    blockId: data?.block?data?.block[0]?.value?data?.block[0]?.value:data?.block?.value:null,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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
    apiDeleteClass: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.delete(
                `/api/admin/delete-class/${data.id}`,
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
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

    // Api ThesisSession
    getAllThesisSession: async ({
        user,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getAdminThesisSessionsStart());
            // console.log("data api getalltopic", offset, limit);
            let code = [];
            const res = await axiosJWT.post(
                "/api/admin/thesis-session",
                {
                    inputSearch: inputSearch,
                    filterSearch: filterSearch,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            // console.log(res);
            // dispatch(getStatusSuccess({ code }));
            dispatch(getAdminThesisSessionsSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getAdminThesisSessionsFailed());
        }
    },
};
