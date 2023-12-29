// Load models when the page is ready
document.addEventListener("DOMContentLoaded", getCategories);

async function getCategories() {
  const response = await fetch("http://localhost:8080/api/v0.1/category/get");
  const data = await response.json();

  const select = document.getElementById("categories");
  data.data.categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.text = category.name;
    select.appendChild(option);
  });
}

async function submitForm() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // makeup an IP here
  myHeaders.append("X-Forwarded-For", "192.168.1.1");

  const selectedCategory = document.getElementById("categories").value;
  const modelName = document.getElementById("name").value;
  if (modelName.length === 0) return;

  const response = await fetch(
    "http://localhost:8080/api/v0.1/model/register",
    {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        model: { categoryId: selectedCategory, name: modelName },
      }),
    },
  );
  if (response.ok) alert("Succeed");
}
