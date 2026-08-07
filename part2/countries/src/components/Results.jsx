import Country from "./Country"

const Entry = ({ name, onClick }) => {
    return (
        <>
            <br />{name} <button onClick={onClick}>Show</button>
        </>
    )
}

const Result = ({ results, buttonHandler, weather }) => {
    if (results.length === 1) {
        return <Country country={results[0]} weather={weather} />
    }

    if (0 < results.length && results.length <= 10) {
        return (
            <>
                {results.map((country, idx) =>
                    <Entry
                        key={idx}
                        name={country.name.common}
                        onClick={buttonHandler(country.name.common)}
                    />)
                }
            </>
        )
    }

    return <p>Too many matches, specify another filter</p>
}

export default Result
