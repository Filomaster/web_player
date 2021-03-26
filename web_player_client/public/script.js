// Initial fetch on load
// function post(url, data) {
//   fetch(`http://${window.location.hostname}:8000`, {
//     method: "POST",
//     mode: "cors",
//     // credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json().then((xxx) => console.log(xxx)))
//     .catch((err) => console.log(err));
// }

// post("/", { Test: "hello World", Info: "jkashfd" });

console.log(this.$store);
