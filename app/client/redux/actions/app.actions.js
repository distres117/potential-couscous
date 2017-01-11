import types from './action.types';

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
export const createTransactionAction = (val)=>{
    return {
        type:types.CREATE_TRANSACTION,
        payload:{
            create:val
        }
    };
}