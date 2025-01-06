import { createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import {
  setCheckInDate,
  setCheckOutDate,
  setAdultNumber,
  setKidNumber,
} from "@/lib/slice/calendarSlice";

const CalendarContext = createContext(null);

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch();
  const { checkInDate, checkOutDate, adultNumber, kidNumber } = useSelector(
    (state: RootState) => state.calendar
  );

  const setCheckIn = (date: {
    year: number;
    month: number;
    day: number;
    dayOfWeek: string;
  }) => dispatch(setCheckInDate(date));
  const setCheckOut = (date: {
    year: number;
    month: number;
    day: number;
    dayOfWeek: string;
  }) => dispatch(setCheckOutDate(date));
  const setAdults = (count: number) => dispatch(setAdultNumber(count)); // 액션 디스패치
  const setKids = (count: number) => dispatch(setKidNumber(count)); // 액션 디스패치

  const contextValue = {
    checkInDate,
    setCheckInDate: setCheckIn,
    checkOutDate,
    setCheckOutDate: setCheckOut,
    adultNumber,
    setAdultNumber: setAdults,
    kidNumber,
    setKidNumber: setKids,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);
