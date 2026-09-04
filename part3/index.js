require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

morgan.token('body', (request) => {
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

app.get('/api/people', (_, response) => {
    Person
        .find({})
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
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
        .catch(error => next(error))
})

app.delete('/api/people/:id', (request, response) => {
    Person
        .findByIdAndDelete(request.params.id)
        .then(_ => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

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

    person
        .save()
        .then(_ => {
            response.status(201).json(person)
        })
        .catch(error => next(error))

})

app.put('/api/people/:id', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    Person
        .findById(request.params.id)
    .then(person => {
        if (!person) {
            return response.status(404).end()
        }

        person.name = body.name
        person.number = body.number

        return person.save().then((updatedPerson) => {
            response.json(updatedPerson)
        })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    response.status(500).end()

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
