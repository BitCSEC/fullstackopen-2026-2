require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))


// let people = [
//     {
//         "id": "1",
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": "2",
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": "3",
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": "4",
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

app.get('/api/people', (_, response) => {
    Person
        .find({})
        .then(result => {
            response.json(result)
        })
    // response.json(people)
})

app.get('/info', (_, res) => {
    const first_p = `<p>Phonebook has info for ${people.length} people</p>`
    const second_p = `<p>${Date().toString()}</p>`
    res.status(200).send(first_p + second_p)
})

app.get('/api/people/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(404).end()
            }
        })
    // const id = request.params.id
    // const person = people.find(person => person.id === id)
    //
    // if (person) {
    //     response.json(person)
    // } else {
    //     response.status(404).end()
    // }
})

app.delete('/api/people/:id', (req, res) => {
    const id = req.params.id
    const person = people.find(person => person.id === id)
    people = people.filter(person => person.id !== id)

    res.status(200).json(person)
})

// const generateId = () => {
//     return String(Math.floor(Math.random() * 1000000) + 1)
// }

app.post('/api/people', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(_ => {
        response.status(201).json(person)
    })

    // if (people.find(person => person.name === body.name)) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }
    //
    // const person = {
    //     id: generateId(),
    //     name: body.name,
    //     number: body.number
    // }
    // people = people.concat(person)
    //
    // response.status(201).json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
