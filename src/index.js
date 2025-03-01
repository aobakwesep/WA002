function showTemp(response) {
let temperatureElement = document.querySelector("#temperature");
let temperature = response.data.temperature.current;
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);
let iconElement = document.querySelector("#icon");

cityElement.innerHTML = response.data.city;
timeElement.innerHTML = formatDate(date);
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
temperatureElement.innerHTML = Math.round(temperature); 
iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon"/>`
getForecast(response.data.city);
}

function formatDate(date) {
 
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

if (minutes < 10) {
  minutes = `0${minutes}`;
}

  return `${day} ${hours}:${minutes}`;
}


function searchCity(city) {
let apiKey = "5c8e18035abacoef369tb23f0434da2c";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemp);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
 let date = new Date(timestamp * 1000);
 let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 

 return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "5c8e18035abacoef369tb23f0434da2c"
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}


function displayForecast(response) {
  
  let forecastHtml = "";
  
  
  response.data.daily.forEach(function(day, index) {
    if (index < 5) {
    forecastHtml =
      forecastHtml +
      `
       <div class="forecast-day">
                    <div class="forecast-weekday">${formatDay(day.time)}</div>
                    <img src="${day.condition.icon_url}" class="forecast-icon"/>
                    <div class="forecast-temps">
                    <div class="forecast-temp">
                    <strong>${Math.round(day.temperature.maximum)}º</strong>
                    </div>
                    <div class="forecast-temp">${Math.round(day.temperature.minimum)}º</div>
                    </div>
                </div>
    `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;}

  let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Pretoria");

