import axios from 'axios';
import endpoints from '../../config/endpoints';
import querystring from 'querystring';
import parseJson from 'parse-json';
import {startTimeoutCheck} from '../utils/shared';
const client = axios.create({
    baseURL: endpoints.gpService,
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }
});
function makeRequest(data){
    let hook = {resolved:false}
     return new Promise((resolve,reject)=>{
        startTimeoutCheck(hook, ()=>reject('The request has timed out'));
        client.post('/execute?f=json',querystring.stringify(data))
        .then(res=>{
            hook.resolved = true;
            if (!res.errors){
                if (_.isString(res.data)){
                    let data = res.data.replace(/\"\s*\"/g, 'null'); //ugh, manual parsing of response string (replace empty strings with null) :<
                    let _res;
                    try{
                        _res = parseJson(data);
                    }
                    catch(e){
                        return reject(e);
                    }
                    return resolve(_res);
                }
                return resolve(res.data.results[0].value);
            }else{
                reject(res.errors);
            }
        });
    
    });
}

export const getDetailsGp = (datasetName, datasetType)=>{
    let data = {datasetName,datasetType};
    return makeRequest(data);
    // return new Promise((resolve,reject)=>{
    //     client.post('/execute?f=json',querystring.stringify(data))
    //     .then(res=>{
    //         if (!res.errors){
    //             if (_.isString(res.data)){
    //                 let data = res.data.replace(/\"\s*\"/g, 'null'); //ugh, manual parsing of response string (replace empty strings with null) :<
    //                 let _res;
    //                 try{
    //                     _res = parseJson(data);
    //                 }
    //                 catch(e){
    //                     return reject(e);
    //                 }
    //                 return resolve(_res);
    //             }
    //             return resolve(res.data.results[0].value);
    //         }else{
    //             reject(res.errors);
    //         }
    //     });
    
    //});
    
}

export const searchDataGp = (datasetName)=>{
    let data = {datasetName, location: 'sde'};
    return makeRequest(data);
}