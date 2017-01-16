import types from '../actions/action.types';
import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import {clearCurrentRecordAction, nullTransactionAction} from '../actions/app.actions';
const client = axios.create({
    baseURL: `http://localhost:3000/`,
    headers: {
        'Content-type': 'application/json',
        'Accept':'application/json'
    }
});

export const startGetAllPeopleAction = ()=>{
    //TODO: make this return actual data from the db
    return {
        type: types.GET_ALL_PEOPLE,
        payload: [
            {label:'testPerson1', value: 0},
            {label:'testPerson2', value: 1},
            {label:'testPerson3', value: 2}
        ]
    };
}
export const startGetTransactionData = (offset = 0,query)=>{
    return (dispatch, getState)=>{
        return client.post('/api',{
           query: `{
                transactions(offset:${offset}, limit:100, order:"reverse:submitDate" ${query ? ',' + query: ''}){
                    transactionId,
                    dataTypeString,
                    action,
                    description,
                    indexes,
                    submitDate,
                    submitPerson,
                    submitGdb,
                    submitVersion,
                    submitName,
                    reviewPerson,
                    reviewNotes,
                    reviewDate,
                    passed,
                    loadDate,
                    sdePerson,
                    loadName,
                    recorded
                } 
            }`
        })
        .then(res=>{
            dispatch({
                type: types.GET_TABLE_DATA,
                payload: res.data.data.transactions
            });
        });
    }
}
export const startCommitData= (model, clearCurrentOnSuccess = true)=>{
    //TODO: refactor to commit record to database
    model.transactionId = 1; //TODO: delete this!
    toastr.success('Record successfuly committed');
    return (dispatch,getState)=>{
        //on success
        if (clearCurrentOnSuccess){
            dispatch(clearCurrentRecordAction());
            dispatch(nullTransactionAction()); //TODO: refactor to have one action to zero everything
        }
        dispatch({
            type: types.COMMIT_TABLE_DATA,
            payload: model
        })
    }
    
}
