import axios from 'axios';
import endpoints from '../../config/endpoints';
import querystring from 'querystring';
import parseJson from 'parse-json';
import {startTimeoutCheck} from '../utils/shared';
import client from './axios.service';

export const getDetailsGp = (datasetName, datasetType)=>{
    let data = {datasetName,datasetType};
    return client.post('/gp/getDetailsGp', data);
}
export const getList = ()=>{
    return client.post('/gp/getList');
}

export const searchDataGp = (datasetName)=>{
    let data = {datasetName, datasetType: "1", location: 'sde'};
    return client.post('/gp/getDetailsGp', data);
}