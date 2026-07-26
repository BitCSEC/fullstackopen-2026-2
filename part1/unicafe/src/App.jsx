import { useState } from 'react'

// Funciones auxiliares
const getTotal = (good, neutral, bad) => good + neutral + bad
const getAverage = (good, neutral, bad) => (good - bad) / getTotal(good, neutral, bad)
const getPositive = (good, neutral, bad) => good / getTotal(good, neutral, bad) * 100 

// Componentes
const SectionTitle = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = ({good, neutral, bad}) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return <p>No feedback given</p>
    }
    return (
        <table>
            <tbody>
            <StatisticLine text="good" value= { good } />
            <StatisticLine text="neutral" value= { neutral } />
            <StatisticLine text="bad" value={ bad } />
            <StatisticLine text="all" value ={ getTotal(good, neutral, bad) } />
            <StatisticLine text="average" value={ getAverage(good, neutral, bad) } />
            <StatisticLine text="positive" value={ getPositive(good, neutral, bad) + " %" } />
            </tbody>
        </table>
    )
}

const App = () => { 
    // Agregar estado al componente
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    // Generador de handlers
    const handleButton = (value, setter) => () => {
        setter(value + 1)
    } 

    return ( 
        <div>
            <SectionTitle text="give feedback" />
            <Button onClick={handleButton(good, setGood)} text='good' />
            <Button onClick={handleButton(neutral, setNeutral)} text='neutral' />
            <Button onClick={handleButton(bad, setBad)} text='bad' />
            <SectionTitle text="Statistics" />
            <Statistics good={ good } neutral={ neutral } bad={ bad } />
        </div> 
    )
}

export default App
