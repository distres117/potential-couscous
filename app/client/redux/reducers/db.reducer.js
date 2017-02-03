import types from '../../redux/actions/action.types';

export const peopleReducer = (state=[], action)=>{
    switch(action.type){
        case types.SET_PEOPLE:
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