const Header = (props) => {
    return <h1>{props.course}</h1>
    
}

const Content = (props) => {
    return (
        <>
            <Part part={props.parts[0]}  />
            <Part part={props.parts[1]}  />
            <Part part={props.parts[2]}  />
        </>
    )
}

const Part = (props) => {
    return <p>{props.part.name} {props.part.excercises}</p>
    
}

const Total = (props) => {
    let total = 0
    props.parts.forEach(part => total += part.excercises)
    return <p>Number of excercises {total}</p>
}

const App = () => {
    const course = 'Half stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        excercises: 10
    }
    const part2 = {
        name: 'Using props to pass data', 
        excercises: 7
    }
    const part3 = {
        name: 'State of a component',
        excercises: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content parts={[part1, part2, part3]} />
            <Total parts={[part1, part2, part3]} />  
        </div>
    )
}

export default App
