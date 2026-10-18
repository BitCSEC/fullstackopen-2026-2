import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async data => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, data, config)
    return response.data
}

const updateLikes = async blog => {
    console.log(blog)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog)
    return response.data
}

export default { getAll, create, updateLikes, setToken }
