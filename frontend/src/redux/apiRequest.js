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
    getAdminEvaluationCriteriasFailed,
    getAdminEvaluationCriteriasStart,
    getAdminEvaluationCriteriasSuccess,
    getAdminEvaluationMethodsFailed,
    getAdminEvaluationMethodsStart,
    getAdminEvaluationMethodsSuccess,
    getAdminLecturersFailed,
    getAdminLecturersStart,
    getAdminLecturersSuccess,
    getAdminMajorsFailed,
    getAdminMajorsStart,
    getAdminMajorsSuccess,
    getAdminStudentsFailed,
    getAdminStudentsStart,
    getAdminStudentsSuccess,
    getAdminThesesFailed,
    getAdminThesesStart,
    getAdminThesesSuccess,
    getAdminThesisSessionsFailed,
    getAdminThesisSessionsStart,
    getAdminThesisSessionsSuccess,
    getAdminTopicsFailed,
    getAdminTopicsStart,
    getAdminTopicsSuccess,
    getGenderFailed,
    getGenderStart,
    getGenderSuccess,
    getHandleFailed,
    getHandleStart,
    getHandleSuccess,
    getInformationSuccess,
    getPermissionsFailed,
    getPermissionsStart,
    getPermissionsSuccess,
    getPositionFailed,
    getPositionStart,
    getPositionSuccess,
    getResultFailed,
    getResultStart,
    getResultSuccess,
    getRoleFailed,
    getRoleStart,
    getRoleSuccess,
    getStatusFailed,
    getStatusStart,
    getStatusSuccess,
} from "./adminSlice";
import { toast } from "react-toastify";
import {
    getInformationStudentSuccess,
    getStudentLecturersFailed,
    getStudentLecturersStart,
    getStudentLecturersSuccess,
    getStudentThesesFailed,
    getStudentThesesStart,
    getStudentThesesSuccess,
    getStudentTopicsFailed,
    getStudentTopicsStart,
    getStudentTopicsSuccess,
} from "./studentSlice";

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
    apiAdminChangePassword: async (
        user,
        oldPassword,
        newPassword,
        axiosJWT
    ) => {
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
    apiAdminChangeInformation: async (user, data, axiosJWT) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/change-information",
                {
                    email: user?.email,
                    fullName: data?.fullName,
                    numberPhone: data?.numberPhone,
                    birthday: data?.birthday,
                    address: data?.address,
                    genderId: data?.gender
                        ? data?.gender[0]?.value
                            ? data?.gender[0]?.value
                            : data?.gender?.value
                        : null,
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

    apiAdminGetInformation: async (user, dispatch, axiosJWT) => {
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
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
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
            dispatch(getHandleStart());
            let code = [];
            const res = await axiosJWT.post(
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
            });
            // console.log(res);
            dispatch(getHandleSuccess({ code }));
        } catch (error) {
            console.log(error);
            getHandleFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetPosition: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getPositionStart());
            let code = [];
            const res = await axiosJWT.post(
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
            });
            // console.log(res);
            dispatch(getPositionSuccess({ code }));
        } catch (error) {
            console.log(error);
            getPositionFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetResult: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getResultStart());
            let code = [];
            const res = await axiosJWT.post(
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
            });
            // console.log(res);
            dispatch(getResultSuccess({ code }));
        } catch (error) {
            console.log(error);
            getResultFailed();
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
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
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
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
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
                "/api/user/get-allcode",
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

    // Api CouncilDetail
    getAllCouncilDetails: async ({ user, id, axiosJWT }) => {
        try {
            const res = await axiosJWT.get(`/api/admin/council-detail/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
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
    apiAddCouncil: async ({ user, data, councilDetails, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/create-council",
                {
                    name: data?.name,
                    description: data?.description,
                    statusId: data?.status
                        ? data?.status[0]?.value
                            ? data?.status[0]?.value
                            : data?.status?.value
                        : null,
                    thesisSessionId: data?.thesisSession
                        ? data?.thesisSession[0]?.value
                            ? data?.thesisSession[0]?.value
                            : data?.thesisSession?.value
                        : null,
                    councilDetails: councilDetails,
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
    apiUpdateCouncil: async ({ user, data, councilDetails, axiosJWT }) => {
        try {
            const res = await axiosJWT.put(
                `/api/admin/update-council/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                    statusId: data?.status
                        ? data?.status[0]?.value
                            ? data?.status[0]?.value
                            : data?.status?.value
                        : null,
                    thesisSessionId: data?.thesisSession
                        ? data?.thesisSession[0]?.value
                            ? data?.thesisSession[0]?.value
                            : data?.thesisSession?.value
                        : null,
                    councilDetails: councilDetails,
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
            const res = await axiosJWT.post(
                "/api/admin/create-department",
                {
                    name: data?.name,
                    description: data?.description,
                    founding: data?.founding,
                    deanId: data?.dean
                        ? data?.dean[0]?.value
                            ? data?.dean[0]?.value
                            : data?.dean?.value
                        : null,
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
            const res = await axiosJWT.put(
                `/api/admin/update-department/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                    founding: data?.founding,
                    deanId: data?.dean
                        ? data?.dean[0]?.value
                            ? data?.dean[0]?.value
                            : data?.dean?.value
                        : null,
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
            const res = await axiosJWT.post(
                "/api/admin/create-lecturer",
                {
                    email: data?.email,
                    fullName: data?.fullName,
                    numberPhone: data?.numberPhone,
                    address: data?.address,
                    birthday: data?.birthday,
                    genderId: data?.gender
                        ? data?.gender[0]?.value
                            ? data?.gender[0]?.value
                            : data?.gender?.value
                        : null,
                    code: data?.code,
                    roleId: data?.role
                        ? data?.role[0]?.value
                            ? data?.role[0]?.value
                            : data?.role?.value
                        : null,
                    departmentId: data?.department
                        ? data?.department[0]?.value
                            ? data?.department[0]?.value
                            : data?.department?.value
                        : null,
                    statusId: data?.status
                        ? data?.status[0]?.value
                            ? data?.status[0]?.value
                            : data?.status?.value
                        : null,
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
            const res = await axiosJWT.put(
                `/api/admin/update-lecturer/${data.id}`,
                {
                    email: data?.email,
                    fullName: data?.fullName,
                    numberPhone: data?.numberPhone,
                    address: data?.address,
                    birthday: data?.birthday,
                    genderId: data?.gender
                        ? data?.gender[0]?.value
                            ? data?.gender[0]?.value
                            : data?.gender?.value
                        : null,
                    code: data?.code,
                    roleId: data?.role
                        ? data?.role[0]?.value
                            ? data?.role[0]?.value
                            : data?.role?.value
                        : null,
                    departmentId: data?.department
                        ? data?.department[0]?.value
                            ? data?.department[0]?.value
                            : data?.department?.value
                        : null,
                    statusId: data?.status
                        ? data?.status[0]?.value
                            ? data?.status[0]?.value
                            : data?.status?.value
                        : null,
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

    // Api EvaluationCriteria
    getAllEvaluationCriterias: async ({ user, id, axiosJWT }) => {
        try {
            const res = await axiosJWT.get(
                `/api/admin/evaluation-criteria/${id}`,
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            return res?.data;
        } catch (error) {
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
    apiAddEvaluationMethod: async ({ user, data, criterias, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/create-evaluation-method",
                {
                    name: data?.name,
                    description: data?.description,
                    criterias: criterias,
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
    apiUpdateEvaluationMethod: async ({ user, data, criterias, axiosJWT }) => {
        try {
            const res = await axiosJWT.put(
                `/api/admin/update-evaluation-method/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                    criterias: criterias,
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
            const res = await axiosJWT.post(
                "/api/admin/create-major",
                {
                    name: data?.name,
                    description: data?.description,
                    departmentId: data?.department
                        ? data?.department[0]?.value
                            ? data?.department[0]?.value
                            : data?.department?.value
                        : null,
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
            const res = await axiosJWT.put(
                `/api/admin/update-major/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                    departmentId: data?.department
                        ? data?.department[0]?.value
                            ? data?.department[0]?.value
                            : data?.department?.value
                        : null,
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
            const res = await axiosJWT.post(
                "/api/admin/create-class",
                {
                    name: data?.name,
                    description: data?.description,
                    majorId: data?.major
                        ? data?.major[0]?.value
                            ? data?.major[0]?.value
                            : data?.major?.value
                        : null,
                    blockId: data?.block
                        ? data?.block[0]?.value
                            ? data?.block[0]?.value
                            : data?.block?.value
                        : null,
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
            const res = await axiosJWT.put(
                `/api/admin/update-class/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                    majorId: data?.major
                        ? data?.major[0]?.value
                            ? data?.major[0]?.value
                            : data?.major?.value
                        : null,
                    blockId: data?.block
                        ? data?.block[0]?.value
                            ? data?.block[0]?.value
                            : data?.block?.value
                        : null,
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

    // Api Student
    getAllStudents: async ({
        user,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getAdminStudentsStart());
            const res = await axiosJWT.post(
                "/api/admin/students",
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
            dispatch(getAdminStudentsSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getAdminStudentsFailed());
        }
    },
    getStudentById: async ({ user, id, axiosJWT }) => {
        try {
            const res = await axiosJWT.get(`/api/admin/student/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    importStudents: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/imports",
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
    apiAddStudent: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/create-student",
                {
                    email: data?.email,
                    fullName: data?.fullName,
                    numberPhone: data?.numberPhone,
                    address: data?.address,
                    birthday: data?.birthday,
                    genderId: data?.gender
                        ? data?.gender[0]?.value
                            ? data?.gender[0]?.value
                            : data?.gender?.value
                        : null,
                    code: data?.code,
                    roleId: data?.role
                        ? data?.role[0]?.value
                            ? data?.role[0]?.value
                            : data?.role?.value
                        : null,
                    classId: data?.class
                        ? data?.class[0]?.value
                            ? data?.class[0]?.value
                            : data?.class?.value
                        : null,
                    statusId: data?.status
                        ? data?.status[0]?.value
                            ? data?.status[0]?.value
                            : data?.status?.value
                        : null,
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
    apiUpdateStudent: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.put(
                `/api/admin/update-student/${data.id}`,
                {
                    email: data?.email,
                    fullName: data?.fullName,
                    numberPhone: data?.numberPhone,
                    address: data?.address,
                    birthday: data?.birthday,
                    genderId: data?.gender
                        ? data?.gender[0]?.value
                            ? data?.gender[0]?.value
                            : data?.gender?.value
                        : null,
                    code: data?.code,
                    roleId: data?.role
                        ? data?.role[0]?.value
                            ? data?.role[0]?.value
                            : data?.role?.value
                        : null,
                    classId: data?.class
                        ? data?.class[0]?.value
                            ? data?.class[0]?.value
                            : data?.class?.value
                        : null,
                    statusId: data?.status
                        ? data?.status[0]?.value
                            ? data?.status[0]?.value
                            : data?.status?.value
                        : null,
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
    apiResetPasswordStudent: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.put(
                `/api/admin/reset-password/${data.id}`,
                {
                    code: data?.code,
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
    apiResetPasswordLecturer: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.put(
                `/api/admin/reset-password-lecturer/${data.id}`,
                {
                    code: data?.code,
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
    apiDeleteStudent: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.delete(`/api/admin/delete/${data.id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            console.log(error);
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },

    // Api Thesis
    getAllTheses: async ({
        user,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getAdminThesesStart());
            const res = await axiosJWT.post(
                "/api/admin/theses",
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
            dispatch(getAdminThesesSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getAdminThesesFailed());
        }
    },
    getThesisById: async ({ user, id, axiosJWT }) => {
        try {
            const res = await axiosJWT.get(`/api/admin/thesis/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    importTheses: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/import-theses",
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
    apiAddThesis: async ({ user, data, axiosJWT }) => {
        try {
            console.log(data);
            const res = await axiosJWT.post(
                "/api/admin/create-thesis",
                {
                    startDate: data?.startDate,
                    complateDate: data?.complateDate,
                    thesisStartDate: data?.thesisStartDate,
                    thesisEndDate: data?.thesisEndDate,
                    reportFile: data?.reportFile,
                    totalScore: data?.totalScore,
                    resultId: data?.result
                        ? data?.result[0]?.value
                            ? data?.result[0]?.value
                            : data?.result.value
                        : null,
                    topicId: data?.topic
                        ? data?.topic[0]?.value
                            ? data?.topic[0]?.value
                            : data?.topic.value
                        : null,
                    studentId: data?.student
                        ? data?.student[0]?.value
                            ? data?.student[0]?.value
                            : data?.student.value
                        : null,
                    thesisAdvisorId: data?.thesisAdvisor
                        ? data?.thesisAdvisor[0]?.value
                            ? data?.thesisAdvisor[0]?.value
                            : data?.thesisAdvisor.value
                        : null,
                    thesisAdvisorStatusId: data?.thesisAdvisorStatus
                        ? data?.thesisAdvisorStatus[0]?.value
                            ? data?.thesisAdvisorStatus[0]?.value
                            : data?.thesisAdvisorStatus.value
                        : null,
                    thesisSessionId: data?.thesisSession
                        ? data?.thesisSession[0]?.value
                            ? data?.thesisSession[0]?.value
                            : data?.thesisSession.value
                        : null,
                    councilId: data?.council
                        ? data?.council[0]?.value
                            ? data?.council[0]?.value
                            : data?.council.value
                        : null,
                    councilStatusId: data?.councilStatus
                        ? data?.councilStatus[0]?.value
                            ? data?.councilStatus[0]?.value
                            : data?.councilStatus.value
                        : null,
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
    apiUpdateThesis: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.put(
                `/api/admin/update-thesis/${data.id}`,
                {
                    startDate: data?.startDate,
                    complateDate: data?.complateDate,
                    thesisStartDate: data?.thesisStartDate,
                    thesisEndDate: data?.thesisEndDate,
                    reportFile: data?.reportFile,
                    totalScore: data?.totalScore,
                    resultId: data?.result
                        ? data?.result[0]?.value
                            ? data?.result[0]?.value
                            : data?.result.value
                        : null,
                    topicId: data?.topic
                        ? data?.topic[0]?.value
                            ? data?.topic[0]?.value
                            : data?.topic.value
                        : null,
                    studentId: data?.student
                        ? data?.student[0]?.value
                            ? data?.student[0]?.value
                            : data?.student.value
                        : null,
                    thesisAdvisorId: data?.thesisAdvisor
                        ? data?.thesisAdvisor[0]?.value
                            ? data?.thesisAdvisor[0]?.value
                            : data?.thesisAdvisor.value
                        : null,
                    thesisAdvisorStatusId: data?.thesisAdvisorStatus
                        ? data?.thesisAdvisorStatus[0]?.value
                            ? data?.thesisAdvisorStatus[0]?.value
                            : data?.thesisAdvisorStatus.value
                        : null,
                    thesisSessionId: data?.thesisSession
                        ? data?.thesisSession[0]?.value
                            ? data?.thesisSession[0]?.value
                            : data?.thesisSession.value
                        : null,
                    councilId: data?.council
                        ? data?.council[0]?.value
                            ? data?.council[0]?.value
                            : data?.council.value
                        : null,
                    councilStatusId: data?.councilStatus
                        ? data?.councilStatus[0]?.value
                            ? data?.councilStatus[0]?.value
                            : data?.councilStatus.value
                        : null,
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
    apiDeleteThesis: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.delete(
                `/api/admin/delete-thesis/${data.id}`,
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

    // Api Topic
    getAllTopics: async ({
        user,
        classId,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getAdminTopicsStart());
            const res = await axiosJWT.post(
                "/api/admin/topics",
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
            dispatch(getAdminTopicsSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getAdminTopicsFailed());
        }
    },
    getTopicById: async ({ user, id, axiosJWT }) => {
        try {
            const res = await axiosJWT.get(`/api/admin/topic/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    importTopics: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/import-topics",
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
    apiAddTopic: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/create-topic",
                {
                    name: data?.name,
                    description: data?.description,
                    statusId: data?.status
                        ? data?.status[0]?.value
                            ? data?.status[0]?.value
                            : data?.status?.value
                        : null,
                    departmentId: data?.department
                        ? data?.department[0]?.value
                            ? data?.department[0]?.value
                            : data?.department?.value
                        : null,
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
    apiUpdateTopic: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.put(
                `/api/admin/update-topic/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                    statusId: data?.status
                        ? data?.status[0]?.value
                            ? data?.status[0]?.value
                            : data?.status?.value
                        : null,
                    departmentId: data?.department
                        ? data?.department[0]?.value
                            ? data?.department[0]?.value
                            : data?.department?.value
                        : null,
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
    apiDeleteTopic: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.delete(
                `/api/admin/delete-topic/${data.id}`,
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
    getAllThesisSessions: async ({
        user,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getAdminThesisSessionsStart());
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
    getThesisSessionById: async ({ user, id, axiosJWT }) => {
        try {
            const res = await axiosJWT.get(`/api/admin/thesis-session/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    importThesisSessions: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/import-thesis-sessions",
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
    apiAddThesisSession: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                "/api/admin/create-thesis-session",
                {
                    name: data?.name,
                    description: data?.description,
                    evaluationMethodId: data?.evaluationMethod
                        ? data?.evaluationMethod[0]?.value
                            ? data?.evaluationMethod[0]?.value
                            : data?.evaluationMethod?.value
                        : null,
                    startDate: data?.startDate,
                    endDate: data?.endDate,
                    validPoint: data?.validPoint,
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
    apiUpdateThesisSession: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.put(
                `/api/admin/update-thesis-session/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                    evaluationMethodId: data?.evaluationMethod
                        ? data?.evaluationMethod[0]?.value
                            ? data?.evaluationMethod[0]?.value
                            : data?.evaluationMethod?.value
                        : null,
                    startDate: data?.startDate,
                    endDate: data?.endDate,
                    validPoint: data?.validPoint,
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
    apiDeleteThesisSession: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.delete(
                `/api/admin/delete-thesis-session/${data.id}`,
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
};

export const apiLecturer = {
    apiLecturerChangePassword: async (
        user,
        oldPassword,
        newPassword,
        axiosJWT
    ) => {
        try {
            const res = await axiosJWT.post(
                "/api/lecturer/change-password",
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
    apiLecturerChangeInformation: async (user, data, axiosJWT) => {
        try {
            const res = await axiosJWT.post(
                "/api/lecturer/change-information",
                {
                    email: user?.email,
                    fullName: data?.fullName,
                    numberPhone: data?.numberPhone,
                    birthday: data?.birthday,
                    address: data?.address,
                    genderId: data?.gender
                        ? data?.gender[0]?.value
                            ? data?.gender[0]?.value
                            : data?.gender?.value
                        : null,
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

    apiLecturerGetInformation: async (user, dispatch, axiosJWT) => {
        try {
            const res = await axiosJWT.post(
                "/api/lecturer/get-information",
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
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
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
            dispatch(getHandleStart());
            let code = [];
            const res = await axiosJWT.post(
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
            });
            // console.log(res);
            dispatch(getHandleSuccess({ code }));
        } catch (error) {
            console.log(error);
            getHandleFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetPosition: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getPositionStart());
            let code = [];
            const res = await axiosJWT.post(
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
            });
            // console.log(res);
            dispatch(getPositionSuccess({ code }));
        } catch (error) {
            console.log(error);
            getPositionFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetResult: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getResultStart());
            let code = [];
            const res = await axiosJWT.post(
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
            });
            // console.log(res);
            dispatch(getResultSuccess({ code }));
        } catch (error) {
            console.log(error);
            getResultFailed();
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
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
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
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
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
                "/api/user/get-allcode",
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
            const res = await axiosJWT.post(
                "/api/lecturer/councils",
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
            const res = await axiosJWT.get(`/api/lecturer/council/${id}`, {
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
            const res = await axiosJWT.post(
                "/api/lecturer/import-councils",
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
    apiAddCouncil: async ({ user, data, councilDetails, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                "/api/lecturer/create-council",
                {
                    name: data?.name,
                    description: data?.description,
                    statusId: data?.status
                        ? data?.status[0]?.value
                            ? data?.status[0]?.value
                            : data?.status?.value
                        : null,
                    thesisSessionId: data?.thesisSession
                        ? data?.thesisSession[0]?.value
                            ? data?.thesisSession[0]?.value
                            : data?.thesisSession?.value
                        : null,
                    councilDetails: councilDetails,
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
    apiUpdateCouncil: async ({ user, data, councilDetails, axiosJWT }) => {
        try {
            const res = await axiosJWT.put(
                `/api/lecturer/update-council/${data.id}`,
                {
                    name: data?.name,
                    description: data?.description,
                    statusId: data?.status
                        ? data?.status[0]?.value
                            ? data?.status[0]?.value
                            : data?.status?.value
                        : null,
                    thesisSessionId: data?.thesisSession
                        ? data?.thesisSession[0]?.value
                            ? data?.thesisSession[0]?.value
                            : data?.thesisSession?.value
                        : null,
                    councilDetails: councilDetails,
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
                `/api/lecturer/delete-council/${data.id}`,
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
    getAllThesisCouncils: async ({
        id,
        user,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getAdminThesesStart());
            const res = await axiosJWT.post(
                "/api/lecturer/thesis-councils",
                {
                    id: id,
                    inputSearch: inputSearch,
                    filterSearch: filterSearch,
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            dispatch(getAdminThesesSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getAdminThesesFailed());
        }
    },
    getEvaluationCriteriaByThesisSessionId: async ({ user, id, axiosJWT }) => {
        try {
            const res = await axiosJWT.get(`/api/lecturer/evaluation-criteria-by-thesis-session-id/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
};

export const apiStudent = {
    apiStudentChangePassword: async (
        user,
        oldPassword,
        newPassword,
        axiosJWT
    ) => {
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
    apiStudentChangeInformation: async (user, data, axiosJWT) => {
        try {
            const res = await axiosJWT.post(
                "/api/student/change-information",
                {
                    email: user?.email,
                    fullName: data?.fullName,
                    numberPhone: data?.numberPhone,
                    birthday: data?.birthday,
                    address: data?.address,
                    genderId: data?.gender
                        ? data?.gender[0]?.value
                            ? data?.gender[0]?.value
                            : data?.gender?.value
                        : null,
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

    apiStudentGetInformation: async (user, dispatch, axiosJWT) => {
        try {
            const res = await axiosJWT.post(
                "/api/student/get-information",
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
            dispatch(getInformationStudentSuccess(res?.data));
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
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
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
            dispatch(getHandleStart());
            let code = [];
            const res = await axiosJWT.post(
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
            });
            // console.log(res);
            dispatch(getHandleSuccess({ code }));
        } catch (error) {
            console.log(error);
            getHandleFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetPosition: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getPositionStart());
            let code = [];
            const res = await axiosJWT.post(
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
            });
            // console.log(res);
            dispatch(getPositionSuccess({ code }));
        } catch (error) {
            console.log(error);
            getPositionFailed();
            if (error?.response?.status) {
                return error?.response?.data;
            }
        }
    },
    apiGetResult: async (user, dispatch, axiosJWT) => {
        try {
            dispatch(getResultStart());
            let code = [];
            const res = await axiosJWT.post(
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
            });
            // console.log(res);
            dispatch(getResultSuccess({ code }));
        } catch (error) {
            console.log(error);
            getResultFailed();
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
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
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
                "/api/user/get-allcode",
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
                return { value: v.code, label: `${v.valueVi}` };
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
                "/api/user/get-allcode",
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

    // Api Topic
    getAllTopics: async ({
        user,
        majorId,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getStudentTopicsStart());
            const res = await axiosJWT.post(
                "/api/student/topics",
                {
                    inputSearch: inputSearch,
                    filterSearch: filterSearch,
                    majorId: majorId ? majorId : "",
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            dispatch(getStudentTopicsSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getStudentTopicsFailed());
        }
    },
    getTopicById: async ({ user, id, axiosJWT }) => {
        try {
            const res = await axiosJWT.get(`/api/admin/topic/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },

    // Api Lecturer
    getAllLecturers: async ({
        user,
        majorId,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getStudentLecturersStart());
            const res = await axiosJWT.post(
                "/api/student/lecturers",
                {
                    inputSearch: inputSearch,
                    filterSearch: filterSearch,
                    majorId: majorId ? majorId : "",
                },
                {
                    headers: {
                        token: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            dispatch(getStudentLecturersSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getStudentLecturersFailed());
        }
    },
    getLecturerById: async ({ user, id, axiosJWT }) => {
        try {
            const res = await axiosJWT.get(`/api/student/lecturer/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    apiRegisterAdvisor: async ({ user, id, axiosJWT }) => {
        try {
            console.log(user, id, axiosJWT);
            const res = await axiosJWT.get(
                `/api/student/register-advisor/${id}`,
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
    getAllTheses: async ({
        user,
        inputSearch,
        filterSearch,
        dispatch,
        axiosJWT,
    }) => {
        try {
            dispatch(getStudentThesesStart());
            const res = await axiosJWT.post(
                "/api/student/theses",
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
            dispatch(getStudentThesesSuccess(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.errMessage);
            dispatch(getStudentThesesFailed([]));
        }
    },
    getThesisById: async ({ user, id, axiosJWT }) => {
        try {
            const res = await axiosJWT.get(`/api/student/thesis/${id}`, {
                headers: {
                    token: `Bearer ${user?.accessToken}`,
                },
            });
            return res?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    apiUpdateThesis: async ({ user, data, axiosJWT }) => {
        try {
            const res = await axiosJWT.put(
                `/api/student/update-thesis/${data.id}`,
                {
                    startDate: data?.startDate,
                    complateDate: data?.complateDate,
                    thesisStartDate: data?.thesisStartDate,
                    thesisEndDate: data?.thesisEndDate,
                    reportFile: data?.reportFile,
                    totalScore: data?.totalScore,
                    resultId: data?.result
                        ? data?.result[0]?.value
                            ? data?.result[0]?.value
                            : data?.result.value
                        : null,
                    topicId: data?.topic
                        ? data?.topic[0]?.value
                            ? data?.topic[0]?.value
                            : data?.topic.value
                        : null,
                    studentId: data?.student
                        ? data?.student[0]?.value
                            ? data?.student[0]?.value
                            : data?.student.value
                        : null,
                    thesisAdvisorId: data?.thesisAdvisor
                        ? data?.thesisAdvisor[0]?.value
                            ? data?.thesisAdvisor[0]?.value
                            : data?.thesisAdvisor.value
                        : null,
                    thesisAdvisorStatusId: data?.thesisAdvisorStatus
                        ? data?.thesisAdvisorStatus[0]?.value
                            ? data?.thesisAdvisorStatus[0]?.value
                            : data?.thesisAdvisorStatus.value
                        : null,
                    thesisSessionId: data?.thesisSession
                        ? data?.thesisSession[0]?.value
                            ? data?.thesisSession[0]?.value
                            : data?.thesisSession.value
                        : null,
                    councilId: data?.council
                        ? data?.council[0]?.value
                            ? data?.council[0]?.value
                            : data?.council.value
                        : null,
                    councilStatusId: data?.councilStatus
                        ? data?.councilStatus[0]?.value
                            ? data?.councilStatus[0]?.value
                            : data?.councilStatus.value
                        : null,
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
};
