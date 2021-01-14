export default async function getForecast() {
    const city = document.querySelector('.weather__city');
    const today = new Date();
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city.textContent}&lang=en&appid=fe8940aec30a368f7e80bae77afe9473&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    const coords = data.city.coord;
    const lat = coords.lat;
    const long = coords.lon;
    const urlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&lang=en&appid=fe8940aec30a368f7e80bae77afe9473&units=metric`;
    const resForecast = await fetch(urlForecast);
    const dataForecast = await resForecast.json();
    const forecastDates = document.querySelectorAll('.forecast-item__date');
    const forecastTemperatures = document.querySelectorAll('.forecast-item__temperature');
    const forecastIcons = document.querySelectorAll('.forecast-item__icon');

    let arrDates = [];
    let arrTemperatures = [];
    let arrIcons = [];

    function getDate() {
        for (let i = 1; i < 8; i++) {
            let nextDay = new Date(today);
            nextDay.setDate(today.getDate()+i);
            arrDates.push(`${nextDay.getDate()}.${addZero(nextDay.getMonth() + 1)}.${nextDay.getFullYear()}`)
        }
    }
    function getTemperature() {
        for (let i = 1; i < 8; i++) {
            const temperature = Math.round(dataForecast.daily[i].temp.day);
            arrTemperatures.push(temperature + '°C')
        }
    }
    function getIcons() {
        for (let i = 1; i < 8; i++) {
            const icon = dataForecast.daily[i].weather[0].id;
            arrIcons.push(icon)
        }
    }
    function setInfo(data, array) {
        data.forEach((item, index) => {
            item.textContent = array[index]
        })
    }
    function setIcons(data, array) {
        data.forEach((item, index) => {
            item.classList.add(`owf-${array[index]}`)
        })
    }

    getDate()
    setInfo(forecastDates, arrDates)
    getTemperature()
    setInfo(forecastTemperatures, arrTemperatures)
    getIcons()
    setIcons(forecastIcons, arrIcons)
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
