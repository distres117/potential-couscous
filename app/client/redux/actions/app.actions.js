import types from './action.types';
import {TransactionReviewModel,TransactionSubmitModel,TransactionLoadModel} from '../../models/transaction.models';
import {toastr} from 'react-redux-toastr';

export const setCurrentRecordAction = (row)=>{
    return {
        type: types.SET_CURRENT_RECORD,
        payload:row
    }
}
export const clearCurrentRecordAction = ()=>{
    return{
        type: types.CLEAR_CURRENT_RECORD
    }
}
export const createTransactionAction = ()=>{
    return {
        type:types.CREATE_TRANSACTION,
        payload: new TransactionSubmitModel()
    };
}
export const reviewTransactionAction = () =>{
    return (dispatch,getState)=>{
        let model = new TransactionReviewModel();
        let current = getState().current;
        model.prePopulate(current);
        //dispatch(nullTransactionAction())
        dispatch({
            type:types.REVIEW_TRANSACTION,
            payload:model
        });
    }
}
export const loadTransactionAction = ()=>{
    return (dispatch, getState)=>{
        let model = new TransactionLoadModel();
        let current = getState().current;
        model.prePopulate(current);
        dispatch({
            type: types.LOAD_TRANSACTION,
            payload: model
        });
    }
}
export const nullTransactionAction = ()=>{
    return {
        type:types.NULL_TRANSACTION
    }
}