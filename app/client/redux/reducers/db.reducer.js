import types from '../../redux/actions/action.types';

export const peopleReducer = (state={}, action)=>{
    switch(action.type){
        case types.GET_ALL_PEOPLE:
            return action.payload;
        default:
            return state;
    }
}