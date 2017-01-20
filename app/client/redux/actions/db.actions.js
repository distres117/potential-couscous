import types from '../actions/action.types';
import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import {clearCurrentRecordAction, nullTransactionAction, renderTransactionViewAction, setCurrentRecordAction} from '../actions/app.actions';
import {searchDataGp} from '../../services/arcpyService';
export const client = axios.create({ //export so  we can stub it out in tests
    baseURL: `http://localhost:3000/`,
    headers: {
        'Content-type': 'application/json',
        'Accept':'application/json'
    }
});

const transactionSchema = `
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
                    recorded,
                    lastUpdated`;

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
                    ${transactionSchema}
                } 
            }`
        })
        .then(res=>{
            dispatch({
                type: types.GET_TABLE_DATA,
                payload: res.data.data.transactions //data.data...not too nice
            });
        });
    }
}
export const startGetOneTransaction = (id)=>{
    return (dispatch, getState)=>{
        return client.post('/api',{
            query:`{
                transactions(transactionId: ${id}){
                    ${transactionSchema}
                }
            }`
        })
        .then(res=>{
            if (res.errors){
                toastr.error('Transaction not found');
                return;
            }
            let record = res.data.data.transactions[0];
            //console.log('related transaction: ',record);
            //dispatch(clearCurrentRecordAction())
            dispatch(setCurrentRecordAction(record)); //must be set first for autopopulate to happen
            dispatch(renderTransactionViewAction(record));
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
export const startTransactionsDatasetSearch = (name)=>{
    return (dispatch,getState)=>{
        //first check if there is a catalog row with a matching dataset name
        return client.post('/api',{
            query:`{
                transactions(submitName:"${name}"){  
                    transactionId
                    action
                    passed
                    recorded
                    lastUpdated
                }
            }`
        })
        .then(res=>{
            if (res.errors){
                console.log(res.errors);
                return;
            }
            let foundRows = res.data.data.transactions;
            //if not found check sde for dataset
            if (!foundRows.length){
                return searchDataGp(name)
                .then(res=>{
                    if (res.error){
                        //just alert the user
                        toastr.error('Dataset not found!');
                        // dispatch({
                        //     type: types.SEARCH_RESULT_DATASET,
                        //     payload: {
                        //         result: null,
                        //         message: 'Dataset not found'
                        //     }
                        // });
                    }else{
                        toastr.success('Match found in SDE');
                        dispatch({
                            type:types.SEARCH_RESULT_DATASET,
                            payload:{
                                result: name, 
                                message: 'Match found in sde' 
                            }
                        })
                    }
                })
            }
            //check to see if there are open transactions for that dataset
            else{
                toastr.success('Match found in catalog');
                let payload = {result: name, message: 'Match found in catalog'};
                let transactions = foundRows;
                if (transactions.length){
                    //console.log('found transactions: ', transactions);
                    let open = _.filter(transactions, t=>!t.recorded);
                    payload.message = `Match found with ${open.length} open transactions`;
                    if (open.length){
                        let sorted = _.sortBy(open,['lastUpdated']);
                        payload.extra =  _.last(sorted);
                    }
                }
                dispatch({
                    type: types.SEARCH_RESULT_DATASET, payload
                });
                
            }
        })
        .catch(err=>{
            console.log('error:', err);
        });
            
         
    }
}
