const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password argument')
    process.exit(1)
}

const db_password = process.argv[2]
const url = `mongodb+srv://fullstack:${db_password}@cluster0.vpv64xf.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('phonebook:')
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
} else {
    const nombre = process.argv[3]
    const numero = process.argv[4]

    const person = new Person({
        name: nombre,
        number: numero,
    })

    person
    .save()
    .then(_ => {
        console.log(`added ${nombre} number ${numero} to phonebook`)
        mongoose.connection.close()
    })
}


