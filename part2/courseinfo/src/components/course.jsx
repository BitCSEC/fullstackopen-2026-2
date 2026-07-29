const Header = (props) => <h1>{props.text}</h1>

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = (props) => (
  <div>
    {props.parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Total = (props) => {
    let total = props.parts.reduce((a, b) => a + b.exercises, 0)
    return <p><strong>total of {total} excercises</strong></p>
}

const Course = (props) => {
    return (
        <div>
            <Header text={props.course.name} /> 
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course
