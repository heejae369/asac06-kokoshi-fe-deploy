export default async function CustomFetch(path, method, request) {
  // ex. CustomFetch("/users", "POST", {user_id: userId})
  if (request) {
    // POST, PUT,
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}` + path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }).catch((error) => console.error("Error:", error));
  }
  // ex. CustomFetch("/users", "GET")
  else {
    // GET, DELETE
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}` + path, {
      method: method,
    })
      .then((response) => response?.json())
      .catch((error) => console.error("Error:", error));
  }
}
