let urlCurrent = 'http://api.openweathermap.org/data/2.5/weather?q=Bitola&appid=7db647c64993683c50619ceceac3dfad&units=metric';
let currentCard = document.querySelector('.currentName');
let currentTemp = document.querySelector('.currentTemp');
let img = document.querySelector('.currentIcon')
let sky = document.querySelector('.sky');
let currentDate = document.querySelector('.currentDate')
let wind = document.querySelector('.wind');
let presure = document.querySelector('.presure');
let humidity = document.querySelector('.humidity');
let cloudiness = document.querySelector('.cloudiness')
const urlMoreDays = 'https://api.openweathermap.org/data/2.5/onecall?lat=41.030131380121944&lon=21.326870868646836&exclude=hourly,minutely,current&appid=7db647c64993683c50619ceceac3dfad&units=metric';
const search = document.querySelector('.fa-search');
const searchBar = document.querySelector('.searchBar');

// Get Request for current day
fetch(urlCurrent)
    .then((resp) => resp.json())
    .then(function (data) {

        currentDay(data);
  
    })
    .catch(function (error) {
        console.log(error);
    });

// Get Request for next 4 days
fetch(urlMoreDays)
    .then((resp) => resp.json())
    .then(function (dataMoreDays) {

        let nextDays = dataMoreDays.daily;
        nextDays.forEach((element, index) => {
            if (index != 0 && index <= 4) {
                krenar(element, index);
            }
        })
    })

    .catch(function (error) {
        console.log(error);
    });

// Functions

currentDay =(data) => {
    currentCard.innerHTML = `${data.name} , ${data.sys.country} `;
    const roundTemp = Math.floor(data.main.temp);
    currentTemp.innerHTML = roundTemp + '°';
    img.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    sky.innerHTML = data.weather[0].description;
    currentDate.innerHTML = dateConvert(data.dt);
    wind.innerHTML = `Wind ${data.wind.speed} m/s` ;
    presure.innerHTML = `Pressure  ${data.main.pressure} hPa`;
    humidity.innerHTML = `Humidity  ${data.main.humidity}% `;
    cloudiness.innerHTML = `Cloudiness ${data.clouds.all}%`
}

dateConvert = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[date.getDay()];
    const hour = date.getHours();
    let minute = date.getMinutes();
    if( minute >= 0 && minute<= 9) {
       minute=` 0${minute}`;
    }
    if(hour >=12 && hour <= 23 ) {

        return day + ' ' + hour + ':' + minute +' PM';
    }
    else  {
        return day + ' ' + hour + ':' + minute +' AM';
    } 
   
}

dateConvertNextDays = (time) => {
    const dateNextDays = new Date(time * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[dateNextDays.getDay()];
    return day;
}

krenar = (data, index) => {
    const card = document.querySelector(`.card-body${index}`);
    card.innerHTML = `<h5> ${dateConvertNextDays(data.dt)}</h5> <img class="imgMoreDays" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"> <p class="temp fs-4 mb-1">${Math.floor(data.temp.day)} ° </p> <p class="text-capitalize"> ${data.weather[0].description}</p>`;
}

search.addEventListener('click', function() {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&appid=7db647c64993683c50619ceceac3dfad&units=metric`;
    fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
        currentDay(data);
    })
    .catch(function (error) {
        console.log(error);
    });
})