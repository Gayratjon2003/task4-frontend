import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    status: false,
    text: "",
  },

  reducers: {
    modalStart: (state, { payload: { text } }) => {
      state.status = true;
      state.text = text;
    },
    modalDone: (state) => {
      state.status = false;
    },
    setModalFunc: (state, action) => {
      state.modalFunc = action.payload;
    },
  },
});

export const { modalStart, modalDone, setModalFunc } = modalSlice.actions;

export default modalSlice.reducer;
