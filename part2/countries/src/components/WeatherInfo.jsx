const iconURL = "https://openweathermap.org/payload/api/media/file"  

const WeatherInfo = ({ weather }) => {
    if (weather === undefined) {
        return null
    }

    return (
        <>
            <h2>Weather in {weather.name}</h2>
            <p>Temperature {weather.main.temp} Celsius</p>
            <img src={`${iconURL}/${weather.weather[0].icon}.png`} />
            <p>Wind {weather.wind.speed} m/s</p>
        </>
    )
}

export default WeatherInfo
