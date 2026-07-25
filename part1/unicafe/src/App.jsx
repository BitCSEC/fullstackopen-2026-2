import { useState } from 'react'

const SectionTitle = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Statistic = ({ text, count }) => <p>{text} {count}</p>

const App = () => { 
    // Agregar estado al componente
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    // Agregar handlers apropieados
    const handleGoodButton = () => {
        setGood(good + 1)
    }
    const handleNeutralButton = () => {
        setNeutral(neutral + 1)
    }
    const handleBadButton = () => {
        setBad(bad + 1)
    }

    return ( 
        <div>
            <SectionTitle text="give feedback" />
            <Button onClick={handleGoodButton} text='good' />
            <Button onClick={handleNeutralButton} text='neutral' />
            <Button onClick={handleBadButton} text='bad' />
            <SectionTitle text="Statistics" />
            <Statistic text="good" count={ good } />
            <Statistic text="neutral" count={ neutral } />
            <Statistic text="bad" count={ bad } />
        </div> 
    )
}

export default App
