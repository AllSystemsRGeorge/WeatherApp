
var apiKey = '9c522f3da8ba41a607c0a5a49b9d3c03';
var inputVal = input.value;
var currentDate = moment().format('MM/DD/YY');
var url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
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

$('#search-btn').on('submit', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=> {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weatherlat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
            console.log(base);
        fetch(base).then((response) => {
        return response.json();
        })
        .then((data) => {
            const { temp } = data.main;
            const place = data.name;
            const { description, icon } = data.weather[0];
            let foreCard = $('#forecast')
            let foreImg =$('<img>').attr('src', iconLink);
            let foreTempH = $('<p>').text(`High: ${data.daily[i].temp.max} \xB0F`);
            let foreTemL = $('<p>').text(`Low: ${data.daily[i].temp.min} \xB0F`);
            let foreWind = $('<p>').text(`Wind: ${data.daily[i].wind_speed} \MPH`);
            let foreHumidity =  $('<p>').text(`Low: ${data.daily[i].humdity}%`);
            foreCard.append(foreDate, foreImg, foreTemp, foreTempL, foreWind, foreHumidity);
            foreDiv.append(foreCard);
 
        });
    });
    }
});

$('#search-btn').on('click', function(event) {
    event.preventDefault();
    let city = $('#search-input').val().trim().split(' ');
    for (i=0; i < city.length; i++) {
        city[i] = city[i][0].toUpperCase() + city[i].substr(1)
    };
    city = city.join('');
    geoCode(city)
});






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

