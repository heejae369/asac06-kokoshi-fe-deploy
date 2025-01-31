"use client";

import SearchComponent from "@/components/SearchComponent";
import { useEffect, useState } from "react";
import CalendarPage2 from "@/components/CalendarPage2";
import SearchBasic from "@/components/SearchBasic";
import SearchResult from "@/components/SearchResult";
import SearchFilter from "@/components/SearchFilter";
import { getSearchResult } from "@/feature/fetch/Search";
import { formattedRequestDate } from "@/feature/DateFormat";
import { dataArray } from "@/feature/DataArray";
import { useCalendar } from "@/feature/CalendarContext";
import { addRecentSearches } from "@/feature/RecentSearchLocalStorage";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchClient() {
  const { checkInDate, checkOutDate, adultNumber } = useCalendar();

  const [searchText, setSearchText] = useState("");
  const [onCalendar, setOnCalendar] = useState(false);
  const [onFilter, setOnFilter] = useState(false);
  const [searchResultData, setSearchResultData] = useState([]);
  const [array, setArray] = useState("코코시 추천순");
  const [filterApply, setFilterApply] = useState<{
    accommodationCategory: string[];
    priceRange: number[];
    keyword: string[];
  }>({
    accommodationCategory: ["전체"],
    priceRange: [10000, 300000],
    keyword: [],
  });
  const router = useRouter();
  const searchParams = useSearchParams(); // useSearchParams는 클라이언트 측에서 안전하게 호출 가능

  // 기존 서치 코드
  useEffect(() => {
    if (searchParams && !filterApply.accommodationCategory.includes("전체")) {
      const search = searchParams.get("search");
      if (search) {
        console.log("Search query parameter:", search);
        fetchData(search);
        addRecentSearches(search);
        setSearchText(search);
      }
    }
  }, [searchParams]);

  const fetchData = async (text) => {
    console.log("숙소리스트 가져오기");
    try {
      if (text) {
        const data = await getSearchResult(
          text,
          adultNumber,
          formattedRequestDate(checkInDate),
          formattedRequestDate(checkOutDate),
          filterApply
        );
        if (array !== "코코시 추천순" && data) {
          setSearchResultData(dataArray(data, array));
        } else setSearchResultData(data);
      } else {
        setSearchResultData([]);
      }
    } catch (error) {
      console.error("searchResult : ", error);
    }
    // setSearchText(text);
  };
  // 성환님 카테고리 추가 부분  --  추후 적요
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    if (search) {
      setSearchText(search);
    }

    if (category) {
      console.log("keyword 변경");
      const categoryArray = category.split(",");
      setFilterApply((prevState) => ({
        ...prevState,
        accommodationCategory: categoryArray,
      }));
    } else {
      console.log("검색어 :", search);
      fetchData(search);
      addRecentSearches(search);
    }
  }, []);
  // 프리랜더링 문제

  // 기존 코드
  //   const fetchData = async (text) => {
  //     console.log("fetchData 실행");
  //     try {
  //       if (text) {
  //         const data = await getSearchResult(
  //           text,
  //           adultNumber,
  //           formattedRequestDate(checkInDate),
  //           formattedRequestDate(checkOutDate),
  //           filterApply
  //         );
  //         if (array !== "코코시 추천순" && data) {
  //           setSearchResultData(dataArray(data, array));
  //         } else setSearchResultData(data);
  //       } else {
  //         setSearchResultData([]);
  //       }
  //     } catch (error) {
  //       console.error("searchResult : ", error);
  //     }
  //   };

  useEffect(() => {
    if (searchText) {
      fetchData(searchText);
    }
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    if (array !== "코코시 추천순" && searchResultData) {
      setSearchResultData(dataArray(searchResultData, array));
    }
  }, [array]);

  useEffect(() => {
    if (searchText) fetchData(searchText);
  }, [filterApply]);

  const handleSearch = (text) => {
    router.push(`/search?search=${text}`);
  };

  return (
    <div className="tracking-negative flex h-screen w-full justify-center bg-gray-100 font-sans">
      <div className="relative flex h-full w-[360px] flex-col bg-white px-[20px]">
        {onCalendar ? (
          <CalendarPage2 setOnCalendar={setOnCalendar} />
        ) : onFilter ? (
          <SearchFilter
            setOnFilter={setOnFilter}
            setFilterApply={setFilterApply}
            filterApply={filterApply}
          />
        ) : (
          <>
            <SearchComponent
              searchText={searchText}
              setSearchText={setSearchText}
              setOnCalendar={setOnCalendar}
              handleSearch={handleSearch}
            />
            {!searchText ? (
              <SearchBasic
                setSearchText={setSearchText}
                handleSearch={handleSearch}
              />
            ) : (
              <SearchResult
                setOnFilter={setOnFilter}
                searchResultData={searchResultData}
                array={array}
                setArray={setArray}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
