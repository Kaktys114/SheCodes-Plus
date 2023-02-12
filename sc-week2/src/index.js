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
function updateCity(event) {
  event.preventDefault();
  let userCityName = document.querySelector("#userCity-input");
  let city = document.querySelector("#city");
  city.innerHTML = userCityName.value;
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", updateCity);

// Convert temperature
let temperature = document.querySelector("#temperatureNow");

function convertToFahrenheit(event) {
  event.preventDefault();
  temperature.innerHTML = `78℉`;
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  temperature.innerHTML = "22℃";
}

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", convertToCelcius);
