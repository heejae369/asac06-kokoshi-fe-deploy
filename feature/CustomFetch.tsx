export default async function CustomFetch(path, method, request) {
  if (request) {
    // POST, PUT,
    return await fetch("http://localhost:8080" + path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }).catch((error) => console.error("Error:", error));
  } else {
    // GET, DELETE
    return await fetch("http://localhost:8080" + path, {
      method: method,
    })
      .then((response) => response?.json())
      .catch((error) => console.error("Error:", error));
  }
}
