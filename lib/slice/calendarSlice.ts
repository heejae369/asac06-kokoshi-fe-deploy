import { createSlice } from "@reduxjs/toolkit";
import NowTomorrowDate from "@/feature/DateFormat";

const initialState = {
  checkInDate: NowTomorrowDate().checkInDate,
  checkOutDate: NowTomorrowDate().checkOutDate,
  adultNumber: 2,
  kidNumber: 0,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCheckInDate(state, action) {
      state.checkInDate = action.payload;
    },
    setCheckOutDate(state, action) {
      state.checkOutDate = action.payload;
    },
    setAdultNumber(state, action) {
      state.adultNumber = action.payload;
    },
    setKidNumber(state, action) {
      state.kidNumber = action.payload;
    },
  },
});

export const { setCheckInDate, setCheckOutDate, setAdultNumber, setKidNumber } =
  calendarSlice.actions;

export default calendarSlice.reducer;
