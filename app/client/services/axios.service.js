import axios from 'axios';
import {startTimeoutCheck} from '../utils/shared';
import {toastr} from 'react-redux-toastr';

const isDev = process.env.NODE_ENV !== 'production'
const client = axios.create({
    baseURL: isDev ? 'http://localhost:3000/' : `http://oemgismap:3000/`, //TODO: get the name of the domain from the api: process.env.domain
    headers: {
        'Content-type': 'application/json',
        'Accept':'application/json'
    }
});
const oldPost = client.post;
client.post = (...args)=>{ //Cool, now we can set a timeout for every post call without touching existing code
    let hook = {resolved:false};
    return new Promise((resolve,reject)=>{
        startTimeoutCheck(hook, ()=>{
            let response = {
                data:{
                    errors:['Request timed out']
                }
            };
            toastr.error('Uh-Oh...', 'The request timed out');
            resolve(response); //the action must check if 'errors' is on the return hash
            // TODO: app-wide timeout switch to set all async boxes render 'Timed out'
        },60000);
        oldPost.apply(null,args)
        .then(res=>{
            hook.resolved = true;
            resolve(res);
        })
        .catch(err=>{
            reject();
        });    
    });
}
export default client;