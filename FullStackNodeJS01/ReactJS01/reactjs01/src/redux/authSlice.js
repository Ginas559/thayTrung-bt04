import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: {
        email: '',
        name: '',
    },
    appLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        },
        setAppLoading: (state, action) => {
            state.appLoading = action.payload;
        },
        logout: () => ({
            isAuthenticated: false,
            user: {
                email: '',
                name: '',
            },
            appLoading: false,
        }),
    },
});

export const { setAuth, setAppLoading, logout } = authSlice.actions;
export default authSlice.reducer;