Weather Forecast Application
This project is a weather forecast application that provides weather data for any searched city. It fetches weather details using the OpenWeatherMap API, displays the weather for today and the next 5 days, and stores previous searches in a dropdown for quick access. The app also has a "Use Current Location" button to fetch the user's current weather data.

Features:

Search Weather by City: Users can search for the weather in any city using the search bar.
5-Day Forecast: The app displays the current weather as well as the forecast for the next 5 days.
Current Location Weather: A button allows users to fetch the weather based on their current location.
Persistent Search History: The app saves previously searched cities and allows users to quickly select them from a dropdown menu.
Responsive Design: The layout is responsive and adapts to different screen sizes using TailwindCSS.

Table of Contents:

Installation
Usage
Technologies Used
Folder Structure
Features Explanation
API Reference
Contributing
License
Installation
Prerequisites
Node.js (optional for running a local development server)
A modern web browser (Chrome, Firefox, etc.)
Steps
Clone this repository:


git clone https://github.com/your-username/weather-forecast-app.git
Navigate to the project directory:

bash
Copy code
cd weather-forecast-app
Open index.html in your browser to view the application.

Usage:

Search for a City
Type the name of a city in the search bar and click the "Search" button.
The current weather and 5-day forecast for that city will be displayed.
The city will be saved in a dropdown for future quick access.
Use Current Location
Click the location button (with the location icon) to get the weather for your current location.
Make sure location access is enabled in your browser.
Access Previous Searches
Once a city is searched, it will appear in the dropdown next to the location button.
You can select a city from the dropdown to view its weather data again.
Clearing Local Storage (Optional)
To clear previously stored weather data, open the browser's Developer Tools and clear local storage under the "Application" tab.

Technologies Used:

HTML5: Structure of the web application.
CSS (TailwindCSS): Styling and responsive design.
JavaScript (ES6): Fetching weather data and updating the DOM.
OpenWeatherMap API: Used for retrieving weather data for cities and geographical coordinates.
LocalStorage: Stores previous search history to persist weather data.
Folder Structure
weather-forecast-app/
│
├── index.html           # Main HTML file
├── style.css            # Tailwind CSS for styling
├── app.js               # JavaScript logic
├── README.md            # Project description and usage
└── assets/              # Images, icons, and other assets
Features Explanation
1. Search Weather by City
Users can type in the name of any city worldwide and view the current temperature, weather conditions, and a 5-day forecast.
The temperature is converted from Kelvin to Celsius.
2. Current Location Button
The "Use Current Location" button fetches weather data based on the user's current latitude and longitude using the browser's navigator.geolocation feature.
3. Persistent Search History (LocalStorage)
Every search is saved in the browser's localStorage.
A dropdown near the location button displays previously searched cities, allowing users to quickly reload their weather data.
4. Responsive Design
TailwindCSS is used to ensure the app adapts to various screen sizes, providing an optimal user experience on mobile, tablet, and desktop devices.
API Reference
OpenWeatherMap API
This project uses the OpenWeatherMap API to retrieve weather information. Below are the key endpoints:

Geocoding API: Converts city names into geographic coordinates (latitude and longitude).

Example:

GET http://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={API key}
Weather Forecast API: Fetches 5-day weather forecasts for a given city or coordinates.

Example:

GET https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
You must sign up for an API key from OpenWeatherMap.
Contributing
Contributions are welcome! Here's how you can help:

Fork this repository.
Create a new branch (git checkout -b feature/new-feature).
Make your changes and commit them (git commit -am 'Add new feature').
Push to the branch (git push origin feature/new-feature).
Create a new Pull Request.
