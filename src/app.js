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
  let cityName = response.data.name;
  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.innerHTML = cityName;
  let Temperature = Math.round(response.data.main.temp);
  let TemperatureElement = document.querySelector("#tempereture-now");
  TemperatureElement.textContent = Temperature;
  let weatherDesciption = response.data.weather[0].description;
  let weatherDesciptionElement = document.querySelector("#weather-description");
  weatherDesciptionElement.innerHTML = weatherDesciption;
  let windSpeed = response.data.wind.speed;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = windSpeed;
}

function searchCity(city) {
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
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
  let apiKey = "f5e814a04eddfab1740f07bf0328eee2";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
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

searchCity("Brussels");

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
