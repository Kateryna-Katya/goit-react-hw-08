import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

};

const clearAuthHeader = () => { axios.defaults.headers.common.Authorization = ""; }

export const register = createAsyncThunk("auth/register", async (user, thunkApi) => {
    try {
        const { data } = await axios.post("/users/signup", user);
        setAuthHeader(data.token);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});
export const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
    try {
        const { data } = await axios.post("/users/login", user);
        setAuthHeader(data.token);
        return data
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
});
export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
    try {
        const { data } = await axios.post("/users/logout");
        clearAuthHeader();
        return data
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
});

export const refreshUser = createAsyncThunk(
    "auth/refresh",
    async (_, thunkApi) => {
        const state = thunkApi.getState();
        const token = state.auth.token;

        if (!token) {
            return thunkApi.rejectWithValue("No token provided to refresh user data");
        }

        try {
            setAuthHeader(token);
            const { data } = await axios.get("/users/current");
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
