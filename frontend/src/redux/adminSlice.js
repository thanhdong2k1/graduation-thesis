import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isFetching: false,
        error: false,
        information: [],
        councils: [],
        departments: [],
        majors: [],
        blocks: [],
        lecturers: [],
        topics: [],
        classes: [],
        students: [],
        theses: [],
        points: [],
        councilDetails: [],
        thesisSessions: [],
        pointCriterias: [],
        evaluationMethods: [],
        evaluationCriterias: [],
        totalRecords: 0,
        gender: [],
        role: [],
        position: [],
        status: [],
        handle: [],
        result: [],
        permissions: [],
        errMessage: null,
    },
    reducers: {
        getInformationStart: (state) => {
            state.isFetching = true;
        },
        getInformationSuccess: (state, action) => {
            state.isFetching = false;
            state.information = action.payload?.information;
            state.error = false;
        },
        getInformationFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getGenderStart: (state) => {
            state.isFetching = true;
        },
        getGenderSuccess: (state, action) => {
            state.isFetching = false;
            state.gender = action.payload?.code;
            state.error = false;
        },
        getGenderFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getPositionStart: (state) => {
            state.isFetching = true;
        },
        getPositionSuccess: (state, action) => {
            state.isFetching = false;
            state.position = action.payload?.code;
            state.error = false;
        },
        getPositionFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getRoleStart: (state) => {
            state.isFetching = true;
        },
        getRoleSuccess: (state, action) => {
            state.isFetching = false;
            state.role = action.payload?.code;
            state.error = false;
        },
        getRoleFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getStatusStart: (state) => {
            state.isFetching = true;
        },
        getStatusSuccess: (state, action) => {
            state.isFetching = false;
            state.status = action.payload?.code;
            state.error = false;
        },
        getStatusFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getHandleStart: (state) => {
            state.isFetching = true;
        },
        getHandleSuccess: (state, action) => {
            state.isFetching = false;
            state.handle = action.payload?.code;
            state.error = false;
        },
        getHandleFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getResultStart: (state) => {
            state.isFetching = true;
        },
        getResultSuccess: (state, action) => {
            state.isFetching = false;
            state.result = action.payload?.code;
            state.error = false;
        },
        getResultFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getPermissionsStart: (state) => {
            state.isFetching = true;
        },
        getPermissionsSuccess: (state, action) => {
            state.isFetching = false;
            state.permissions = action.payload?.code;
            state.error = false;
        },
        getPermissionsFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        getAdminCouncilsSuccess: (state, action) => {
            state.councils = action.payload.councils;
            state.totalRecords = action.payload.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getAdminCouncilsStart: (state) => {
            state.isFetching = true;
        },
        getAdminCouncilsFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getAdminDepartmentsSuccess: (state, action) => {
            state.departments = action.payload.departments;
            state.totalRecords = action.payload.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getAdminDepartmentsStart: (state) => {
            state.isFetching = true;
        },
        getAdminDepartmentsFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getAdminBlocksSuccess: (state, action) => {
            state.blocks = action.payload.blocks;
            state.totalRecords = action.payload.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getAdminBlocksStart: (state) => {
            state.isFetching = true;
        },
        getAdminBlocksFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getAdminEvaluationMethodsSuccess: (state, action) => {
            state.evaluationMethods = action.payload.evaluationMethods;
            state.totalRecords = action.payload.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getAdminEvaluationMethodsStart: (state) => {
            state.isFetching = true;
        },
        getAdminEvaluationMethodsFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getAdminLecturersSuccess: (state, action) => {
            state.lecturers = action.payload.lecturers;
            state.totalRecords = action.payload.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getAdminLecturersStart: (state) => {
            state.isFetching = true;
        },
        getAdminLecturersFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getAdminMajorsSuccess: (state, action) => {
            state.majors = action.payload.majors;
            state.totalRecords = action.payload.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getAdminMajorsStart: (state) => {
            state.isFetching = true;
        },
        getAdminMajorsFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getAdminClassesSuccess: (state, action) => {
            state.classes = action.payload.classes;
            state.totalRecords = action.payload.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getAdminClassesStart: (state) => {
            state.isFetching = true;
        },
        getAdminClassesFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getAdminThesisSessionsSuccess: (state, action) => {
            state.thesisSessions = action.payload.thesisSessions;
            state.totalRecords = action.payload.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getAdminThesisSessionsStart: (state) => {
            state.isFetching = true;
        },
        getAdminThesisSessionsFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },
    },
});

export const {
    getInformationFailed,
    getInformationStart,
    getInformationSuccess,
    getGenderFailed,
    getGenderStart,
    getGenderSuccess,
    getHandleFailed,
    getHandleStart,
    getHandleSuccess,
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
    getPermissionsFailed,
    getPermissionsStart,
    getPermissionsSuccess,
    getAdminCouncilsFailed,
    getAdminCouncilsStart,
    getAdminCouncilsSuccess,
    getAdminDepartmentsFailed,
    getAdminDepartmentsStart,
    getAdminDepartmentsSuccess,
    getAdminBlocksFailed,
    getAdminBlocksStart,
    getAdminBlocksSuccess,
    getAdminEvaluationMethodsFailed,
    getAdminEvaluationMethodsStart,
    getAdminEvaluationMethodsSuccess,
    getAdminLecturersFailed,
    getAdminLecturersStart,
    getAdminLecturersSuccess,
    getAdminMajorsFailed,
    getAdminMajorsStart,
    getAdminMajorsSuccess,
    getAdminClassesFailed,
    getAdminClassesStart,
    getAdminClassesSuccess,
    getAdminThesisSessionsFailed,
    getAdminThesisSessionsStart,
    getAdminThesisSessionsSuccess,
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
