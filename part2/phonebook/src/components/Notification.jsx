const Notification = ({ message, status }) => {
    if (message === null) {
        return null
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (status === 'error') {
        return (
            <div style={errorStyle}>
                {message}
            </div>
        )
    }

    if (status === 'success') {
        return (
            <div style={successStyle}>
                {message}
            </div>
        )
    }

    return null
}

export default Notification
