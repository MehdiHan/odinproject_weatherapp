const dateContainer = document.querySelector('.date__container');
const weatherHeader = document.querySelector('.weather__header');
const weatherIcon = document.querySelector('.weather__icon');
const weatherTemperature = document.querySelector('.weather__temperature');
const weatherWind = document.querySelector('.weather__wind');
const weatherHumidity = document.querySelector('.weather__humidity');
const searchInput = document.querySelector('input');
const today = new Date(Date.now());
const week = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const year = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const setTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours} : ${minutes}`;
};
const setDate = (date) => {
  const calendarDay = date.getDay();
  const calendarDate = date.getDate();
  const calendarMonth = date.getMonth();
  const conditionDate = calendarDate < 10 ? `0${calendarDate}` : calendarDate;
  return `${week[calendarDay]}, ${conditionDate} ${year[calendarMonth]}`;
};
const createDateHTMLElement = (date) => {
  const dayContainer = document.createElement('span');
  const timeContainer = document.createElement('span');
  dayContainer.classList.add('date__day');
  timeContainer.classList.add('date__time');
  dayContainer.textContent = setDate(date);
  timeContainer.textContent = setTime(date);
  dateContainer.append(dayContainer);
  dateContainer.append(timeContainer);
};
const createHeaderHTMLElement = (city, country, description) => {
  const headerCity = document.createElement('h2');
  const headerDescription = document.createElement('p');
  headerCity.textContent = `${city}, ${country}`;
  headerDescription.textContent = `${description}`;
  weatherHeader.append(headerCity);
  weatherHeader.append(headerDescription);
};
const createIconHTMLElement = (icon) => {
  const iconContainer = document.createElement('img');
  iconContainer.src = `img/${icon}.png`;
  weatherIcon.append(iconContainer);
};
const createParametersHTMLElement = (temperature, wind, humidity) => {
  const temperatureValue = document.createElement('span');
  const windValue = document.createElement('span');
  const humidityValue = document.createElement('span');
  temperatureValue.classList.add('weather__temperature--value');
  windValue.classList.add('weather__wind--value');
  humidityValue.classList.add('weather__humidity--value');
  temperatureValue.textContent = `${temperature} °C`;
  windValue.textContent = `${wind} km/h`;
  humidityValue.textContent = `${humidity} %`;
  weatherTemperature.append(temperatureValue);
  weatherWind.append(windValue);
  weatherHumidity.append(humidityValue);
};
createDateHTMLElement(today);
const onloadData = async () => {
  const URL =
    'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=7f266338b1f9124051cb91fb27d9b759';
  const response = await fetch(URL);
  const responseData = await response.json();
  handleData(responseData);
};
const updateData = async (event) => {
  if (event.key === 'Enter') {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&units=metric&appid=7f266338b1f9124051cb91fb27d9b759`;
    const response = await fetch(URL);
    const responseData = await response.json();
    const weatherHeader = document.querySelector('.weather__header h2');
    const weatherBaseline = document.querySelector('.weather__header p');
    const weatherIcon = document.querySelector('.weather__icon img');
    const weatherTemperature = document.querySelector(
      '.weather__temperature--value'
    );
    const weatherWind = document.querySelector('.weather__wind--value');
    const weatherHumidity = document.querySelector('.weather__humidity--value');
    const city = responseData.name;
    const cityCondition =
      city.startsWith('Arrondissement') === true
        ? city.slice(18, city.length)
        : city;
    weatherHeader.textContent = `${cityCondition}, ${responseData.sys.country}`;
    weatherBaseline.textContent = `${responseData.weather[0].description}`;
    weatherIcon.src = `img/${responseData.weather[0].icon}.png`;
    weatherTemperature.textContent = `${Math.round(responseData.main.temp)} °C`;
    weatherWind.textContent = `${Math.round(
      responseData.wind.speed * 3.6
    )} km/h`;
    weatherHumidity.textContent = `${responseData.main.humidity} %`;
  }
};
const handleData = (data) => {
  const city = data.name;
  const country = data.sys.country;
  const description = data.weather[0].description;
  const temperature = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const wind = Math.round(data.wind.speed * 3.6);
  const icon = data.weather[0].icon;
  createHeaderHTMLElement(city, country, description);
  createIconHTMLElement(icon);
  createParametersHTMLElement(temperature, wind, humidity);
};

window.addEventListener('load', onloadData);
searchInput.addEventListener('keyup', updateData);
