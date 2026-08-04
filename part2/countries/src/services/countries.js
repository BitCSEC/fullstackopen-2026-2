import axios from 'axios'
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(`${baseURL}/all`)
    return request
        .then(response => response.data)
        //.then(response => response.map(country => country.name.common))
}

// const getCountry = (name) => {
//     const request = axios.get(`${baseURL}/${name}`).then(response => response.data)
//     return request.then(response => {
//         return {
//             name: response.name.common,
//             capital: response.capital[0],
//             area: response.area,
//             languages: response.languages,
//             flag: response.flags
//         }
//     })
// }

export default { getAll }
