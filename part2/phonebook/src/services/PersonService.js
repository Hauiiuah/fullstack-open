import axios from 'axios'


const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL).then(response=>response.data)
}

const create = (person) => {
    return axios.post(baseURL,person).then(response=>response.data)
}

const removePerson =(id) => {
    return axios.delete(`${baseURL}/${id}`).then(response=>response.data)
}

const update = (id,newPerson) => {
    return axios.put(`${baseURL}/${id}`,newPerson).then(response=>response.data)
}

export default {
    getAll,
    create,
    removePerson,
    update
}