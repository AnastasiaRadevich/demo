import getForecast from "./Forecast.js";

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.weather__temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.weather__city');

export default async function getWeather() {
    const urlToday = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&&appid=fe8940aec30a368f7e80bae77afe9473&units=metric`;
    const resToday = await fetch(urlToday);
    const dataToday = await resToday.json();
    weatherIcon.className = 'weather-icon owf';
    if (dataToday.cod !== '404') {
        temperature.textContent = `${Math.round(dataToday.main.temp)}°C`;
        weatherDescription.textContent = dataToday.weather[0].description;
        weatherIcon.style.display = 'block';
        weatherDescription.style.display = 'block';
        weatherIcon.classList.add(`owf-${dataToday.weather[0].id}`);
    } else {
        temperature.textContent = `City ${city.textContent} not found`;
        weatherIcon.style.display = 'none';
        weatherDescription.style.display = 'none';
    }
    await getForecast()
}

function getCity() {
    if (localStorage.getItem('city') === null || localStorage.getItem('city') === '') {
        city.textContent = 'Mogilev';
    } else {
        city.textContent = localStorage.getItem('city');
    }
}

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which === 13 || e.keyCode === 13) {
            localStorage.setItem('city', e.target.innerText);
            city.blur();
        }
    } else {
        localStorage.setItem('city', e.target.innerText);
        if (city.textContent === '' || city.textContent === '[]') {
            city.textContent = '[Enter City]';
        }
    }
}

city.addEventListener('click', () => {
    city.textContent = '';
});

getCity();
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
