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
            return new CurrentRecord();
        case types.OVERWRITE_CURRENT_RECORD: //probably not necessary but whatevs
            let model = new CurrentRecord();
            _.assign(model, action.payload);
            return model;
        default:
            return state;
    }
}
export const longProcessReducer = (state = false,action)=>{
    switch(action.type){
        case types.START_LONG_PROCESS:
            return true;
        case types.END_LONG_PROCESS:
            return false;
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
            });
            return model;
        case types.REVIEW_TRANSACTION:
            _.assign(model,{
                mode: 'review',
            });
            return model;
        case types.LOAD_TRANSACTION:
            _.assign(model,{
                mode: 'load',
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
export const searchReducer = (state={},action)=>{
    switch(action.type){
        case types.SEARCH_RESULT_DATASET:
            return action.payload;
        default:
            return state;
    }
}
export const versionsReducer = (state=[], action)=>{
    switch(action.type){
        case types.SET_VERSIONS:
            return action.payload;
        default:
            return state;
    }
}
export const appUserReducer = (state=0, action)=>{
    switch(action.type){
        case types.SET_APP_USER:
            return action.payload;
        default:
            return state;
    }
}
export const organizationsReducer = (state=[], action)=>{
    switch(action.type){
        case types.GET_ORGANIZATIONS:
            return action.payload;
        default:
            return state;
    }
}

export const domainCategoryReducer = (state= {}, action)=>{
    switch(action.type){
        case types.GET_DOMAIN_CATEGORIES:
            return action.payload;
        default:
            return state;
    }
}
export const queryReducer = (state='',action)=>{
    switch(action.type){
        case types.SET_QUERY:
            return action.payload;
        case types.CLEAR_QUERY:
            return '';
        default:
            return state;
    }
}