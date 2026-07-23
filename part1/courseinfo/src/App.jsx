const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <>
            <Part part={props.parts[0]} excercises={props.excercises[0]} />
            <Part part={props.parts[2]} excercises={props.excercises[2]} />
            <Part part={props.parts[3]} excercises={props.excercises[3]} />
        </>
    )
}

const Part = (props) => {
    return (
        <p>{props.part} {props.excercises}</p>
    )
}

const Total = (props) => {
    return (
        <p>Number of excercises {props.total}</p>
    )
}

const App = () => {
    const course = 'Half stack application development'
    const part1 = 'Fundamentals of React'
    const excercises1 = 10
    const part2 = 'Using props to pass data'
    const excercises2 = 7
    const part3 = 'State of a component'
    const excercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content parts={[part1, part2, part3]} excercises={[excercises1, excercises2, excercises3]}/>
            <Total total={excercises1 + excercises2 + excercises3} />
        </div>
    )
}

export default App
