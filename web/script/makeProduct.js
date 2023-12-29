// Load models when the page is ready
document.addEventListener("DOMContentLoaded", getModels);

async function getModels() {
  const response = await fetch("http://localhost:8080/api/v0.1/model/get");
  const data = await response.json();

  const select = document.getElementById("models");
  data.model.data.forEach((model) => {
    const option = document.createElement("option");
    option.value = model.id;
    option.text = model.name;
    select.appendChild(option);
  });
}

async function submitForm() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // makeup an IP here
  myHeaders.append("X-Forwarded-For", "192.168.1.1");

  const selectedModel = document.getElementById("models").value;

  const response = await fetch(
    "http://localhost:8080/api/v0.1/product/create",
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ model: { id: selectedModel } }),
    },
  );

  const data = await response.json();
	console.log(data);
  // 將取得的資料轉換成字串
  let dataString = `http://localhost:8080/api/v0.1/product/decode?secret=${encodeURIComponent(
    JSON.stringify(data),
  )} `;

  // 在指定的元素中生成 QR code
  document.getElementById("label").innerHTML = dataString;
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: dataString,
		correctLevel: 3,
    width: 300,
    height: 300,
  });
}
