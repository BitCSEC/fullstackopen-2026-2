import WeatherInfo from "./WeatherInfo"

const Country = ({ country, weather }) => {
    const { name, capital, area, languages, flags } = country
    return (
        <>
            <h1>{name.common}</h1>
            <p>Capital {capital[0]}</p>
            <p>Area {area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.entries(languages).map(([key, value]) => (
                    <li key={key}>{value}</li>
                ))}
            </ul>
            <img width="240" src={flags.svg} alt={flags.svg} />
            <WeatherInfo weather={weather} />
        </>
    )
}

export default Country
