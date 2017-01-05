import types from '../actions/action.types';

export const startGetAllPeopleAction = ()=>{
    //TODO: make this return actual data from the db
    return {
        type: types.GET_ALL_PEOPLE,
        payload: {
            testPerson1: 1,
            testPerson2: 2,
            testPerson3: 3
        }
    };
}