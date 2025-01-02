import { createContext, useContext, useState } from "react";
import NowTomorrowDate from "@/feature/NowTomorrowDate";

const CalendarContext = createContext(null);

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [calendar, setCalendar] = useState(NowTomorrowDate());
  const [adultNumber, setAdultNumber] = useState(1);
  const [kidNumber, setKidNumber] = useState(0);

  return (
    <CalendarContext.Provider
      value={{
        calendar,
        setCalendar,
        adultNumber,
        setAdultNumber,
        kidNumber,
        setKidNumber,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);
