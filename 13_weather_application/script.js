const apiKey = "CW4KYU9L9MKVHBS6KHLJPTGVV";

async function getWeather(){

const city = document.getElementById("cityInput").value;

if(city === ""){
alert("Enter city name");
return;
}

const url =
`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

try{

const response = await fetch(url);

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

displayCurrentWeather(data);

displayForecast(data);

}

catch(error){

document.getElementById("weatherResult").innerHTML =
`<p>${error.message}</p>`;

}

}



function displayCurrentWeather(data){

const today = data.days[0];

const result = document.getElementById("weatherResult");

result.innerHTML = `
<h2>${data.resolvedAddress}</h2>

<p><strong>Temperature:</strong> ${today.temp} °C</p>

<p><strong>Humidity:</strong> ${today.humidity}%</p>

<p><strong>Wind Speed:</strong> ${today.windspeed} km/h</p>

<p><strong>Condition:</strong> ${today.conditions}</p>
`;

}



function displayForecast(data){

const forecastContainer = document.getElementById("forecast");

forecastContainer.innerHTML = "";

for(let i=1;i<=5;i++){

const day = data.days[i];

const card = `
<div class="forecast-card">

<p><strong>${day.datetime}</strong></p>

<p>Temp: ${day.temp} °C</p>

<p>Humidity: ${day.humidity}%</p>

<p>${day.conditions}</p>

</div>
`;

forecastContainer.innerHTML += card;

}

}