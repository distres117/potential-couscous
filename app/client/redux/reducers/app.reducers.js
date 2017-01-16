import types from '../actions/action.types';

class CurrentRecord{
    isNull(){
        return Object.keys(this).length <= 1
    }
}
class Transaction{
    mode ='none';
    model = null;
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


export const transactionReducer = (state=new Transaction(), action)=>{
    let model = new Transaction();
    switch(action.type){ 
        case types.CREATE_TRANSACTION:
            _.assign(model,{
                mode:'create',
                model:action.payload
            });
            return model;
        case types.REVIEW_TRANSACTION:
            _.assign(model,{
                mode: 'review',
                model: action.payload
            });
            return model;
        case types.LOAD_TRANSACTION:
            _.assign(model,{
                mode: 'load',
                model: action.payload
            });
            return model;
        case types.NULL_TRANSACTION:
            _.assign(model,{
                mode:'none',
                model:null
            });
            return model;
        default:
            return state;
    }
}