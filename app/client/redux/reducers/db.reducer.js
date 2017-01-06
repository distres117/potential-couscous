import types from '../../redux/actions/action.types';

export const peopleReducer = (state={}, action)=>{
    switch(action.type){
        case types.GET_ALL_PEOPLE:
            return action.payload;
        default:
            return state;
    }
}

export const tableDataReducer = (state = [], action)=>{
    switch(action.type){
        case types.GET_TABLE_DATA:
            return action.payload;
        default:
            return state;
    }
}