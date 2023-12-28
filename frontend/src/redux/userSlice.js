import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "ui",
    initialState: {
        isFetching: false,
        error: false,
        topics: [],
        councils: [],
        departments: [],
        totalRecords: 0,
    },
    reducers: {
        getTopicsSuccess: (state, action) => {
            state.topics = action?.payload?.topics;
            state.totalRecords = action?.payload?.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getTopicsStart: (state) => {
            state.isFetching = true;
        },
        getTopicsFailed: (state) => {
            state.error = true;
            state.isFetching = false;
        },
        getDepartmentsSuccess: (state, action) => {
            state.departments = action?.payload?.departments;
            state.isFetching = false;
            state.error = false;
        },
        getDepartmentsStart: (state) => {
            state.isFetching = true;
        },
        getDepartmentsFailed: (state) => {
            state.error = true;
            state.isFetching = false;
        },
        getCouncilsSuccess: (state, action) => {
            state.councils = action?.payload?.councils;
            state.totalRecords = action?.payload?.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getCouncilsStart: (state) => {
            state.isFetching = true;
        },
        getCouncilsFailed: (state) => {
            state.error = true;
            state.isFetching = false;
        },
    },
});
export const {
    getTopicsSuccess,
    getDepartmentsSuccess,
    getCouncilsSuccess,
    getCouncilsFailed,
    getCouncilsStart,
    getDepartmentsFailed,
    getDepartmentsStart,
    getTopicsFailed,
    getTopicsStart,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
