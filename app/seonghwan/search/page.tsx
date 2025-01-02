"use client";

import SearchComponenet from "@/components/SearchComponent";
import { useState, useEffect } from "react";
import CalendarPage2 from "@/components/CalendarPage2";
import NowTomorrowDate from "@/feature/NowTomorrowDate";
import SearchBasic from "@/components/SearchBasic";
import SearchResult from "@/components/SearchResult";
import SearchFilter from "@/components/SearchFilter";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [calendar, setCalendar] = useState(NowTomorrowDate());
  const [onCalendar, setOnCalendar] = useState(false);
  const [adultNumber, setAdultNumber] = useState(1);
  const [kidNumber, setKidNumber] = useState(0);
  const [onFilter, setOnFilter] = useState(false);

  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 font-sans tracking-negative">
      <div className="w-[360px] bg-white relative flex flex-col h-full px-[20px]">
        {onCalendar ? (
          <>
            <CalendarPage2
              setAdultNumber={setAdultNumber}
              setCalendar={setCalendar}
              setKidNumber={setKidNumber}
              setOnCalendar={setOnCalendar}
              calendar={calendar}
              adultNumber={adultNumber}
              kidNumber={kidNumber}
            />
          </>
        ) : (
          <>
            {onFilter ? (
              <>
                <SearchFilter setOnFilter={setOnFilter} />
              </>
            ) : (
              <>
                <SearchComponenet
                  text={searchText}
                  setText={setSearchText}
                  calendar={calendar}
                  adultNumber={adultNumber}
                  setOnCalendar={setOnCalendar}
                />
                {!searchText ? (
                  <SearchBasic />
                ) : (
                  <SearchResult
                    calendar={calendar}
                    adultNumber={adultNumber}
                    kidNumber={kidNumber}
                    setOnFilter={setOnFilter}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
