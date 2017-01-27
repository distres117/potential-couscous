import axios from 'axios';
const isDev = process.env.NODE_ENV !== 'production'
export default axios.create({
    baseURL: isDev ? 'http://localhost:3000/' : `http://oemgismap:3000/`, //TODO: get the name of the domain from the api: process.env.domain
    headers: {
        'Content-type': 'application/json',
        'Accept':'application/json'
    }
});