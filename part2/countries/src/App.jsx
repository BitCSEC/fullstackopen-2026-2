import { useState, useEffect } from 'react'
import countries from './services/countries'
import Result from './components/Results'
import SearchInput from './components/SearchInput'


function App() {
    const [newFilter, setNewFilter] = useState('')
    const [countryList, setCountryList] = useState([])
    const [weather, setWeather] = useState()
    const [filteredCountries, setFilteredCountries] = useState([])

    useEffect(() => {
        countries
            .getAll()
            .then(response => setCountryList(response))
    }, [])

    useEffect(() => {
        if (filteredCountries.length === 1) {
            countries
                .getWeather(filteredCountries[0])
                .then(response => setWeather(response))
        }
    }, [filteredCountries])

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
        setFilteredCountries(countryList.filter(country =>
            country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
        ))
    }

    const buttonHandler = (name) => () => { setNewFilter(name) }

    return (
        <>
            <SearchInput id={"filter"} value={newFilter} onChange={handleFilterChange} />
            <Result
                results={filteredCountries}
                buttonHandler={buttonHandler}
                weather={weather}
            />
        </>
    )
}

export default App
