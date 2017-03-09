import client from '../../services/axios.service';
import {toastr} from 'react-redux-toastr';
import types from './action.types';
import {renderTransactionViewAction, setCurrentRecordAction, clearCurrentRecordAction, nullTransactionAction, commitTableData, setVersions, startLongProcess,endLongProcess} from './app.actions';
import {searchDataGp} from '../../services/arcpyService';

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
            if (res.data.errors)
                return; 
            dispatch({
                type: types.GET_TABLE_DATA,
                payload: res.data.data.transactions //data.data...not too nice
            });
        });
    }
}
export const startGetOpenTransactions = ()=>{
    return startGetTransactionData(0,'recorded:0');
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
                        let versions = res.data.data.sdeVersions;
                        dispatch(setVersions(versions));
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
                dispatch(setVersions(['sde.DEFAULT'])); //TODO: this will probably need to be the actual list of versions
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

export const startCommitTransaction = (model, clearCurrentOnSuccess=true)=>{
    return (dispatch,getState)=>{
        //fk contraints have to be passed as null!
        let query = `mutation{newTransaction(dataCatalogId:null, ${model.stringify()}){ 
                            ${transactionSchema}
                        }
                    }`;
        return client.post('/api',{query})
        .then(res=>{
            if (res.data.errors){
                toastr.error('An error occurred saving record', 'See console for details');
                console.log(res.data.errors);
            }
            //on success
            else {
                let transaction = res.data.data.newTransaction;
                console.log(transaction);
                toastr.success('Record successfuly committed');
                dispatch(setCurrentRecordAction(transaction));
                dispatch(renderTransactionViewAction(transaction));
                dispatch(startGetOpenTransactions());
            }
        })
        .catch(err=>{
            console.log(err);
            console.log(model.stringify());
            toastr.error('A server error occurred', 'Check console');
        })
        
    }
}

export const startUpdateTransaction = (id,model)=>{
    return (dispatch,getState)=>{
        let query = `mutation{changeTransaction(transactionId:${id}, ${model.stringify()}){
                ${transactionSchema}
            }
        }`;
        return client.post('/api', {query})
        .then(res=>{
            let transaction = res.data.data.changeTransaction;
            if (res.data.errors){
                toastr.error('Error updating record', 'See console for details');
                console.log(res.data.errors);
            }else{
                toastr.success('Successfully updated record');
                dispatch(setCurrentRecordAction(transaction));
                dispatch(startGetOpenTransactions());
                if (transaction.passed || transaction.recorded){
                    dispatch(renderTransactionViewAction(transaction));
                }
            }
        })
    }
}
export const startRecordTransaction = (id, model)=>{
    return (dispatch,getState)=>{
        dispatch(startLongProcess());
        console.log(model.stringify());
        let query = `mutation{recordTransaction(transactionId:${id}, ${model.stringify()}){
            dataCatalogId
            }
        }`;
        toastr.info('Transaction has been submitted', 'This process may take up to 30 seconds to complete...');
        return client.post('/api', {query})
        .then(res=>{
            dispatch(endLongProcess());
            if (res.data.errors){
                toastr.error('Error recording transaction', 'See console for details');
                console.log(res.data.errors);
            }else{
                //let transaction = res.data.data.recordTransaction;
                toastr.success('Successfully recorded transaction');
                dispatch(startGetOpenTransactions());
                dispatch(clearCurrentRecordAction());
                dispatch(renderTransactionViewAction());
            }
        })
    }
}