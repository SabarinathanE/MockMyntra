import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        loginData: {email: '', password: ''},
        loginState: localStorage.getItem("isLoggedIn") === 'true',
        loginError: {email:'', password: '', login: ''}
    },
    reducers: {
        storeLoginDetails : (state,action) => {
            const {name, value} = action.payload;
            state.loginData[name] = value;
        },
        loginStatus : (state, action) => {
            state.loginState = action.payload;
            localStorage.setItem("isLoggedIn", action.payload ? 'true' : 'false');
        },
        loginErrorStatus: (state, action) => {
            state.loginError = action.payload;
        },
        deleteLogin: (state, action) => {
            state.loginData = {email: '', password: ''};
            state.loginError = {email:'', password: '', login: ''};
        }
    }
})

export const { storeLoginDetails, loginStatus, loginErrorStatus, deleteLogin } = LoginSlice.actions;
export default LoginSlice.reducer