
var apiKey = '9c522f3da8ba41a607c0a5a49b9d3c03';

geoCode('Palo Alto');

function geoCode(city) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data.weather);
            weatherSearch(data.coord.lon, data.coord.lat);
            console.log(data);
        })
};

function weatherSearch(lon, lat) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayWeather(data, city);

            console.log(data);
    })
};

function displayWeather(data, city) {

}


// display Weather Function

// function to handle displaying all the weather
// to empty the container div when entering the html
// display current weather (in its own container)
// date, icon, temp, wind, humditiy, uv index (color)
// target div to put the current weather in
// create elements and add the data from the fetch data
// Append the elements to the appropriate div

// 5 day forecast
// For loop
// Display 

// $("<p>').text(`Temp: ${data.current.temp} \xB0F`);
// let UVI = data.current.uvi;
// if (UVI < 3) {
    // level = 'low'

// search button event
// prevent default
// value from the search input and store it in a variable
// value of the input back into an empty string
// call your first api to start the search

// function to handle local storage
// functon to handle 

