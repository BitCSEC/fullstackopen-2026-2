const Person = (props) => <p>{props.name} {props.number}</p>

const PersonsList = ({ persons }) => {
    return (
        <div>
            {persons.map(person =>
                <Person key={person.id} name={person.name} number={person.number} />)}
        </div>
    )
}

export default PersonsList
