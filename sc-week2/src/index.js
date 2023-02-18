let apiKey = `d234bca024b8fc4b39cfea2a5b06888d`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

function getFormattedDate(date) {
  let weekDay = days[date.getDay()];
  let todayDate = date.getDate();
  let month = months[date.getMonth()];

  return `${weekDay}, ${todayDate} ${month}`;
}

function getFormattedTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let currentData = new Date();

// current date
let date = document.querySelector("#todayDate");
date.innerHTML = getFormattedDate(currentData);

// current time
let time = document.querySelector("#timeNow");
time.innerHTML = getFormattedTime(currentData);

// Searching for a new city
function updateTemperature(response) {
  let temperature = document.querySelector(`#temperatureNow`);
  let searchTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = `${searchTemperature}℃`;
}

function updateAfterSearch(event) {
  event.preventDefault();
  let userCityName = document.querySelector("#userCity-input");
  let city = document.querySelector("#city");
  let searchCity = userCityName.value;
  city.innerHTML = searchCity;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemperature);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", updateAfterSearch);

// // Convert temperature
// let temperature = document.querySelector("#temperatureNow");

// function convertToFahrenheit(event) {
//   event.preventDefault();
//   temperature.innerHTML = `78℉`;
// }

// let fahrenheit = document.querySelector("#fahrenheit-link");
// fahrenheit.addEventListener("click", convertToFahrenheit);

// function convertToCelcius(event) {
//   event.preventDefault();
//   temperature.innerHTML = "22℃";
// }

// let celcius = document.querySelector("#celcius-link");
// celcius.addEventListener("click", convertToCelcius);

// current location
function showCurrentTemperature(response) {
  let city = document.querySelector("#city");
  let currentCity = response.data.name;
  city.innerHTML = currentCity;
  let temperature = document.querySelector(`#temperatureNow`);
  let currentTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = `${currentTemperature}℃`;
}

function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function getGeoposition() {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentButton = document.querySelector(`.current-btn`);
currentButton.addEventListener("click", getGeoposition);
