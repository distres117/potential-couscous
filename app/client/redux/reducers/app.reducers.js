import types from '../actions/action.types';

export const currentRecordReducer = (state={}, action)=>{
    switch(action.type){
        case types.SET_CURRENT_RECORD:
            return action.payload;
        case types.CLEAR_CURRENT_RECORD:
            return {};
        default:
            return state;
    }
}

export const transactionReducer = (state={}, action)=>{
    switch(action.type){
        case types.CREATE_TRANSACTION:
            return action.payload;
        default:
            return state;
    }
}