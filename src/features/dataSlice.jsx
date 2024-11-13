import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    error: false,
    admins: [],
    clients: [],

  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },

    getClientsSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.clients=payload.result
    },

    getAdminsSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.admins=payload.result
    },

    logoutDataSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.admins=[];
      state.clients=[]
    },
  },
});

export const { fetchStart, fetchFail, getAdminsSuccess, logoutDataSuccess, getClientsSuccess } = dataSlice.actions;

export default dataSlice.reducer;
