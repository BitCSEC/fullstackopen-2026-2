import { useState, useEffect } from 'react'
import personService from './services/persons'
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

    // Effect Hook
    const fetchData = () => {
        personService
            .getAll()
            .then(persons => {
                console.log(persons)
                setPersons(persons)
            })
    }
    useEffect(fetchData, [])

    // Handlers
    const handleAddButton = (event) => {
        event.preventDefault()
        
        const name = newName
        const number = newNumber
        const newPerson = { name, number }
        const index = persons.findIndex(person => person.name === name)

        if (index != -1) {
            const msg = `${name} is already added to phonebook, replace the old number with a new one?`
            const confirmation = window.confirm(msg)

            if (confirmation) {
                const updatedPerson = { ...persons[index], number: number }
                personService
                    .update(updatedPerson)
                    .then(_ => {
                        setPersons(persons.map(person =>
                            person.name === name
                                ? updatedPerson
                                : person))
                        setNewName('')
                        setNewNumber('')
                    })
            }
        } else {
            personService
                .create(newPerson)
                .then(person => {
                    setPersons(persons.concat(person))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }


    const deletePerson = (name, id) => {
        const confirmation = window.confirm(`Delete ${name}?`)

        if (confirmation) {
            personService
                .deletePerson(id)
                .then(deletedPerson => {
                    setPersons(persons.filter(person => person.id != deletedPerson.id))
                })
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
            <PersonForm onSubmit={handleAddButton} values={[newName, newNumber]} handlers={[handleNameChange, handleNumberChange]} />
            <h2>Numbers</h2>
            <PersonsList persons={filteredPersons} deleteHandler={deletePerson} />
        </div>
    )
}

export default App
