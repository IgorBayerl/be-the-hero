import axios from 'axios';

const api = axios.create({
    baseURL: 'http://www.savatan.com/api/'
});

export default api;