 // API key
var apiKey = '9c522f3da8ba41a607c0a5a49b9d3c03';

// The global variables to make sure they appear in HTML
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

function urlFromInputs(city) {
    if (city) {
        return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    }
}

function urlFromId(id) {
    return `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}`;
};

// Here is the function to display cities when searching for them
function displayCities(pastCities) {
    cityList.empty();
    pastCities.splice(5);
    let sortedCities = [...pastCities];
    sortedCities.sort(compare);
    sortedCities.forEach(function (location) {
        let cityDiv = $('<div>').addClass('col-12 city');
        let cityBtn = $('<button>').adddClass('btn btn-primary city-btn').text.location.city;
        cityDiv.append(cityBtn);
        cityList.append(cityDiv);
    });
};


// Here is the function that displays the UVI colors
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
        let icon = response.weather[0].icon;
        weatherIcon.attr('src', `http://openweathermap.org/img/wn/${weatherIcon}.png`).attr('alt', response.weather[0].description);
        temperature.html(((response.main.temp - 273.15) * 1.8 + 32).toFixed(1));
        humidity.text(response.main.humidity);
        wind.text((response.wind.speed * 2.237).toFixed(1));

        let lat = response.coord.lat;
        let lon = reponse.coord.lon;
        let queryURLAll = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        $.ajax({
            url: queryURLAll,
            method: 'GET'
        }).then(function (response) {
            let uvi = response.current.uvi;
            let uvColor = setUVIndexColor(uvi);
            uviIndex.text(response.current.uvi);
            uviIndex.attr('style', `background-color: ${uvColor}; color: ${uvColor === "yellow" ? "black" : "white"}`);
            let fiveDay = responsee.daily;

            for (let i = 0; i <= 5; i++) {
                let currDay = fiveDay[i];
                $(`div.day-${i} .card-title`).text(moment.unix(currDay.dt).format('L'));
                $(`div.day-${i} .fiveDay-img`).attr( 'src',
                `http://openweathermap.org/img/wn/${currDay.weather[0].icon}.png`
            ).attr('alt', currDay.weather[0].description);
            $(`div.day-${i} .fiveDay-temp`).text(((currDay.temp.day - 273.15) * 1.8 + 32).toFixed(1));
            $(`div.day-${i} .fiveDay-humid`).text(currDay.humidity);
            }
    });
});
};

function displayLastSearchedCity() {
    if (pastCities[0]) {
        let queryURL = urlFromId(pastCities[0].id);
        searchWeather(queryURL); 
    } else {
        let queryURL = urlFromInputs('Palo Alto');
        searchWeather(queryURL);
    }
};

$('#search-btn').on('click', function (event) {
    event.preventDefault();

    let city = cityInput.val().trim();
    city = city.replace(' ', '%20');

    cityInput.val('');

    if (city) {
        let queryURL = urlFromId(city);
        searchWeather(queryURL);
    }
});

$(document).on('click', 'button.city-btn', function(event) {
    let clickedCity = $(this).text();
    let foundCity = $.grep(pastCities, function (storedCity) {
        return clickedCity === storedCity.city;
    })
    let queryURL = urlFromId(foundCity[0].id)
    searchWeather(queryURL);
});

loadCities();
displayCities(pastCities);

displayLastSearchedCity();
