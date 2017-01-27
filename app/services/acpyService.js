import {runProcess} from '../utils/childProcess';
import axios from 'axios';
import endpoints from '../config/endpoints';
import querystring from 'querystring';
import parseJson from 'parse-json';
import * as _ from 'lodash';
//Similar to front end service but with server-only functionality

const client = axios.create({
    baseURL: endpoints.gpService,
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }
});

function makeRequest(data){
     return new Promise((resolve,reject)=>{
        client.post('/execute?f=json',querystring.stringify(data))
        .then(res=>{
            if (!res.data.errors){
                if (_.isString(res.data)){
                    let data = res.data.replace(/\"\s*\"/g, 'null'); //ugh, manual parsing of response string (replace empty strings with null) :<
                    let _res;
                    try{
                        _res = parseJson(data);
                    }
                    catch(e){
                        return reject(e);
                    }
                    return resolve(_res.results[0]);
                }
                return resolve(res.data.results[0].value);
            }else{
                reject(res.errors);
            }
        })
    });
}
export const getList = async ()=>{
    let res = await client.post(endpoints.gpService);
    return res.data.results[0].value;
}

export const getDetails = (datasetName, datasetType)=>{
    let data = {datasetName,datasetType};
    return runProcess(datasetName, datasetType)
        .then(res=>{
            if (!res.stderr)
                console.log('from python process: ', res.stdout);
            else
                console.log('python process error: ', res.stderr);
            return getDetailsGp(datasetName, datasetType);    
        });
    
}
export const getDetailsGp = (datasetName, datasetType)=>{
    let data = {datasetName,datasetType};
    return makeRequest(data);
}
