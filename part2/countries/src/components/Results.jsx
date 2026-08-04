import Country from "./Country"

const Result = ({ results }) => {
    if (results.length === 0) {
        return <p>No filter specified</p>
    }

    if (results.length === 1) {
        return <Country country={results[0]} /> 
    }

    if (results.length <= 10) {
        return (
            <>
                {results.map((country, idx) => <p key={idx}>{country.name.common}</p>)}
            </>
        )
    }

    return <p>Too many matches, specify another filter</p>
}

export default Result
