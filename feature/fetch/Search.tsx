export const getSearchResult = async (
  searchKeyword,
  adultNumber,
  checkInDate,
  checkOutDate,
  filterApply
) => {
  console.log(
    "keyword : ",
    searchKeyword,
    "\nadultNumber : ",
    adultNumber,
    "\ncheckInDate : ",
    checkInDate,
    "\ncheckOutDate : ",
    checkOutDate,
    "\naccommodationCategory : ",
    filterApply.accommodationCategory,
    "\nminPrice : ",
    filterApply.priceRange[0],
    "\nmaxPrice : ",
    filterApply.priceRange[1],
    "\nkeyword : ",
    filterApply.keyword
  );
  try {
    const response = await fetch(
      `http://localhost:8080/api/accommodation/searchResult/${searchKeyword}?adultNumber=${adultNumber}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&accommodationCategory=${filterApply.accommodationCategory}&minPrice=${filterApply.priceRange[0]}&maxPrice=${filterApply.priceRange[1]}&keyword=${filterApply.keyword}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getTopKeywords = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/search", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
