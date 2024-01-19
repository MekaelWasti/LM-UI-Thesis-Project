import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentApp: null,
  // currentApp: "Calculator",
  // currentApp: "Weather",
  config: {},
};

export const commandInputSlice = createSlice({
  name: "commandInput",
  initialState,
  reducers: {
    setCurrentApp: (state, action) => {
      state.currentApp = action.payload;
    },
    setConfig: (state, action) => {
      state.config = { ...state.config, ...action.payload };
    },
  },
});

export const { setCommand, setCurrentApp, setConfig } =
  commandInputSlice.actions;
export default commandInputSlice.reducer;
