import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  status: "connecting" | "connected" | "disconnected";
} = {
  status: "disconnected",
};

const wsConnectionSlice = createSlice({
  name: "wsConnection",
  initialState: initialState,
  reducers: {
    connectionStarted: (state) => {
      state.status = "connecting";
    },
    connectionEstablished: (state) => {
      state.status = "connected";
    },
    connectionClosed: (state) => {
      state.status = "disconnected";
    },
  },
});

export const wsConnectionActions = wsConnectionSlice.actions;

export default wsConnectionSlice.reducer;
