function showTemp(response) {
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");

cityElement.innerHTML = response.data.city;
temperatureElement.innerHTML = Math.round(response.data.temperature.current); 

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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Pretoria");
