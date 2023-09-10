function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[today.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[today.getMonth()];

  let todayDate = today.getDate();

  let year = today.getFullYear();

  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${todayDate} ${month} ${year}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
      <div class = "next-days-forecast-card">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img class = "next-day-weather-picture"
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          img.setAttribute("alt", response.data.condition.icon);
          width="45"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"><strong>${Match.round(
            forecastDay.temperature.maximum
          )}°</strong> | </span>
          <span class="weather-forecast-temperature-min">${Match.round(
            forecastDay.temperature.minimum
          )}°</span>
        </div>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeatherConditions(response) {
  let cityName = response.data.city;
  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.innerHTML = cityName;
  celsiusTemp = response.data.temperature.current;
  let temperature = Math.round(celsiusTemp);
  let temperatureElement = document.querySelector("#tempereture-now");
  temperatureElement.textContent = temperature;
  let weatherDesciption = response.data.condition.description;
  let weatherDesciptionElement = document.querySelector("#weather-description");
  weatherDesciptionElement.innerHTML = weatherDesciption;
  let humidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = windSpeed;
  let weatherIconElement = document.querySelector("#current-weather-icon");
  weatherIconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherIconElement.setAttribute("alt", response.data.condition.description);
}

function handleTheForecast(coordinates) {
  let apiKey = "9a4cbff04f4e654ca4teaa03bc88aoaf";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
  let apiKey = "9a4cbff04f4e654ca4teaa03bc88aoaf";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function handleTheCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-name-form");
  let h1 = document.querySelector("h1");
  h1.textContent = input.value;
  let city = input.value;
  searchCity(city);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempereture-now");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempereture-now");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  celsiusTemperature.classList.add("active");
  fahrenheitTemperature.classList.remove("active");
}

let currentDate = document.querySelector("#currentDate");
let today = new Date();
currentDate.innerHTML = formatDate(today);

let form = document.querySelector("#city-name-form");
form.addEventListener("submit", handleTheCity);

let button = document.querySelector("#city-name-button");
button.addEventListener("click", handleTheCity);

let celsiusTemp = null;

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", convertToFahrenheit);

let celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click", convertToCelcius);

searchCity("Verona");

displayForecast();
