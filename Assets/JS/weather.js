
var apiKey = '9c522f3da8ba41a607c0a5a49b9d3c03';
var currentDate = moment().format('MM/DD/YY');
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

var city = $('h2#city');
var date = $('h3#date');
var weatherICon = $('img#weather-cion');
var temperature = $('span#temperature');
var humidity = $('span#humidity');
var wind = $('span#wind');
var uvIndex = $('span#uv-index');
var cityList = $('div.cityist');
var cityInput = $('#city-input');

let pastCities = [];

function compare(a, b) {
    var cityA = a.ity.toUpperCase();
    var cityB = b.city.toUpperCase();

    let comparison = 0;
    if (cityA > cityB) {
        comparison = 1;
    } else if (cityA < cityB) {
        comparison = -1;
    }
    return comparison;
}


function load()



