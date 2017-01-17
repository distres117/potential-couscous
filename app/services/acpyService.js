import {runProcess} from '../utils/childProcess';
import axios from 'axios';
import endpoints from '../config/endpoints';
import querystring from 'querystring';
import parseJson from 'parse-json';

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
    let uri = encodeURI(endpoints.gpService + '/execute?f=json');
    return new Promise((resolve,reject)=>{
        axios.post(uri,querystring.stringify(data),{
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
            }
        })
        .then(res=>{ 
            if (!res.errors){
                let data = res.data.replace(/\"\s*\"/g, 'null'); //ugh, manual parsing of response string (replace empty strings with null) :<
                let _res = {data:null, errors:null};
                try{
                    _res.data = parseJson(data);
                }
                catch(e){
                    _res.errors = e;
                    resolve(_res);
                }
                resolve(_res);
            }
        });
    
    });
    
}
