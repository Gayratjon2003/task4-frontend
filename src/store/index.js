import { configureStore } from "@reduxjs/toolkit";
import SnackBarSlice from "./SnackbarSlice";

export const store = configureStore({
  reducer: {
    snackBar: SnackBarSlice,
  },
});
