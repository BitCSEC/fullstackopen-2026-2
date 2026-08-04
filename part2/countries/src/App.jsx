import { useState, useEffect } from 'react'
import countries from './services/countries'
import Result from './components/Results'
import SearchInput from './components/SearchInput'


function App() {
    const [newFilter, setNewFilter] = useState('')
    const [countryList, setCountryList] = useState([])
    const filteredCountries = countryList.filter(country =>
        country.name.common.toLowerCase().includes(newFilter.toLowerCase())
    )

    useEffect(() => {
        countries
            .getAll()
            .then(response => setCountryList(response))
    }, [])

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <>
            <SearchInput id={"filter"} value={newFilter} onChange={handleFilterChange} />
            <Result results={filteredCountries} />
        </>
    )
}

export default App
