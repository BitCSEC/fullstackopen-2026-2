import { useState } from 'react'

const Togglable = ({ showLabel, hideLabel, children }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{showLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button
                    onClick={toggleVisibility}>{hideLabel ? hideLabel : 'cancel'}
                </button>
            </div>
        </div>
    )
}

export default Togglable
