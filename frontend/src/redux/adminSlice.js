import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isFetching: false,
        error: false,
        information: [],
        councils: [],
        totalRecords: 0,
        gender: [],
        role: [],
        position: [],
        status: [],
        handle: [],
        result: [],
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
    getAdminCouncilsFailed,
    getAdminCouncilsStart,
    getAdminCouncilsSuccess,
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
