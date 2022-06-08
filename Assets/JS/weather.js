
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
            let container = $('#today')
            let cityName = $('<h2>').text(`${data.city + currentDate}`)
            let foreImg =$('<img>').attr('src', iconLink);
            let foreTempH = $('<p>').text(`High: ${data.daily[i].temp.max} \xB0F`);
            let foreTemL = $('<p>').text(`Low: ${data.daily[i].temp.min} \xB0F`);
            let foreWind = $('<p>').text(`Wind: ${data.daily[i].wind_speed} \MPH`);
            let foreHumidity =  $('<p>').text(`Low: ${data.daily[i].humdity}%`);
            container.append(cityName, foreImg, foreTemp, foreWind, foreHumidity)
            foreCard.append(foreDate, foreImg, foreTemp, foreTempL, foreWind, foreHumidity);
            foreDiv.append(foreCard);

            localStorage.setItem('city', JSON.stringify(data.city));
 
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




