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

function showWeatherConditions(response) {
  let cityName = response.data.city;
  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.innerHTML = cityName;
  let Temperature = Math.round(response.data.temperature.current);
  let TemperatureElement = document.querySelector("#tempereture-now");
  TemperatureElement.textContent = Temperature;
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

function handlePosition(position) {
  let apiKey = "9a4cbff04f4e654ca4teaa03bc88aoaf";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentDate = document.querySelector("#currentDate");
let today = new Date();
currentDate.innerHTML = formatDate(today);

let form = document.querySelector("#city-name-form");
form.addEventListener("submit", handleTheCity);

let button = document.querySelector("#city-name-button");
button.addEventListener("click", handleTheCity);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);

searchCity("Venice");

//function convertToFahrenheit(event) {
//  event.preventDefault();
//  let celsiusTemperature = document.querySelector("#tempereture-now");
//  celsiusTemperature.textContent = "18°";
//}

//let celsiusTemperature = document.querySelector("#celsius-link");
//celsiusTemperature.addEventListener("click", convertToFahrenheit);

//function convertToCelcius(event) {
//  event.preventDefault();
//  let fahrenheitTemperature = document.querySelector("#tempereture-now");
//  fahrenheitTemperature.textContent = "66°";
//}

//let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
//fahrenheitTemperature.addEventListener("click", convertToCelcius)
