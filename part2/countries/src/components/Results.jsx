import Country from "./Country"

const Entry = ({ name, onClick }) => {
    return (
        <>
            <br/>{name} <button onClick={onClick}>Show</button>
        </>
    )
}

const Result = ({ results, buttonHandler }) => {
    if (results.length === 0) {
        return <p>No filter specified</p>
    }

    if (results.length === 1) {
        return <Country country={results[0]} />
    }

    if (results.length <= 10) {
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
