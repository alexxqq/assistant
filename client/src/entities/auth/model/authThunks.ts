import * as authApi from "@/src/entities/auth/api/authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  return await authApi.fetchUser();
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return await authApi.logout();
});
