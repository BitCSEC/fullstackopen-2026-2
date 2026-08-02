const Person = ({ person: { name, number, id }, handler }) => {
    return (
        <div>
            {name} {number} <button onClick={() => handler(name, id)}>delete</button>
        </div>
    )
}

const PersonsList = ({ persons, deleteHandler }) => {
    return (
        <div>
            {persons.map(person =>
                <Person
                    key={person.id}
                    person={person}
                    handler={deleteHandler}
                />)}
        </div>
    )
}

export default PersonsList
