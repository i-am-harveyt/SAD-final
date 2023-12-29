var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("X-Forwarded-For", "192.168.1.1");

var raw = JSON.stringify({
  model: { id: 0 },
});

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("http://localhost:8080/api/v0.1/product/create", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
