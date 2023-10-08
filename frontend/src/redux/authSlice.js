import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        logginStart: (state) => {
            state.isFetching = true;
        },
        logginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        logginFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.currentUser = action.payload;
        },
        logoutStart: (state) => {
            state.isFetching = true;
        },
        logoutSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = [];
            state.error = false;
        },
        logoutFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    logginFailed,
    logginStart,
    logginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
