export default async function getSearchResult(
  keyword,
  checkInDate,
  checkOutDate,
  filterApply
) {
  console.log(
    "keyword : ",
    keyword,
    "checkInDate : ",
    checkInDate,
    "checkOutDate : ",
    checkOutDate,
    "filterApply : ",
    filterApply.accommodationCategory
  );
  try {
    const response = await fetch(
      `http://localhost:8080/api/accommodation/searchResult/${keyword}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&accommodationCategory=${filterApply.accommodationCategory}&minPrice=${filterApply.priceRange[0]}&maxPrice=${filterApply.priceRange[1]}`,
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
  }
}
