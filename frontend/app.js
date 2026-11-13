// Base URL of the Azure Function App.
const API_BASE = "https://group9-commapp-func.azurewebsites.net";

const button = document.getElementById("hello-btn");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  result.textContent = "Calling...";
  try {
    const res = await fetch(`${API_BASE}/api/hello`);
    const data = await res.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    result.textContent = `Request failed: ${err.message}`;
  }
});
