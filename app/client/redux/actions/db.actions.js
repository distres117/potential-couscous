import types from '../actions/action.types';
import axios from 'axios';
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
        payload: {
            testPerson1: 1,
            testPerson2: 2,
            testPerson3: 3
        }
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
