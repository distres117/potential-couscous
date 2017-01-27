import axios from 'axios';
const isDev = process.env.NODE_ENV !== 'production'
export default axios.create({
    baseURL: isDev ? 'http://localhost:3000/' : `http://oemgismap:3000/`,
    headers: {
        'Content-type': 'application/json',
        'Accept':'application/json'
    }
});