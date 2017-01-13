import types from '../actions/action.types';

class CurrentRecord{
    isNull(){
        return Object.keys(this).length <= 1
    }
}

export const currentRecordReducer = (state=new CurrentRecord(), action)=>{
    switch(action.type){
        case types.SET_CURRENT_RECORD:
            _.assign(state, action.payload)
            return state;
        case types.CLEAR_CURRENT_RECORD:
            return new CurrentRecord()
        default:
            return state;
    }
}

export const transactionReducer = (state={}, action)=>{
    switch(action.type){
        case types.CREATE_TRANSACTION:
            return {
                mode: 'create',
                model: action.payload
            };
        case types.REVIEW_TRANSACTION:
            return {
                mode: 'review',
                model: action.payload
            };
        case types.LOAD_TRANSACTION:
            return {
                mode: 'load',
                model: action.payload
            }
        case types.NULL_TRANSACTION:
            return{
                mode:'none',
                model:null
            }
        default:
            return state;
    }
}