import axios from 'axios';
import endpoints from '../../config/endpoints';
import types from './action.types';

const client = axios.create({
    baseURL: endpoints.gpService,
    headers: {
            'content-Type':'application/x-www-form-urlencoded'
        }
});

export const startGetReadyToLoad = ()=>{
    return (dispatch, getState)=>{
        return client.post('/execute?f=json')
        .then(res=>{
            dispatch({
                type:types.READY_TO_LOAD,
                payload: res.data.results[0].value
            });
        });
    }
}
export const noWork = ()=>{
    return {
        type: 'THIS NO WORK',
        payload: true
    };
}