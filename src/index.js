// current date⬇️

function getFormattedDate(date) {
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
  let weekDay = days[date.getDay()];
  let todayDate = date.getDate();
  let month = months[date.getMonth()];

  return `${weekDay}, ${todayDate} ${month}`;
}

document.querySelector("#todayDate").innerHTML = getFormattedDate(new Date());

// current date⬆️

// current time⬇️

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
document.querySelector("#timeNow").innerHTML = getFormattedTime(new Date());

// current time⬆️

// Searching for a new city⬇️
function updateAfterSearching(response) {
  celciusTemperature = Math.round(response.data.temperature.current);
  document
    .querySelector(`#currentIcon`)
    .setAttribute(`src`, `${response.data.condition.icon_url}`);
  document
    .querySelector(`#currentIcon`)
    .setAttribute(`alt`, `${response.data.condition.icon}`);
  document.querySelector("#weatherDescription").innerHTML =
    response.data.condition.description;
  document.querySelector(`#temperatureNow`).innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#fahrenheit-link`).classList.remove(`active`);
  document.querySelector(`#celcius-link`).classList.add(`active`);
}

function updateWeather(userCity) {
  let unit = `metric`;
  let apiKey = "858to1de0c4c3648a5d4b7de0304febb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${userCity}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(updateAfterSearching);
}

function searchCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#userCity-input").value;
  updateWeather(userCity);
}

document.querySelector("#search-form").addEventListener("submit", searchCity);
// Searching for a new city ⬆️

// click on the "current"-button⬇️
function getCurrentLocation(position) {
  let unit = `metric`;
  let apiKey = `858to1de0c4c3648a5d4b7de0304febb`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(updateAfterSearching);
}

function getGeoposition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

document
  .querySelector(`.current-btn`)
  .addEventListener("click", getGeoposition);

// click on the "current"-button⬇⬆️

// unit conversion⬇️
function convertToFahrenheit(event) {
  event.preventDefault();
  document.querySelector(`#temperatureNow`).innerHTML = Math.round(
    (celciusTemperature * 9) / 5 + 32
  );
  document.querySelector(`#celcius-link`).classList.remove(`active`);
  document.querySelector(`#fahrenheit-link`).classList.add(`active`);
}
let celciusTemperature = null;

function convertToCelcius(event) {
  event.preventDefault();
  document.querySelector(`#temperatureNow`).innerHTML = celciusTemperature;
  document.querySelector(`#fahrenheit-link`).classList.remove(`active`);
  document.querySelector(`#celcius-link`).classList.add(`active`);
}

document
  .querySelector(`#fahrenheit-link`)
  .addEventListener(`click`, convertToFahrenheit);

document
  .querySelector(`#celcius-link`)
  .addEventListener(`click`, convertToCelcius);
// unit conversion⬆️

updateWeather("Berlin");
