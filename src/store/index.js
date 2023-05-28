import { configureStore } from "@reduxjs/toolkit";
import SnackBarSlice from "./SnackbarSlice";
import loaderSlice from "./loaderSlice";
import modalSlice from "./modalSlice";

export const store = configureStore({
  reducer: {
    snackBar: SnackBarSlice,
    loader: loaderSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
