import axios from 'axios';
export default axios.create({
    baseURL: `http://oemgismap:3000/`,
    headers: {
        'Content-type': 'application/json',
        'Accept':'application/json'
    }
});