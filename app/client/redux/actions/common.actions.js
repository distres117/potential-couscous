import client from '../../services/axios.service';
import types from '../actions/action.types';
import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import {clearCurrentRecordAction, nullTransactionAction} from '../actions/app.actions';
import helpers from '../../helpers/format.helpers';

export const startGetInitialAction = ()=>{
    return (dispatch,getState)=>{
        if (_.keys(getState().summaryData).length)
            return;
        let transationsQ = {
            query:`{
                transactions(order:"reverse:submitDate"){
                    submitName, submitDate, action, transactionId, recorded
                }
            }`
        };
        let disbursementsQ = {
            query:`{
                disbursements(order:"reverse:date"){
                    date, disbursementId, provider,recipient, catalogRow{
                        name
                    }
                }
            }`
        };
        let peopleQ = {
            query:`{
                people{personId,fullName}
            }`
        };
        let layersQ = {
            query:`{
                layers{layerName}
            }`
        };

        return Promise.all([
            client.post('/api', transationsQ),
            client.post('/api', disbursementsQ),
            client.post('/api', peopleQ),
            client.post('/api', layersQ)

        ])
        .then(responses=>{
            let res = {};
            responses.forEach((r)=>{
                let key = _.keys(r.data.data)[0];
                res[key] =  r.data.data[key];
            });
            console.log(res);
            dispatch({
                type: types.GET_DATA_INITIAL,
                payload:res
            })
        })
        
    }
}
export const startGetInitial = ()=>{

}
export const setTableData = data=>{
    return {
        type: types.GET_TABLE_DATA,
        payload:data
    }
}
export const commitTableData = data=>{
    return {
        type:types.COMMIT_TABLE_DATA,
        payload: data
    }
}
export const filterAction = (field,val, baseData)=>{
    return (dispatch,getState)=>{
        if (!val){
            dispatch(setTableData(baseData));
            return;
        }
        let filteredData = baseData.filter(data=>data[field] === val);
        dispatch(setTableData(filteredData));
    }
}




