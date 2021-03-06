import types from '../../redux/actions/action.types';

export const peopleReducer = (state=[], action)=>{
    switch(action.type){
        case types.SET_PEOPLE:
            return action.payload;
        default:
            return state;
    }
}
export const typesReducer = (state=[], action)=>{
    switch(action.type){
        case types.GET_DISBURSEMENT_FORMATS:
            return action.payload;
        default:
            return state;
    }
}
export const transmittalsReducer = (state=[], action)=>{
    switch(action.type){
        case types.GET_DISBURSEMENT_TRANSMITTALS:
            return action.payload;
        default:
            return state;
    }
}
export const catalogReducer = (state=[], action)=>{
    switch(action.type){
        case types.GET_CATALOG_ROWS:
            return action.payload;
        default:
            return state;
    }
}
export const statesReducer = (state=[], action)=>{
    switch(action.type){
        case types.GET_STATES:
            return action.payload;
        default:
            return state;
    }
}
export const orgTypesReducer = (state=[], action)=>{
    switch(action.type){
        case types.GET_ORG_TYPES:
            return action.payload;
        default:
            return state;
    }
}

export const tableDataReducer = (state = [], action)=>{
    switch(action.type){
        case types.GET_TABLE_DATA:
            return action.payload;
        case types.COMMIT_TABLE_DATA:
            return [action.payload, ...state]
        default:
            return state;
    }
}
export const summaryDataReducer = (state = {}, action)=>{
    switch(action.type){
        case types.GET_DATA_INITIAL:
            return action.payload;
        default:
            return state;
    }
}