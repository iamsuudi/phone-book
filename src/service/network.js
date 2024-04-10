import axios from 'axios';

const baseURL = '/persons';

const getAll = () => {
    return axios.get(baseURL).then(response => response.data).catch(error => {
        console.error(error);
    });
}

const create = (newData) => {
    return axios.post(baseURL, newData).then(response => response.data);
}

const deleteContact = (id) => {
    return axios.delete(`${baseURL}/${id}`).then(response => response.data).catch(error => {
        console.error(error);
    });
}

const updateContact = (id, newData) => {
    return axios.put(`${baseURL}/${id}`, newData).then(response => response.data);
}

export default {getAll, create, deleteContact, updateContact};