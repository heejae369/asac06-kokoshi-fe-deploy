export default async function GetFetch() {
  return await fetch("http://localhost:8080", {
    method: "GET",
  }).then((response) => console.log(response.json()));
}
