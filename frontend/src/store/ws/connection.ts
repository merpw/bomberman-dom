import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  status: "connecting" | "connected" | "disconnected";
  error: string | null;
} = {
  status: "disconnected",
  error: null,
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
    setConnectionError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const wsConnectionActions = wsConnectionSlice.actions;

export default wsConnectionSlice.reducer;
