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

document.querySelector("#today-date").innerHTML = getFormattedDate(new Date());

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
document.querySelector("#time-now").innerHTML = getFormattedTime(new Date());

// current time⬆️

// Forecast⬇️

// one day forecast⬇️
function formatTime(time) {
  let date = new Date(time * 1000);
  let hours = date.getHours() - 1;
  return `${hours}:00`;
}

function displayOneDayForecast(response) {
  let dayForecast = document.querySelector(`#today-forecast`);
  let forecast = response.data.list;
  let dayForecastHTML = `<div class="row">`;
  forecast.forEach(function (time, index) {
    if (index < 6) {
      dayForecastHTML =
        dayForecastHTML +
        `
      <div class="col-2">
      <div class="card">
      <div class="card-body">
      <p class="time">${formatTime(time.dt)}</p>
      <img src="http://openweathermap.org/img/wn/${
        time.weather[0].icon
      }@2x.png" alt="" class="day-forecast-icon col-4" id="forecast-icon" />
      <p class="forecast-description">${time.weather[0].main}</p>
      <p class="temperature">${Math.round(time.main.temp)}℃</p>
      </div>
      </div>
      </div>
      `;
    }
  });
  dayForecastHTML = dayForecastHTML + `</div>`;
  dayForecast.innerHTML = dayForecastHTML;
}
// one day forecast⬆️

// week forecast⬇️

// function formatDay(time) {
//   let date = new Date();
//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   let weekDay = days[date.getDay()];
//   return weekDay;
// }

{
  /* <div class="row">
  <div class="col-4">
    <div class="card">
      <div class="card-body">
        <p class="time">08:00</p>
        <i class="fa-solid fa-sun"></i>
        <p class="temperature">21℃</p>
      </div>
    </div>
  </div>
  <div class="col-4">
    <div class="card">
      <div class="card-body">
        <p class="time">15:00</p>
        <i class="fa-solid fa-sun"></i>
        <p class="temperature">32℃</p>
      </div>
    </div>
  </div>
  <div class="col-4">
    <div class="card">
      <div class="card-body">
        <p class="time">22:00</p>
        <i class="fa-solid fa-moon"></i>
        <p class="temperature">26℃</p>
      </div>
    </div>
  </div>
</div>; */
}

// function displayWeekForecast(response) {
//   let weekForecast = document.querySelector(`#week-forecast`);
//   let forecast = response.data.list;
//   let weekForecastFirstRowHTML = `<div class="day-firstrow" id="firstRowWeekForecast">`;
//   forecast.forEach(function (day, index) {
//     if (index < 3) {
//       weekForecastFirstRowHTML =
//         weekForecastFirstRowHTML +
//         `<div class="day">
//               <p class="day-name">${formatDay(day.dt)}${day.dt_txt}</p>
//               <p class="day-date">24 august</p>
//               <div class="day-weather" id="day-weather">
//               </div>
//             </div>
//       `;
//     }
//   });
//   weekForecastFirstRowHTML = weekForecastFirstRowHTML + `</div>`;
//   weekForecast.innerHTML = weekForecastFirstRowHTML;
// }

// week forecast⬆️
function getForecast(coord) {
  let apiKey = `58a6775f97527351bf6c6966e209be39`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayOneDayForecast);
}

// Forecast⬆️

// Searching for a new city⬇️
function updateAfterSearching(response) {
  document
    .querySelector(`#current-icon`)
    .setAttribute(
      `src`,
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector(`#current-icon`)
    .setAttribute(`alt`, `${response.data.weather[0].description}`);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(`#temperature-now`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  getForecast(response.data.coord);
}

function updateWeather(userCity) {
  let apiKey = `d234bca024b8fc4b39cfea2a5b06888d`;
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
  let apiKey = `d234bca024b8fc4b39cfea2a5b06888d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
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
