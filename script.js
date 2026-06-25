const API_KEY = "c56ee5e091da92c3d5b4819f968c679a";

const input = document.getElementById("city-input");
const button = document.getElementById("search-btn");

const errorEl = document.getElementById("error");
const card = document.getElementById("weather-card");

const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

/* =========================
   FETCH WEATHER DATA
========================= */
async function getWeather(city) {
  try {
    errorEl.textContent = "";
    card.classList.add("hidden");

    if (!city) throw new Error("City name cannot be empty");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    renderWeather(data);

  } catch (err) {
    showError(err.message);
  }
}

/* =========================
   RENDER DATA
========================= */
function renderWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temp.textContent = `Temperature: ${data.main.temp} °C`;
  desc.textContent = `Condition: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind: ${data.wind.speed} m/s`;

  card.classList.remove("hidden");
}

/* =========================
   ERROR HANDLING
========================= */
function showError(message) {
  errorEl.textContent = message;
}

/* =========================
   EVENT LISTENER (SEARCH)
========================= */
button.addEventListener("click", () => {
  getWeather(input.value.trim());
});

/* Enter key support */
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather(input.value.trim());
  }
});