const PersonForm = ({ onSubmit, values, handlers }) => {
    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={values[0]} onChange={handlers[0]} />
                </div>
                <div>
                    number: <input value={values[1]} onChange={handlers[1]} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm
