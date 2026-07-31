import { useState } from 'react'
import Filter from './components/Filter'
import PersonsList from './components/PersonsList'
import PersonForm from './components/PersonForm'

const App = () => {
    // Estado
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
    )

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
