import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "ui",
    initialState: {
        topics: [],
        totalRecords: 0,
        departments: [],
    },
    reducers: {
        getTopicsSuccess: (state, action) => {
            state.topics = action.payload.topics;
            state.totalRecords = action.payload.totalRecords;
        },
        getDepartmentsSuccess: (state, action) => {
            state.departments = action.payload.departments;
        },
    },
});
export const { getTopicsSuccess, getDepartmentsSuccess } = userSlice.actions;

export const userReducer = userSlice.reducer;
