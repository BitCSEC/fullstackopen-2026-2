const Filter = ({ value, onChange }) => {
    return (
        <>
            filter shown with <input placeholder={value} onChange={onChange} />
        </>
    )
}

export default Filter
