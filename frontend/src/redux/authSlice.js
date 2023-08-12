import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        logginStart: (state) => {
            state.login.isFetching = true;
        },
        logginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        logginFailed: (state) => {},
        logoutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = [];
            state.login.error = false;
        },
    },
});

export const { logginFailed, logginStart, logginSuccess, logoutSuccess } =
    authSlice.actions;

export const authReducer = authSlice.reducer;
