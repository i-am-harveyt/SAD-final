function searchProducts() {
  const model = document.getElementById("model").value;
  const category = document.getElementById("category").value;
  const registerDate = document.getElementById("registerDate").value;
  const registerStore = document.getElementById("registerStore").value;

  fetch(
    `http://localhost:8080/api/v0.1/product/fetch?` +
      `model=${model}&category=${category}` +
      `&registerDate=${registerDate}&registerStore=${registerStore}`,
  )
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = "";
      console.log(data);

      data.data.products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
							<td>${product.id}</td >
							<td>${product.model}</td>
							<td>${product.category}</td>
							<td>${"To simplified, leave empty"}</td>
							<td>${
                product.register
                  ? product.register
                  : "<span style='color: red'>Not registered yet</span>"
              }</td>
								<td>${product.shop ? product.shop : ""}</td>
                `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("發生錯誤：", error));
}
