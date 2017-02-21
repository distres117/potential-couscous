import client from '../../services/axios.service';
import types from './action.types';
import {setTableData} from './common.actions';
import {clearCurrentRecordAction} from './app.actions';
import {toastr} from 'react-redux-toastr';
import format from '../../helpers/format.helpers';

const disbursementSchema = 'disbursementId,dataCatalogID,date,recipient, contractor,provider,formatId,transmittalId,selCriteria,notes';

export const startGetDisbursements = query =>{
    return (dispatch, getState)=>{
        return client.post('/api',{
            query:`{
                disbursements(order:"reverse:date"){
                    ${disbursementSchema}, recipientPerson
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