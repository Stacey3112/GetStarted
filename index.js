let now = new Date();

let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = now.getDate();
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
let month = months[now.getMonth()];
let time = document.querySelector(".currentTime");
time.innerHTML = `${hour}:${minutes}`;
let weekDay = document.querySelector(".dayOfWeek");
weekDay.innerHTML = `${day}`;
let nowMonth = document.querySelector(".currentMonth");
let nowDate = document.querySelector(".currentDate");
let nowData = document.querySelector(".currentData");
nowData.innerHTML = `${date}.${month}`;

function searchCity(event) {
  event.preventDefault();
  let apiKey = "13cbcecbda9856a9b604a0ab457846ec";
  let units = "metric";
  let city = document.querySelector(".search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  let searchInput = document.querySelector(".search");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${
      searchInput.value[0].toUpperCase() + searchInput.value.substring(1)
    }`;
  } else {
    h1.innerHTML = null;
  }
  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showWeather(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".change-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".weather-description").innerHTML =
    response.data.weather[0].main;

  document
    .querySelector(".icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".change-temperature");

  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".change-temperature");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector(".fgrad");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector(".cgrad");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
