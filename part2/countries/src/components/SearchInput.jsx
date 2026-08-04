const SearchInput = ({id, value, onChange}) => {
    return (
        <>
            <label id={id}>find countries </label>
            <input id={id} value={value} onChange={onChange} />
        </>
    )
}

export default SearchInput
