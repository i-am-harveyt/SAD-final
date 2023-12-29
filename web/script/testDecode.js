const URL =
  "http://localhost:8080/api/v0.1/product/decode?secret=%7B%22data%22%3A%7B%22product%22%3A%7B%22id%22%3A13%2C%22secret%22%3A%22MTM7NGpzazEwcjhmbmphbG9kZnVnZDA5ajNva2phbHNsZGZoc2Q4Z2g5aHVw%22%7D%7D%7D";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// makeup an IP here
myHeaders.append("X-Forwarded-For", "192.168.1.1");

const response = await fetch(URL, {
  method: "GET",
  headers: myHeaders,
});

const data = await response.json();
// 將取得的資料轉換成字串
console.log(data);
