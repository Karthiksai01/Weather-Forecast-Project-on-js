const textbar=document.getElementById("search-bar");
const button=document.getElementById("btn");
const weathercardsdiv=document.querySelectorAll(".cards");
const TodaysweatherDiv=document.querySelector(".todaysdata");
const additionalDataDiv = document.querySelector(".additionaldata"); // Select additional data section
const cityDropdown = document.getElementById("city-dropdown"); // Dropdown menu



const API_key="dbccdcffaed1df5a26592501ad63baf8";
const updateWeatherCard=(weatheritem)=>{
    return `<div class="bg-cyan-200 p-5 rounded-lg text-center">
            <img class="mx-auto mb-2 w-14" src=https://openweathermap.org/img/wn/${weatheritem.weather[0].icon}@2x.png alt="Weather icon">
            <p class="text-lg">(${weatheritem.dt_txt.split(" ")[0]})</p>
            <h4>Temp:${(weatheritem.main.temp-273.15).toFixed(2)}°C</h4>
            <h4>Wind:${weatheritem.wind.speed}°C</h4>
            <p class="text-md">Humidity:${weatheritem.main.humidity}%</p>
          </div>`;

}
const updateTodaysWeather = (weatheritem, cityname) => {
    TodaysweatherDiv.innerHTML = `
        <div class="text-5xl">${(weatheritem.main.temp - 273.15).toFixed(2)}°C</div>
        <img class="mx-auto mb-2 w-30" src=https://openweathermap.org/img/wn/${weatheritem.weather[0].icon}@2x.png alt="Weather icon">
        <div class="text-right">
            <p class="text-xl">${cityname}</p>
            <p class="text-lg">Feels like ${(weatheritem.main.feels_like - 273.15).toFixed(2)}°C</p>
            <p class="text-sm">${weatheritem.weather[0].description}</p>
        </div>`;
        updateAdditionalData(weatheritem);
        storeCityData(cityname, weatheritem);

};

// Function to update today's additional weather data
const updateAdditionalData = (weatheritem) => {
    additionalDataDiv.innerHTML = `
        <div class="bg-cyan-200 p-5 text-center rounded-lg w-1/3 text-xl">Wind: ${weatheritem.wind.speed} m/s</div>
        <div class="bg-cyan-200 p-5 text-center rounded-lg w-1/3 text-xl">Pressure: ${weatheritem.main.pressure} hPa</div>
        <div class="bg-cyan-200 p-5 text-center rounded-lg w-1/3 text-xl">Humidity: ${weatheritem.main.humidity}%</div>`;
};
// Function to get city name from latitude and longitude
const getCityNameFromCoords = (lat, lon) => {
    const GEOCODING_API = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_key}`;
    
    return fetch(GEOCODING_API)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                return data[0].name; // Return the city name
            } else {
                throw new Error('City name not found');
            }
        })
        .catch(error => {
            console.error('Error fetching city name:', error);
            throw error;
        });
};

const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
        // Get the user's current location coordinates
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;

            // Now, fetch the weather data for the current location
            getCityNameFromCoords(latitude, longitude)
                .then(cityname => {

                // Now fetch the weather data using the city name
                    weatherdata(cityname, latitude, longitude);
            })
            .catch(error => {
                alert("Unable to retrieve city name");
            });

        }, (error) => {
            // Handle error if location is not accessible
            alert("Unable to retrieve your location. Please allow location access.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

const weatherdata = (cityname,lat,lon)=>{
    const weather_URL=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;
    fetch(weather_URL).then(response=>response.json()).then(data=>{
        const forecastDays=[];
        const fivedaysForecast = data.list.filter(forecast => {
        const forecastData=new Date(forecast.dt_txt).getDate();
            if(!forecastDays.includes(forecastData)){
                return forecastDays.push(forecastData);
            }
           
        });
        textbar.value="";

        if (fivedaysForecast.length > 0) {
            updateTodaysWeather(fivedaysForecast[0], cityname);
        }

        // Clear previous content in the cards
        weathercardsdiv.forEach(card => card.innerHTML = "");



        fivedaysForecast.forEach((weatheritem, index)=> {
            if (weathercardsdiv[index]) { // Check if the index exists in the card list
                weathercardsdiv[index].innerHTML = updateWeatherCard(weatheritem); // Update the card content
            }
              //weathercardsdiv.insertAdjacentHTML("beforeend",updateWeatherCard(weatheritem)); // Update the card content
            

        });

    }).catch(()=>{
        alert("An error occured");
    });
}
// Function to store city weather data in localStorage
const storeCityData = (cityname, weatheritem) => {
    const storedData = JSON.parse(localStorage.getItem("weatherData")) || [];
    
    // Avoid duplicate city entries
    if (!storedData.some(data => data.cityname === cityname)) {
        storedData.push({ cityname, weatheritem });
        localStorage.setItem("weatherData", JSON.stringify(storedData));
        addCityToDropdown(cityname);
    }
};

// Function to add city to dropdown
const addCityToDropdown = (cityname) => {
    const option = document.createElement("option");
    option.value = cityname;
    option.textContent = cityname;
    cityDropdown.appendChild(option);
};

// Populate the dropdown from localStorage
const populateDropdown = () => {
    const storedData = JSON.parse(localStorage.getItem("weatherData")) || [];
    storedData.forEach(data => {
        addCityToDropdown(data.cityname);
    });
};

// Fetch city weather from dropdown selection
cityDropdown.addEventListener("change", () => {
    const selectedCity = cityDropdown.value;
    const storedData = JSON.parse(localStorage.getItem("weatherData")) || [];
    const cityData = storedData.find(data => data.cityname === selectedCity);
    if (cityData) {
        updateTodaysWeather(cityData.weatheritem, cityData.cityname);
    }
});

// Initialize by populating dropdown
populateDropdown();


const getcity=()=>{
    const cityname=textbar.value.trim();
    if(!cityname) return;
    const GEOCODING_API=`http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${API_key}`;
    fetch(GEOCODING_API).then(response=>response.json()).then(data=>{
        if(!data.length)return alert(`No coordinates found for ${cityname}`);
        const {name,lat,lon}=data[0];
        weatherdata(name,lat,lon);
       
    }).catch(()=>{
        alert("An error occured")
    });

}
// Add event listener for search button
button.addEventListener("click", getcity);
document.getElementById('location').addEventListener('click', getCurrentLocationWeather);