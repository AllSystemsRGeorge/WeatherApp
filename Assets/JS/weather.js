
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
};


function loadCities() {
    var storedCities = JSON.parse(localStorage.getItem(pastCities));
    if (storedCities) {
        pastCities = storedCities;
    }
};

function storeCities() {
    if (city) {
        return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    }
};


function buildURLFromId(id) {
    return `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}`;
};

function displayCities(pastCities) {
    cityList.empty();
    pastCities.splice(5);
    let sortedCities = [...pastCities];
    sortedCities.sort(compare);
    sortedCities.forEach(function (location) {
        let cityDiv = $('<div>').addClass('col-12 city');
        let cityBtn = $('<button>').adddClass('btn btn-primary city-btn').text.(location.city);
        cityDiv.append(cityBtn);
        cityList.append(cityDiv);
    });
};

function setUVIndexColor(uvi) {
    if (uvi < 3) {
        return 'green';
    } else if (uvi >= 3 && uvi < 6) {
        return 'yellow';
    } else if (uvi >= 6 && uvi < 8) {
        return 'orange';
    } else if (uvi >= 8 && uvi < 11) {
        return 'red';
    } else return 'purple';
};

function searchWeather(queryURL) {
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {

        let cities = response.name;
        let id = response.id;

        if (pastCities[0]) {
            pastCities = $.grep(pastCities, function (storedCity) {
                return id !== storedCity.id;
            })
        }
        pastCities.unshift({ city, id });
        storeCities();
        displayCities(pastCities);

        city.text(response.name);
        let formatDate = moment.unix(response.dt).format('L');
        date.text(formatDate);
        let Icon = response.weather[0].icon;
        weatherIcon.attr('src', `http://openweathermap.org/img/wn/${weatherIcon}.png`).attr('alt', response.weather[0].description);
        temperature.html(((response.main.temp - 273.15) * 1.8 + 32).toFixed(1));
        humidity.text(response.main.humidity);
        wind.text((response.wind.speed * 2.237).toFixed(1));

    })
}