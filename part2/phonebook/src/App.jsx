import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonsList from './components/PersonsList'
import PersonForm from './components/PersonForm'

const App = () => {
    // Estado
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
    )

    const fetchData = () => {
        axios
        .get('http://localhost:3001/persons')
        .then(response => {
            console.log(response.data)
            setPersons(response.data)
        })
    }
    useEffect(fetchData, [])

    // Handlers
    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }

        if (persons.findIndex(person => person.name === newPerson.name) != -1) {
            alert(`${newPerson.name} is already added to phonebook`)
        } else {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={newFilter} onChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm onSubmit={addPerson} values={[newName, newNumber]} handlers={[handleNameChange, handleNumberChange]} />
            <h2>Numbers</h2>
            <PersonsList persons={filteredPersons} />
        </div>
    )
}

export default App
