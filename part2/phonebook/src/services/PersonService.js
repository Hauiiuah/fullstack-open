import axios from 'axios'


const baseURL = '/api/persons'

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

const allServices = {
    getAll,
    create,
    removePerson,
    update
}
export default allServices