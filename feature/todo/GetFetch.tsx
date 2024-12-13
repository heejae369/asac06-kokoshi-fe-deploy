export default async function GetFetch() {
  return await fetch("https://localhost:8080", {
    method: "GET",
  }).then((response) => console.log(response));
}
