import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  isShow: boolean;
}

const initialState: ModalState = {
  isShow: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // toggleModal: (state, action: PayloadAction<string>) => {
    //   state.isShow = !state.isShow;
    // },
    openModal: (state) => {
      console.log("open");
      state.isShow = true;
    },
    closeModal: (state) => {
      console.log("close");
      state.isShow = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
