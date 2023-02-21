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

let currentData = new Date();

// current date⬇️

function getFormattedDate(date) {
  let weekDay = days[date.getDay()];
  let todayDate = date.getDate();
  let month = months[date.getMonth()];

  return `${weekDay}, ${todayDate} ${month}`;
}

document.querySelector("#todayDate").innerHTML = getFormattedDate(currentData);

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
document.querySelector("#timeNow").innerHTML = getFormattedTime(currentData);

// current time⬆️

// Searching for a new city⬇️
function updateAfterSearching(response) {
  document.querySelector(`#temperatureNow`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
}

function updateWeather(userCity) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
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

updateWeather("Berlin");
