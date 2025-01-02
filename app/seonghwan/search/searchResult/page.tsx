"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import blackBackIcon from "@/assets/blckBackIcon.png";
import searchIcon from "@/assets/searchIcon.png";
import calendarIcon from "@/assets/calendarIcon.png";
import personnelIcon from "@/assets/personnelIcon.png";
import upIcon from "@/assets/popularUpIcon.png";
import downIcon from "@/assets/popularDownIcon.png";
import dashIcon from "@/assets/popularDashIcon.png";
import CalendarPage from "@/components/CalendarPage";
import subIcon from "@/assets/subIcon.png";
import addIcon from "@/assets/addIcon.png";
import xIcon from "@/assets/xIcon.png";
import inputClearIcon from "@/assets/inputClearIcon.png";
import NowTomorrowDate from "@/feature/NowTomorrowDate";
import { useState } from "react";
import SearchComponenet from "@/components/SearchComponent";
import CalendarPage2 from "@/components/CalendarPage2";
import { useCalendar } from "@/feature/CalendarContext";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("searchText"));
  const [calendar, setCalendar] = useState(searchParams.get("calendar"));
  const [adultNumber, setAdultNumber] = useState(
    Number(searchParams.get("adultNumber"))
  );
  const [kidNumber, setKidNumber] = useState(0);
  const [onCalendar, setOnCalendar] = useState(false);

  // 쿼리 파라미터에 검색어가 있을 경우, 해당 검색어를 사용하여 데이터를 가져오거나 검색 결과를 표시
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 font-sans tracking-negative">
      <div className="w-[360px] bg-white relative flex flex-col h-full px-[20px]">
        {onCalendar ? (
          <CalendarPage2
            setOnCalendar={setOnCalendar}
            calendar={calendar}
            setCalendar={setCalendar}
            adultNumber={adultNumber}
            setAdultNumber={setAdultNumber}
            kidNumber={kidNumber}
            setKidNumber={setKidNumber}
          />
        ) : (
          <SearchComponenet
            text={searchText}
            calendar={calendar}
            adultNumber={adultNumber}
            setOnCalendar={setOnCalendar}
          />
        )}
      </div>
    </div>
  );
}
