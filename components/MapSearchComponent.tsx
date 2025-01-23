"use client";

import SearchComponenet from "@/components/SearchComponent";
import { useState } from "react";
import CalendarPage2 from "@/components/CalendarPage2";
import MapComponent from "@/components/MapComponent";
import { useRouter } from "next/navigation";

export default function MapSearchComponent() {
  const [searchText, setSearchText] = useState("");
  const [onCalendar, setOnCalendar] = useState(false);

  const router = useRouter();

  const handleSearch = (text) => {
    router.push(`/search?search=${text}`);
  };

  return (
    <div className="tracking-negative flex h-screen w-full justify-center bg-gray-100 font-sans">
      <div className="relative flex h-full w-[360px] flex-col bg-white px-[20px]">
        {onCalendar ? (
          <>
            <CalendarPage2 setOnCalendar={setOnCalendar} />
          </>
        ) : (
          <>
            <div className="z-10 shadow-[0px_4px_6px_rgba(0,_0,_0,_0.18)] w-[360px] ml-[-20px]">
              <div className="flex w-[360px] flex-col px-[20px] pb-[20px]">
                <SearchComponenet
                  searchText={searchText}
                  setSearchText={setSearchText}
                  setOnCalendar={setOnCalendar}
                  handleSearch={handleSearch}
                />
              </div>
            </div>
            <MapComponent />
          </>
        )}
      </div>
    </div>
  );
}
