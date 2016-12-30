import {runProcess} from '../utils/childProcess';
import axios from 'axios';
const endpoints = require('../config/endpoints');
import querystring from 'querystring';

export const getList = async ()=>{
    let res = await axios.post(endpoints.gpService);
    return res.data.results[0].value;
}

export const getDetails = (datasetName, datasetType)=>{
    let data = {datasetName,datasetType};
    return runProcess(datasetName, datasetType)
        .then(()=>{
            return getDetailsGp(datasetName, datasetType);
        })
        .catch((err)=>{
            console.log(err);
            return getDetailsGp(datasetName, datasetType);
        });
    
}
export const getDetailsGp = (datasetName, datasetType)=>{
    let data = {datasetName,datasetType};
    return axios.post(endpoints.gpService,querystring.stringify(data),{
        headers: {
            'content-Type':'application/x-www-form-urlencoded'
        }
    });
    
}
