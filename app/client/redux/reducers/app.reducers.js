import types from '../actions/action.types';

export const currentRecordReducer = (state={}, action)=>{
    switch(action.type){
        case types.SET_CURRENT_RECORD:
            return action.payload;
        default:
            return state;
    }
}