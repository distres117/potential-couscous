import {runProcess, runProcessGp} from '../utils/childProcess';
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

function makeRequest(res){
     return new Promise((resolve,reject)=>{
        let _res = {};
        if (!res.stderr){
            let data = res.stdout.replace(/\"\s*\"/g, 'null'); //ugh, manual parsing of response string (replace empty strings with null) :<
            try{
                _res.data = parseJson(data);
            }
            catch(e){
                _res.errors = e;
            }
        }else{
            _res.errors = res.stderr;
        }
        return resolve(_res);
    });
}
export const getList = async ()=>{
    let res = await runProcessGp();
    return makeRequest(res);
}

export const getDetails = (datasetName, datasetType = '', location = '')=>{
    let data = {datasetName,datasetType};
    return runProcess(datasetName, datasetType)
        .then(res=>{
            if (!res.stderr)
                console.log('from python process: ', res.stdout);
            else
                console.log('python process error: ', res.stderr);
            return runProcessGp(datasetName, datasetType, location);    
        })
        .then(res=>{
            return makeRequest(res);
        });
    
}
export const getDetailsGp = (datasetName, datasetType, location)=>{
    return runProcessGp(datasetName, datasetType, location)
    .then(res=>{
        return makeRequest(res);
    })
    .catch(res=>{
        return makeRequest(res);
    })
}
