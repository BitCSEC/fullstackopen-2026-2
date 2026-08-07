import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric'
const api_key = import.meta.env.VITE_WEATHER_KEY

const getAll = () => {
    const request = axios.get(`${baseURL}/all`)
    return request
        .then(response => response.data)
}

const getWeather = (country) => {
    const [lat, lon] = country.capitalInfo.latlng 
    const request = axios.get(`${weatherURL}&lat=${lat}&lon=${lon}&appid=${api_key}`)
    return request
        .then(response => response.data)
}

export default { getAll, getWeather }
