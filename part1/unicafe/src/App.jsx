import { useState } from 'react'

// Funciones auxiliares
const getTotal = (props) => props.good + props.neutral + props.bad
const getAverage = (props) => (props.good - props.bad) / getTotal(props)
const getPositive = (props) => props.good / getTotal(props) * 100 

// Componentes
const SectionTitle = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = (props) => {
    if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
        return <p>No feedback given</p>
    }
    return (
        <table>
            <tbody>
            <StatisticLine text="good" value= { props.good } />
            <StatisticLine text="neutral" value= { props.neutral } />
            <StatisticLine text="bad" value={ props.bad } />
            <StatisticLine text="all" value ={ getTotal(props) } />
            <StatisticLine text="average" value={ getAverage(props) } />
            <StatisticLine text="positive" value={ getPositive(props) + " %" } />
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
