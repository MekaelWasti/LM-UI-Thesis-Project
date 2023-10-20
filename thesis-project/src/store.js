import { configureStore } from "@reduxjs/toolkit";
import commandInputReducer from "./slices/commandInputSlice";

export const store = configureStore({
  reducer: {
    commandInput: commandInputReducer,
  },
});
