import client from '../../services/axios.service';
import types from './action.types';
import {setTableData} from './common.actions';
import {clearCurrentRecordAction} from './app.actions';
import {toastr} from 'react-redux-toastr';
import format from '../../helpers/format.helpers';
import {convertToLookup} from '../../helpers/flter.helpers';

const disbursementSchema = 'disbursementId, dataCatalogId, date, recipient, contractor, provider, formatId, transmittalId, selCriteria, notes';

export const startGetDisbursements = (limit = 100, skip=0) =>{
    return (dispatch, getState)=>{
        return client.post('/api',{
            query:`{
                disbursements(order:"reverse:date", limit:${limit}, offset:${skip}){
                    ${disbursementSchema}, 
                    recipientPerson{fullName}, 
                    catalogRow{name}, 
                    transmittal{method}, 
                    format{type}
                }
            }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            let disbursements = format.flatten(res.data.data.disbursements);
            dispatch(setTableData(disbursements));
        });
    };
}

export const startCommitDisbursement = model =>{

}
export const startChangeDisbursement = (id, model) =>{

}
export const startGetDisbursementFormats = ()=>{
    return (dispatch, getState)=>{
        return client.post('/api',{
            query:`{
                domainFormats{
                    formatId, type
                }
            }`
        })
        .then(res=>{
            dispatch({
                type:types.GET_DISBURSEMENT_FORMATS,
                payload: convertToLookup(res.data.data.domainFormats, 'formatId', 'type')
            })
        });
    }
}
export const startGetDisburmentTransmittalMethods = () =>{
    return (dispatch, getState)=>{
        return client.post('/api',{
            query:`{
                transmittalTypes{
                    transmittalId, method
                }
            }`
        })
        .then(res=>{
            dispatch({
                type:types.GET_DISBURSEMENT_TRANSMITTALS,
                payload: convertToLookup(res.data.data.transmittalTypes, 'transmittalId', 'method')
            })
        });
    }
}